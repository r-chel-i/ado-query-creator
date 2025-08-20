import { useState } from "react";

export function QueryCreator() {

  const [projects, setProjects] = useState("");
  const [customQuery, setCustomQuery] = useState("");
  const [toSubfolder, setToSubfolder] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try{
      let customQueryObj: { name: string; wiql: string; isFolder?: boolean } | undefined = undefined;
      if (customQuery.trim()){
        try{
          customQueryObj = JSON.parse(customQuery) as {
            name: string;
            wiql: string;
            isFolder?: boolean;
          };
        } catch(e){
          setMessage("Invalid Custom Query JSON. Check your syntax.");
          setLoading(false);
          return;
        }
      }

      const response = await fetch(
        "https://adoquerycreator-g9dvaxbwbdf5fcec.eastus-01.azurewebsites.net/query-creator",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projects, customQuery: customQueryObj, toSubfolder}),
        }
      );

      const data = await response.json();
      setMessage(data.body?.message || "Query created!");
    } catch(err){
      setMessage("Error: " + (err instanceof Error ? err.message : String(err)));
    }

    setLoading(false);
  };

  return (
    <section id="query-creator" className="bg-ado-section-bg px-4 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h2 className="text-ado-text font-inter text-4xl font-bold leading-12 tracking-tight">
              Query Creator
            </h2>

            <p className="text-ado-text font-montserrat text-xl leading-8 tracking-tight opacity-70">
              Type the project name(s) you wish to add queries to, separated by commas. Optionally, enter a WIQL input to add a custom query. Then click Create Query.
            </p>

            <div className="space-y-6">
              {/* Project Names Input */}
              <div className="space-y-2">
                <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                  Project Name(s)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Example Project 1, Example Project 2"
                  value={projects}
                  onChange={(e) => setProjects(e.target.value)}
                  className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
                />
              </div>

              {/* Custom Query Input */}
              <div className="space-y-2">
                <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                  Custom Query
                </label>
                <textarea
                  placeholder="Optional"
                  rows={7}
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary resize-none"
                />
              </div>

              {/* Place in Subfolder Checkbox */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="toSubfolder"
                  checked={toSubfolder}
                  onChange={(e) => setToSubfolder(e.target.checked)}
                  className="w-5 h-5 text-ado-primary bg-white border border-ado-border rounded focus:ring-2 focus:ring-ado-primary focus:ring-offset-0 cursor-pointer"
                />
                <label
                  htmlFor="toSubfolder"
                  className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight cursor-pointer"
                >
                  Place in Subfolder
                </label>
              </div>

              {/* Create Query Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-ado-primary text-white font-inter text-17 font-bold leading-8 tracking-tight px-6 py-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-3 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Query"}
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

          {/* Right Image */}
          <div className="relative">
            <div className="relative w-full h-[521px]">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/91d92a80b9aefc75a4d802eacd0463086369e606?width=1200&format=webp&quality=90"
                alt=""
                className="absolute top-0 left-6 w-[486px] h-[311px] opacity-30"
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/6c12267dd9403303bceb64d843fd489cb4c20ba0?width=800&format=webp&quality=90"
                alt=""
                className="absolute top-[224px] left-0 w-[299px] h-[297px] opacity-65"
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/08eb7f647189d75f5f738d55060284b727e6a0e1?width=600&format=webp&quality=90"
                alt=""
                className="absolute top-[245px] left-[291px] w-[226px] h-[229px] opacity-65"
              />
              <div className="absolute top-[85px] left-[125px] w-[288px] h-[325px] bg-white rounded-lg shadow-2xl">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/aa62bfcb663aab61a96958ae28af33a0661b454a?width=800&format=webp&quality=90"
                  alt="Query Creator Preview"
                  className="w-[299px] h-[201px] absolute top-[61px] left-[-5px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
