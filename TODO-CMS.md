# TODO — edit the site without touching code

**Goal:** update photos (and text) from a browser, no code, no rebuild by hand.

**Decision (2026-08-10):** git-based CMS — **Sveltia CMS**, the maintained fork of Decap
(formerly Netlify CMS).

**Why this one.** Free with no vendor to lapse; content and images stay in your own repo, so
nothing is hostage to a third party; it edits text as well as photos, which also unblocks the
fees, news, and staff gaps already listed in `BUILD-BRIEF.md`. The tradeoff is a ~1–2 minute
rebuild after each save — irrelevant for a school site.

**Rejected, and why:** Sanity (better mobile editor, but an external dependency and the site
would have to fetch content at runtime); Cloudinary (photos only — leaves fees/news needing
code); building auth + storage into the site (most work, and you would then own auth, uploads,
and backups for a site that is otherwise free to host).

**Editor profile that drove the choice:** mostly you, occasionally. Revisit if Rwandan staff
start editing regularly — at that point the mobile editing experience matters more than cost,
and Sanity becomes the better answer.

---

## Phase 0 — prerequisites (blocks everything else)

- [ ] `git init` the academy site and make the first commit
      (it is **not** currently a repo — `.gitignore` already exists)
- [ ] Create a GitHub repo and push. The foundation site lives at
      `github.com/philliplhaynes/cf-website`, so a sibling repo keeps things together.
- [x] Deploy to **Cloudflare** (Workers, static assets)
      - build command `npm run build`, deploy command `npx wrangler deploy`
      - SPA fallback is committed in `wrangler.jsonc` (`assets.not_found_handling`)
- [ ] Confirm a deep link works in production (e.g. `/about#history`) — if it 404s, the
      fallback rule did not take
- [ ] Point `crimsonacademy.org` DNS at the deploy

## Phase 1 — make content data-driven

Right now history chapters, news stories, staff and fees are hardcoded TypeScript arrays, and
photos are `import`ed from `src/assets`. A CMS cannot edit either. This phase is the real work.

- [ ] Move editable content out of `.tsx` into `content/*.json` (or `.md` with frontmatter):
      - [ ] `content/history.json` — the `chapters`, `keyDates`, `heads` arrays in
            `src/components/SchoolHistory.tsx`
      - [ ] `content/news.json` — the stories in `src/pages/News.tsx`
      - [ ] `content/staff.json` — leadership + staff counts in `src/pages/About.tsx`
      - [ ] `content/settings.json` — contact email, fee schedule, term dates
- [ ] Load it. Simplest: a plain `import data from "@/content/history.json"` (Vite handles JSON
      natively and it stays fully static). No runtime fetch needed.
- [ ] **Switch photos from `src/assets` imports to `public/uploads` URL strings.** This is the
      key change: bundled imports are resolved at build time and cannot be swapped by a CMS;
      files in `public/` are copied as-is and referenced by a plain path like
      `/uploads/history-2009-first-visit.jpg`, which a CMS *can* write.
- [ ] Keep `PhotoSlot` as the fallback when a photo path is empty, so half-filled content still
      renders cleanly.

## Phase 2 — add the CMS

- [ ] `public/admin/index.html` — loads Sveltia from CDN
- [ ] `public/admin/config.yml` — collections mirroring the JSON files above:
      - History (list of chapters: era, title, body, image, alt)
      - News (title, date, body, image)
      - Staff, Settings
      - `media_folder: public/uploads`, `public_folder: /uploads`
- [ ] Wire GitHub OAuth. **Verify the current recommended method at build time** — Netlify's
      built-in Git Gateway is on a deprecation path, and the usual alternative is a small
      Cloudflare Worker acting as an OAuth relay. Do not assume; check the Sveltia docs.
- [ ] Restrict access to the repo's collaborators only.

## Phase 3 — keep uploads small

Rural mobile is the real audience; a 4 MB camera upload would undo the performance work.

- [ ] Configure the CMS image widget to resize on upload if supported; otherwise add a clear
      size hint in the field description ("about 1400px wide").
- [ ] Keep `npm run add-photo` for bulk work from the archive — it is faster than the browser
      for filling several slots at once.

## Phase 4 — hand it over

- [ ] Test the whole loop: log in, replace a photo, save, confirm it is live.
- [ ] Write a one-page `HOW-TO-EDIT.md` for a non-technical editor, with screenshots.
- [ ] Note the ~1–2 min delay so nobody thinks a save failed.

---

## Open questions

- Which host — Cloudflare Pages or Netlify? (Cloudflare is faster to Rwanda; Netlify has the
  simpler CMS auth story.)
- Should the foundation site's `better-auth` eventually provide one login across both sites?
  Out of scope now; would argue for the "full build" option instead of a git CMS.
- Who else gets an editor account, if anyone?
