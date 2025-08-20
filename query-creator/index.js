import { app } from "@azure/functions";
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
 * Checks if a folder exists in Azure DevOps. Creates it if not.
 * @param {*} url             The URL to check for the folder.
 * @param {*} folderName      The name of the folder to search for.
 * @param {*} headers         The headers to use for the request.
 * @param {*} context         The context object for logging.
 */
async function folderExists(url, folderName, headers, context){
    
  try{
    await axios.get(url, { headers });
  } catch{
    // Create new folder if it doesn't exist
    try{
      await axios.post(url, {name: folderName, isFolder: true}, { headers });
    } catch(err){
      if (err.response?.status === 409) {
        context.log.error(`Failed to create folder ${folderName}`, err.response?.data || err);
      }
    }
  }
}

/**
 * Add a query to Azure DevOps
 * @param {*} query            The query object to add.
 * @param {*} url              The URL to add the query to.
 * @param {*} headers          The headers to use for the request.
 * @param {*} context          The context object for logging.
 */
async function addQuery(query, url, headers, context){
  try{
    await axios.post(url, {...query, queryType: "tree"}, { headers });
    context.log(`Created: ${query.name}`);
  } catch(err){
    if(err.response?.status === 409) {
      context.log(`Already exists: ${query.name}`);
    } else {
      context.log.error(`Failed to create query ${query.name}`, err.response?.data || err);
    }
  }
}

export default async function (context, req) {
  context.log('ADOQueryCreator triggered');

  // Default CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:8080", // Adjust if host is different
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "*"
  };

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    context.res = {
      status: 204,
      headers: corsHeaders
    };
    return;
  }

  // Handle other requests
  context.res = {
    status: 200,
    headers: corsHeaders,          
    body: { message: "Connected to API" }
  };

  const { projects, customQuery, toSubfolder } = req.body || {};
  if (!projects) {
    return { body: { message: "Please provide 'projects' in the request body." } };
  }

  const headers = {
    Authorization: `Basic ${Buffer.from(":" + ADO_PAT).toString("base64")}`,
    "Content-Type": "application/json"
  };

  try {
    // Add to all projects named
    for (const rawProject of projects.split(",")) {
      const projectName = rawProject.trim(); 
      const projectEncoded = encodeURIComponent(projectName); // URL Encoded

      // URLs
      const sharedQueriesURL = `https://dev.azure.com/${orgEncoded}/${projectEncoded}/_apis/wit/queries/Shared%20Queries?api-version=7.1-preview.2`;
      const subfolderURL = `https://dev.azure.com/${orgEncoded}/${projectEncoded}/_apis/wit/queries/Shared%20Queries/${subfolderEncoded}?api-version=7.1-preview.2`;

      // Check for URL validity
      await folderExists(sharedQueriesURL, "Shared Queries", headers, context);
      await folderExists(subfolderURL, SUBFOLDER, headers, context);

      // Add pre-defined shared queries
      for (const q of sharedItemQueries){
        await addQuery(q, sharedQueriesURL, headers, context);
      }

      // Add pre-defined personal queries
      for (const q of personalItemQueries){
        await addQuery(q, subfolderURL, headers, context);
      }

      // Handle custom query JSON if provided
      if (customQuery?.wiql) {
        const cleanedWiql = customQuery.wiql
          .replace(/SELECT[\s\S]*?FROM\s+workitemLinks/i, `
            SELECT
                [System.Id],
                [System.WorkItemType],
                [System.Title],
                [System.AssignedTo],
                [System.State],
                [Custom.PriorityLevel],
                [Microsoft.VSTS.Scheduling.TargetDate]
            FROM workitemLinks
          `)
          .replace(/ORDER\s+BY[\s\S]*$/i, `
            ORDER BY [Custom.PriorityLevel],
                [Microsoft.VSTS.Scheduling.TargetDate],
                [System.Title]
            MODE (Recursive)
          `);

        const targetURL = toSubfolder ? subfolderURL : sharedQueriesURL;
        
        const customQueryObj = {
          name: customQuery.name || "Custom Query",
          wiql: cleanedWiql,
          isFolder: customQuery.isFolder
        };

        await addQuery(customQueryObj, targetURL, headers, context)
      }
    }

    return { body: { message: "Queries created successfully!" } };
  } catch (err) {
    context.log.error(err);
    return { body: { message: "Error creating queries" } };
  }
};
