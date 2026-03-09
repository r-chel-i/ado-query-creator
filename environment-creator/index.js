/***
 * Environment Request Form (backend)
 * Stored in Azure Functions, triggered by the Environment Request Form in the frontend when a user 
 * submits a request for a new environment.
 * This program will take all the data entered in the form, validate it, and then create a new Environment Request work item 
 * in the Azure DevOps Environments organization with the details of the environment request.
 * 
 * Form fields: 
 * requestorName: Requestor Name - Text field (single line)
 * requestorEmail: Requestor Email - Text field (single line)
 * opi: OPI - Text field (single line) 
 * department: Department - Text field (single line)
 * dateRequest: Date of Request - Date/Time (automatic)
 * projectWorkstream: Project Workstream - Text field (single line)
 * dateNeededBy: Date Needed By - Date/Time
 * impactTargetDate: Impact of Not Meeting Target Delivery Date - Text field (multi-line)
 * primaryUseCase: Primary Use Case - Text field (multi-line)
 * shareable: Shareable - Boolean
 * shareableJustification: Justification for Not Being Shareable - Text field (multi-line), only if shareable is false
 * expectsInactivity: Expects Periods of Inactivity - Boolean
 * inactivityTimeline:Timeline and Duration of Inactivity - Text field (multi-line), only if expectsInactivity is true
 * returnDate: Return Date - Date/Time
 * keepEnvironment: Wants to Keep Environment - Boolean
 * keepEnvironmentJustification: Justification for Keeping Environment - Text field (multi-line), only if keepEnvironment is true
 * dayforceModulesFeatures: Dayforce Modules or Features Required - Text field (multi-line)
 * dataRequirements: Data Requirements - Text field (multi-line)
 * dataVolume: Approximate Data Volume - Text field (single line)
 * intDataPop: Integration or Data Population - Text field (multi-line)
 * specialConfigs: Special Configurations - Text field (multi-line)
 * userCount: User Count - Text field (single line)
 * userRolesAccess: User Roles and Access - Text field (multi-line)
 * sponsorConfirmation: Business Sponsor Informed Confirmation - Boolean
 * sponsorName: Business Sponsor Name - Text field (single line)
 * sponsorEmail: Business Sponsor Email - Text field (single line)
 * miscInfo: Misc Information - Text field (multi-line)
 * 
 * ADO Field Reference Names: Custom.RequestorName, Custom.RequestorEmail, Custom.OPI, Custom.Department, Custom.DateofRequest, 
 * Custom.ProjectWorkstream, Custom.DateNeededBy, Custom.ImpactofNotMeetingTargetDeliveryDate, Custom.PrimaryUseCase, Custom.Shareable, 
 * Custom.JustificationforNotBeingShareable, Custom.ExpectsPeriodsofInactivity, Custom.TimelineandDurationofInactivity, Custom.ReturnDate, 
 * Custom.WantstoKeepEnvironment, Custom.JustificationforKeepingEnvironment, Custom.DayforceModulesorFeaturesRequired, Custom.DataRequirements, 
 * Custom.ApproximateDataVolume, Custom.IntegrationorDataPopulation, Custom.SpecialConfigurations, Custom.UserCount, Custom.UserRolesandAccess, 
 * Custom.BusinessSponsorInformedConfirmation, Custom.BusinessSponsorName, Custom.BusinessSponsorEmail, Custom.MiscInformation
 * 
 * Obtained from https://dev.azure.com/{organization}/{project}/_apis/wit/fields?api-version=7.1
*/

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
async function addEnvironment(title, payload, url, headers, context) {
  try {
    await axios.post(url, payload, { headers });
    context.log(`Created ${title} at ${url}`);
    return true;
  } catch (err) {
    context.log.error(`Failed to create ${title}`, err.response?.data || err);
    throw err;
  }
}

/**
 * Validates that all required data has been entered to request creating the Environment
 * @param {Object} requestorName Requestor Name
 * @param {Object} requestorEmail Requestor Email
 * @param {Object} opi OPI (contact name of the team primarily using the environment)
 * @param {Object} department Department/Team
 * @param {Object} projectWorkstream Project Workstream
 * @param {Object} dateNeededBy Date Needed By
 * @param {Object} impactTargetDate Impact of not meeting the target delivery date
 * @param {Object} primaryUseCase Primary Use Case
 * @param {Object} shareable Shareable - Boolean
 * @param {Object} shareableJustification Justification for not being shareable (if shareable is false)
 * @param {Object} expectsInactivity Expects Periods of Inactivity - Boolean
 * @param {Object} inactivityTimeline Timeline and Duration of Inactivity (if expectsInactivity is true)
 * @param {Object} returnDate Return Date
 * @param {Object} keepEnvironment Wants to Keep Environment - Boolean
 * @param {Object} keepEnvironmentJustification Justification for keeping environment (if keepEnvironment is true)
 * @param {Object} dayforceModulesFeatures Dayforce Modules/Features required
 * @param {Object} dataRequirements Data Requirements
 * @param {Object} dataVolume Approx Data Volume
 * @param {Object} intDataPop Integration or Data Population
 * @param {Object} specialConfigs Special Configurations
 * @param {Object} userCount User Count
 * @param {Object} userRolesAccess User Roles and Access
 * @param {Object} sponsorConfirmation Sponsor Confirmation - Boolean
 * @param {Object} sponsorName Sponsor Name
 * @param {Object} sponsorEmail Sponsor Email
 * @returns {Object} Error string if error found
 */
function validateForm(requestorName, requestorEmail, opi, department, projectWorkstream, dateNeededBy, impactTargetDate, primaryUseCase, shareable, shareableJustification, expectsInactivity, inactivityTimeline, returnDate, keepEnvironment, keepEnvironmentJustification, dayforceModulesFeatures, dataRequirements, dataVolume, intDataPop, specialConfigs, userCount, userRolesAccess, sponsorConfirmation, sponsorName, sponsorEmail) {

  if (!requestorName || requestorName.trim().length === 0) {
    return "Please provide the requestor name.";
  }

  if (!requestorEmail || requestorEmail.trim().length === 0) {
    return "Please provide the requestor email.";
  }
  
  if (!opi || opi.trim().length === 0) {
    return "Please provide the OPI.";
  }
    
  if (!department || department.trim().length === 0) {
    return "Please provide department or team name." ;
  }
    
  if (!projectWorkstream || projectWorkstream.trim().length === 0) {
    return "Please provide the project workstream.";
  }

  if (!dateNeededBy || dateNeededBy.trim().length === 0) {
    return "Please provide the date needed by.";
  }
    
  if (!impactTargetDate || impactTargetDate.trim().length === 0) {
    return "Please provide the impact of not meeting the target delivery date.";
  }
  
  if (!primaryUseCase || primaryUseCase.trim().length === 0) {
    return "Please provide your primary use case.";
  }
  
  if (shareable === null || shareable === undefined) {
    return "Please indicate if the system is shareable.";
  }

  if (shareable === false && (!shareableJustification || shareableJustification.trim().length === 0)) {
    return "Please provide justification for not being shareable.";
  }
  
  if (expectsInactivity === null || expectsInactivity === undefined) {
    return "Please indicate if you expect periods of inactivity.";
  }

  if (expectsInactivity === true && (!inactivityTimeline || inactivityTimeline.trim().length === 0)) {
    return "Please provide the timeline and duration of inactivity periods.";
  }

  if (!returnDate || returnDate.trim().length === 0) {
    return "Please provide the return date.";
  }

  if (keepEnvironment === null || keepEnvironment === undefined) {
    return "Please indicate if you want to keep the environment.";
  }

  if (keepEnvironment === true && (!keepEnvironmentJustification || keepEnvironmentJustification.trim().length === 0)) {
    return "Please provide justification for keeping the environment.";
  }
  
  if (!dayforceModulesFeatures || dayforceModulesFeatures.trim().length === 0) {
    return "Please provide the list of Daforce Modules and Features that are required.";
  }
  
  if (!dataRequirements || dataRequirements.trim().length === 0) {
    return "Please provide your data requirements.";
  }
  
  if (!dataVolume || dataVolume.trim().length === 0) {
    return "Please provide your approximate data volume.";
  }
  
  if (!userCount || userCount.trim().length === 0) {
    return "Please provide your expected user count.";
  }
  
  if (!userRolesAccess || userRolesAccess.trim().length === 0) {
    return "Please provide a list of users and their roles.";
  }

  if (sponsorConfirmation === null || sponsorConfirmation === undefined) {
    return "Please confirm business sponsor informed status.";
  }

  if (sponsorConfirmation === true) {
    if (!sponsorName || sponsorName.trim().length === 0) {
      return "Please provide the business sponsor name.";
    }
    if (!sponsorEmail || sponsorEmail.trim().length === 0) {
      return "Please provide the business sponsor email.";
    }
  }

  return null;
}

/**
 * Combines all data that has been entered to request creating the Environment for the description field
 * @param {Object} requestorName Requestor Name
 * @param {Object} requestorEmail Requestor Email
 * @param {Object} opi OPI
 * @param {Object} department Department
 * @param {Object} dateRequest Date of Request
 * @param {Object} projectWorkstream Project Workstream
 * @param {Object} dateNeededBy Date Needed By
 * @param {Object} impactTargetDate Impact of Not Meeting Target Delivery Date
 * @param {Object} primaryUseCase Primary Use Case
 * @param {Object} shareable Shareable
 * @param {Object} shareableJustification Justification for Not Being Shareable
 * @param {Object} expectsInactivity Expects Periods of Inactivity
 * @param {Object} inactivityTimeline Timeline and Duration of Inactivity
 * @param {Object} returnDate Return Date
 * @param {Object} keepEnvironment Wants to Keep Environment
 * @param {Object} keepEnvironmentJustification Justification for Keeping Environment
 * @param {Object} dayforceModulesFeatures Dayforce Modules or Features Required
 * @param {Object} dataRequirements Data Requirements
 * @param {Object} dataVolume Approximate Data Volume
 * @param {Object} intDataPop Integration or Data Population
 * @param {Object} specialConfigs Special Configurations
 * @param {Object} userCount User Count
 * @param {Object} userRolesAccess User Roles and Access
 * @param {Object} sponsorConfirmation Business Sponsor Informed Confirmation
 * @param {Object} sponsorName Business Sponsor Name
 * @param {Object} sponsorEmail Business Sponsor Email
 * @param {Object} miscInfo Misc Information
 * @returns {string} Description field formatted as string
 */
function constructDescriptionField(requestorName, requestorEmail, opi, department, dateRequest, projectWorkstream, dateNeededBy, impactTargetDate, primaryUseCase, shareable, shareableJustification, expectsInactivity, inactivityTimeline, returnDate, keepEnvironment, keepEnvironmentJustification, dayforceModulesFeatures, dataRequirements, dataVolume, intDataPop, specialConfigs, userCount, userRolesAccess, sponsorConfirmation, sponsorName, sponsorEmail, miscInfo) {

  let discussionField = "";

  // Add mandatory fields
  discussionField += "Requestor Name: " + (requestorName || "").trim() + "\n";
  discussionField += "Requestor Email: " + (requestorEmail || "").trim() + "\n";
  discussionField += "OPI: " + (opi || "").trim() + "\n";
  discussionField += "Department: " + (department || "").trim() + "\n";
  discussionField += "Date of Request: " + (dateRequest || "").trim() + "\n";
  discussionField += "Project Workstream: " + (projectWorkstream || "").trim() + "\n";
  discussionField += "Date Needed By: " + (dateNeededBy || "").trim() + "\n";
  discussionField += "Impact of Not Meeting Target Delivery Date: " + (impactTargetDate || "").trim() + "\n";
  discussionField += "Primary Use Case: " + (primaryUseCase || "").trim() + "\n";
  discussionField += "Shareable: " + shareable + "\n";
  
  if (shareable === false) {
    discussionField += "Justification for Not Being Shareable: " + (shareableJustification || "").trim() + "\n";
  }
  
  discussionField += "Expects Periods of Inactivity: " + expectsInactivity + "\n";
  
  if (expectsInactivity === true) {
    discussionField += "Timeline and Duration of Inactivity: " + (inactivityTimeline || "").trim() + "\n";
  }
  
  discussionField += "Return Date: " + (returnDate || "").trim() + "\n";
  discussionField += "Wants to Keep Environment: " + keepEnvironment + "\n";
  
  if (keepEnvironment === true) {
    discussionField += "Justification for Keeping Environment: " + (keepEnvironmentJustification || "").trim() + "\n";
  }
  
  discussionField += "Dayforce Modules or Features Required: " + (dayforceModulesFeatures || "").trim() + "\n";
  discussionField += "Data Requirements: " + (dataRequirements || "").trim() + "\n";
  discussionField += "Approximate Data Volume: " + (dataVolume || "").trim() + "\n";
  discussionField += "User Count: " + (userCount || "").trim() + "\n";
  discussionField += "User Roles and Access: " + (userRolesAccess || "").trim() + "\n";
  discussionField += "Business Sponsor Confirmation: " + sponsorConfirmation + "\n";

  // Add conditional and optional fields
  if (sponsorConfirmation === true) {
    discussionField += "Business Sponsor Name: " + (sponsorName || "").trim() + "\n";
    discussionField += "Business Sponsor Email: " + (sponsorEmail || "").trim() + "\n";
  }

  if (intDataPop && intDataPop.trim().length > 0) {
    discussionField += "Integration or Data Population: " + intDataPop.trim() + "\n";
  }

  if (specialConfigs && specialConfigs.trim().length > 0) {
    discussionField += "Special Configurations: " + specialConfigs.trim() + "\n";
  }

  if (miscInfo && miscInfo.trim().length > 0) {
    discussionField += "Miscellaneous Information: " + miscInfo.trim() + "\n";
  }

  return discussionField.trim();
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

  // Get all values from the web page
  const {
    requestorName,
    requestorEmail,
    opi,
    department,
    dateRequest,
    projectWorkstream,
    dateNeededBy,
    impactTargetDate,
    primaryUseCase,
    shareable,
    shareableJustification,
    expectsInactivity,
    inactivityTimeline,
    returnDate,
    keepEnvironment,
    keepEnvironmentJustification,
    dayforceModulesFeatures,
    dataRequirements,
    dataVolume,
    intDataPop,
    specialConfigs,
    userCount,
    userRolesAccess,
    sponsorConfirmation,
    sponsorName,
    sponsorEmail,
    miscInfo
  } = req.body || {};

  const error = validateForm(
    requestorName,
    requestorEmail,
    opi,
    department,
    projectWorkstream,
    dateNeededBy,
    impactTargetDate,
    primaryUseCase,
    shareable,
    shareableJustification,
    expectsInactivity,
    inactivityTimeline,
    returnDate,
    keepEnvironment,
    keepEnvironmentJustification,
    dayforceModulesFeatures,
    dataRequirements,
    dataVolume,
    intDataPop,
    specialConfigs,
    userCount,
    userRolesAccess,
    sponsorConfirmation,
    sponsorName,
    sponsorEmail
  );

  if (error) {
    context.res = {
      status: 400,
      headers: corsHeaders,
      body: { message: error },
    };
    return;
  }

  const descriptionField = constructDescriptionField(
    requestorName,
    requestorEmail,
    opi,
    department,
    dateRequest,
    projectWorkstream,
    dateNeededBy,
    impactTargetDate,
    primaryUseCase,
    shareable,
    shareableJustification,
    expectsInactivity,
    inactivityTimeline,
    returnDate,
    keepEnvironment,
    keepEnvironmentJustification,
    dayforceModulesFeatures,
    dataRequirements,
    dataVolume,
    intDataPop,
    specialConfigs,
    userCount,
    userRolesAccess,
    sponsorConfirmation,
    sponsorName,
    sponsorEmail,
    miscInfo
  );

  const projectEncoded = encodeURIComponent("Environments Example Project"); // Only want to post to Environments to create the request for new Environments

  const headers = {
    Authorization: `Basic ${Buffer.from(":" + ADO_PAT).toString("base64")}`,
    "Content-Type": "application/json-patch+json",
  };

  // Base URL
  const targetURL = `https://dev.azure.com/${orgEncoded}/${projectEncoded}/_apis/wit/workitems/$Environment%20Request?api-version=7.1`;
  const title = "New Environment requested by " + (requestorName || "").trim() + " on " + new Date().toISOString();

  let payload = [
    {
      "op": "add",
      "path": "/fields/System.Title",
      "value": title
    },
    {
      "op": "add",
      "path": "/fields/System.Description",
      "value": descriptionField
    },
    {
      "op": "add",
      "path": "/fields/System.State",
      "value": "To Do"
    },
    {
      "op": "add",
      "path": "/fields/Microsoft.VSTS.Common.Priority",
      "value": "2"
    }
  ];

  // Add custom fields
  payload.push({ "op": "add", "path": "/fields/Custom.RequestorName", "value": requestorName });
  payload.push({ "op": "add", "path": "/fields/Custom.RequestorEmail", "value": requestorEmail });
  payload.push({ "op": "add", "path": "/fields/Custom.OPI", "value": opi });
  payload.push({ "op": "add", "path": "/fields/Custom.Department", "value": department });
  payload.push({ "op": "add", "path": "/fields/Custom.DateofRequest", "value": dateRequest });
  payload.push({ "op": "add", "path": "/fields/Custom.ProjectWorkstream", "value": projectWorkstream });
  payload.push({ "op": "add", "path": "/fields/Custom.DateNeededBy", "value": dateNeededBy });
  payload.push({ "op": "add", "path": "/fields/Custom.ImpactofNotMeetingTargetDeliveryDate", "value": impactTargetDate });
  payload.push({ "op": "add", "path": "/fields/Custom.PrimaryUseCase", "value": primaryUseCase });
  payload.push({ "op": "add", "path": "/fields/Custom.Shareable", "value": shareable });
  if (shareable === false) {
    payload.push({ "op": "add", "path": "/fields/Custom.JustificationforNotBeingShareable", "value": shareableJustification });
  }
  payload.push({ "op": "add", "path": "/fields/Custom.ExpectsPeriodsofInactivity", "value": expectsInactivity });
  if (expectsInactivity === true) {
    payload.push({ "op": "add", "path": "/fields/Custom.TimelineandDurationofInactivity", "value": inactivityTimeline });
  }
  payload.push({ "op": "add", "path": "/fields/Custom.ReturnDate", "value": returnDate });
  payload.push({ "op": "add", "path": "/fields/Custom.WantstoKeepEnvironment", "value": keepEnvironment });
  if (keepEnvironment === true) {
    payload.push({ "op": "add", "path": "/fields/Custom.JustificationforKeepingEnvironment", "value": keepEnvironmentJustification });
  }
  payload.push({ "op": "add", "path": "/fields/Custom.DayforceModulesorFeaturesRequired", "value": dayforceModulesFeatures });
  payload.push({ "op": "add", "path": "/fields/Custom.DataRequirements", "value": dataRequirements });
  payload.push({ "op": "add", "path": "/fields/Custom.ApproximateDataVolume", "value": dataVolume });
  if (intDataPop && intDataPop.trim().length > 0) {
    payload.push({ "op": "add", "path": "/fields/Custom.IntegrationorDataPopulation", "value": intDataPop });
  }
  if (specialConfigs && specialConfigs.trim().length > 0) {
    payload.push({ "op": "add", "path": "/fields/Custom.SpecialConfigurations", "value": specialConfigs });
  }
  payload.push({ "op": "add", "path": "/fields/Custom.UserCount", "value": userCount });
  payload.push({ "op": "add", "path": "/fields/Custom.UserRolesandAccess", "value": userRolesAccess });
  payload.push({ "op": "add", "path": "/fields/Custom.BusinessSponsorInformedConfirmation", "value": sponsorConfirmation });
  if (sponsorConfirmation === true) {
    payload.push({ "op": "add", "path": "/fields/Custom.BusinessSponsorName", "value": sponsorName });
    payload.push({ "op": "add", "path": "/fields/Custom.BusinessSponsorEmail", "value": sponsorEmail });
  }
  if (miscInfo && miscInfo.trim().length > 0) {
    payload.push({ "op": "add", "path": "/fields/Custom.MiscInformation", "value": miscInfo });
  }

  try {
    await addEnvironment(
      title,
      payload,
      targetURL,
      headers,
      context
    );

    context.res = {
      status: 200,
      headers: corsHeaders,
      body: { message: "Environment requirement created successfully!" },
    };
  } catch (err) {
    context.log.error("ADO ERROR:", err.response?.data || err);

    context.res = {
      status: 500,
      headers: corsHeaders,
      body: {
        message: "Error creating Environment requirement",
        details: err.response?.data || err.message
      },
    };
  }
}
