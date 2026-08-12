# Running the website on your own computer

## The short answer

**Double-click `Start Website.cmd`.**

A black window opens, and after a few seconds your browser opens the site at
`http://localhost:5173`. Leave the black window open while you look at the
site — closing it stops the website. That's it.

There are two launchers, and the only difference is which version you see:

| Double-click this | You get | Use it when |
| --- | --- | --- |
| **`Start Website.cmd`** | The live editing version, at `localhost:5173`. Saved changes appear in the browser within a second, no refresh needed. | You are editing the site, or just want to look at it. |
| **`View Built Website.cmd`** | The finished version, at `localhost:4173` — the exact files that would be uploaded to crimsonacademy.org, images compressed and code minified. Takes ~15 seconds to build first. | Checking how it will really behave once published, or showing it to someone. |

Both need **Node.js** installed once, from <https://nodejs.org> (pick the "LTS"
version). The launchers check for it and tell you if it's missing. The very
first run also installs the site's building blocks, which takes a few minutes
and only ever happens once.

If a port is already busy the launcher just picks the next free one and prints
the address in the black window — read the `Local:` line if the browser opens
somewhere unexpected.

## Why can't I just double-click an HTML file?

This is the reasonable question, and the answer is that this site isn't a set of
HTML pages — it's one application that builds each page in the browser. Two
things break if you open it straight off the disk:

1. **The file paths are wrong.** The built page asks for `/assets/index.js`,
   and from a local file the browser reads that leading `/` as the root of your
   `C:` drive — it looks for `C:\assets\index.js`, which doesn't exist.
2. **Browsers refuse to run it anyway.** Even with the paths fixed, modern
   browsers block a page opened from `file://` from loading JavaScript modules,
   for security reasons. You get a blank page and a CORS error in the console.

Both are worked around by serving the folder over `http://` instead, which is
all the launchers do — they start a tiny local web server, visible only to your
own computer.

Opening `crimsonacademy-site/dist/index.html` directly gives a blank white page
for exactly these two reasons. It isn't broken; it just needs a server.

## A note on `crimsonacademy-preview.html`

There is a single-file `crimsonacademy-preview.html` in this folder. It *does*
open by double-click, because everything is crammed inside that one file — but
**it is badly out of date**. It's a snapshot of an early, single-page version of
the site: all its links are `#anchor` jumps down one long page, so it has none
of the real Academics, Student Life, Admissions, News & Events, Crimson for
Life or Portal pages, and none of the work done since.

Don't use it to review the site, and don't send it to anyone. Delete it, or
regenerate it, but be aware that a genuinely self-contained single file would
now be very large: every photograph would have to be embedded as text inside the
HTML (roughly a third bigger than the image itself), and the five video clips on
the News page would have to be embedded too. It would run to tens of megabytes.
The launchers are the better answer.

## Running it from a terminal instead

The launchers are just wrappers. From `crimsonacademy-site/`:

```bash
npm install      # once
npm run dev      # live editing, localhost:5173
npm run build    # produce dist/
npm run preview  # serve dist/, localhost:4173
```

## Sharing it with someone on the same network

Add `--host` so other devices — a phone on the same wifi, for testing — can
reach it:

```bash
npm run dev -- --host
```

Vite then prints a `Network:` address alongside the local one. Use that on the
phone. This exposes the site to your local network only, not the internet.
