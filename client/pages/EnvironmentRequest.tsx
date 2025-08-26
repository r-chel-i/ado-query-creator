import { useState } from "react";

export function EnvironmentRequest() {

  const [requestor, setRequestor] = useState("");
  const [opi, setOPI] = useState("");
  const [department, setDepartment] = useState("");
  const [projectWorkstream, setProjectWorkstream] = useState("");
  const [dateNeeded, setDateNeeded] = useState("");
  const [impact, setImpact] = useState("");
  const [primaryUseCase, setPrimaryUseCase] = useState("");
  const [sharable, setShareable] = useState("");
  const [inactivity, setInactivity] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [dayforceModulesFeatures, setDayforceModulesFeatures] = useState("");
  const [dataRequirements, setDataRequirements] = useState("");
  const [approxDataVolume, setApproxDataVolume] = useState("");
  const [expectedUserCount, setExpectedUserCount] = useState("");
  const [userRolesAccess, setUserRolesAccess] = useState("");
  const [businessSponsor, setBusinessSponsor] = useState("");
  const [integrationDataPopulation, setIntegrationDataPopulation] = useState("");
  const [specialConfigurations, settSpecialConfigurations] = useState("");
  const [misc, setMisc] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {

      if (!requestor.trim()) {
        setMessage("Requestor field is mandatory requirement. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!opi.trim()) {
        setMessage("OPI field is mandatory requirement. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!department.trim()) {
        setMessage("Departement field is mandatory requirement. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!projectWorkstream.trim()) {
        setMessage("Project Workstream field is mandatory requirement. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!dateNeeded.trim()) {
        setMessage("The date needed by field is mandatory requirement. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!impact.trim()) {
        setMessage("The Impact field is mandatory requirement. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!primaryUseCase.trim()) {
        setMessage("Primary Use Case field is mandatory requirement. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!sharable.trim()) {
        setMessage("sThe sharable field is mandatory requirement. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!inactivity.trim()) {
        setMessage("Inactivity field is mandatory requirement. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!returnDate.trim()) {
        setMessage("The return date field is mandatory requirement. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!dayforceModulesFeatures.trim()) {
        setMessage("The Dayforce Modules and Features field is mandatory requirement. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!dataRequirements.trim()) {
        setMessage("The data requirements field is mandatory requirement. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!approxDataVolume.trim()) {
        setMessage("The approx data volume field is mandatory requirement. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!expectedUserCount.trim()) {
        setMessage("Expected User Count field is mandatory requirement. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!userRolesAccess.trim()) {
        setMessage("The user role and access list field is mandatory requirement. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!businessSponsor.trim()) {
        setMessage("The business sponsor field is mandatory requirement. Please define field to continue.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://adoquerycreator-g9dvaxbwbdf5fcec.eastus-01.azurewebsites.net/environment-creator",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestor, opi, department, projectWorkstream, dateNeeded, impact, primaryUseCase, sharable, inactivity, returnDate, dayforceModulesFeatures,
            dataRequirements, approxDataVolume, expectedUserCount, userRolesAccess, businessSponsor, integrationDataPopulation, specialConfigurations, misc,
          }),
        }
      );

      const data = await response.json();
      setMessage(data.body?.message || "Environment requested!");
    } catch (err) {
      setMessage("Error: " + (err instanceof Error ? err.message : String(err)));
    }

    setLoading(false);
  };

  return (
    <section id="environment-creator" className="bg-ado-section-bg px-4 h-[1000px] flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="space-y-8">
          <h2 className="text-ado-text font-inter text-4xl font-bold leading-12 tracking-tight">
            Environement Request
          </h2>

          <p className="text-ado-text font-montserrat text-xl leading-8 tracking-tight opacity-70">
            Please fill in all mandatory fields to request an environment to be created.
          </p>

          <div className="space-y-6">
            {/* Requestor Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Requestor
              </label>
              <input
                type="text"
                placeholder="e.g. Name and email"
                value={requestor}
                onChange={(e) => setRequestor(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            {/* OPI Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                OPI
              </label>
              <input
                type="text"
                placeholder="e.g. Contact name of the team primarily using the environment"
                value={opi}
                onChange={(e) => setOPI(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            {/* Department Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Department
              </label>
              <input
                type="text"
                placeholder="e.g. Department or team"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            {/* Project Workstream Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Project Workstream
              </label>
              <input
                type="text"
                placeholder=""
                value={projectWorkstream}
                onChange={(e) => setProjectWorkstream(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            {/* Date Needed Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Date Needed By
              </label>
              <input
                type="text"
                placeholder="e.g. 2026-01-16"
                value={dateNeeded}
                onChange={(e) => setDateNeeded(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            {/* Impact Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Impact
              </label>
              <input
                type="text"
                placeholder="e.g. Impact of not meeting the target delivery date"
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            {/* Primary Use Case Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Primary Use Case
              </label>
              <input
                type="text"
                placeholder="e.g. Primary use case"
                value={primaryUseCase}
                onChange={(e) => setPrimaryUseCase(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            {/* Shareable Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Shareable
              </label>
              <input
                type="text"
                placeholder="e.g. Shareable with other GC project teams? If no, please provide justification."
                value={sharable}
                onChange={(e) => setShareable(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            {/* Inactivity Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Inactivity
              </label>
              <input
                type="text"
                placeholder="e.g. Do you expect extended periods of inactivity? If yes, please indicate expected timelines and duration of inactivity periods"
                value={inactivity}
                onChange={(e) => setInactivity(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            {/* Return Date Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Return Date
              </label>
              <input
                type="text"
                placeholder="e.g. Return Date (expected date that the primary use case will be completed allowing the environment to be returned to DF and repurposed. If the intent is to keep the environment beyond the timeline of the primary use case, please provide justification.)"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            {/*	Dayforce Modules/Features required Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Dayforce Modules/Features required
              </label>
              <input
                type="text"
                placeholder="e.g.	Dayforce Modules/Features required"
                value={dayforceModulesFeatures}
                onChange={(e) => setDayforceModulesFeatures(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            {/* Data Requirements Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Data Requirements
              </label>
              <input
                type="text"
                placeholder="e.g. Data requirements"
                value={dataRequirements}
                onChange={(e) => setDataRequirements(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>


            {/* Approx Data Volume Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Approx Data Volume
              </label>
              <input
                type="text"
                placeholder="e.g. Approx data volumn"
                value={approxDataVolume}
                onChange={(e) => setApproxDataVolume(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            {/* Expected User Count Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Expected User Count
              </label>
              <input
                type="text"
                placeholder="e.g. # of users"
                value={expectedUserCount}
                onChange={(e) => setExpectedUserCount(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            {/* User Roles and Access  Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                User Roles and Access
              </label>
              <input
                type="text"
                placeholder="e.g. Provide list of users and required roles"
                value={userRolesAccess}
                onChange={(e) => setUserRolesAccess(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            {/* Business Sponsor Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Business Sponsor
              </label>
              <input
                type="text"
                placeholder="e.g.	Business Sponsor (DG) Informed confirmation (important in case a CR is required)"
                value={businessSponsor}
                onChange={(e) => setBusinessSponsor(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>
            {/* Integration/Data Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Integration/Data
              </label>
              <input
                type="text"
                placeholder="e.g. Integration/Data Population "
                value={integrationDataPopulation}
                onChange={(e) => setIntegrationDataPopulation(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            {/* Any Special Configurations Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Any Special Configurations
              </label>
              <input
                type="text"
                placeholder="e.g. Any Special Configurations (if needed)"
                value={specialConfigurations}
                onChange={(e) => settSpecialConfigurations(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />

              {/* Misc Input */}
              <div className="space-y-2">
                <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                  Misc
                </label>
                <input
                  type="text"
                  placeholder="e.g.	Any miscellaneous information that the submitter believes to be relevant."
                  value={misc}
                  onChange={(e) => setMisc(e.target.value)}
                  className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
                />
              </div>

              {/*Request Environment Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-ado-primary text-white font-inter text-17 font-bold leading-8 tracking-tight px-6 py-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-3 disabled:opacity-50"
              >
                {loading ? "Requesting Environment..." : "Request Environment"}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.93335 2L14 7.63333L7.93335 13.2667"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                    strokeLinejoin="bevel"
                  />
                  <path
                    d="M1 7.4012H13.1333"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                    strokeLinejoin="bevel"
                  />
                </svg>
              </button>

              {message && (
                <p className="text-ado-text font-montserrat text-15 mt-2">{message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
