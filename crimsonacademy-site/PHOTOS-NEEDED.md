# Photos needed — shot list

Every placeholder on the site is a `<PhotoSlot>`. Find them all with:

```bash
grep -rn "PhotoSlot\|photoBrief" src/
```

**Why placeholders and not stock photography.** Stock images of children who are not Crimson
Academy students would misrepresent the school — a prospective parent seeing a stock classroom
reasonably assumes it is *this* classroom. Every well-regarded school site uses its own
photography, and it is consistently cited as the single biggest trust signal a school site has.
So these slots stay visibly empty until real photos exist.

## How to replace a slot

1. Put the file in `src/assets/` (JPEG, sRGB).
2. In the page file, import it and swap the component:

```tsx
// before
<PhotoSlot ratio="wide" brief="Karate or acrobatics practice" size="1600px wide" />

// after
import sportsPhoto from "@/assets/sports-karate.jpg";
<img src={sportsPhoto} alt="Students practising karate in the school yard"
     className="w-full rounded-lg object-cover" loading="lazy" />
```

For a **hero**, remove `photoBrief` and pass `image` instead:

```tsx
<PageHero section={section} title="…" lede="…" image={heroPhoto} imageAlt="" />
```

Hero images sit under a crimson overlay, so `imageAlt=""` is correct — they are decorative, and
the headline already carries the meaning. Inline photos need a real `alt` describing what is shown.

3. Always write `alt` text for inline photos. Describe the scene, not "photo of school".

## Before you shoot

- **Landscape orientation**, shot on the highest resolution the phone/camera offers.
- **Outdoors or near windows.** The existing indoor shots are too dark to use well.
- **Wide and mid shots beat close-ups** of individual faces — better for layout, and it keeps the
  focus on the school rather than on identifiable individuals.
- Shoot **more than you need**, from a few angles. Cropping is easy; reshooting is not.
- Optimize before committing. 2–3 MB phone photos will make the site slow on rural mobile
  connections. Target ~1600px wide and 150–250 KB (the three existing photos went from 2.7 MB to
  230 KB with no visible loss).

## Archive photos — most of the history slots already exist

The parent `Crimson Foundation` folder holds a large photo archive that maps almost exactly onto
the history timeline. **These eight slots are a lookup, not a photo shoot** — each `PhotoSlot` on
`/about#history` prints its likely archive folder right on the placeholder.

| Era | Slot brief | Archive folder (relative to `Crimson Foundation/`) |
|---|---|---|
| 2009 | The children of Kagina, the first visit | `CF Rwanda/CAR Land Purchase` |
| 2010–11 | Community clearing the site; stone foundations | `CF Rwanda/CAR Land Purchase`, `CAR Construction/Primary 1-4` |
| 2011 | The first four-classroom block, newly roofed | `CF Rwanda/CAR Construction/Primary 1-4` |
| 2012–13 | Primary 5 and Primary 6 under construction | `CF Rwanda/CAR Construction/Primary 5`, `/Primary 6` |
| 2013 | The first Primary 6 graduating class | `CF Rwanda/CAR Students` |
| 2016 | Expansion: classrooms, library, teacher housing | `CF Rwanda/CAR Construction/School Expansion`, `/Teacher Housing` |
| 2019 | Bus arriving, mealtime, or an activity session | `CF Rwanda/CAR Karate`, `CAR Soccer`, `CAR Students` |
| 2026 | New courts, paved walkways, planted grounds | `CF Rwanda/CAR Construction/Soccer Facility`, `/Campus` |

Other folders worth mining: `CAR Construction/Church`, `/Community Center`, `/Water & Electricity`,
`/Brick Maker`, `CF Videos/Groundbreaking`, `CF Reports/2018 Annual Report`.

Optimize before committing — see the sizing notes above. The archive originals are full-resolution
camera files and must not ship as-is.

## The list

### Highest value first

| # | Where | Shot | Size |
|---|-------|------|------|
| 1 | `/admissions` hero | A parent and child at the school gate, or a family touring the campus | 2000px wide |
| 2 | `/admissions#visit` | Wide shot of the campus — the classroom block with the crest on the wall | 1600px |
| 3 | `/student-life#sports` | Karate or acrobatics practice, or a football match on the school pitch | 1600px |
| 4 | `/academics#lower-primary` | A P1–P3 classroom mid-lesson: children at desks, teacher at the board | 1200px |
| 5 | `/academics#upper-primary` | The computer lab in use, or a P6 class sitting an exam | 1200px |
| 6 | `/student-life#day` | Students arriving in the morning, or a classroom mid-lesson | 1600px |
| 7 | Home — Lower Primary card | A P1–P3 class at work (can reuse #4) | 1200px |
| 8 | Home — Upper Primary card | P6 students studying, or the computer lab (can reuse #5) | 1200px |
| 9 | `/student-life#wellbeing` | The nursery food program at mealtime, or the school nurse with a student | 1200px |
| 10 | `/news` hero | A recent school event — assembly, sports day, prize-giving | 2000px wide |
| ~~11~~ | ~~`/about#history`~~ | **Done** — all 8 chapters photographed | — |

### Also worth having (no slot yet — would replace or upgrade something existing)

- **Staff portraits — now the single biggest gap, and the page is already built for them.**
  `/about#leadership` lays out all 34 posts; 4 are filled (the school leaders, borrowed from
  crimsonfoundation.org) and **30 are dashed outlines waiting for a face**. Shoot all 30 in one
  session: same wall, same distance, same height, subject facing the light. Square crop, ~800px.
  Then add `{ name, photo }` to the right role in `src/components/StaffDirectory.tsx`.
  Note the four existing leader portraits are greyscale 976×976 — match that treatment, or
  replace all 34 with colour at once so the grid stays consistent.
- **A better nursery photo.** `nursery-graduation.jpg` is only 444×250, the lowest-resolution
  image on the site. It is used in three places and looks soft at every one.
- **The choir performing.** The choir is the school's most-subscribed activity and has no photo.
- **The library.** Built in the 2016 expansion, mentioned in the copy, never shown.
- **School buses.** Referenced under "Getting to school"; a bus with the school crest is a good
  concrete detail.

## Already in use

| File | Source | Where |
|------|--------|-------|
| `graduation-p6.jpg` | report `Pics/grad.png` | Home hero, `/academics` hero, `/support` hero, `/news` story |
| `staff-group.jpg` | report `Pics/staff.png` | `/about` hero, `/about#leadership` |
| `nursery-graduation.jpg` | report `Pics/nursery.png` | `/academics#nursery`, `/student-life#arts`, Home nursery card, `/news` story |
| `students-outreach.jpg` | report embedded `image9` | `/student-life` hero |
| `community-service.jpg` | report embedded `image12` | `/student-life#chapel`, `/news` story |

## Assets found but deliberately not used

- **Horizontal logo lockup** (report embedded `image5.jpeg`) — the full "Crimson Academy" wordmark
  beside the crest. Better than the crest alone for the navbar, but it is a JPEG on solid white,
  which would show as a white box on the cream background. Worth using **if** you can supply it as
  a transparent PNG or SVG.
- **Outreach/home-visit photos** (report `Pics/`: `claire`/`image`, `mama`, `mama2`, `young_mama`,
  `old man`, `preach`, `Norbert`; embedded `image10`, `image11`) — these show the named community
  members whose stories appear in the `Testimonials` section. They are the subject of the separate
  content-sensitivity note in `BUILD-BRIEF.md`.
- **Values venn diagram** (embedded `image2`) — the site renders the six values as cards, which is
  clearer and responsive.
