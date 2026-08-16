# Crimson Academy — Build Brief (handoff for Claude Code)

You are picking up a website project for **Crimson Academy of Kagina**, a Christian primary
school in Kagina, Kamonyi District, Southern Province, Rwanda. This folder contains a working,
rebranded site scaffold. Read this file first, then start with "Immediate first task" below.

## Stack
- React 19 + Vite 5 + TypeScript
- Tailwind CSS v3 + shadcn/ui (Radix primitives) + lucide-react icons
- **Multi-page** site: react-router-dom v7, 7 real routes, route-level `React.lazy`
  code splitting. `vite-plugin-singlefile` has been REMOVED (a single inlined file was
  the wrong trade for rural low-bandwidth mobile once real photos landed).
- Chosen to match the sister site **crimsonfoundation.org** (same React/Vite/Tailwind/shadcn stack)
  so components, theming, and conventions can be shared. Base template: leoMirandaa/shadcn-landing-page (MIT).

## How to run
```
npm install
npm run dev      # http://localhost:5173  (live, hot-reload)
npm run build    # chunked static output to /dist  (~1.2 MB total, ~118 KB gz first load)
npm run preview  # serve the production build locally
```
**Deploying:** static host, publish `/dist`. Because routing is client-side, the host MUST
rewrite unknown paths to `index.html` or deep links 404. Config is already committed:
`public/_redirects` (Netlify / Cloudflare Pages) and `vercel.json` (Vercel). For any other
host, add the equivalent SPA fallback rule.

Note: `OPEN-PREVIEW.html` is a stale single-file snapshot from before the multi-page
conversion — it no longer reflects the site and can be deleted.

## Current state (done)
- Full crimson/gold/cream theme in `src/App.css` (CSS variables; light + dark). Fonts: Fraunces
  (headings) + Inter (body), loaded in `index.html`.
- Brand crest logo at `public/crimson-tree.png` and `src/assets/crimson-tree.png`.
- **Nav tree is defined once in `src/nav.ts`** and drives the desktop dropdowns, the mobile
  accordion, each page's section sub-nav bar, and the footer sitemap. Add a page there and it
  appears in all four places.
- **7 routes**, one page component each in `src/pages/`: Home, About, Academics, StudentLife,
  Admissions, News, Support, plus NotFound. Sub-menu items are anchors within their section page
  (`/academics#results`), so there are no thin stub pages.
- Shared page shell in `src/components/PageHero.tsx`: `PageHero` (breadcrumb + title + lede +
  sticky section sub-nav) and `Section` (id + eyebrow + heading, `scroll-mt-32` to clear the two
  sticky bars). Modelled on berkeleycarroll.org's interior-page pattern.
- Homepage sections remain in `src/components/` and are assembled by `src/pages/Home.tsx`.
- **5 real photos** in `src/assets/`, all optimized (2.7 MB originals → 28–228 KB):
  `graduation-p6.jpg`, `staff-group.jpg`, `nursery-graduation.jpg` (from the report's `Pics/`
  folder) plus `students-outreach.jpg` and `community-service.jpg` (extracted from the images
  embedded in the .docx itself — `unzip -o report.docx -d ex` then look in `ex/word/media/`).
- **`/about#history` is a full illustrated history**, modelled on berkeleycarroll.org's
  school-history page: eight named narrative chapters (2009 first visit → 2026 campus completion),
  **all eight photographed**, sitting in alternating full-bleed colour bands like theirs
  (they alternate off-white against burgundy). The two crimson bands are placed deliberately on
  2013 and 2026 — the two chapters where something is achieved — so colour marks the milestones
  rather than just striping the page. Then a **key-dates carousel** with play/pause
  (`KeyDatesSlider.tsx`), then the three head teachers.
- **`/about#mission` carries the Core Values Venn** (`src/components/CoreValues.tsx`), rebuilt as
  SVG from the owner's diagram rather than shipped as a flat image, so it stays sharp, scales,
  works in dark mode (the fills are theme tokens, not fixed hex), and is readable to a screen
  reader. The structure is load-bearing: **Truth, Discipline and Service** are the values that are
  practised, and **Faith, Hope and Love** are what appears where they overlap — the same three
  1 Corinthians 13 ends on. Hovering or focusing a verse lights its region via SVG `clipPath`
  lenses. The SVG is `aria-hidden`; the `<dl>` beneath it is the accessible source of the same
  content, so nothing is lost without it.
- **`src/components/Carousel.tsx` is the shared slider.** Key dates, school leaders and the staff
  directory all use it, so the autoplay/pause/counter behaviour and its accessibility guarantees
  exist in one place. Props: `label`, `items`, `itemClassName`, `autoplay`, `railClassName`.
  Two non-obvious details are commented in the file: the hover/focus pause handlers must sit on
  the track and not the wrapper (otherwise clicking Play focuses the button and instantly pauses
  it), and the counter shows a visible range because a single index can never reach the total.
  Lives in `src/components/SchoolHistory.tsx`; edit the `chapters`, `keyDates`, and `heads`
  arrays at the top. Note it renders its own `<section>` rather than being wrapped in `Section`,
  because the bands need to break out of the container to go full-bleed.
- **Remaining photo gaps are marked in-page**, not left blank: `src/components/PhotoSlot.tsx`
  renders a branded "photo needed" placeholder carrying the brief for that shot, and `PageHero`
  takes a `photoBrief` prop for heroes. 8 slots across the site (all history slots are filled). Deliberately not stock
  photography — stock images of children who are not Crimson students misrepresent the school.
  **The shot list and replacement instructions are in `PHOTOS-NEEDED.md`.**
  Find every slot with: `grep -rn "PhotoSlot\|photoBrief" src/`
- Content is real, pulled from the 2024–2025 Annual School Report (see "Content sources").
- Builds clean, lints with 0 errors, all routes verified in-browser (light + dark, desktop +
  mobile, keyboard nav).

## Placeholders / TODO (not yet real)
- **Fee schedule** is the biggest content gap — `/admissions#fees` says "contact the office".
  Parents look for fees immediately; get real numbers in there.
- **Giving is not transactional.** `/support` routes donors to email. Wire a real donation URL
  (the Crimson Foundation's processor) when there is one.
- **Email** `info@crimsonacademy.org` is still unconfirmed — verify before launch.
- **Staff directory is a searchable, text-only 4-across grid**, modelled on
  berkeleycarroll.org's faculty/staff directory: name/role search box + department filter pills
  above a grid of name + position, no photographs. Names are crimson (`text-primary`); the one
  unnamed post (Driver) renders muted as "Name to come" so the directory still shows the
  true shape of the staff. Each entry has a small crimson heart as a list marker — purely
  decorative (it no longer means "photo missing" as it did when the grid had photographs), kept at
  `fill-primary/25` and `h-3 w-3` so the repeated icon reads as texture rather than as competing icons,
  and `aria-hidden` so a screen reader doesn't announce every one. It sits in its own flex column
  so names that wrap to two lines stay aligned. Each entry sits in a translucent neutral panel
  (`bg-foreground/[0.05]`) — deliberately NOT `bg-muted`, because every token in this theme is at
  hue 40 (warm cream/tan) and would tint the boxes beige rather than grey; `--foreground` is
  near-neutral, so a few percent of it desaturates the cream underneath into actual grey, and
  because it's alpha-over-backdrop it inverts correctly in dark mode instead of staying a pale box
  on a dark page. 4 columns at `lg`, 3 at `sm`, 2 on mobile. Two things deliberately
  don't carry over from theirs: pagination (theirs is database-backed at 298 people; we have 33,
  so showing all is less friction) and per-person bio links (we have no per-person pages — the
  crimson is styling, not a link colour; if bio pages ever exist these become `<Link>`s).
  **The "School leaders" section above it is a separate treatment** — a 5-across grid of square
  portrait photos with titles and one-line notes, since those five are the only staff with
  photographs and bios. It was a carousel; it's a grid now because five fit in one row at `lg`
  and the carousel was hiding the fifth behind a scroll. All in `StaffDirectory.tsx`.
- **Data model is person-first, not role-first (fixes a double-counting bug).** The directory used
  to be a flat list of *posts*; a person holding two jobs (a class teacher who also leads a
  division, or runs an activity) appeared as two separate cards, so the grid both overcounted the
  school and could show one of a dual-role person's titles without the other. `staff` in
  `StaffDirectory.tsx` is now `StaffMember[]`, one entry per human, each carrying a `roles:
  Assignment[]` array — the card renders one line per role, and the department filter matches a
  person if *any* of their roles is in that department. Five people currently carry two roles:
  Martha (Nursery C teacher + Nursery leader), Elizabeth (P4B teacher + Chorus lead), Robert (P3A
  teacher + Pastor), Damascene (Nursery B teacher + Lower school leader), and David (P5A teacher +
  Upper school leader). **Ashela Claire Ineza was removed entirely** (both the directory and the
  School-leaders photo grid) — she no longer works at the school; David's leadership card has no
  photo on file, so it shows the same heart placeholder the directory uses for unnamed posts.
  **HEADCOUNT IS NOW 33, 32 NAMED** — this supersedes the earlier "36, not the report's 34" note
  below. Counting each of the five dual-role people once, not twice, accounts for the difference
  from the annual report's stated 34; one person is still unaccounted for and worth confirming with
  the school. **Two things still need the owner's confirmation, flagged in code comments above
  `staff` and `leaders`:** (1) Damascene's photo is reused from the one crimsonfoundation.org files
  under "Jean Damascene Twizeyimana," captioned there as *Upper* School Leader — the owner says
  Damascene leads the *Lower* School and David leads the Upper, so this is almost certainly the
  same man with a stale title on the sister site, but if they're two different people the photo is
  wrong and must come down; (2) "Damascene teaches Nursery B" was inferred from where his teaching
  post already sat in the roster, since the request that added his leadership role didn't name
  which class he teaches — worth a quick confirm.
- **Role lines now carry a bold department tag, and leadership renders first.** Each role line in
  the directory grid is prefixed with a small bold coloured tag (`roleTag()` in
  `StaffDirectory.tsx`): crimson "Leadership" for a Leadership & administration role, gold
  "Activities" for an activity, and — since the school actually has three academic departments,
  not a generic "Teaching" bucket — **Nursery School / Upper School / Lower School** for a
  division teacher or that division's leader (`DEPARTMENT_BY_TITLE` maps title → department).
  For a dual-role person, the Leadership line is sorted to render first (stable sort, only
  Leadership moves), so a card reads leadership title, then department, then class — e.g. David's
  card shows "Leadership — Upper school leader" above "Upper School — Upper school teacher — P5A".
  Operations keeps its plain, untagged title, unchanged, per the owner. **Assumption flagged in a
  comment above `DEPARTMENT_BY_TITLE`, not confirmed with the school:** language teachers (French,
  Kinyarwanda), the two activities instructors, and the school-wide admin roles (Head Mistress,
  Accountant, Pastor) don't obviously belong to one of the three departments, so they fall back to
  a generic tag ("Teaching" or "Leadership") rather than being force-fit into Nursery/Upper/Lower.
  Worth confirming whether any of them actually do belong to one.
- **Role titles are now the person's actual title, stacked underneath the department tag.**
  Previously a Teaching role showed a generic bucket + class as one inline line ("Lower school
  teacher — P3B"); it now shows the real title on its own line under the tag ("Lower School" /
  "P3B Teacher"). Classroom teachers across all three departments were renamed to
  "{class} Teacher" (P6, P5A, P4A, P3B, Nursery C, etc.), and language teachers to "French
  Teacher" / "Kinyarwanda Teacher". The `Uganda` qualifier some teachers carried (Phillip, Frederic,
  Esther) moved out of the class code and into `detail`, so it now renders as "P4A Teacher —
  Uganda" rather than being smushed into the class string. **Teaching assistants were
  deliberately left alone** ("Teaching assistant — Nursery Top") — they aren't teachers, so the
  "{class} Teacher" rename doesn't apply to them; they still carry a Nursery School department tag.
  `Assignment` gained an explicit `department` field (`StaffDirectory.tsx`) rather than inferring
  the department from title text — titles are now per-person and no longer usable as a lookup key.
- **Department tag is full-opacity now, not diluted.** The neutral (non-Leadership,
  non-Activities) department tag was `text-foreground/55`, which read noticeably fainter/less bold
  than Leadership's full-strength crimson or Activities' full-strength gold despite already being
  `font-bold` — changed to plain `text-foreground` so all three read with equal weight.
- **Role reassignments per the owner (all in the `staff` array):** Pastor moved from Robert to
  Frederic — Frederic now holds three roles (P2B Teacher, Music lead, Pastor) and Robert holds two
  (P3A Teacher, Futbol Coach). Robert gained the "Futbol Coach" activity; Frederic gained "Music
  lead". The three teaching assistants were reassigned from a shared "Nursery Top" class to one
  nursery classroom each, matching the three nursery teachers — Marie Louise → Nursery A, Francine
  → Nursery B, Judith → Nursery C — and their title changed from "Teaching assistant" to "TA"
  (rendered "Nursery A — TA" etc.) accordingly. No headcount change — still 33 people, 32 named;
  only which roles land on which person shifted.
- **Teachers are now grouped and ordered Nursery School → Lower School → Upper School.** The
  `staff` array's teacher entries were physically reordered into three blocks (Leadership-only,
  Activities-only, and Operations entries kept their original positions — only the teacher blocks
  moved). All four language teachers were also assigned a specific department for the first time:
  **Innocent, Valentine, and Vincent → Upper School; Clemance → Lower School** — so they now render
  inside those blocks (Clemance among the Lower School classroom teachers, the other three at the
  end of Upper School) rather than in a separate "Language teachers" section, which no longer
  exists since every Teaching-group entry now has a department. (Note there are two people named
  "Valentine" — the Nursery A teacher and the Kinyarwanda teacher who just got Upper School; don't
  conflate them when editing.) The department field remains optional on `Assignment` as an escape
  hatch for any future Teaching role that doesn't fit one of the three.
- **Directory order is now computed, not hand-maintained.** After reordering the array manually
  twice in a row for department changes, that became a liability — `StaffDirectory.tsx` now sorts
  the grid at render time via `compareStaff`/`staffSortRank`: department first (Nursery → Lower →
  Upper, `DEPARTMENT_ORDER`), then the person's teacher title alphabetically. A person's rank comes
  from their Teaching role if they have one (so David, a teacher + Upper School leader, sorts with
  Upper School, not with Leadership); people with no Teaching role keep the array's original
  relative order within their bucket (Leadership-only first, then Activities-only, then
  Operations) since nothing asked to reorder those. **The physical order of the `staff` array no
  longer determines what's displayed** — it's grouped for human readability only. Reassigning a
  department now just changes that one field; the grid reorders itself.
  **Valentine the Kinyarwanda teacher moved from Upper School to Lower School department** (there
  are two Valentines — Nursery A teacher and this one; a code comment now flags the collision at
  her entry). Applying the new sort put language teachers ("French Teacher", "Kinyarwanda Teacher")
  alphabetically first within their department block, ahead of the P-numbered classroom teachers —
  a natural side effect of sorting by title text, not a deliberate placement choice.
- **Languages is now its own department**, not folded into Upper/Lower School. `Department` gained
  a fourth member (`"Languages"`), appended to `DEPARTMENT_ORDER` after the three age divisions, so
  the four language teachers (Innocent, Clemance, Valentine the Kinyarwanda teacher, Vincent) sort
  and tag as "Languages" and render as their own block at the end of the teacher list, physically
  regrouped together in the `staff` array for readability (previously split across Lower/Upper
  School to match a now-superseded department assignment). This also resolves the odd side effect
  from the previous change, where language-teacher titles sorted alphabetically ahead of the
  P-numbered classroom teachers within Upper/Lower School — Lower and Upper School are pure
  classroom-teacher blocks again.
- **Teaching assistants' detail changed from "TA" to "Teacher Assistant"** (spelled out, per the
  owner) — cards now read "Nursery A — Teacher Assistant" etc. instead of "Nursery A — TA".
- **Leadership titles are now consistently capitalized "X School Leader".** The `staff` array had
  lowercase "Upper school leader" / "Lower school leader" while the `leaders` photo-grid array
  already used title case — normalized to match. "Nursery leader" / "Nursery Leader" also gained
  the word "School" for consistency with the other two: **Nursery School Leader**, in both arrays.
- **Innocent, the Activities Gymnastics & football instructor, was removed — no longer at the
  school.** There are two people named Innocent (the other is the Languages French teacher, still
  on staff); confirmed with the owner which one before removing. **HEADCOUNT is now 32, 31 named**
  (was 33/32). Eugene (Karate) is now the only named Activities-only staff member.
- **Alex's title changed from "Security guard" to "Landscaper / Security Guard"** — he holds both
  responsibilities. Christophe remains "Security guard" only (unchanged, different person).
- **Motion/color audit fixes** (from the site-wide review — full findings are in the conversation,
  not restated here): reduced-motion is now respected globally, not just in `Carousel.tsx` —
  `index.css`'s `scroll-behavior:smooth` is guarded by `@media(prefers-reduced-motion:reduce)`,
  and the hash-link smooth-scroll in `App.tsx` checks a new `src/lib/motion.ts` helper
  (`prefersReducedMotion()`). Dark mode no longer flashes the wrong theme on load — `index.html`
  has an inline script (kept in sync with `main.tsx`'s actual `ThemeProvider` props:
  `storageKey="ca-theme" defaultTheme="light"`) that sets the theme class before React mounts.
  `ScrollToTop.tsx`'s back-to-top button now shares the same `scrollToTop()` helper instead of a
  third, slightly different scroll call. Footer links now have `transition-colors` like every
  other link on the site. The orphaned `.shadow`/`shadow-slide` keyframe in `index.css` (unused,
  leftover from the template) is deleted. The homepage's section-tint rhythm now alternates
  cleanly like every inner page does — `About.tsx` (home) and `FAQ.tsx` gained `bg-secondary/40`,
  closing two runs of 2–3 consecutive untinted sections. The two `text-accent`-on-crimson usages
  (Contact eyebrow, SchoolHistory band labels) were confirmed correct, not bugs — `--eyebrow` is
  tuned for the cream background and goes dark-on-dark on crimson — and now carry a comment saying
  so. Left alone, per the review: no scroll-reveal animation was added anywhere (the audience is
  rural mobile — that restraint was intentional, not an oversight), and the cross-page imbalance
  in how much full-bleed crimson About vs. other pages use was flagged as a scope decision, not
  changed.
- **Homepage hero photo replaced** with `home-hero-dancing.jpg` (from `dancing.jpeg`) — students
  clapping and dancing in a circle in the schoolyard. Swapped only in `Hero.tsx`; `graduation-p6.jpg`
  is still used independently on Academics, News, and Support and was untouched. Reused the existing
  left-to-right gradient overlay (`from-primary via-primary/85 to-primary/30`) rather than the flat
  overlay used elsewhere — it was already well-suited to a wide action photo with text on the left.
  **Caveat:** the source file is only 960×640 — small for a full-bleed hero that can stretch past
  1900px wide on large monitors. It reads fine at the sizes tested, but if a higher-resolution
  version of this photo exists, swap it in; `add-photo` never upscales, so a low-res source will
  cap the output at its native size.
- **/about design review fixes (all four applied):**
  1. Removed genuine content duplication — "an environment that mirrors the character of Christ"
     was stated 4 times back-to-back (Faith's H2 title, Core Values' intro paragraph, Faith's own
     intro paragraph, and CoreValues' own diagram caption). Cut the two redundant paragraphs;
     Faith's intro now cross-links to `/about#mission` instead of restating it.
  2. Contact & Visit is now full-bleed with a photo + crimson overlay (`IMG_8085`, three students
     in Crimson Academy shirts), matching the hero treatment — closes the page the way it opens.
     Not built with the shared `<Section>` (that constrains backgrounds to the container); see
     `SchoolHistory.tsx` for the same full-bleed pattern. The "Arrange a visit" card is opaque
     (`bg-background`, not the usual translucent `bg-secondary/40`) so it stays legible over a photo.
  3. Standardized the Faith section's two-column grid to 1:1, matching Mission (was 3:2 — no
     reason for the two to differ).
  4. `PageHero`'s `imagePosition` doc comment now includes the worked-example math (measure
     container height, scaled height, overflow, subject position → derive Y%) so the next person
     tuning a crop isn't starting from scratch. Both this hero photo and the Contact photo have
     inline comments explaining their specific Y value and why.
- **`/about` hero photo replaced** with `about-hero-team.jpg` (from `IMG_0749.JPG`) — staff/team in
  maroon polos lined up in front of the crest-painted wall on the paved courtyard. The old
  `staff-group.jpg` is no longer imported anywhere.
- **The Christian Faith section pairs a photo with a second verse.** `faith-potters-hands.jpg`
  (from `IMG_8188.JPG`, 2MB → 124KB) shows a child's hand and a clay-covered older hand shaping a
  pot together, paired with Jeremiah 18:6 ("Like clay in the potter's hand, so are you in My hand")
  beside the existing Mark 10:45 quote. The pairing isn't arbitrary — the paragraph beside it
  already said faith "shapes how teachers speak to children," so the potter's-hand verse echoes
  language already on the page rather than being bolted on.
- **Every unphotographed staff card shows a solid crimson heart**, not initials or a generic
  person icon — named or blank, the treatment is the same, so a name isn't mistaken for a face.
- **`/about#mission` carries a real photo now**, not a placeholder box: a student joyfully holding
  the carved wooden school crest overhead (`crimson-sign-boy.webp`). The source JPG had a white
  studio backdrop; it was chroma-keyed to a true transparent WebP (84 KB, was 1.5 MB as PNG) so it
  sits directly on the page with a soft crimson glow behind it, matching the homepage hero
  treatment. The "At a glance" filler box that used to occupy that slot is gone.
- ~~HEADCOUNT NOW 36, NOT THE REPORT'S 34 — needs confirming.~~ **SUPERSEDED — see the person-first
  data model bullet above.** The 36-count came from a role-first list that showed dual-role staff
  (Martha, Elizabeth, Robert, Damascene, David) as two separate posts each; once the model became
  person-first the true count is 33 (32 named). Left here for history — the mapping questions this
  bullet raised (whether the report already counted these leaders among the classroom teachers) are
  resolved: it did, they were the same people, and the roster now reflects that.
  ~~Staff directory: 34 of 36 posts named, 5 with portraits.~~ **SUPERSEDED** — now 32 of 33.
- **No news pipeline.** `/news#news` has 3 hand-written stories from the annual report. There is
  no CMS — new stories mean a code edit.
- **No Child Safeguarding or Privacy page.** The old footer linked to both with dead `#` hrefs;
  the links are removed rather than left dead. A real safeguarding policy page matters for a school.
- **No i18n.** English only; instruction is EN/FR/Kinyarwanda. Add a language switcher (i18next)
  — for a Rwandan school this likely outranks most remaining nav work.
- ~~Student count 620 vs 780~~ **RESOLVED: 780.** The report's own enrollment table sums to 780
  (Nursery 150, P1 131, P2 121, P3 116, P4 101, P5 117, P6 44). The "620" is stale prose in the
  history section, not a competing figure.

## IMPORTANT — content sensitivity (review before going public)

**1. Testimonials — still unresolved, top launch blocker.**
The annual report's testimonials are **religious-conversion stories of named, vulnerable community
members** (an abuse survivor, a 75-year-old widow, a named Muslim→Christian conversion). The
`Testimonials` section currently uses short, dignified quotes with names. Before publishing:
get explicit written consent, or switch to first-name-only / anonymized.

**2. Photos of students.** Photo selection and consent are the school's call and were signed off
by the owner. In use: the P6 and nursery graduation group shots, plus two outreach photos showing
students in uniform. All are the school's own photographs, already published in the annual report.

**3. Excluded photos.** The outreach/home-visit photos that centre on the *named adult community
members* from the testimonials were left out (`Pics/`: `claire`/`image`, `mama`, `mama2`,
`young_mama`, `old man`, `preach`, `Norbert`; embedded `image10`, `image11`). They belong to the
testimonial-consent question in point 1 rather than the student-photo question. See
`PHOTOS-NEEDED.md` for the full inventory of what was used and what was not.

**4. Do not publish the internal benchmark section.**
The report candidly self-assesses against the school's own targets: school-wide average **66.46%**
(below the 70% target), transition rate 78% (below 90%), repetition 23% (above 20%), with P1A
repetition at 49%. This is honest internal reporting and it is *good* that it exists — but it is
not marketing copy. The site therefore cites only the **P6 National Exam** results (90.4%, all
Division A), which are separate and genuinely excellent. Do not let anyone "simplify" the site into
implying 90.4% is a school-wide average.

**5. Ethnicity and gender breakdowns.** The report contains both; these were deliberately NOT
published on the site. Keep it that way. (Aggregate enrollment-by-grade totals ARE published on
`/academics#upper-primary` — those are fine.)

## Brand tokens (already in src/App.css)
- Primary (crimson) `hsl(352 66% 33%)`; Accent (gold) `hsl(46 68% 47%)`;
  Background (cream) `hsl(40 50% 96%)`; Foreground (ink) `hsl(0 12% 12%)`.
- Dark mode = deep maroon bg with gold accent.
- Logo palette: maroon `#6f1515`, cream veins `#f0f0c0`, shield red `#c6202a`, gold `#d9a441`.

## Content sources (in the parent Crimson Foundation folder)
- Annual report: `CARAnnualSchoolReport_20242025.v2.docx` (mission, values w/ verses, history,
  educational model / 5 pillars, national exam results, programs, principal, staff counts).
- Key facts already used: #1 in Southern Province on National Exams (nearly every year since 2013);
  P6 2024–25 average 90.4%, all Division A, all placed in top boarding schools; founded 2011;
  ~780 students; 34 staff; Principal MUKABIRINDA Marie Claire; partners Crimson Foundation & Jenzabar.
- Sister site for design/color reference: `../crimsonfoundation.org` (React/Vite/Tailwind/shadcn;
  note: there is a `Github_Token.txt` in that folder — move it out and rotate the token).
- Optional: an interactive 3D/flat "tree entry" splash was mocked earlier
  (`crimsonacademy.org/content/`) — could become a landing hero if desired.

## Immediate first task
1. `npm install` then `npm run dev`; open http://localhost:5173 and confirm the site renders
   (if blank, check the terminal + browser console and fix).
2. Replace the placeholder links/email with real values (ask the owner for: Apply URL, Give/Sponsor
   URL, Foundation partner URL, Portal URL, contact email).
3. Then pick a next milestone with the owner: real photography, EN/FR/RW i18n, or deployment
   (Netlify/Vercel/Cloudflare Pages — static build, `npm run build`, publish `/dist`).

## Group home page (`../content/home-mockups/`)
Six redesigns of the old `content/crimson-tree-gold.html` splash as a real group home page for
**Crimson**. Open `home-mockups/index.html` for the comparison board. Two structures:

**Set A — three organisations** (whole canopy = Academy, trunk = Investments, roots = Foundation):
- `01-ascent.html` — light, editorial, restrained (Cormorant). Tiers align to the tree region they
  name; hovering one makes that part glow.
- `02-nightfall.html` — the original's dark ember/gold drama, rebuilt to scroll, work on touch,
  and be keyboard-navigable.
- `03-atlas.html` — architectural asymmetric split, numbered 01/02/03 index, Fraunces.

**Set B — five leaves, five schools** (7 nodes; the owner's mapping):
lower-left = Kagina/Rwanda, lower-right = Uganda, middle-left = South America,
middle-right = Asia, crown = Sister Schools (two placement links), trunk = Investments,
roots = Foundation.
- `04-herbarium.html` — annotated botanical plate; 7 labels on hairline ticks outside the artwork.
- `05-constellation.html` — dark; 7 numbered gold node buttons on the tree, synced both ways with
  the cards.
- `06-ledger.html` — numbered markers matched to a two-part index (canopy 01–05, support 06–07).

Each Set B file has a single `URLS` block at the top. Filled: `kagina`, `investments`,
`foundation`. Still empty: `uganda`, `southAmerica`, `asia`, `sisterA`, `sisterB` — these render a
visible "Link to come" rather than a dead link. Fill one in and that node becomes a live link
automatically.

### The three live destinations
| Entity | Body link goes to | Notes |
|---|---|---|
| Crimson Academy of Kagina | `https://crimsonacademy.org` | |
| Crimson Investments | `investments.html` | public overview → links through to the console |
| Crimson Foundation | `https://crimsonfoundation.org` | |

`investments.html` is a short public overview page for the trunk, shared by all six mockups. It
explains the roots→trunk→canopy flow, describes the Crimson Swarm ops console (and that it needs
sign-in), and carries a not-an-offer / not-advice notice. **It makes no factual claims** about
strategy, results, or assets — there is a visible "copy still needed" block listing what only the
owner can supply: legal entity and jurisdiction, regulatory status, who manages the capital, and how
returns relate to Foundation funding. Footers still link the console directly.

All six carry real copy/meta and fix what the splash could not do: touch, keyboard, screen
readers, SEO, reduced motion. 12–20 KB each plus one shared 86 KB `tree.png`, vs 244 KB for the
old single file. Zero dead links in any of them.

**Still worth a pass:** the copy describing Investments in the mockups ("patient, long-horizon
capital") came from the old tree page and reads like an endowment, while the actual platform is
systematic trading. Reword once the entity details are settled.

**Removed at the owner's request** (all six): the statistics band (780 students / #1 Southern
Province / 90.4% / countries served) and the "Where We Work — seven countries" section. Set A's
masthead nav went with them — only one anchor target remained, so the sticky bar is now just the
wordmark. Set B keeps a two-item nav (Schools / Support). Dead CSS for those blocks was stripped.

Note: the old tree page labelled Rwanda/Uganda/Tanzania/Nicaragua as Academy campuses while
crimsonfoundation.org lists 7 *Foundation* regions. Set A sidesteps this; Set B uses the owner's
campus mapping above.

`Footer.tsx` now has a "The Crimson family" block linking the Foundation and Jenzabar. The
group-home link is gated behind a `GROUP_HOME` constant (currently `""`, so it is omitted) —
set it once you decide where the group page is hosted.

## Notes
- Path is under OneDrive (`C:\One\...`); if `npm install` throws EPERM/file-lock errors, pause
  OneDrive sync or move the project to a non-synced path (e.g. `C:\dev\crimsonacademy-site`).
- Requires Node 18+ (`node -v`).
