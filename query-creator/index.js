import axios from "axios";

// Environment variables in Azure Functions
const ADO_PAT = process.env.ADO_PAT; // Personal Access Token
const ADO_ORG = process.env.ADO_ORG; // Authorized Organization
const SUBFOLDER = process.env.QUERY_SUBFOLDER || "My Work Items"; // Subfolder for Queries 

// URL encoded strings
const orgEncoded = encodeURIComponent(ADO_ORG);
const subfolderEncoded = encodeURIComponent(SUBFOLDER);

if (!ADO_PAT || !ADO_ORG) {
  throw new Error("Please set both ADO_PAT and ADO_ORG in Azure Functions configuration.");
}

// Predefined queries (added to every project)
const sharedItemQueries = [
  {
    name: "All Work Items",
    wiql: `
      SELECT
          [System.Id],
          [System.WorkItemType],
          [System.Title],
          [System.AssignedTo],
          [System.State],
          [Custom.PriorityLevel],
          [Microsoft.VSTS.Scheduling.TargetDate]
      FROM workitemLinks
      WHERE
          ([Source].[System.TeamProject] = '{project}')
          AND ([Source].[System.WorkItemType] <> '')
          AND ([System.Links.LinkType] = 'System.LinkTypes.Hierarchy-Forward')
          AND ([Target].[System.TeamProject] = '{project}')
          AND ([Target].[System.WorkItemType] <> '')
      ORDER BY [Custom.PriorityLevel],
          [Microsoft.VSTS.Scheduling.TargetDate],
          [System.Title]
      MODE (Recursive)
    `,
    isFolder: false
  },
  {
    name: "Priority Work Items",
    wiql: `
      SELECT
          [System.Id],
          [System.WorkItemType],
          [System.Title],
          [System.AssignedTo],
          [System.State],
          [Custom.PriorityLevel],
          [Microsoft.VSTS.Scheduling.TargetDate]
      FROM workitemLinks
      WHERE
          ([Source].[System.TeamProject] = '{project}')
          AND ([Source].[Custom.PriorityLevel] = '1 (Critical)')
          AND ([System.Links.LinkType] = 'System.LinkTypes.Hierarchy-Forward')
          AND ([Target].[System.TeamProject] = '{project}')
          AND ([Target].[System.WorkItemType] <> '')
      ORDER BY [Custom.PriorityLevel],
          [Microsoft.VSTS.Scheduling.TargetDate],
          [System.Title]
      MODE (Recursive)
    `,
    isFolder: false
  }
];

const personalItemQueries = [
  {
    name: "All My Work Items",
    wiql: `
      SELECT
          [System.Id],
          [System.WorkItemType],
          [System.Title],
          [System.AssignedTo],
          [System.State],
          [Custom.PriorityLevel],
          [Microsoft.VSTS.Scheduling.TargetDate]
      FROM workitemLinks
      WHERE
          ([Source].[System.TeamProject] = '{project}')
          AND (
              [Source].[System.AssignedTo] = @me
              OR [Source].[Custom.Assignee1] = @me
              OR [Source].[Custom.Assignee2] = @me
              OR [Source].[Custom.Assignee3] = @me
              OR [Source].[Custom.BlockedBy] = @me
          )
          AND ([System.Links.LinkType] = 'System.LinkTypes.Hierarchy-Forward')
          AND ([Target].[System.TeamProject] = '{project}')
          AND ([Target].[System.WorkItemType] <> '')
      ORDER BY [Custom.PriorityLevel],
          [Microsoft.VSTS.Scheduling.TargetDate],
          [System.Title]
      MODE (Recursive)
    `,
    isFolder: false
  },
  {
    name: "My Priority Work Items",
    wiql: `
      SELECT
          [System.Id],
          [System.WorkItemType],
          [System.Title],
          [System.AssignedTo],
          [System.State],
          [Custom.PriorityLevel],
          [Microsoft.VSTS.Scheduling.TargetDate]
      FROM workitemLinks
      WHERE
          ([Source].[System.TeamProject] = '{project}')
          AND (
              (([Source].[System.AssignedTo] = @me
                OR [Source].[Custom.Assignee1] = @me
                OR [Source].[Custom.Assignee2] = @me
                OR [Source].[Custom.Assignee3] = @me)
               AND [Source].[Custom.PriorityLevel] = '1 (Critical)')
              OR [Source].[Custom.BlockedBy] = @me
          )
          AND ([System.Links.LinkType] = 'System.LinkTypes.Hierarchy-Forward')
          AND ([Target].[System.TeamProject] = '{project}')
          AND ([Target].[System.WorkItemType] <> '')
      ORDER BY [Custom.PriorityLevel],
          [Microsoft.VSTS.Scheduling.TargetDate],
          [System.Title]
      MODE (Recursive)
    `,
    isFolder: false
  }
];

// Helper functions

/**
 * Safely appends $depth parameter to a URL.
 * @param {string} url    The original URL.
 * @returns {string}      URL with $depth=2 appended correctly.
 */
function appendDepth(url) {
  return url.includes("?") ? `${url}&$depth=2` : `${url}?$depth=2`;
}

/**
 * Flattens a nested set of query items.
 * @param {*} items         The nested query items to flatten.
 * @returns {Array}         An array of flattened query items.
 */
function flattenQueries(items = []) {
  let all = [];
  for (const item of items) {
    all.push(item);
    if (item.isFolder && item.children) {
      all = all.concat(flattenQueries(item.children));
    }
  }
  return all;
}

/**
 * Ensures a folder exists in Azure DevOps. Creates it if not.
 * @param {string} parentUrl       The URL of the parent folder (where the subfolder will be created).
 * @param {string} folderName      The name of the folder to find.
 * @param {*} headers              The headers to use for the request.
 * @param {*} context              The context object for logging.
 */
async function addFolder(parentUrl, folderName, headers, context) {
  try {
    // List existing folders
    const listURL = appendDepth(parentUrl);
    const { data } = await axios.get(listURL, { headers });
    const allItems = flattenQueries(data.value || []);

    const folder = allItems.find(
      f => f.isFolder && f.name.trim().toLowerCase() === folderName.trim().toLowerCase()
    );

    // Skip folder creation if it already exists
    if (folder) {
      context.log(`Folder already exists: ${folderName}`);
      context.log('Folder object:', folder);
      return folder;
    } else {
      const res = await axios.post(parentUrl, { name: folderName, isFolder: true }, { headers });
      context.log(`Created folder: ${folderName}`);
      context.log('Folder object:', res.data);
      return res.data;
    }
  } catch (err) {
    context.log.error(`Error ensuring folder ${folderName}:`, err.response?.data || err);
    throw err;
  }
}

/**
 * Add a query (tree or flat) to Azure DevOps
 * @param {*} query             The query object to add.
 * @param {*} url               The URL to add the query to.
 * @param {*} headers           The headers to use for the request.
 * @param {*} context           The context object for logging.
 * @param {"tree"|"flat"} type  The type of query to create.
 */
async function addQuery(query, url, headers, context, type = "tree") {
  try {
    // Get existing queries
    const listURL = appendDepth(url);
    const { data } = await axios.get(listURL, { headers });
    const allItems = flattenQueries(data.value || []);
    const existingQueries = allItems
      .filter(item => !item.isFolder)
      .map(q => q.name.trim().toLowerCase());

    // Skip if query already exists
    if (existingQueries.includes(query.name.trim().toLowerCase())) {
      context.log(`${type} query already exists: ${query.name}`);
      return false;
    } else {
      // Query does not exist; create it
      await axios.post(url, { ...query, queryType: type }, { headers });
      context.log(`Created ${type} query: ${query.name} at ${url}`);
      return true;
    }

  } catch (err) {
    if (err.response?.status === 409) {
      context.log(`${type} query already exists: ${query.name}`);
    } else {
      context.log.error(`Failed to create ${type} query ${query.name}`, err.response?.data || err);
      throw err;
    }
  }
}

/**
 * Replaces the {project} placeholder in a WIQL query object with the actual project name.
 * @param {Object} queryObj - The query object containing the WIQL string.
 * @param {string} projectName - The project name to replace the placeholder with.
 * @returns {Object} A new query object with the project name applied.
 */
function replaceProjectWIQL(queryObj, projectName) {
  return {
    ...queryObj,
    wiql: queryObj.wiql.replace(/{project}/g, projectName)
  };
}

export default async function (context, req) {
  context.log("Query Creator triggered");

  // Default CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:8080", 
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "*",
  };

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    context.res = {
      status: 204,
      headers: corsHeaders,
      body: null,
    };
    return;
  }

  // Restrict to POST
  if (req.method !== "POST") {
    context.res = {
      status: 405,
      headers: corsHeaders,
      body: { message: "Method Not Allowed" },
    };
    return;
  }

  const { projects, customQuery, starterQueries, toSubfolder, flatQuery } = req.body || {};
  if (!projects) {
    return {
      body: { message: "Please provide 'projects' in the request body." },
    };
  }

  const headers = {
    Authorization: `Basic ${Buffer.from(":" + ADO_PAT).toString("base64")}`,
    "Content-Type": "application/json",
  };

  try {
    // Add to all projects
    for (const rawProject of projects.split(",")) {
      const projectName = rawProject.trim();
      const projectEncoded = encodeURIComponent(projectName);

      // Base URL
      const sharedQueriesURL = `https://dev.azure.com/${orgEncoded}/${projectEncoded}/_apis/wit/queries/Shared%20Queries?api-version=7.1-preview.2`;
      let subfolderURL;

      if(starterQueries){
        
        // Add subfolder
        const subfolder = await addFolder(sharedQueriesURL, SUBFOLDER, headers, context);
        subfolderURL = `${subfolder.url}?api-version=7.1-preview.2`;
        context.log(`Subfolder URL: ${subfolderURL}`);

        // Add shared queries
        for (const q of sharedItemQueries) {
          const query = replaceProjectWIQL(q, projectName);
          await addQuery(query, sharedQueriesURL, headers, context);
        }

        // Add personal queries inside subfolder
        for (const q of personalItemQueries) {
          const query = replaceProjectWIQL(q, projectName);
          await addQuery(query, subfolderURL, headers, context);
        }
      }

      subfolderURL = `https://dev.azure.com/${orgEncoded}/${projectEncoded}/${subfolderEncoded}/_apis/wit/queries/Shared%20Queries?api-version=7.1-preview.2`;
      
      // Handle custom query
      if (customQuery?.wiql) {
        // Standardized SELECT
        const selectClause = `
          SELECT
              [System.Id],
              [System.WorkItemType],
              [System.Title],
              [System.AssignedTo],
              [System.State],
              [Custom.PriorityLevel],
              [Microsoft.VSTS.Scheduling.TargetDate]
        `;

        const orderByClauseFlat = `
          ORDER BY [Custom.PriorityLevel],
              [Microsoft.VSTS.Scheduling.TargetDate],
              [System.Title]
        `;

        const orderByClauseTree = `
          ORDER BY [Custom.PriorityLevel],
              [Microsoft.VSTS.Scheduling.TargetDate],
              [System.Title]
          MODE (Recursive)
        `;

        let cleanedWiql = customQuery.wiql
          // Replace SELECT
          .replace(/SELECT[\s\S]*?FROM/i, selectClause + "\nFROM")
          // Replace ORDER BY → end of string
          .replace(/ORDER\s+BY[\s\S]*$/i, flatQuery ? orderByClauseFlat : orderByClauseTree);

        // Swap FROM depending on flat/tree
        if (flatQuery) {
          cleanedWiql = cleanedWiql.replace(/FROM\s+\w+/i, "FROM WorkItems");
        } else {
          cleanedWiql = cleanedWiql.replace(/FROM\s+\w+/i, "FROM WorkItemLinks");
        }

        const targetURL = toSubfolder ? subfolderURL : sharedQueriesURL;

        const customQueryObj = replaceProjectWIQL(
          {
            name: customQuery.name || "Custom Query",
            wiql: cleanedWiql,
            isFolder: customQuery.isFolder ?? false,
          },
          projectName
        );

        await addQuery(
          customQueryObj,
          targetURL,
          headers,
          context,
          flatQuery ? "flat" : "tree"
        );
      }
    }

    context.res = {
      status: 200,
      headers: corsHeaders,
      body: { message: "Queries created successfully!" },
    };
  } catch (err) {
    context.log.error(err);
    context.res = {
      status: 500,
      headers: corsHeaders,
      body: { message: "Error creating queries", error: err.message },
    };
  }
}
