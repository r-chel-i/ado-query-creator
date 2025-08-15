export function DashboardImage() {
  return (
    <section className="px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="relative flex justify-center">
          {/* Dashboard image with direct styling */}
          <img
            src="https://unito.io/wp-content/uploads/2024/05/Azure-Board.png"
            alt="Azure DevOps Dashboard Interface"
            className="block max-w-full h-auto rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
