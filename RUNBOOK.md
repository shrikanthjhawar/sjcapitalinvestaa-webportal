# Local Runbook for SJ Capital Investaa Web Portal

This document provides complete, step-by-step instructions for installing, running, building, and troubleshooting the **SJ Capital Investaa Web Portal** locally.

---

## Quick Start

1. **Clone & Navigate to Repository**:
   ```bash
   git clone <repository-url>
   cd sjcapitalinvestaa-webportal
   ```
2. **Install Dependencies**:
   ```bash
   npm ci
   ```
3. **Start Local Development Server**:
   ```bash
   npm run dev
   ```
4. **Access the Application**:
   Open [http://localhost:5173](http://localhost:5173) in your web browser.

---

## 1. Prerequisites and Required Versions

- **Node.js**: `v18.x`, `v20.x`, or `v22.x` (Tested and verified with **Node v22.23.1**)
- **Package Manager**: **npm** `v10.x` (Tested and verified with **npm 10.1.0**)
- **Operating System**: Windows, macOS, or Linux
- **Web Browser**: Any modern evergreen browser (Chrome, Firefox, Edge, Safari)

---

## 2. Repository Setup

Clone the repository and switch to the project directory:

```bash
git clone <repository-url>
cd sjcapitalinvestaa-webportal
```

---

## 3. Dependency Installation

The project uses `npm` with a locked `package-lock.json`.

- **Clean reproducible installation** (Recommended):
  ```bash
  npm ci
  ```
- **Standard installation**:
  ```bash
  npm install
  ```

---

## 4. Required Environment Variables

- **Environment Variables Required**: None.
- This application is a fully client-side Static Single Page Application (SPA).
- No `.env` file is required to start or build the application.

---

## 5. How to Create/Configure `.env`

Currently, no environment variables or `.env` files are required or configured in the project source code. If future integrations require custom variables, Vite uses the `VITE_` prefix (e.g., `VITE_API_URL`) accessed via `import.meta.env.VITE_*`.

---

## 6. Database Setup

- **Database Required**: None.
- All state (calculators, risk profiling, blog post parsing) is managed in-browser using React local state, `localStorage` via custom hooks (`usePersistentState`), and embedded static Markdown files.

---

## 7. Backend Setup

- **Backend Required**: None.
- The web portal operates entirely client-side.

---

## 8. Frontend Setup & Architecture

- **Framework**: React 18 with TypeScript (`v5.5.3`)
- **Build Tool**: Vite (`v5.4.2`)
- **Styling**: Tailwind CSS (`v3.4.1`) with `@tailwindcss/typography` & Autoprefixer
- **Routing**: `react-router-dom` (`v7.7.0`)
- **Icons & UI Utilities**: `lucide-react`, `framer-motion`, `recharts`
- **SEO**: `react-helmet-async`
- **Content**: Markdown parser using `react-markdown`, `remark-gfm`, and `front-matter`

---

## 9. Exact Commands to Start Each Component

### Start Development Server
Runs Vite dev server with hot module replacement (HMR):
```bash
npm run dev
```

### Build for Production
Compiles TypeScript and bundles assets into the `dist/` directory:
```bash
npm run build
```

### Preview Production Build Locally
Serves the generated `dist/` folder locally:
```bash
npm run preview
```

### Run Code Linter
Runs ESLint across TypeScript source files:
```bash
npm run lint
```

### Deploy to GitHub Pages
Deploys the static `dist/` build to GitHub Pages with the custom domain `www.sjcapital.in`:
```bash
npm run deploy
```

---

## 10. Expected Localhost URLs / Ports

| Mode | URL | Port |
| ---- | --- | ---- |
| **Development (`npm run dev`)** | `http://localhost:5173` | `5173` (Default Vite port) |
| **Preview (`npm run preview`)** | `http://localhost:4173` | `4173` (Default Vite preview port) |

*Note: If port 5173 or 4173 is already in use, Vite will automatically select the next available port (e.g., 5174).*

---

## 11. How to Verify the Application is Working

1. **Home Page**: Navigate to `http://localhost:5173`. Confirm the hero section, branding, navigation bar, and footer render cleanly.
2. **Interactive Calculators**:
   - Navigate to `http://localhost:5173/calculators`
   - Select a calculator (e.g., SIP Calculator, Lumpsum Calculator, EMI Calculator)
   - Adjust input sliders and verify dynamic charts (powered by Recharts) render instantly.
3. **Blog Section**:
   - Navigate to `http://localhost:5173/blogs`
   - Open a blog post to confirm markdown parsing (`front-matter` and `react-markdown`) loads and formats properly.
4. **Risk Profile Questionnaire**:
   - Navigate to `http://localhost:5173/risk-profile`
   - Complete the form to verify questionnaire flow.

---

## 12. Build Commands

To test and produce a production static bundle:

```bash
npm run build
```

**Output**: Compiled files are placed in `dist/`.

---

## 13. Test Commands

- **Unit / E2E Testing**: No automated test runner (such as Vitest, Jest, or Playwright) is currently configured in `package.json`.
- **Static Code Verification**:
  ```bash
  npm run lint
  ```

---

## 14. Common Startup Errors and Fixes

### Error 1: `'eslint' is not recognized as an internal or external command`
- **Cause**: Dependencies have not been installed yet (`node_modules` missing).
- **Fix**: Run `npm ci` or `npm install` before running scripts.

### Error 2: Port 5173 in use
- **Cause**: Another service or dev server instance is already running on port 5173.
- **Fix**: Vite will automatically bind to `5173` + N (e.g., `5174`), or you can kill the process using port 5173:
  - Windows: `netstat -ano | findstr :5173` then `taskkill /PID <PID> /F`
  - macOS/Linux: `lsof -i :5173` then `kill -9 <PID>`

### Error 3: ESLint errors during `npm run lint`
- **Cause**: Existing codebase contains unused variable declarations and explicit `any` types in component code.
- **Fix**: Run `npm run build` to verify production builds pass regardless of minor lint rules.

---

## 15. How to Stop / Restart the Application

- **Stop**: Press `Ctrl + C` in the active terminal window running `npm run dev` or `npm run preview`.
- **Restart**: Re-execute `npm run dev`.

---

## 16. Required External Services

- **Google Fonts**: Inter & Montserrat fonts loaded via Google CDN in `index.html`.
- **Google Tag Manager / Analytics**: Measurement ID `G-JN9Z8C5G5Z` embedded in `index.html`.

---

## 17. Assumptions and Unresolved Items

- **No Backend Dependency**: The application requires no external database or API server.
- **Deployment Domain**: Configured for `www.sjcapital.in` via `CNAME` and `package.json` deploy script.

---

## Verification Checklist

* [x] Dependencies installed (`npm ci`)
* [x] Environment configured (No `.env` required)
* [x] Database available (N/A - Client-side SPA)
* [x] Backend running (N/A - Client-side SPA)
* [x] Frontend running (`npm run dev` / `npm run preview`)
* [x] Application accessible ([http://localhost:5173](http://localhost:5173))
* [x] Tests/build verified (`npm run build` verified successful; `npm run lint` analyzed)

---

## Project Runtime Summary

| Component | Technology | Version | Port | Start Command |
| --------- | ---------- | ------- | ---- | ------------- |
| **Frontend Dev Server** | Vite / React / TypeScript | React 18, Vite 5 | `5173` | `npm run dev` |
| **Frontend Preview** | Vite Preview | Vite 5 | `4173` | `npm run preview` |
| **Backend API** | N/A (Static SPA) | N/A | N/A | N/A |
| **Database** | N/A (Browser Storage) | N/A | N/A | N/A |
