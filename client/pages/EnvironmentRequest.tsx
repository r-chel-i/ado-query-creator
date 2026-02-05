import { useState } from "react";
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function EnvironmentRequest() {

  const [requestorFullName, setRequestorFullName] = useState("");
  const [requestorEmail, setRequestorEmail] = useState("");
  const [opi, setOPI] = useState("");
  const [department, setDepartment] = useState("");
  const [projectWorkstream, setProjectWorkstream] = useState("");
  const [dateNeeded, setDateNeeded] = useState("");
  const [impact, setImpact] = useState("");
  const [primaryUseCase, setPrimaryUseCase] = useState("");
  const [shareable, setShareable] = useState("");
  const [expectsInactivity, setExpectsInactivity] = useState("");
  const [inactivityTimeline, setInactivityTimeline] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [dayforceModulesFeatures, setDayforceModulesFeatures] = useState("");
  const [dataRequirements, setDataRequirements] = useState("");
  const [approxDataVolume, setApproxDataVolume] = useState("");
  const [expectedUserCount, setExpectedUserCount] = useState("");
  const [userRolesAccess, setUserRolesAccess] = useState("");
  const [businessSponsor, setBusinessSponsor] = useState("");
  const [integrationDataPopulation, setIntegrationDataPopulation] = useState("");
  const [specialConfigurations, setSpecialConfigurations] = useState("");
  const [misc, setMisc] = useState("");
  const [shareableAnswer, setShareableAnswer] = useState("");
  const [shareableJustification, setShareableJustification] = useState("");
  const [inactivityAnswer, setInactivityAnswer] = useState("");
  const [inactivityDetails, setInactivityDetails] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {

      if (!requestorFullName.trim()) {
        setMessage("Requestor Full Name field is mandatory. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!requestorEmail.trim()) {
        setMessage("Requestor Email field is mandatory. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!opi.trim()) {
        setMessage("OPI field is mandatory. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!department.trim()) {
        setMessage("Department field is mandatory. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!projectWorkstream.trim()) {
        setMessage("Project Workstream field is mandatory. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!dateNeeded.trim()) {
        setMessage("Date Needed By field is mandatory. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!impact.trim()) {
        setMessage("Impact field is mandatory. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!primaryUseCase.trim()) {
        setMessage("Primary Use Case field is mandatory. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!shareableAnswer.trim()) {
        setMessage("Shareable answer field is mandatory. Please select Yes or No to continue.");
        setLoading(false);
        return;
      }

      if (shareableAnswer === "No" && !shareableJustification.trim()) {
        setMessage("Justification is mandatory when selecting No. Please provide a justification to continue.");
        setLoading(false);
        return;
      }

      if (!inactivityAnswer.trim()) {
        setMessage("Inactivity answer field is mandatory. Please select Yes or No to continue.");
        setLoading(false);
        return;
      }

      if (inactivityAnswer === "Yes" && !inactivityDetails.trim()) {
        setMessage("Inactivity details are mandatory when selecting Yes. Please provide timelines and duration to continue.");
        setLoading(false);
        return;
      }

      if (!returnDate.trim()) {
        setMessage("Return Date field is mandatory. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!dayforceModulesFeatures.trim()) {
        setMessage("Dayforce Modules and Features field is mandatory. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!dataRequirements.trim()) {
        setMessage("Data Requirements field is mandatory. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!approxDataVolume.trim()) {
        setMessage("Approximate Data Volume field is mandatory. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!expectedUserCount.trim()) {
        setMessage("Expected User Count field is mandatory. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!userRolesAccess.trim()) {
        setMessage("User Roles and Access field is mandatory. Please define field to continue.");
        setLoading(false);
        return;
      }

      if (!businessSponsor.trim()) {
        setMessage("Business Sponsor field is mandatory. Please define field to continue.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://adoquerycreator-g9dvaxbwbdf5fcec.eastus-01.azurewebsites.net/environment-creator",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestor: requestorFullName, requestorEmail, opi, department, projectWorkstream, dateNeeded, impact, primaryUseCase, shareableAnswer, shareableJustification, inactivityAnswer, inactivityDetails, returnDate, dayforceModulesFeatures,
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
    <div className="min-h-screen bg-ado-bg">
      <Header />
      <main className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-left">
          <h1 className="text-ado-text font-inter text-4xl font-bold mb-8 text-center">
            Environment Request
          </h1>

          <p className="text-ado-text font-inter text-xl mb-4 leading-8 tracking-tight opacity-70">
            Please fill in all mandatory fields to request an environment to be created.
          </p>

          <div className="space-y-6">

            {/* Requestor Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Requestor Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                value={requestorFullName}
                onChange={(e) => setRequestorFullName(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Requestor Email
              </label>
              <input
                type="text"
                placeholder="e.g. john.doe@email.com"
                value={requestorEmail}
                onChange={(e) => setRequestorEmail(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            {/* OPI Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                OPI
              </label>
              <br></br>
              <label className="text-ado-text font-inter text-12 leading-7 tracking-tight opacity-70">
                Contact name of the team primarily using the environment.
              </label>
              <input
                type="text"
                value={opi}
                onChange={(e) => setOPI(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            {/* Department Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Department or Team
              </label>
              <input
                type="text"
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
                Impact of Not Meeting the Target Delivery Date
              </label>
              <textarea
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
                rows={4}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary resize-vertical"
              />
            </div>

            {/* Primary Use Case Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Primary Use Case
              </label>
              <textarea
                value={primaryUseCase}
                onChange={(e) => setPrimaryUseCase(e.target.value)}
                rows={4}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary resize-vertical"
              />
            </div>

            {/* Shareable Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Shareable with Other GC Project Teams? 
              </label>

              <div className="flex gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="shareable"
                    value="Yes"
                    checked={shareableAnswer === "Yes"}
                    onChange={(e) => setShareableAnswer(e.target.value)}
                    className="w-5 h-5 cursor-pointer border border-ado-border accent-ado-primary"
                  />
                  <span className="text-ado-text font-inter text-15 font-bold">
                    Yes
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="shareable"
                    value="No"
                    checked={shareableAnswer === "No"}
                    onChange={(e) => setShareableAnswer(e.target.value)}
                    className="w-5 h-5 cursor-pointer border border-ado-border accent-ado-primary"
                  />
                  <span className="text-ado-text font-inter text-15 font-bold">
                    No
                  </span>
                </label>
              </div>

              {shareableAnswer === "No" && (
                <div className="space-y-2 mt-3">
                  <label className="text-ado-text font-inter text-12 leading-7 tracking-tight opacity-70">
                    Please provide justification.
                  </label>
                  <textarea
                    placeholder="i.e., Explain why this environment cannot be shared."
                    value={shareableJustification}
                    onChange={(e) => setShareableJustification(e.target.value)}
                    rows={3}
                    className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary resize-vertical"
                  />
                </div>
              )}
            </div>

            {/* Inactivity Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Do you expect extended periods of inactivity?
              </label>

              <div className="flex gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="inactivity"
                    value="Yes"
                    checked={inactivityAnswer === "Yes"}
                    onChange={(e) => setInactivityAnswer(e.target.value)}
                    className="w-5 h-5 cursor-pointer border border-ado-border accent-ado-primary"
                  />
                  <span className="text-ado-text font-inter text-15 font-bold">
                    Yes
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="inactivity"
                    value="No"
                    checked={inactivityAnswer === "No"}
                    onChange={(e) => setInactivityAnswer(e.target.value)}
                    className="w-5 h-5 cursor-pointer border border-ado-border accent-ado-primary"
                  />
                  <span className="text-ado-text font-inter text-15 font-bold">
                    No
                  </span>
                </label>
              </div>

              {inactivityAnswer === "Yes" && (
                <div className="space-y-2 mt-3">
                  <label className="text-ado-text font-inter text-12 leading-7 tracking-tight opacity-70">
                    Please indicate expected timelines and duration of inactivity periods.
                  </label>
                  <textarea
                    placeholder="e.g., Expected inactivity periods: July-August 2026 (2 months), December 2026 (1 month)..."
                    value={inactivityDetails}
                    onChange={(e) => setInactivityDetails(e.target.value)}
                    rows={3}
                    className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary resize-vertical"
                  />
                </div>
              )}
            </div>

            {/* Return Date Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Return Date
              </label>
              <br></br>
              <label className="text-ado-text font-inter text-12 leading-7 tracking-tight opacity-70">
                Expected date that the primary use case will be completed, allowing the environment to be returned to DF and repurposed. If the intent is to keep the environment beyond the timeline of the primary use case, please provide justification.
              </label>
              <input
                type="text"
                placeholder="e.g. 2026-01-16"
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
              <textarea
                value={dayforceModulesFeatures}
                onChange={(e) => setDayforceModulesFeatures(e.target.value)}
                rows={4}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary resize-vertical"
              />
            </div>

            {/* Data Requirements Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Data Requirements
              </label>
              <textarea
                value={dataRequirements}
                onChange={(e) => setDataRequirements(e.target.value)}
                rows={4}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary resize-vertical"
              />
            </div>


            {/* Approx Data Volume Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Approximate Data Volume
              </label>
              <input
                type="text"
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
              <textarea
                value={userRolesAccess}
                placeholder="e.g. John Doe: john.doe@email.com, Role: Administrator"
                onChange={(e) => setUserRolesAccess(e.target.value)}
                rows={4}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary resize-vertical"
              />
            </div>

            {/* Business Sponsor Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Business Sponsor (DG) Informed Confirmation
              </label>
              <label className="text-ado-text font-inter text-12 font-bold leading-7 tracking-tight">
                Important in case a CR is required.
              </label>
              <input
                type="text"
                value={businessSponsor}
                onChange={(e) => setBusinessSponsor(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>
            {/* Integration/Data Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Integration/Data Population
              </label>
              <textarea
                value={integrationDataPopulation}
                onChange={(e) => setIntegrationDataPopulation(e.target.value)}
                rows={4}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary resize-vertical"
              />
            </div>

            {/* Any Special Configurations Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Any Special Configurations
              </label>
              <textarea
                value={specialConfigurations}
                onChange={(e) => setSpecialConfigurations(e.target.value)}
                rows={4}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary resize-vertical"
              />
            </div>

              {/* Misc Input */}
              <div className="space-y-2">
                <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                  Misc Information
                </label>
                <br></br>
                <label className="text-ado-text font-inter text-12 leading-7 tracking-tight opacity-70">
                  Any miscellaneous information that you believe to be relevant.
                </label>
                <textarea
                value={misc}
                onChange={(e) => setMisc(e.target.value)}
                rows={4}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary resize-vertical"
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
    </main>
      <Footer />
    </div>
    );
  }
