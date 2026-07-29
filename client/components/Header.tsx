import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="w-full px-4 sm:px-11 py-6">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="group flex items-center gap-2 text-ado-text font-inter text-sm sm:text-17 font-bold leading-normal tracking-tight transition-colors hover:text-ado-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="43" height="46" viewBox="0 0 43 46" fill="none" className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 transition-colors group-hover:fill-ado-primary">
              <path fillRule="evenodd" clipRule="evenodd" d="M21.4072 0C21.4072 0 17.9587 6.49016 17.4812 7.16245C17.0302 8.06745 16.5527 8.06745 15.863 7.60202C14.9346 7.16245 12.1758 5.58516 12.1758 5.58516C12.1758 5.58516 14.7224 16.3418 14.7224 17.2209C14.9611 18.1259 14.0327 18.7982 13.1043 18.1259C12.8655 17.8932 8.03763 12.5149 8.03763 12.5149C8.03763 12.5149 6.87045 14.9713 6.65824 15.4368C6.4195 15.8763 6.20728 16.3159 5.51758 16.109C4.58914 15.8763 0.212215 14.9972 0.212215 14.9972C0.212215 14.9972 1.83035 20.3755 2.06909 21.0478C2.28131 21.5908 2.52005 22.1596 1.61814 22.6251L0 23.2974C0 23.2974 9.47008 31.3648 9.70882 31.5975C10.1863 32.0371 10.6373 32.2698 10.1863 33.6144C9.70882 34.959 9.25787 36.769 9.25787 36.769C9.25787 36.769 18.0382 34.959 18.9667 34.7262C19.7625 34.6487 20.6644 34.959 20.6644 35.864C20.6644 36.769 20.1339 46 20.1339 46H22.9192C22.9192 46 22.3887 36.769 22.3887 35.864C22.3887 34.959 23.264 34.6487 24.0864 34.7262C25.0148 34.959 33.7687 36.769 33.7687 36.769C33.7687 36.769 33.3177 34.959 32.8402 33.6144C32.3893 32.2698 32.8402 32.0371 33.2912 31.5975C33.5299 31.3648 43 23.2974 43 23.2974L41.3819 22.6251C40.4534 22.1855 40.6922 21.5908 40.9309 21.0478C41.1431 20.3755 42.7878 14.9972 42.7878 14.9972C42.7878 14.9972 38.3843 15.9022 37.4824 16.109C36.7927 16.3418 36.554 15.8763 36.3152 15.4368C36.0765 14.9972 34.9358 12.5149 34.9358 12.5149C34.9358 12.5149 30.0814 17.8932 29.8427 18.1259C28.9143 18.7982 27.9858 18.1259 28.2246 17.2209C28.2246 16.3159 30.7711 5.58516 30.7711 5.58516C30.7711 5.58516 27.9858 7.13659 27.0839 7.60202C26.3942 8.0416 25.9167 8.0416 25.4658 7.16245C25.0148 6.49016 21.5398 0 21.5398 0H21.4072Z" fill="currentColor"/>
            </svg>
            <span className="leading-tight text-left">
              <span className="block">PSPC CO-OP</span>
              <span className="block">Student Projects</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-12">
          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-12 justify-end">
            
            <Link
              to="/about"
              className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight hover:text-ado-primary transition-colors"
            >
              About
            </Link>

            <Link   
              to="/umair"
              className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight hover:text-ado-primary transition-colors"
            >
              Umair's Project
            </Link>

            <Link
              to="/rachel"
              className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight hover:text-ado-primary transition-colors"
            >
              Rachel's Projects
            </Link>

            <Link
              to="/anastasia"
              className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight hover:text-ado-primary transition-colors"
            >
              Anastasia's Project
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
      </div>
    </header>
  );
}
