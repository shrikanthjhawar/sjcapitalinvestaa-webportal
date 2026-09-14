# Lark Finserv Loan Against Securities (LAS) Integration Guide

This document provides complete instructions for developers and maintainers managing the **Lark Finserv Loan Against Securities (LAS)** integration within the **SJ Capital Investaa Web Portal**.

---

## 1. Architecture Overview

```
                                 [User Browser: www.sjcapital.in]
                                                │
                                                ▼
                               [Clicks "Loan Against Securities"]
                                                │
                            ┌───────────────────┴───────────────────┐
                            │                                       │
                  (SDK Initialized)                         (SDK Failure / Error)
                            │                                       │
                            ▼                                       ▼
              [Lark SDK Modal / Popup]                   [Display Error Banner]
             (lark-sdk-multi @ 1.0.12)                   "Widget unavailable"
                            │                                       │
                            ▼                                       ▼
                [User Completes Loan]                     [Click "Continue with Loan Portal"]
                                                                    │
                                                                    ▼
                                                        [https://loan.sjcapital.in]
```

- **Primary Journey**: In-app `lark-sdk-multi` modal (`'inline'`) on desktop or popup window (`'popup'`) on mobile devices.
- **Fallback Journey**: `https://loan.sjcapital.in` (White-labelled portal), accessed via the user-facing **"Continue with Loan Portal"** button if the SDK is unavailable or encounters a runtime error.

---

## 2. Prerequisites

- **Node.js**: `>= 18.x` (Recommended `v20.x` or `v22.x`)
- **npm**: `>= 10.x`
- **Lark SDK Credentials**:
  - `VITE_LARK_SDK_KEY`: Public client key issued by Lark Finserv.
  - `VITE_LARK_PARTNER_ID`: Partner identifier (if applicable to your Lark plan).
  - Domain Whitelisting: `www.sjcapital.in` (Production) & `http://localhost:5173` (Sandbox).

---

## 3. Environment Configuration

Because this site is a **static SPA hosted on GitHub Pages**, all `VITE_*` environment variables are compiled at **build time** into client static JavaScript assets.

### `.env.example` (Template with Placeholders Only)
```env
VITE_LARK_SDK_KEY=your_lark_sdk_key_here
VITE_LARK_PARTNER_ID=your_lark_partner_id_here
VITE_LARK_ENV=sandbox
VITE_LARK_WHITE_LABEL_URL=https://loan.sjcapital.in
```

### Local Development `.env.local` (Git-Ignored)
For local testing, create a `.env.local` file (automatically ignored by Git via `*.local` rule in `.gitignore`):
```env
VITE_LARK_SDK_KEY=sandbox_key_here
VITE_LARK_PARTNER_ID=sandbox_partner_id_here
VITE_LARK_ENV=sandbox
VITE_LARK_WHITE_LABEL_URL=https://loan.sjcapital.in
```

---

## 4. Security Model & `SDK Secret` Policy

> [!CAUTION]
> **DO NOT EMBED `VITE_LARK_SDK_SECRET` IN CLIENT CODE OR GITHUB BUILD VARIABLES**
> - In static SPAs, anything stored in `VITE_*` is viewable in the client browser bundle (`dist/assets/*.js`).
> - `sdkSecret` is **blocked** from client code until Lark Finserv explicitly confirms in writing that the secret is browser-safe under origin whitelisting (`www.sjcapital.in`).

---

## 5. Local Sandbox Testing Workflow

1. Install pinned dependency:
   ```bash
   npm install
   ```
2. Populate `.env.local` with sandbox credentials.
3. Launch local dev server:
   ```bash
   npm run dev
   ```
4. Access `http://localhost:5173/loan-against-securities`.
5. Verify SDK initialization:
   - On desktop screens (`>= 768px`), click "Check Eligibility Now" to open the inline modal.
   - On mobile viewports (`< 768px`), verify popup launch.
6. Test Fallback UX:
   - Temporarily remove `VITE_LARK_SDK_KEY` from `.env.local` and refresh.
   - Verify the error banner displays: *"Loan widget initialization pending credentials or package setup."*
   - Verify clicking **"Continue with Loan Portal"** opens `https://loan.sjcapital.in` in a new tab.

---

## 6. GitHub Pages SPA Routing Handling

GitHub Pages is a static host and will return a **404 Page Not Found** if a user directly navigates to `https://www.sjcapital.in/loan-against-securities`.

To resolve this cleanly:
- When building for production, Vite compiles `index.html`.
- For deep link support on GitHub Pages, copy `index.html` to `dist/404.html` during build:
  ```bash
  cp dist/index.html dist/404.html
  ```
- This serves `404.html` on direct deep links, which executes the single-page bundle and lets `react-router-dom`'s `BrowserRouter` render the `/loan-against-securities` route without breaking SPA state.

---

## 7. Manual Deployment Procedure (User Executed)

As all deployment operations are manually controlled by the repository owner:

1. **Install Pinned Dependency**:
   ```bash
   npm install lark-sdk-multi@1.0.12
   ```
2. **Run Production Build**:
   ```bash
   npm run build
   ```
3. **Commit Code to Git**:
   ```bash
   git add .
   git commit -m "feat: Add Lark Loan Against Securities integration with manual fallback portal"
   git push origin main
   ```
4. **Deploy Bundle to GitHub Pages**:
   ```bash
   npm run deploy
   ```

---

## 8. Rollback Procedure

If a critical issue occurs on production:
1. Checkout the previous stable Git commit:
   ```bash
   git checkout <previous-commit-hash>
   ```
2. Rebuild and redeploy static assets:
   ```bash
   npm run build
   npm run deploy
   ```
3. Users will automatically fall back to the direct link `https://loan.sjcapital.in`.
