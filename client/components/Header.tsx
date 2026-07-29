import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="w-full px-4 sm:px-11 py-6">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <h1 className="text-ado-text font-inter text-xl sm:text-2xl font-bold tracking-tight hover:text-ado-primary transition-colors">
              PSPC CO-OP Projects
            </h1>
          </Link>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center space-x-12">
          <Link
            to="/environment-request"
            className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight hover:text-ado-primary transition-colors"
          >
            Environment Request
          </Link>
          <Link
            to="/query-creator"
            className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight hover:text-ado-primary transition-colors"
          >
            Query Creator
          </Link>

          <Link
            to="/rachel"
            className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight hover:text-ado-primary transition-colors"
          >

            Rachel's Project
          </Link>
          <Link
            to="/anastasia"
            className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight hover:text-ado-primary transition-colors"
          >
            Anastasia's Project
          </Link>
          <Link
            to="/umair"
            className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight hover:text-ado-primary transition-colors"
          >
            Umair's Project
          </Link>
        </nav>

        {/* GitHub Button */}
        <div className="flex-shrink-0">
          <a
            href="https://github.com/RQ-PSPC/pspc-co-op-projects"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ado-primary text-white font-inter text-sm sm:text-17 font-bold leading-normal tracking-tight px-3 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition-colors inline-block"
          >
            <span className="hidden sm:inline">GitHub</span>
            <span className="sm:hidden">GH</span>
          </a>
        </div>
      </div>
    </header>
  );
}
