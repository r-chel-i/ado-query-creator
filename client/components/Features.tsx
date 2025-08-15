export function Features() {
  const features = [
    {
      icon: (
        <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.6667 7.5C21.7292 7.5 25.8333 11.6041 25.8333 16.6667M27.0411 27.034L35 35M31.3333 16.6667C31.3333 24.7669 24.7669 31.3333 16.6667 31.3333C8.56649 31.3333 2 24.7669 2 16.6667C2 8.56649 8.56649 2 16.6667 2C24.7669 2 31.3333 8.56649 31.3333 16.6667Z" stroke="#979797" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Query Creator",
      description: "Instantly add properly-formatted queries to multiple projects at once. Designed by Rachel."
    },
    {
      icon: (
        <svg width="43" height="43" viewBox="0 0 40 43" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M35.8258 12.4511C34.6791 8.56316 31.4362 5.32024 27.5483 4.17358C24.592 3.31358 22.5495 3.38524 21.1341 4.44233C19.432 5.71441 19.2349 8.00774 19.2349 9.63816V14.0994C19.2349 18.5069 21.2416 20.7465 25.1833 20.7465H30.3253C31.9378 20.7465 34.2491 20.5494 35.5212 18.8473C36.6141 17.4498 36.7037 15.4073 35.8258 12.4511Z" fill="#979797"/>
          <path d="M30.8794 23.9386C30.4135 23.4011 29.7327 23.0965 29.0339 23.0965H22.6198C19.4664 23.0965 16.9044 20.5344 16.9044 17.3811V10.967C16.9044 10.2682 16.5998 9.58739 16.0623 9.12156C15.5427 8.65573 14.826 8.44073 14.1452 8.53031C9.9348 9.06781 6.0648 11.3791 3.53855 14.8549C0.99438 18.3486 0.0627134 22.6128 0.868963 26.8769C2.03355 33.0403 6.96063 37.9673 13.1419 39.1319C14.1273 39.329 15.1127 39.4186 16.0981 39.4186C19.341 39.4186 22.4764 38.4153 25.146 36.4623C28.6219 33.9361 30.9331 30.0661 31.4706 25.8557C31.5602 25.1569 31.3452 24.4582 30.8794 23.9386Z" fill="#0078D6"/>
        </svg>
      ),
      title: "Work Item Heatmap",
      description: "Visualize project activity and work item assignments at a glance. Designed by Nehan."
    },
    {
      icon: (
        <svg width="44" height="38" viewBox="0 0 44 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M9.99999 29.828L0.585994 20.414C-0.195006 19.633 -0.195006 18.367 0.585994 17.586L9.99999 8.172L12.829 11L4.82899 19L12.829 27L9.99999 29.828Z" fill="#0078D6"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M34 29.828L31.171 27L39.171 19L31.171 11L34 8.172L43.414 17.586C44.195 18.367 44.195 19.633 43.414 20.414L34 29.828Z" fill="#0078D6"/>
          <rect x="15.5719" y="36.4553" width="36.985" height="3.99999" transform="rotate(-75.954 15.5719 36.4553)" fill="#979797"/>
        </svg>
      ),
      title: "More to Come",
      description: "Stay tuned for new tools and features designed to make your workflow smarter and faster."
    }
  ];

  return (
    <section className="px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-left">
              {/* Icon */}
              <div className="mb-6">
                {feature.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-ado-text font-inter text-21 font-bold leading-8 tracking-tight mb-4">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-ado-text font-montserrat text-17 leading-7 tracking-tight opacity-70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
