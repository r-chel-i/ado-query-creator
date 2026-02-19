import { useState } from "react";
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

/*
Form fields: 

requestorName: Requestor Name - Text field (single line)
requestorEmail: Requestor Email - Text field (single line)
opi: OPI - Text field (single line)
department: Department - Text field (single line)
dateRequest: Date of Request - Date/Time (automatic)
projectWorkstream: Project Workstream - Text field (single line)
dateNeededBy: Date Needed By - Date/Time
impactTargetDate: Impact of Not Meeting Target Delivery Date - Text field (multi-line)
primaryUseCase: Primary Use Case - Text field (multi-line)
shareable: Shareable - Boolean
shareableJustification: Justification for Not Being Shareable - Text field (multi-line), only if shareable is false
expectsInactivity: Expects Periods of Inactivity - Boolean
inactivityTimeline:Timeline and Duration of Inactivity - Text field (multi-line), only if expectsInactivity is true
returnDate: Return Date - Date/Time
keepEnvironment: Wants to Keep Environment - Boolean
keepEnvironmentJustification: Justification for Keeping Environment - Text field (multi-line), only if keepEnvironment is true
dayforceModulesFeatures: Dayforce Modules or Features Required - Text field (multi-line)
dataRequirements: Data Requirements - Text field (multi-line)
dataVolume: Approximate Data Volume - Text field (single line)
intDataPop: Integration or Data Population - Text field (multi-line)
specialConfigs: Special Configurations - Text field (multi-line)
userCount: User Count - Text field (single line)
userRolesAccess: User Roles and Access - Text field (multi-line)
sponsorConfirmation: Business Sponsor Informed Confirmation - Boolean
sponsorName: Business Sponsor Name - Text field (single line)
sponsorEmail: Business Sponsor Email - Text field (single line)
miscInfo: Misc Information - Text field (multi-line)
*/

export default function EnvironmentRequest() {

  const [requestorName, setRequestorName] = useState("");
  const [requestorEmail, setRequestorEmail] = useState("");
  const [opi, setOPI] = useState("");
  const [department, setDepartment] = useState("");
  const [dateRequest] = useState(new Date().toISOString());
  const [projectWorkstream, setProjectWorkstream] = useState("");
  const [dateNeededBy, setDateNeededBy] = useState("");
  const [impactTargetDate, setImpactTargetDate] = useState("");
  const [primaryUseCase, setPrimaryUseCase] = useState("");
  const [shareable, setShareable] = useState("");
  const [shareableJustification, setShareableJustification] = useState("");
  const [expectsInactivity, setExpectsInactivity] = useState("");
  const [inactivityTimeline, setInactivityTimeline] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [keepEnvironment, setKeepEnvironment] = useState("");
  const [keepEnvironmentJustification, setKeepEnvironmentJustification] = useState("");
  const [dayforceModulesFeatures, setDayforceModulesFeatures] = useState("");
  const [dataRequirements, setDataRequirements] = useState("");
  const [dataVolume, setDataVolume] = useState("");
  const [intDataPop, setIntDataPop] = useState("");
  const [specialConfigs, setSpecialConfigs] = useState("");
  const [userCount, setUserCount] = useState("");
  const [userRolesAccess, setUserRolesAccess] = useState("");
  const [sponsorConfirmation, setSponsorConfirmation] = useState("");
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorEmail, setSponsorEmail] = useState("");
  const [miscInfo, setMiscInfo] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Set error message and loading state
  const setError = (errorMessage) => {
    setMessage(errorMessage);
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      // Validate all required text fields
      const requiredFields = [
        { value: requestorName, name: "Requestor Full Name" },
        { value: requestorEmail, name: "Requestor Email" },
        { value: opi, name: "OPI" },
        { value: department, name: "Department" },
        { value: projectWorkstream, name: "Project Workstream" },
        { value: dateNeededBy, name: "Date Needed By" },
        { value: impactTargetDate, name: "Impact of Not Meeting Target Delivery Date" },
        { value: primaryUseCase, name: "Primary Use Case" },
        { value: dayforceModulesFeatures, name: "Dayforce Modules/Features Required" },
        { value: dataRequirements, name: "Data Requirements" },
        { value: dataVolume, name: "Approximate Data Volume" },
        { value: userCount, name: "User Count" },
        { value: userRolesAccess, name: "User Roles and Access" },
        { value: returnDate, name: "Return Date" },
      ];

      // Check all required text fields
      for (const field of requiredFields) {
        if (!field.value.trim()) {
          setError(`${field.name} field is mandatory. Please define field to continue.`);
          return;
        }
      }

      // Validate boolean fields
      if (!shareable.trim()) {
        setError("'Shareable with Other GC Project Teams?' field is mandatory. Please select Yes or No to continue.");
        return;
      }

      if (shareable === "No" && !shareableJustification.trim()) {
        setError("Justification is mandatory when selecting No to 'Shareable with Other GC Project Teams?'. Please provide justification to continue.");
        return;
      }

      if (!expectsInactivity.trim()) {
        setError("'Do You Expect Any Extended Periods of Inactivity?' field is mandatory. Please select Yes or No to continue.");
        return;
      }

      if (expectsInactivity === "Yes" && !inactivityTimeline.trim()) {
        setError("Providing expected inactivity timelines and the duration of inactivity periods is mandatory when selecting Yes to 'Do You Expect Any Extended Periods of Inactivity?'. Please provide details to continue.");
        return;
      }

      if (!keepEnvironment.trim()) {
        setError("'Do You Wish to Keep the Environment Beyond the Timeline of the Primary Use Case?' field is mandatory. Please select Yes or No to continue.");
        return;
      }

      if (keepEnvironment === "Yes" && !keepEnvironmentJustification.trim()) {
        setError("Justification for keeping the environment is mandatory when selecting Yes to 'Do You Wish to Keep the Environment Beyond the Timeline of the Primary Use Case?'. Please provide justification to continue.");
        return;
      }

      if (!sponsorConfirmation.trim()) {
        setError("'Business Sponsor (DG) Informed Confirmation' field is mandatory. Please select Yes or No to continue.");
        return;
      }

      if (sponsorConfirmation === "Yes") {
        if (!sponsorName.trim()) {
          setError("'Business Sponsor Name' field is mandatory. Please define field to continue.");
          return;
        }
        if (!sponsorEmail.trim()) {
          setError("'Business Sponsor Email' field is mandatory. Please define field to continue.");
          return;
        }
      }

      const response = await fetch(
        "https://adoquerycreator-g9dvaxbwbdf5fcec.eastus-01.azurewebsites.net/environment-creator",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestor: requestorName, 
            requestorEmail, 
            opi, 
            department, 
            projectWorkstream, 
            dateRequest,
            dateNeeded: dateNeededBy, 
            impact: impactTargetDate, 
            primaryUseCase, 
            shareableAnswer: shareable, 
            shareableJustification, 
            expectsInactivity, 
            inactivityTimeline, 
            returnDate,
            keepEnvironment,
            keepEnvironmentJustification,
            dayforceModulesFeatures,
            dataRequirements, 
            approxDataVolume: dataVolume, 
            expectedUserCount: userCount, 
            userRolesAccess, 
            businessSponsor: sponsorConfirmation,
            sponsorName,
            sponsorEmail,
            integrationDataPopulation: intDataPop, 
            specialConfigs, 
            misc: miscInfo,
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
                value={requestorName}
                onChange={(e) => setRequestorName(e.target.value)}
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
                value={dateNeededBy}
                onChange={(e) => setDateNeededBy(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            {/* Impact Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Impact of Not Meeting the Target Delivery Date
              </label>
              <textarea
                value={impactTargetDate}
                onChange={(e) => setImpactTargetDate(e.target.value)}
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
                    checked={shareable === "Yes"}
                    onChange={(e) => setShareable(e.target.value)}
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
                    checked={shareable === "No"}
                    onChange={(e) => setShareable(e.target.value)}
                    className="w-5 h-5 cursor-pointer border border-ado-border accent-ado-primary"
                  />
                  <span className="text-ado-text font-inter text-15 font-bold">
                    No
                  </span>
                </label>
              </div>

              {shareable === "No" && (
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
                Do You Expect Any Extended Periods of Inactivity?
              </label>

              <div className="flex gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="inactivity"
                    value="Yes"
                    checked={expectsInactivity === "Yes"}
                    onChange={(e) => setExpectsInactivity(e.target.value)}
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
                    checked={expectsInactivity === "No"}
                    onChange={(e) => setExpectsInactivity(e.target.value)}
                    className="w-5 h-5 cursor-pointer border border-ado-border accent-ado-primary"
                  />
                  <span className="text-ado-text font-inter text-15 font-bold">
                    No
                  </span>
                </label>
              </div>

              {expectsInactivity === "Yes" && (
                <div className="space-y-2 mt-3">
                  <label className="text-ado-text font-inter text-12 leading-7 tracking-tight opacity-70">
                    Please indicate expected timelines and duration of inactivity periods.
                  </label>
                  <textarea
                    placeholder="e.g., Expected inactivity periods: July-August 2026 (2 months), December 2026 (1 month)..."
                    value={inactivityTimeline}
                    onChange={(e) => setInactivityTimeline(e.target.value)}
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
                Expected date that the primary use case will be completed, allowing the environment to be returned to DF and repurposed. 
              </label>
              <input
                type="text"
                placeholder="e.g. 2026-01-16"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            {/* Keep Environment Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Do You Wish to Keep the Environment Beyond the Timeline of the Primary Use Case?
              </label>

              <div className="flex gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="keepEnvironment"
                    value="Yes"
                    checked={keepEnvironment === "Yes"}
                    onChange={(e) => setKeepEnvironment(e.target.value)}
                    className="w-5 h-5 cursor-pointer border border-ado-border accent-ado-primary"
                  />
                  <span className="text-ado-text font-inter text-15 font-bold">
                    Yes
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="keepEnvironment"
                    value="No"
                    checked={keepEnvironment === "No"}
                    onChange={(e) => setKeepEnvironment(e.target.value)}
                    className="w-5 h-5 cursor-pointer border border-ado-border accent-ado-primary"
                  />
                  <span className="text-ado-text font-inter text-15 font-bold">
                    No
                  </span>
                </label>
              </div>

              {keepEnvironment === "Yes" && (
                <div className="space-y-2 mt-3">
                  <label className="text-ado-text font-inter text-12 leading-7 tracking-tight opacity-70">
                    Please provide justification.
                  </label>
                  <textarea
                    placeholder="i.e., Explain why the environment needs to be kept beyond the target date."
                    value={keepEnvironmentJustification}
                    onChange={(e) => setKeepEnvironmentJustification(e.target.value)}
                    rows={3}
                    className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary resize-vertical"
                  />
                </div>
              )}
            </div>

            {/*	Dayforce Modules/Features required Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Dayforce Modules/Features Required
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
                value={dataVolume}
                onChange={(e) => setDataVolume(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
              />
            </div>

            {/* Integration/Data Input */}
            <div className="space-y-2">
              <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                Integration/Data Population
              </label>
              <textarea
                value={intDataPop}
                onChange={(e) => setIntDataPop(e.target.value)}
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
                value={specialConfigs}
                onChange={(e) => setSpecialConfigs(e.target.value)}
                rows={4}
                className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary resize-vertical"
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
                value={userCount}
                onChange={(e) => setUserCount(e.target.value)}
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
              <br></br>
              <label className="text-ado-text font-inter text-12 leading-7 tracking-tight opacity-70">
                Important in case a CR is required.
              </label>

              <div className="flex gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sponsorConfirmation"
                    value="Yes"
                    checked={sponsorConfirmation === "Yes"}
                    onChange={(e) => setSponsorConfirmation(e.target.value)}
                    className="w-5 h-5 cursor-pointer border border-ado-border accent-ado-primary"
                  />
                  <span className="text-ado-text font-inter text-15 font-bold">
                    Yes
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sponsorConfirmation"
                    value="No"
                    checked={sponsorConfirmation === "No"}
                    onChange={(e) => setSponsorConfirmation(e.target.value)}
                    className="w-5 h-5 cursor-pointer border border-ado-border accent-ado-primary"
                  />
                  <span className="text-ado-text font-inter text-15 font-bold">
                    No
                  </span>
                </label>
              </div>

              {sponsorConfirmation === "Yes" && (
                <div className="space-y-4 mt-3">
                  <div className="space-y-2">
                    <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                      Business Sponsor Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Jane Smith"
                      value={sponsorName}
                      onChange={(e) => setSponsorName(e.target.value)}
                      className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                      Business Sponsor Email
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. jane.smith@email.com"
                      value={sponsorEmail}
                      onChange={(e) => setSponsorEmail(e.target.value)}
                      className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
                    />
                  </div>
                </div>
              )}
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
                value={miscInfo}
                onChange={(e) => setMiscInfo(e.target.value)}
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
