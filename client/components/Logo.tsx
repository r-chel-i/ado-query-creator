export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ado-primary/10 ring-1 ring-ado-primary/20">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M4 6.5L8.5 4L13 6.5L8.5 9L4 6.5Z" fill="#0078D6"/>
          <path d="M13 6.5L17.5 4L20 6.5L15.5 9L13 6.5Z" fill="#0078D6"/>
          <path d="M6 10.5L10 8.5L14 10.5L10 12.5L6 10.5Z" fill="#5B5B5B"/>
          <path d="M10 13.5L14 11.5L18 13.5L14 15.5L10 13.5Z" fill="#5B5B5B"/>
          <path d="M7 16.5L11 14.5L15 16.5L11 18.5L7 16.5Z" fill="#0078D6"/>
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ado-primary">
          Azure
        </span>
        <span className="mt-1 text-sm font-semibold tracking-tight text-ado-text sm:text-base">
          DevOps Projects
        </span>
      </div>
    </div>
  );
}
