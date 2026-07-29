<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/RQ-PSPC/pspc-co-op-projects">
    <img src="https://dragonboat.io/wp-content/uploads/2021/12/azure-devops-color-icon.png" alt="Logo" width="80" height="80">
  </a>

<h1 align="center">🖥️ PSPC CO-OP Projects </h1>
  <p align="center">
      A lightweight website hosting various tools made by students during their CO-OP terms at Public Services and Procurement Canada (PSPC). <br>
      Integrated with an Azure Functions API to securely store Personal Access Token and Organization information. <br>
      <br />
    </p>
</div>

![Website Screenshot](Website%20SS.png)

# Azure DevOps & Functions Setup

1. In Azure DevOps, click **User Settings -> Personal Access Tokens -> New Token**.

   - Enter a name for the Personal Access Token (PAT) and select the organization it will have access to.  
   - Ensure that the PAT has (at least) Read & write permissions for Work Items.  
   - Click create and copy the PAT.  

2. In Azure Functions, navigate to **pspc-co-op-projects -> Environment Variables**.

   - Click add and enter `ADO_PAT` as the `name`. Paste your PAT from ADO in the `value` field.  
   - Click add and enter `ADO_ORG` as the `name`. Enter the name of your ADO organization as the `value`.  

# Query Creator Usage
The Query Creator helps you quickly create, clean, and standardize WIQL queries across selected ADO projects.
It ensures consistent columns, sorting, and structure for both flat and tree queries.

### **1️⃣ Project Name(s)**  
Specify the name(s) of the ADO project(s) where queries will be created. Separate multiple entries with commas.

### **2️⃣ Custom Query & WIQL (Optional)** 
Add a custom query by providing its name and WIQL. 
The WIQL must be of the form (SELECT... FROM... WHERE...).

The backend automatically sets the columns and sorting for the custom query.

The **SELECT** clause is replaced by:

    SELECT
      [System.Id],
      [System.WorkItemType],
      [System.Title],
      [System.AssignedTo],
      [System.State],
      [Custom.PriorityLevel],
      [Microsoft.VSTS.Scheduling.TargetDate]
    
The ORDER BY clause is added/replaced by:

  a) For flat queries:
      
    ORDER BY [Custom.PriorityLevel],
      [Microsoft.VSTS.Scheduling.TargetDate],
      [System.Title]
          
  b) For tree queries:
  
    ORDER BY [Custom.PriorityLevel],
              [Microsoft.VSTS.Scheduling.TargetDate],
              [System.Title]
    MODE (Recursive)

### **3️⃣ Starter Queries (Checkbox)** 
When enabled, the following set of starter queries is created:
1. All Work Items
2. Priority Work Items
3. My Work Items (placed in subfolder)
4. My Priority Work Items (placed in subfolder)

### **4️⃣ Place in Subfolder (Checkbox)** 
If checked, the custom query will be added to the subfolder (created with Starter Queries). 
Otherwise, the custom query will be added to the Shared Queries folder.

### **5️⃣ Flat Query (Checkbox)** 
Enable if the WIQL you provided is flat.
Otherwise, the backend will interpret your WIQL as a tree query.