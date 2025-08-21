import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Documentation() {
  return (
    <div className="min-h-screen bg-ado-bg">
      <Header />
      <main className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-left">
          <h1 className="text-ado-text font-inter text-4xl font-bold mb-12 text-center">
            🔍 ADO Query Creator
          </h1>

          {/* Azure DevOps Setup */}
          <section className="mb-12">
            <h1 className="text-ado-text font-inter text-3xl font-bold mb-4">
              ⚙️ Azure DevOps & Functions Setup
            </h1>
            <ol className="list-decimal list-inside space-y-2 text-ado-text font-montserrat">
              <li>
                In Azure DevOps, click <strong>User Settings → Personal Access Tokens → New Token</strong>.
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li>
                    <strong>Name:</strong> Enter a descriptive name for the Personal Access Token (PAT).
                  </li>
                  <li>
                    <strong>Organization:</strong> Select the organization the token should access.
                  </li>
                  <li>
                    <strong>Permissions:</strong> Ensure it has (at least) Read & Write permissions for Work Items.
                  </li>
                  <li>
                    Click create and copy the PAT.
                  </li>
                </ul>
              </li>
              <li>
                In Azure Functions, navigate to <strong>adoquerycreator → Environment Variables</strong> Create the following variables:.
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li>
                    <strong>ADO_PAT:</strong> Paste your PAT from ADO as the value.
                  </li>
                  <li>
                    <strong>ADO_ORG:</strong> Enter the name of your ADO organization.
                  </li>
                </ul>
              </li>
            </ol>
          </section>

          {/* Query Creator Inputs */}
          <section className="mb-12">
            <h1 className="text-ado-text font-inter text-3xl font-bold mb-4">
              📥 Query Creator Inputs
            </h1>

            {/* Project Names */}
            <div className="mb-6">
              <h3 className="text-ado-text font-inter text-xl font-bold mb-2">
                1. Project Name(s)
              </h3>
              <p className="text-ado-text font-montserrat leading-7">
                Enter the name(s) of the Azure DevOps project(s) where you want the queries to be created. For multiple projects, separate the names by commas.
              </p>
            </div>

            {/* Custom Query */}
            <div className="mb-6">
              <h3 className="text-ado-text font-inter text-xl font-bold mb-2">
               2. Custom Query & WIQL (Optional)
              </h3>
              <p className="text-ado-text font-montserrat leading-7 mb-2">
                You may provide a custom query by entering its name and WIQL. 
              </p>
              <p className="text-ado-text font-montserrat leading-7 mb-2">
                The WIQL must be of the form <code>SELECT ... FROM ... WHERE ...</code>.
              </p>
              <p className="text-ado-text font-montserrat leading-7">
                The backend will automatically:
              </p>
              <p className="text-ado-text font-montserrat leading-7 ml-6 mt-2">
              1. Replace your SELECT clause with a standardized column list:
              </p>
              <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto text-sm">
                {`SELECT
                  [System.Id],
                  [System.WorkItemType],
                  [System.Title],
                  [System.AssignedTo],
                  [System.State],
                  [Custom.PriorityLevel],
                  [Microsoft.VSTS.Scheduling.TargetDate]`}
              </pre>
              <p className="text-ado-text font-montserrat leading-7 ml-6 mt-2">
              2. Replace the ORDER BY clause depending on query type:
              </p>
              <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto text-sm">
                {`FLAT QUERY
                ORDER BY [Custom.PriorityLevel],
                        [Microsoft.VSTS.Scheduling.TargetDate],
                        [System.Title]
                `}
              </pre>
              <br></br>
              <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto text-sm">
                {`TREE QUERY
                ORDER BY [Custom.PriorityLevel],
                        [Microsoft.VSTS.Scheduling.TargetDate],
                        [System.Title]
                MODE (Recursive)`}
              </pre>
            </div>

            {/* Starter Queries */}
            <div className="mb-6">
              <h3 className="text-ado-text font-inter text-xl font-bold mb-2">
               3. Starter Queries (Checkbox)
              </h3>
              <p className="text-ado-text font-montserrat leading-7">
                When enabled, the subfolder (default name: "My Work Items") is created. 
              </p>
              <p className="text-ado-text font-montserrat leading-7">
                Additionally, the following starter queries are added:
              </p>
              <ul className="list-disc list-inside ml-6 mt-2 text-ado-text font-montserrat">
                <li>All Work Items</li>
                <li>Priority Work Items</li>
                <li>My Work Items (in subfolder)</li>
                <li>My Priority Work Items (in subfolder)</li>
              </ul>
            </div>

            {/* Subfolder */}
            <div className="mb-6">
              <h3 className="text-ado-text font-inter text-xl font-bold mb-2">
                4. Place in Subfolder (Checkbox)
              </h3>
              <p className="text-ado-text font-montserrat leading-7">
                If checked, your custom query will be added to the subfolder (created via Starter Queries). 
              </p>
              <p className="text-ado-text font-montserrat leading-7">
                Otherwise, it goes into the Shared Queries folder.
              </p>
            </div>

            {/* Flat Query */}
            <div className="mb-6">
              <h3 className="text-ado-text font-inter text-xl font-bold mb-2">
                5. Flat Query (Checkbox)
              </h3>
              <p className="text-ado-text font-montserrat leading-7">
                Check this box if your custom WIQL is a flat query. Otherwise, the backend will treat the WIQL as a tree query.
              </p>
              <p className="text-ado-text font-montserrat leading-7">
                Tree queries are used for hierarchical work item relationships and require specific ORDER BY clauses to function correctly.
              </p>
            </div>
          </section>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link
              to="/"
              className="bg-ado-primary text-white font-inter text-17 font-bold px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors inline-block"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
