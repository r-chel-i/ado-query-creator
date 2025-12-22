export function DashboardImage() {
  return (
    <section className="px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative flex justify-center">
          {/* Dashboard image with direct styling */}
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/0*im6JLx7QMRVleoRb.png"
            alt="Azure DevOps Dashboard Interface"
            className="block max-w-full h-auto rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
