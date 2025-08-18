# ado-query-creator
```
ado-query-creator
├─ .builder
│  └─ rules
│     ├─ deploy-app.mdc
│     └─ organize-ui.mdc
├─ .dockerignore
├─ .env
├─ .npmrc
├─ .prettierrc
├─ AGENTS.md
├─ README.md
├─ ado-functions
│  ├─ .funcignore
│  ├─ host.json
│  ├─ local.settings.json
│  ├─ package-lock.json
│  ├─ package.json
│  └─ src
│     └─ functions
│        └─ ADOQueryCreator.js
├─ client
│  ├─ App.tsx
│  ├─ components
│  │  ├─ DashboardImage.tsx
│  │  ├─ Features.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Header.tsx
│  │  ├─ Hero.tsx
│  │  ├─ QueryCreator.tsx
│  │  └─ ui
│  │     ├─ accordion.tsx
│  │     ├─ alert-dialog.tsx
│  │     ├─ alert.tsx
│  │     ├─ aspect-ratio.tsx
│  │     ├─ avatar.tsx
│  │     ├─ badge.tsx
│  │     ├─ breadcrumb.tsx
│  │     ├─ button.tsx
│  │     ├─ calendar.tsx
│  │     ├─ card.tsx
│  │     ├─ carousel.tsx
│  │     ├─ chart.tsx
│  │     ├─ checkbox.tsx
│  │     ├─ collapsible.tsx
│  │     ├─ command.tsx
│  │     ├─ context-menu.tsx
│  │     ├─ dialog.tsx
│  │     ├─ drawer.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ form.tsx
│  │     ├─ hover-card.tsx
│  │     ├─ input-otp.tsx
│  │     ├─ input.tsx
│  │     ├─ label.tsx
│  │     ├─ menubar.tsx
│  │     ├─ navigation-menu.tsx
│  │     ├─ pagination.tsx
│  │     ├─ popover.tsx
│  │     ├─ progress.tsx
│  │     ├─ radio-group.tsx
│  │     ├─ resizable.tsx
│  │     ├─ scroll-area.tsx
│  │     ├─ select.tsx
│  │     ├─ separator.tsx
│  │     ├─ sheet.tsx
│  │     ├─ sidebar.tsx
│  │     ├─ skeleton.tsx
│  │     ├─ slider.tsx
│  │     ├─ sonner.tsx
│  │     ├─ switch.tsx
│  │     ├─ table.tsx
│  │     ├─ tabs.tsx
│  │     ├─ textarea.tsx
│  │     ├─ toast.tsx
│  │     ├─ toaster.tsx
│  │     ├─ toggle-group.tsx
│  │     ├─ toggle.tsx
│  │     ├─ tooltip.tsx
│  │     └─ use-toast.ts
│  ├─ global.css
│  ├─ hooks
│  │  ├─ use-mobile.tsx
│  │  └─ use-toast.ts
│  ├─ lib
│  │  ├─ utils.spec.ts
│  │  └─ utils.ts
│  ├─ pages
│  │  ├─ Contact.tsx
│  │  ├─ Documentation.tsx
│  │  ├─ GitHub.tsx
│  │  ├─ Index.tsx
│  │  └─ NotFound.tsx
│  └─ vite-env.d.ts
├─ components.json
├─ index.html
├─ netlify
│  └─ functions
│     └─ api.ts
├─ netlify.toml
├─ package-lock.json
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.js
├─ public
│  ├─ favicon.ico
│  ├─ placeholder.svg
│  └─ robots.txt
├─ server
│  ├─ index.ts
│  ├─ node-build.ts
│  └─ routes
│     └─ demo.ts
├─ shared
│  └─ api.ts
├─ tailwind.config.ts
├─ tsconfig.json
├─ vite.config.server.ts
└─ vite.config.ts

```
```
ado-query-creator
├─ .builder
│  └─ rules
│     ├─ deploy-app.mdc
│     └─ organize-ui.mdc
├─ .dockerignore
├─ .env
├─ .npmrc
├─ .prettierrc
├─ AGENTS.md
├─ README.md
├─ ado-functions
│  ├─ .funcignore
│  ├─ host.json
│  ├─ package-lock.json
│  ├─ package.json
│  └─ src
│     └─ functions
│        └─ ADOQueryCreator.js
├─ client
│  ├─ App.tsx
│  ├─ components
│  │  ├─ DashboardImage.tsx
│  │  ├─ Features.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Header.tsx
│  │  ├─ Hero.tsx
│  │  ├─ QueryCreator.tsx
│  │  └─ ui
│  │     ├─ accordion.tsx
│  │     ├─ alert-dialog.tsx
│  │     ├─ alert.tsx
│  │     ├─ aspect-ratio.tsx
│  │     ├─ avatar.tsx
│  │     ├─ badge.tsx
│  │     ├─ breadcrumb.tsx
│  │     ├─ button.tsx
│  │     ├─ calendar.tsx
│  │     ├─ card.tsx
│  │     ├─ carousel.tsx
│  │     ├─ chart.tsx
│  │     ├─ checkbox.tsx
│  │     ├─ collapsible.tsx
│  │     ├─ command.tsx
│  │     ├─ context-menu.tsx
│  │     ├─ dialog.tsx
│  │     ├─ drawer.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ form.tsx
│  │     ├─ hover-card.tsx
│  │     ├─ input-otp.tsx
│  │     ├─ input.tsx
│  │     ├─ label.tsx
│  │     ├─ menubar.tsx
│  │     ├─ navigation-menu.tsx
│  │     ├─ pagination.tsx
│  │     ├─ popover.tsx
│  │     ├─ progress.tsx
│  │     ├─ radio-group.tsx
│  │     ├─ resizable.tsx
│  │     ├─ scroll-area.tsx
│  │     ├─ select.tsx
│  │     ├─ separator.tsx
│  │     ├─ sheet.tsx
│  │     ├─ sidebar.tsx
│  │     ├─ skeleton.tsx
│  │     ├─ slider.tsx
│  │     ├─ sonner.tsx
│  │     ├─ switch.tsx
│  │     ├─ table.tsx
│  │     ├─ tabs.tsx
│  │     ├─ textarea.tsx
│  │     ├─ toast.tsx
│  │     ├─ toaster.tsx
│  │     ├─ toggle-group.tsx
│  │     ├─ toggle.tsx
│  │     ├─ tooltip.tsx
│  │     └─ use-toast.ts
│  ├─ global.css
│  ├─ hooks
│  │  ├─ use-mobile.tsx
│  │  └─ use-toast.ts
│  ├─ lib
│  │  ├─ utils.spec.ts
│  │  └─ utils.ts
│  ├─ pages
│  │  ├─ Contact.tsx
│  │  ├─ Documentation.tsx
│  │  ├─ GitHub.tsx
│  │  ├─ Index.tsx
│  │  └─ NotFound.tsx
│  └─ vite-env.d.ts
├─ components.json
├─ index.html
├─ netlify
│  └─ functions
│     └─ api.ts
├─ netlify.toml
├─ package-lock.json
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.js
├─ public
│  ├─ favicon.ico
│  ├─ placeholder.svg
│  └─ robots.txt
├─ query-function
│  ├─ .funcignore
│  ├─ host.json
│  ├─ local.settings.json
│  ├─ package-lock.json
│  ├─ package.json
│  └─ src
│     ├─ functions
│     │  ├─ HTTPTrigger.js
│     │  └─ querycreator.js
│     └─ index.js
├─ server
│  ├─ index.ts
│  ├─ node-build.ts
│  └─ routes
│     └─ demo.ts
├─ shared
│  └─ api.ts
├─ src
│  └─ functions
├─ tailwind.config.ts
├─ tsconfig.json
├─ vite.config.server.ts
└─ vite.config.ts

```
```
ado-query-creator
├─ .builder
├─ .dockerignore
├─ .env
├─ .npmrc
├─ .prettierrc
├─ AGENTS.md
├─ README.md
├─ ado-functions
│  ├─ .funcignore
│  ├─ ADOQueryCreatorScript
│  │  ├─ ADOQueryCreator.js
│  │  └─ function.json
│  ├─ package-lock.json
│  └─ package.json
├─ client
│  ├─ App.tsx
│  ├─ components
│  │  ├─ DashboardImage.tsx
│  │  ├─ Features.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Header.tsx
│  │  ├─ Hero.tsx
│  │  ├─ QueryCreator.tsx
│  │  └─ ui
│  │     ├─ accordion.tsx
│  │     ├─ alert-dialog.tsx
│  │     ├─ alert.tsx
│  │     ├─ aspect-ratio.tsx
│  │     ├─ avatar.tsx
│  │     ├─ badge.tsx
│  │     ├─ breadcrumb.tsx
│  │     ├─ button.tsx
│  │     ├─ calendar.tsx
│  │     ├─ card.tsx
│  │     ├─ carousel.tsx
│  │     ├─ chart.tsx
│  │     ├─ checkbox.tsx
│  │     ├─ collapsible.tsx
│  │     ├─ command.tsx
│  │     ├─ context-menu.tsx
│  │     ├─ dialog.tsx
│  │     ├─ drawer.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ form.tsx
│  │     ├─ hover-card.tsx
│  │     ├─ input-otp.tsx
│  │     ├─ input.tsx
│  │     ├─ label.tsx
│  │     ├─ menubar.tsx
│  │     ├─ navigation-menu.tsx
│  │     ├─ pagination.tsx
│  │     ├─ popover.tsx
│  │     ├─ progress.tsx
│  │     ├─ radio-group.tsx
│  │     ├─ resizable.tsx
│  │     ├─ scroll-area.tsx
│  │     ├─ select.tsx
│  │     ├─ separator.tsx
│  │     ├─ sheet.tsx
│  │     ├─ sidebar.tsx
│  │     ├─ skeleton.tsx
│  │     ├─ slider.tsx
│  │     ├─ sonner.tsx
│  │     ├─ switch.tsx
│  │     ├─ table.tsx
│  │     ├─ tabs.tsx
│  │     ├─ textarea.tsx
│  │     ├─ toast.tsx
│  │     ├─ toaster.tsx
│  │     ├─ toggle-group.tsx
│  │     ├─ toggle.tsx
│  │     ├─ tooltip.tsx
│  │     └─ use-toast.ts
│  ├─ global.css
│  ├─ hooks
│  │  ├─ use-mobile.tsx
│  │  └─ use-toast.ts
│  ├─ lib
│  │  ├─ utils.spec.ts
│  │  └─ utils.ts
│  ├─ pages
│  │  ├─ Contact.tsx
│  │  ├─ Documentation.tsx
│  │  ├─ GitHub.tsx
│  │  ├─ Index.tsx
│  │  └─ NotFound.tsx
│  └─ vite-env.d.ts
├─ components.json
├─ host.json
├─ index.html
├─ local.settings.json
├─ netlify
│  └─ functions
│     └─ api.ts
├─ netlify.toml
├─ package-lock.json
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.js
├─ public
│  ├─ favicon.ico
│  ├─ placeholder.svg
│  └─ robots.txt
├─ server
│  ├─ index.ts
│  ├─ node-build.ts
│  └─ routes
│     └─ demo.ts
├─ shared
│  └─ api.ts
├─ src
│  └─ functions
├─ tailwind.config.ts
├─ tsconfig.json
├─ vite.config.server.ts
└─ vite.config.ts

```
```
ado-query-creator
├─ .builder
├─ .dockerignore
├─ .env
├─ .npmrc
├─ .prettierrc
├─ AGENTS.md
├─ README.md
├─ ado-functions
│  ├─ .funcignore
│  ├─ ADOQueryCreatorScript
│  │  ├─ function.json
│  │  └─ index.js
│  ├─ package-lock.json
│  └─ package.json
├─ client
│  ├─ App.tsx
│  ├─ components
│  │  ├─ DashboardImage.tsx
│  │  ├─ Features.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Header.tsx
│  │  ├─ Hero.tsx
│  │  ├─ QueryCreator.tsx
│  │  └─ ui
│  │     ├─ accordion.tsx
│  │     ├─ alert-dialog.tsx
│  │     ├─ alert.tsx
│  │     ├─ aspect-ratio.tsx
│  │     ├─ avatar.tsx
│  │     ├─ badge.tsx
│  │     ├─ breadcrumb.tsx
│  │     ├─ button.tsx
│  │     ├─ calendar.tsx
│  │     ├─ card.tsx
│  │     ├─ carousel.tsx
│  │     ├─ chart.tsx
│  │     ├─ checkbox.tsx
│  │     ├─ collapsible.tsx
│  │     ├─ command.tsx
│  │     ├─ context-menu.tsx
│  │     ├─ dialog.tsx
│  │     ├─ drawer.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ form.tsx
│  │     ├─ hover-card.tsx
│  │     ├─ input-otp.tsx
│  │     ├─ input.tsx
│  │     ├─ label.tsx
│  │     ├─ menubar.tsx
│  │     ├─ navigation-menu.tsx
│  │     ├─ pagination.tsx
│  │     ├─ popover.tsx
│  │     ├─ progress.tsx
│  │     ├─ radio-group.tsx
│  │     ├─ resizable.tsx
│  │     ├─ scroll-area.tsx
│  │     ├─ select.tsx
│  │     ├─ separator.tsx
│  │     ├─ sheet.tsx
│  │     ├─ sidebar.tsx
│  │     ├─ skeleton.tsx
│  │     ├─ slider.tsx
│  │     ├─ sonner.tsx
│  │     ├─ switch.tsx
│  │     ├─ table.tsx
│  │     ├─ tabs.tsx
│  │     ├─ textarea.tsx
│  │     ├─ toast.tsx
│  │     ├─ toaster.tsx
│  │     ├─ toggle-group.tsx
│  │     ├─ toggle.tsx
│  │     ├─ tooltip.tsx
│  │     └─ use-toast.ts
│  ├─ global.css
│  ├─ hooks
│  │  ├─ use-mobile.tsx
│  │  └─ use-toast.ts
│  ├─ lib
│  │  ├─ utils.spec.ts
│  │  └─ utils.ts
│  ├─ pages
│  │  ├─ Contact.tsx
│  │  ├─ Documentation.tsx
│  │  ├─ GitHub.tsx
│  │  ├─ Index.tsx
│  │  └─ NotFound.tsx
│  └─ vite-env.d.ts
├─ components.json
├─ host.json
├─ index.html
├─ netlify
│  └─ functions
│     └─ api.ts
├─ netlify.toml
├─ package-lock.json
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.js
├─ public
│  ├─ favicon.ico
│  ├─ placeholder.svg
│  └─ robots.txt
├─ query-creator
│  ├─ .funcignore
│  ├─ ADOQueryCreator.js
│  ├─ function.json
│  ├─ host.json
│  ├─ index.js
│  ├─ package-lock.json
│  └─ package.json
├─ server
│  ├─ index.ts
│  ├─ node-build.ts
│  └─ routes
│     └─ demo.ts
├─ shared
│  └─ api.ts
├─ src
│  └─ functions
├─ tailwind.config.ts
├─ tsconfig.json
├─ vite.config.server.ts
└─ vite.config.ts

```