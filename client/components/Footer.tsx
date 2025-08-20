export function Footer() {
  return (
    <footer className="px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Made by Rachel */}
          <div className="text-ado-text font-montserrat text-15 leading-7 tracking-tight">
            Made by Rachel
          </div>
          
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/rachel-q/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-ado-text hover:text-ado-primary transition-colors">
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_10_209)">
                  <path d="M6.22913 7.66667C7.02304 7.66667 7.66663 7.02308 7.66663 6.22917C7.66663 5.43526 7.02304 4.79167 6.22913 4.79167C5.43521 4.79167 4.79163 5.43526 4.79163 6.22917C4.79163 7.02308 5.43521 7.66667 6.22913 7.66667Z" fill="currentColor"/>
                  <path d="M4.79163 9.58333C4.79163 9.05406 5.22069 8.625 5.74996 8.625H6.70829C7.23756 8.625 7.66663 9.05406 7.66663 9.58333V17.25C7.66663 17.7793 7.23756 18.2083 6.70829 18.2083H5.74996C5.22069 18.2083 4.79163 17.7793 4.79163 17.25V9.58333Z" fill="currentColor"/>
                  <path d="M10.5417 18.2083H11.5C12.0293 18.2083 12.4584 17.7793 12.4584 17.25V12.9375C12.4584 11.5 15.3334 10.5417 15.3334 12.4583V17.2504C15.3334 17.7797 15.7624 18.2083 16.2917 18.2083H17.25C17.7793 18.2083 18.2084 17.7793 18.2084 17.25V11.5C18.2084 9.58333 16.7709 8.625 14.8542 8.625C12.9375 8.625 12.4584 10.0625 12.4584 10.0625V9.58333C12.4584 9.05406 12.0293 8.625 11.5 8.625H10.5417C10.0124 8.625 9.58337 9.05406 9.58337 9.58333V17.25C9.58337 17.7793 10.0124 18.2083 10.5417 18.2083Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M19.1667 0.958328C20.7546 0.958328 22.0417 2.24551 22.0417 3.83333V19.1667C22.0417 20.7545 20.7546 22.0417 19.1667 22.0417H3.83337C2.24556 22.0417 0.958374 20.7545 0.958374 19.1667V3.83333C0.958374 2.24551 2.24556 0.958328 3.83337 0.958328H19.1667ZM19.1667 2.87499C19.696 2.87499 20.125 3.30406 20.125 3.83333V19.1667C20.125 19.6959 19.696 20.125 19.1667 20.125H3.83337C3.30411 20.125 2.87504 19.6959 2.87504 19.1667V3.83333C2.87504 3.30406 3.30411 2.87499 3.83337 2.87499H19.1667Z" fill="currentColor"/>
                </g>
                <defs>
                  <clipPath id="clip0_10_209">
                    <rect width="23" height="23" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </a>
            
            {/* Email */}
            <a href="mailto:Rachel.Qi@tpsgc-pwgsc.gc.ca" className="text-ado-text hover:text-ado-primary transition-colors">
              <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8.00007L11.9125 14.2C13.4459 15.2667 15.5541 15.2667 17.0875 14.2L26 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23.4444 5H5.55556C4.14416 5 3 6.15127 3 7.57143V20.4286C3 21.8487 4.14416 23 5.55556 23H23.4444C24.8558 23 26 21.8487 26 20.4286V7.57143C26 6.15127 24.8558 5 23.4444 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </a>
            
            {/* GitHub */}
            <a
              href="https://github.com/r-chel-i/ado-query-creator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ado-text hover:text-ado-primary transition-colors"
              aria-label="Visit GitHub"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_10_204)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11 0C17.0753 0 22 5.04892 22 11.2782C22 16.2601 18.8518 20.4864 14.4837 21.9791C13.926 22.0902 13.728 21.7379 13.728 21.4376C13.728 21.0658 13.7412 19.8515 13.7412 18.3423C13.7412 17.2907 13.3892 16.6043 12.9943 16.2545C15.444 15.9751 18.018 15.0214 18.018 10.6896C18.018 9.45755 17.5912 8.4522 16.885 7.6624C16.9994 7.3775 17.3767 6.23035 16.7772 4.67715C16.7772 4.67715 15.8554 4.37495 13.7555 5.83355C12.8766 5.58385 11.935 5.45821 11 5.45381C10.065 5.45821 9.1245 5.58385 8.2467 5.83355C6.1446 4.37495 5.2206 4.67715 5.2206 4.67715C4.6233 6.23035 5.0006 7.3775 5.1139 7.6624C4.411 8.4522 3.9809 9.45755 3.9809 10.6896C3.9809 15.0104 6.5494 15.9788 8.9925 16.2637C8.6779 16.5453 8.393 17.042 8.294 17.7713C7.667 18.0595 6.0742 18.5583 5.093 16.8346C5.093 16.8346 4.5111 15.751 3.4067 15.6718C3.4067 15.6718 2.3342 15.6575 3.3319 16.3571C3.3319 16.3571 4.0524 16.7036 4.5529 18.0071C4.5529 18.0071 5.1986 20.0201 8.2588 19.3381C8.2643 20.2808 8.2742 21.1692 8.2742 21.4376C8.2742 21.7357 8.0718 22.0846 7.5229 21.9801C3.1515 20.4896 0 16.2612 0 11.2782C0 5.04892 4.9258 0 11 0Z" fill="currentColor"/>
                </g>
                <defs>
                  <clipPath id="clip0_10_204">
                    <rect width="22" height="22" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
