# OAK Foundation Partner Convening 2026

A collaborative event registration and attendance application.

## Structure

- `client/` — Next.js + React + TypeScript frontend using the App Router.
- `server/` — existing Express/TypeScript backend.

## Frontend setup

```powershell
cd client
npm install
npm run dev
```

Open the local URL shown by Next.js.

## Production build

```powershell
npm run build
npm start
```

## QR-code refresh behavior

The registration pass uses `qrcode.react`. A fresh session signature is added to the QR payload whenever the pass component mounts. Therefore, refreshing, reopening, or navigating back to the pass produces a different QR pattern while preserving the attendee's base registration ID.

The check-in manual-code logic accepts the base ID from a QR payload containing the session signature.

> This is a frontend demonstration mechanism. For production event security, QR tokens should be generated and validated server-side, stored with the registration, and preferably signed or made short-lived.

## Collaboration

Work from feature branches rather than directly on `main`:

```powershell
git checkout main
git pull origin main
git checkout -b feature/your-feature
```

After testing:

```powershell
git add .
git commit -m "Describe your change"
git push -u origin feature/your-feature
```

Then open a Pull Request on GitHub.
