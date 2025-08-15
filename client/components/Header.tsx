import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="w-full px-4 sm:px-11 py-6">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-ado-text font-inter text-xl sm:text-2xl font-bold tracking-tight">
            ADO Tool Suite
          </h1>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center space-x-12">
          <Link
            to="/documentation"
            className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight hover:text-ado-primary transition-colors"
          >
            Documentation
          </Link>
          <Link
            to="/github"
            className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight hover:text-ado-primary transition-colors"
          >
            GitHub
          </Link>
          <Link
            to="/contact"
            className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight hover:text-ado-primary transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Azure DevOps Button */}
        <div className="flex-shrink-0">
          <button className="bg-ado-primary text-white font-inter text-sm sm:text-17 font-bold leading-normal tracking-tight px-3 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition-colors">
            <span className="hidden sm:inline">Azure DevOps</span>
            <span className="sm:hidden">Azure</span>
          </button>
        </div>
      </div>
    </header>
  );
}
