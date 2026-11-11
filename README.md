# Devika C. — Portfolio

Next.js 16 (App Router) + TypeScript, with a backend API for the contact form.
All site content lives in `src/data/portfolio.ts`.

## Project structure

```
src/
  app/
    layout.tsx            fonts, metadata, theme script
    page.tsx              the one-page site
    globals.css           all styles + colour themes
    api/contact/route.ts  POST /api/contact  (backend)
  components/             UI sections (Hero, Skills, Contact, …)
  data/portfolio.ts       ← edit your content here
  hooks/                  client hooks (GitHub repos, scroll reveal)
  lib/
    contact.ts            validation shared by form + API
    mailer.ts             sends email via SMTP (server only)
    rateLimit.ts          basic spam protection
public/resume.pdf
```

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

## Contact API

`POST /api/contact` with JSON `{ name, email, subject?, message }`.

| Status | Meaning |
|---|---|
| 200 | `{ ok: true }` email sent |
| 400 | `{ ok: false, errors: { field: "message" } }` validation failed |
| 403 | request came from another website |
| 413 / 415 | body too large / not JSON |
| 429 | more than 5 messages in 10 minutes from one IP |
| 500 | SMTP not configured or the email failed |

Messages are emailed to you with the visitor set as **Reply-To**, so you can just hit Reply.
A hidden "honeypot" field silently drops most bots.

### Gmail setup (environment variables)

1. Turn on 2-Step Verification for the Gmail account.
2. Create an App Password: https://myaccount.google.com/apppasswords
3. Set:
   - `SMTP_USER` – the Gmail address
   - `SMTP_PASS` – the 16-character app password
   - `CONTACT_TO` – (optional) where to receive messages; defaults to `SMTP_USER`

Never commit `.env.local` (it's in `.gitignore`).

### Adding more API endpoints

Create `src/app/api/<name>/route.ts` and export `GET`, `POST`, etc.
Put shared server logic in `src/lib/` (add `import "server-only"` to keep secrets off the client).

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to https://vercel.com/new → import the repo (framework is auto-detected as Next.js).
3. Under **Environment Variables** add `SMTP_USER`, `SMTP_PASS` (and `CONTACT_TO` if wanted).
4. Deploy. Every push to `main` redeploys automatically.

If you previously used GitHub Pages for this repo, disable it under
**Settings → Pages** so the old static site doesn't linger.
