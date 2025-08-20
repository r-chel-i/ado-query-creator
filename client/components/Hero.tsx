import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="px-4 pt-16 pb-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-ado-text font-inter text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-8">
          Tools that work as hard<br />as you do.
        </h1>
        
        {/* Subtitle */}
        <p className="text-ado-text font-montserrat text-xl leading-8 tracking-tight opacity-70 mb-8 max-w-2xl mx-auto">
          Automate your tasks and turn data into clear, visual reports. Integrated directly with Azure DevOps.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#query-creator">
            <button className="bg-ado-primary text-white font-inter text-17 font-bold leading-8 tracking-tight px-6 py-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-3">
              Get Started
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.93335 2L14 7.63333L7.93335 13.2667" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="bevel"/>
                <path d="M1 7.40111H13.1333" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="bevel"/>
              </svg>
            </button>
          </a>
          <Link to="/documentation">
            <button className="text-ado-text font-inter text-17 font-bold leading-8 tracking-tight px-6 py-4 rounded-lg hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
