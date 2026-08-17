# Social media post log

`post-log.csv` in this folder is the single source of truth for weekly social posts
across Facebook, Instagram, TikTok and YouTube (LinkedIn is excluded — there is no real
account yet, see `src/components/SocialLinks.tsx`).

**What this is not:** a publishing tool. Nothing in this repo can post to any social
platform directly — there's no API/account access wired up. The weekly workflow is:

1. Something (a scheduled check-in, or you asking directly) opens `post-log.csv`.
2. It drafts copy for any row still marked `idea`, pulling from real, verifiable site
   content — recent news stories (`src/data/news.ts`), the term/exam calendar, actual
   photos/videos already in the repo — never invented facts or stats. Status moves to
   `drafted`.
3. You review the drafted rows, edit anything you want changed, and mark them `ready`.
4. You post it yourself on each platform, in whatever tone/format that platform's app
   wants, using the caption and media reference as the starting point. Mark the row
   `posted` and fill in `posted_date` — that builds the same kind of historical log you
   were keeping in your head before this existed.

## Columns

| Column | Meaning |
|---|---|
| `week_of` | Monday of the week this post is aimed at (`YYYY-MM-DD`) |
| `platform` | `Facebook`, `Instagram`, `TikTok`, `YouTube`, or `All` for one caption reused everywhere |
| `status` | `idea` → `drafted` → `ready` → `posted` |
| `topic` | Short internal label, not part of the post itself |
| `caption` | The actual post copy, ready to paste in |
| `media_needed` | Which existing photo/video to pair it with (repo path), or "new photo needed" if nothing existing fits |
| `posted_date` | Filled in after you actually post it |
| `notes` | Anything platform-specific — a different crop for Instagram, a shorter cut for TikTok, etc. |

## Editing it

It's a CSV, so it opens directly in Excel, Google Sheets, or Numbers if you'd rather
work in a spreadsheet app — just re-save as CSV (not .xlsx) before committing back, or
tell me and I'll take the edited version and reconcile it into the repo file myself.

## Seed content note

The four seed weeks in `post-log.csv` were drafted from what's already true and
published on the site — the 2024–2025 exam results, the nursery graduation numbers,
the monthly outreach description. None of it is invented. Verify against
`src/data/news.ts` if a fact ever needs re-checking, and always re-verify before
reusing an old post — exam results and enrolment figures change every year.
