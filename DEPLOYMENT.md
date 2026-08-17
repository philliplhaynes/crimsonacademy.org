# Deployment setup — Cloudflare Workers

How `crimsonacademy.org` is built and deployed, and how to reproduce this setup from
scratch if the Cloudflare project is ever recreated. For running the site locally, see
[README-RUNNING.md](README-RUNNING.md) instead — this file is about the live deployment.

## How it actually works

This is a static Vite/React site with no backend. It deploys to **Cloudflare Workers**
(static assets), not Cloudflare Pages and not GitHub Pages — GitHub only hosts the
source code. Cloudflare's **Workers Builds** watches the GitHub repo, and on every push
to `main` it:

1. Clones the repo
2. Runs the build command: `npm run build` (→ `tsc && vite build`, output to `dist/`)
3. Runs the deploy command: `npx wrangler deploy`, which reads [`wrangler.jsonc`](wrangler.jsonc)
   and pushes `dist/` to the `crimsonacademy-org` Worker

`wrangler.jsonc` is committed to the repo and is the source of truth for the deploy
config — see the comments in that file for what each field does and why. The short
version: `assets.directory` points at the build output, `assets.not_found_handling`
makes client-side routing work on refresh/deep-link (React Router), and the two
`routes` entries with `custom_domain: true` are what attach `crimsonacademy.org` and
`www.crimsonacademy.org` to this Worker — Cloudflare provisions and owns the DNS for
both automatically on every deploy from that config. **No manual DNS records are
needed for the site to work.**

## Reproducing from scratch

If the Cloudflare project ever needs to be recreated (new account, deleted project,
etc.):

1. **Cloudflare account**: add `crimsonacademy.org` as a zone (Websites → Add a
   Website). Update the domain's nameservers at the registrar to the ones Cloudflare
   assigns.
2. **Workers & Pages → Create → Import a repository**. Connect the GitHub account and
   select `philliplhaynes/crimsonacademy.org`.
3. **Build settings** — Cloudflare's Vite framework detection should get these right
   automatically, but if asked or if it guesses wrong:
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
   - Root directory: leave blank — the site lives at the repo root (see
     [BUILD-BRIEF.md](BUILD-BRIEF.md) if that ever changes)
4. Push to `main`. The first deploy reads the committed `wrangler.jsonc`, which already
   declares the custom domains — no dashboard DNS work required. Watch the deploy log
   for `Deployed crimsonacademy-org triggers` listing both `crimsonacademy.org` and
   `www.crimsonacademy.org` as `(custom domain)` — that confirms it worked.
5. Verify: visit `https://crimsonacademy.org` and a deep link like
   `https://crimsonacademy.org/crimson-for-life` directly (not via in-site
   navigation) — it should load the actual page, not a 404, confirming
   `not_found_handling` is active.

## Verifying a deploy locally before pushing

```bash
npm install
npx tsc --noEmit        # typecheck
npm run build            # produces dist/
npx wrangler deploy --dry-run   # validates wrangler.jsonc + reads dist/, doesn't deploy
```

The dry-run catches config problems (missing required fields, bad JSON) without
touching the live Worker — worth running after any `wrangler.jsonc` edit.

## Don't do this: pointing DNS at GitHub Pages

This has happened once already and broke the live site for a while, so it's worth
spelling out explicitly: **this project has never used GitHub Pages.** GitHub hosting
the source repo does not mean the site is served by GitHub Pages — those are unrelated
GitHub products. If a DNS-management session (human or AI) ever suggests adding A
records pointing at `185.199.108.153`–`185.199.111.153` or a `www` CNAME to
`<username>.github.io`, that's wrong for this project and will break the custom
domain — those records don't serve anything for this site, and they'll conflict with
the Worker's own custom-domain DNS.

If the site ever goes down and DNS looks suspicious, check **Workers & Pages →
crimsonacademy-org → Settings → Domains & Routes** first, and check the most recent
**Deployments** log for errors, before touching DNS records by hand.

## Secrets

Nothing in this codebase currently reads any environment variable
(`import.meta.env` / `process.env` — there's nothing to configure). If that changes:

- Never commit a `.env` file — `.gitignore` excludes `.env`, `.env.*`, and `.env.txt`,
  but double-check before a broad `git add`.
- A Vite env var prefixed `VITE_` is bundled into the **public** client-side JS and
  visible to any visitor via view-source. Never put a real secret behind that prefix.
- This site has no backend, so a genuine secret (an API key that must stay private)
  can't be used safely from client-side code as-is — it would need a serverless
  function (a Cloudflare Worker route, not this static-assets Worker) to call the
  external API from, keeping the key server-side.
- Cloudflare's own deploy credentials are never stored in this repo — Workers Builds
  authenticates via its GitHub App connection in the Cloudflare dashboard, not via any
  file here.

## Known deploy errors and their fixes

Two errors have actually occurred on this project's builds; both are fixed and
committed, but documented here in case the config regresses:

**`Invalid _redirects configuration: Line 1: Infinite loop detected`** — caused by a
`public/_redirects` file with the old Netlify/Pages catch-all rule
(`/* /index.html 200`) present alongside `assets.not_found_handling:
"single-page-application"` in `wrangler.jsonc`. Workers assets strips `.html`/`/index`
from resolved paths, so that rule redirects to itself. Fix: don't add a
`public/_redirects` file back — `not_found_handling` already covers SPA routing.

**`The 'assets' property in your configuration is missing the required 'directory'
property`** — `wrangler.jsonc`'s `assets` block needs `"directory": "./dist"`
explicitly. Cloudflare's one-time setup wizard papers over a missing directory by
generating a redirected `dist/wrangler.json` with it filled in, but that wizard only
runs when no `wrangler.jsonc` exists in the repo yet — once one is committed, it's
used as-is.
