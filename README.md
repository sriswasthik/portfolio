# Portfolio

A full stack personal portfolio website with a modern React frontend and a small Node.js backend.
The frontend focuses on UI, routing, and reusable components, while the backend exposes lightweight API endpoints.
Project data is stored locally (JSON) and can be served to the UI through the backend.

## Repository structure

Top level:
- `frontend/` Frontend application (Vite + React)
- `backend/` Backend API (Node.js)
- `LICENSE` License file

## Architecture overview

### Frontend (Vite + React)
Located in `frontend/`.

Key files and folders:
- `frontend/index.html` Vite entry HTML
- `frontend/vite.config.js` Vite configuration
- `frontend/eslint.config.js` Linting configuration
- `frontend/vercel.json` Deployment configuration for Vercel
- `frontend/package.json` Frontend dependencies and scripts
- `frontend/public/` Static assets served as is
- `frontend/src/` Application source code
  - `src/main.jsx` React entry point that mounts the app
  - `src/App.jsx` Root application component
  - `src/App.css`, `src/index.css` Global and app-level styling
  - `src/components/` Reusable UI components
  - `src/pages/` Page-level components (typically used by routing)
  - `src/hooks/` Custom React hooks
  - `src/assets/` Images and other bundled assets

How it fits together:
- `main.jsx` bootstraps React and renders `App.jsx`.
- `pages/` holds main screens/sections, and `components/` holds smaller building blocks used across pages.
- Styling is handled with standard CSS files imported into components/entry points.

### Backend (Node.js API)
Located in `backend/`.

Key files and folders:
- `backend/server.js` Main server entry point
- `backend/package.json` Backend dependencies and scripts
- `backend/api/` API route handlers
  - `backend/api/contact` Contact endpoint handler (file)
- `backend/models/` Data models
  - `backend/models/Project.js` Project model
- `backend/data/` Local data store
  - `backend/data/projects.json` Project data in JSON

How it fits together:
- `server.js` starts the server and wires up API endpoints.
- `data/projects.json` is the source of truth for project content.
- `models/Project.js` defines/structures project data used by the backend.
- `api/` contains the route handlers (for example, contact).

Note:
- `backend/node_modules/` exists in the repository listing. In most cases it should not be committed. If you want, I can suggest a `.gitignore` for the backend and steps to remove it from git history if needed.

## Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
node server.js
```

## Author

[sriswasthik](https://github.com/sriswasthik)
