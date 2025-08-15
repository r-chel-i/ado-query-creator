const { app } = require('@azure/functions');
const axios = require("axios");

const ADO_PAT = process.env.ADO_PAT; // Stored in Azure Functions

app.http("ADOQueryCreator", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const { projects, wiql } = await request.json();
    const projectList = projects.split(",").map(p => encodeURIComponent(p.trim()));

    // Predefined queries
    const sharedItemQueriesTemplate = [
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

    const personalItemQueriesTemplate = [
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

    const headers = {
      Authorization: `Basic ${Buffer.from(":" + ADO_PAT).toString("base64")}`,
      "Content-Type": "application/json"
    };

    try {
      for (const project of projectList) {
        const allQueries = [
          ...sharedItemQueriesTemplate,
          ...personalItemQueriesTemplate
        ].map(q => ({
          ...q,
          queryType: "tree",
          wiql: q.wiql.replace(/{project}/g, project)
        }));

        // Add predefined queries
        const encodedProject = encodeURIComponent(project);
        for (const query of allQueries) {
          await axios.post(
            `https://dev.azure.com/ORG_NAME/${encodedProject}/_apis/wit/queries?api-version=7.0`,
            query,
            { headers }
          ).catch(err => {
            if (err.response && err.response.status === 409) {
              context.log(`Already exists: ${query.name}`);
            } else {
              context.log.error(`Failed: ${query.name}`, err.response?.data || err);
            }
          });
        }

        // Add optional custom WIQL as a new query
        if (wiql) {
          // Replace SELECT and ORDER BY with fixed template
          const cleanedWiql = wiql
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

          await axios.post(
            `https://dev.azure.com/ORG_NAME/${encodedProject}/_apis/wit/queries?api-version=7.0`,
            {
              name: "Custom WIQL",
              wiql: cleanedWiql,
              queryType: "tree",
              isFolder: false
            },
            { headers }
          ).catch(err => {
            if (err.response && err.response.status === 409) {
              context.log("Custom WIQL already exists");
            } else {
              context.log.error("Failed to create Custom WIQL", err.response?.data || err);
            }
          });
        }
      }

      return { body: { message: "Queries created successfully!" } };
    } catch (err) {
      context.log.error(err);
      return { body: { message: "Error creating queries" } };
    }
  },
});
