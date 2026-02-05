import axios from "axios";

// Environment variables in Azure Functions
const ADO_PAT = process.env.ADO_PAT; // Personal Access Token
const ADO_ORG = process.env.ADO_ORG; // Authorized Organization

// URL encoded strings
const orgEncoded = encodeURIComponent(ADO_ORG);

if (!ADO_PAT || !ADO_ORG) {
  throw new Error("Please set both ADO_PAT and ADO_ORG in Azure Functions configuration.");
}

// Helper functions
async function addEnvironment(title, environment, url, headers, context) {
  try {
    
    await axios.post(url, { ...environment }, { headers });
    context.log(`Created ${title} at ${url}`);
    return true;

  } catch (err) {

      context.log.error(`Failed to create ${title}`, err.response?.data || err);
      throw err;
  }
}

/**
 * Validates that all required data has been entered to request creating the Environment
 * @param {Object} requestor Requestor (Name & email) 
 * @param {Object} opi OPI (contact name of the team primarily using the environment)
 * @param {Object} department	Department/Team
 * @param {Object} projectWorkstreamProject Workstream
 * @param {Object} dateNeeded	Date of Request
 * @param {Object} impact	Impact of not meeting the target delivery date
 * @param {Object} primaryUseCase	Primary Use Case
 * @param {Object} sharable	Shareable with other GC project teams? If no, please provide justification.
 * @param {Object} inactivity	Do you expect extended periods of inactivity? If yes, please indicate expected timelines and duration of inactivity periods
 * @param {Object} returnDate	Return Date (expected date that the primary use case will be completed allowing the environment to be returned to DF and repurposed. If the intent is to keep the environment beyond the timeline of the primary use case, please provide justification.)
 * @param {Object} dayforceModulesFeatures Dayforce Modules/Features required
 * @param {Object} dataRequirements	Data Requirements
 * @param {Object} approxDataVolume	Approx Data Volume
 * @param {Object} expectedUserCount Expected User Count
 * @param {Object} userRolesAccess User Roles and Access (provide list of users and required roles)
 * @param {Object} businessSponsor Business Sponsor (DG) Informed confirmation (important in case a CR is required)
 * @returns {Object} Error string if error found
 */
function validateForm( requestor, opi, department, projectWorkstream, dateNeeded, impact, primaryUseCase, sharable, inactivity, returnDate, dayforceModulesFeatures, dataRequirements, approxDataVolume, expectedUserCount, userRolesAccess, businessSponsor) {

  if (!requestor || requestor.trim().length === 0) {
    return "Please provide the name and email of the requestor.";
  }
  
  if (!opi || opi.trim().length === 0) {
    return "Please provide the contact name of the team primarily using the environmentr.";
  }
    
  if (!department || department.trim().length === 0) {
    return "Please provide departement or team name." ;
  }
    
  if (!projectWorkstream || projectWorkstream.trim().length === 0) {
    return "Please provide the project workstream.";
  }
    
  if (!dateNeeded || dateNeeded.trim().length === 0) {
    return "Please provide the date needed for the environment.";
  }
  
  if (!impact || impact.trim().length === 0) {
    return "Please provide the impact of not meeting the target delivery date.";
  }
  
  if (!primaryUseCase || primaryUseCase.trim().length === 0) {
    return "Please provide your primary use case.";
  }
  
  if (!sharable || sharable.trim().length === 0) {
    return "Please let us know if the system can be shared with other teams and provide justification if not.";
  }
  
  if(!inactivity || inactivity.trim().length === 0) {
    return "Please let us know the expected extended periods of inactivity? If yes, please indicate expected timelines and duration of inactivity periods.";
  }
  
  if(!returnDate || returnDate.trim().length === 0) {
    return "Please provide the expected date that the primary use case will be completed allowing the environment to be returned to DF and repurposed. If the intent is to keep the environment beyond the timeline of the primary use case, please provide justification.)";
  }
  
  if (!dayforceModulesFeatures || dayforceModulesFeatures.trim().length === 0) {
    return "Please provide the list of Daforce Modules and Features that are required.";
  }
  
  if (!dataRequirements || dataRequirements.trim().length === 0) {
    return "Please provide your data requrirements.";
  }
  
  if (!approxDataVolume || approxDataVolume.trim().length === 0) {
    return "Please provide your approximate data volume.";
  }
  
  if (!expectedUserCount || expectedUserCount.trim().length === 0) {
    return "Please provide your expected user count.";
  }
  
  if (!userRolesAccess || userRolesAccess.trim().length === 0) {
    return "Please provide a list of user and required roles.";
  }
  
  if (!businessSponsor || businessSponsor.trim().length === 0) {
    return "Please provide your business sponsor (DG) incase a CR is required.";
  }

  return null;
}

/**
 * Combines all data that has been entered to request creating the Environment for the discussion field
 * @param {Object} requestor Requestor (Name & email) 
 * @param {Object} opi	OPI (contact name of the team primarily using the environment)
 * @param {Object} department	Department/Team
 * @param {Object} projectWorkstreamProject Workstream
 * @param {Object} dateNeeded	Date of Request
 * @param {Object} impact	Impact of not meeting the target delivery date
 * @param {Object} primaryUseCase	Primary Use Case
 * @param {Object} sharable	Shareable with other GC project teams? If no, please provide justification.
 * @param {Object} inactivity	Do you expect extended periods of inactivity? If yes, please indicate expected timelines and duration of inactivity periods
 * @param {Object} returnDate	Return Date (expected date that the primary use case will be completed allowing the environment to be returned to DF and repurposed. If the intent is to keep the environment beyond the timeline of the primary use case, please provide justification.)
 * @param {Object} dayforceModulesFeatures Dayforce Modules/Features required
 * @param {Object} dataRequirements	Data Requirements
 * @param {Object} approxDataVolume	Approx Data Volume
 * @param {Object} expectedUserCount Expected User Count
 * @param {Object} userRolesAccess User Roles and Access (provide list of users and required roles)
 * @param {Object} businessSponsor Business Sponsor (DG) Informed confirmation (important in case a CR is required)
 * @param {Object} integrationDataPopulation Integration/Data Population (if needed)
 * @param {Object} specialConfigurations Any Special Configurations (if needed)
 * @param {Object} misc	Any miscellaneous information that the submitter believes to be relevant.
 * @returns {Object} Error string if error found
 */
function constructDescriptionField( requestor, opi,department, projectWorkstream, dateNeeded, impact, primaryUseCase, sharable, inactivity, returnDate, dayforceModulesFeatures, dataRequirements,	approxDataVolume, integrationDataPopulation, specialConfigurations, expectedUserCount, userRolesAccess, businessSponsor, misc) {

  let discussionField = "";

  //add manditory fields
  discussionField += "Requestor: " + requestor.trim() + "/n"; 
  discussionField += "OPI: " + opi.trim() + "/n"; 
  discussionField += "Departement: " + department.trim() + "/n"; 
  discussionField += "Project Workstream: " + projectWorkstream.trim() + "/n"; 
  discussionField += "Date Needed: " + dateNeeded.trim() + "/n"; 
  discussionField += "Impact: " + impact.trim() + "/n"; 
  discussionField += "Primary Use Case: " + primaryUseCase.trim() + "/n"; 
  discussionField += "Sharable: " + sharable.trim() + "/n"; 
  discussionField += "Inactivity: " + inactivity.trim() + "/n"; 
  discussionField += "Return Date: " + returnDate.trim() + "/n"; 
  discussionField += "Dayforce Module and Features: " +  dayforceModulesFeatures.trim() + "/n"; 
  discussionField += "Data Requirements: " + dataRequirements.trim() + "/n"; 
  discussionField += "Approx Data Volumn: " + approxDataVolume.trim() + "/n"; 
  discussionField += "Expected User Count: " + expectedUserCount.trim() + "/n"; 
  discussionField += "User Roles and Access list: " + userRolesAccess.trim() + "/n"; 
  discussionField += "Business Sponser: " + businessSponsor.trim() + "/n"; 

  //add optional fields
  if (!(!integrationDataPopulation || integrationDataPopulation.trim() === 0)) {
    discussionField += "Integration and Data Population: " + integrationDataPopulation.trim()  + "/n"; 
  }

  if (!(!specialConfigurations || specialConfigurations.trim() === 0)) {
    discussionField += "Special Configuration: " + specialConfigurations.trim()  + "/n"; 
  }

  if (!(!misc || misc.trim() === 0)) {
    discussionField += "Miscellaneous information: " + misc.trim()  + "/n"; 
  }

  return JSON.stringify(discussionField);
}

export default async function (context, req) {
  context.log("Requirements Creator triggered");

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


  //get all values from the web page
  const { requestor , opi ,	department, projectWorkstream, dateNeeded, impact, primaryUseCase, sharable, inactivity, returnDate, dayforceModulesFeatures,
    dataRequirements,	approxDataVolume, integrationDataPopulation, specialConfigurations, expectedUserCount, userRolesAccess, businessSponsor, misc} = req.body || {};
 

  let error =  validateForm( requestor, opi,	department, projectWorkstream, dateNeeded, impact, primaryUseCase, sharable, inactivity, returnDate, dayforceModulesFeatures,
    dataRequirements,	approxDataVolume, expectedUserCount, userRolesAccess, businessSponsor) ;

  if (!error){
    return {
      body: { error },
    };
  }

  let descriptionField = constructDescriptionField( requestor, opi,	department, projectWorkstream, dateNeeded, impact, primaryUseCase, sharable, inactivity, returnDate, dayforceModulesFeatures,
    dataRequirements,	approxDataVolume, integrationDataPopulation, specialConfigurations, expectedUserCount, userRolesAccess, businessSponsor, misc) ;

  const genericWebUser = "";
  const projectEncoded = encodeURIComponent("Environments"); //  Only want to post to Environments to create the request for new Environments

  const headers = {
    Authorization: `Basic ${Buffer.from(":" + ADO_PAT).toString("base64")}`,
    "Content-Type": "application/json",
  };

  // Base URL
  const targetURL = `https://dev.azure.com/${orgEncoded}/${projectEncoded}/_apis/wit/workitems/Requirement?api-version=7.1-preview.2`;
  const title = "New Environment requested by " + requestor.trim() + " on " + new Date(); //use date and time to make sure each request is unique and to know when it was created

  payload = [
    {
        "op": "add",
        "path": "/fields/System.Title",
        "from": None,
        "value": title
    },
    {
        "op": "add",
        "path": "/fields/System.AssignedTo",
        "from": None,
        "value": genericWebUser
    },
    {
      "op": "add",
      "path": "/fields/System.Description",
      "from": None,
      "value": descriptionField
    },        
    {
      "op": "add",
      "path": "/fields/System.PriorityLevel",
      "from": None,
      "value": "2 (High)"
    },   
    {
      "op": "add",
      "path": "/fields/System.State",
      "from": None,
      "value": "To Do"
    }
  ];

  const environmentObj = JSON.dumps(payload);

  try {

    await addEnvironment(
      title,
      environmentObj,
      targetURL,
      headers,
      context,
    );

    context.res = {
      status: 200,
      headers: corsHeaders,
      body: { message: "Environment requirement created successfully!" },
    };
  } catch (err) {
    context.log.error(err);
    context.res = {
      status: 500,
      headers: corsHeaders,
      body: { message: "Error creating Environment requirement", error: err.message },
    };
  }
}
