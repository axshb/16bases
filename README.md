<div align="center"> <h1>16bases</h1> <p>16bases is a place to browse, customise, and share base 16 terminal themes.</p> <a href="https://16bases.vercel.app/"> <img src="https://img.shields.io/badge/View%20Live-Vercel-black?style=for-the-badge&logo=vercel" alt="View Live on Vercel"> </a> </div>

### Planned Features
- Add buttons to the "fetch" component to link to this repo and other relevant content
- Add an upload button to the theme editor sidebar
- Add functional searching/filtering on the theme browser, and a button to fetch user themes manually (lazy loading)
- Expand the code box to have longer code snippets and more languages (selectable)

### Developers
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.4.

First, `cd` into the project directory and run `npm install`.
Next, refer to these useful scripts from `package.json` to get started:

```json
"ng": "ng",
"start": "ng serve",
"build": "ng build",
"watch": "ng build --watch --configuration development",
"test": "ng test",
"serve:ssr:16bases": "node dist/16bases/server/server.mjs",
"start-nix": "export $(grep -v '^#' .env.local | xargs) && ng serve",
"build-nix": "export $(grep -v '^#' .env.local | xargs) && ng build"
```
Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

To run this project locally, you may have to create a file named `.env.local` in the root directory. You can use the following dummy values to get started (note: certain features require real API keys):
```bash
DATABASE_URL=http://localhost:4200
```
- Note 1: This is untested. Please create an issue if needed.
- Note 2: If you are a NixOS user, you may have to prefix `ng` commands with `npx` depending on your setup.

### Code scaffolding
Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Additional Resources
For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
