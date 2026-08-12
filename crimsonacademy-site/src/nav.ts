export interface NavChild {
  label: string;
  href: string;
}

export interface NavSection {
  label: string;
  href: string;
  blurb: string;
  children: NavChild[];
}

export const sections: NavSection[] = [
  {
    label: "About",
    href: "/about",
    blurb: "Who we are, what we believe, and the people who make it happen.",
    children: [
      { label: "Mission & Values", href: "/about#mission" },
      { label: "Our Christian Faith", href: "/about#faith" },
      // The About page carries a history summary again (a milestone rail with
      // all eight chapters), so this points at that section. The full
      // chapter-by-chapter page at /about/history is still a route and is
      // linked prominently from inside the panel — see HistoryPanel.tsx.
      { label: "Our History", href: "/about#history" },
      { label: "Leadership & Staff", href: "/about#leadership" },
      { label: "Contact & Visit", href: "/about#contact" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    blurb: "A pathway from the first day of nursery to the National Exam.",
    /*
       Labels follow the school's own three-division language (Nursery / Lower /
       Upper School) rather than the curriculum's ("Lower Primary"), but the
       hrefs are deliberately unchanged: Footer.tsx, HowItWorks.tsx and
       Support.tsx all link to #lower-primary / #upper-primary / #results, and
       renaming the anchors would silently break those.
    */
    children: [
      { label: "Our Approach", href: "/academics#approach" },
      { label: "Nursery School", href: "/academics#nursery" },
      { label: "Lower School", href: "/academics#lower-primary" },
      { label: "Upper School", href: "/academics#upper-primary" },
      { label: "The National Exam", href: "/academics#results" },
      { label: "Beyond Crimson", href: "/academics#beyond" },
    ],
  },
  {
    label: "Student Life",
    href: "/student-life",
    blurb: "Character formed in worship, in service, on the field, and on the stage.",
    /*
       Labels follow the page's three activity clusters, but the hrefs are
       deliberately reused rather than renamed: About.tsx and Academics.tsx both
       link to #chapel, Academics.tsx links to #wellbeing, and renaming the
       anchors would break those silently. #arts is now "On the Stage" (dance
       and music), #sports is "On the Court", #day is the practicalities panel.
    */
    children: [
      { label: "On the Stage", href: "/student-life#arts" },
      { label: "On the Court", href: "/student-life#sports" },
      { label: "At the Table", href: "/student-life#table" },
      { label: "Where & When", href: "/student-life#day" },
      { label: "Faith & Service", href: "/student-life#chapel" },
      { label: "Health & Wellbeing", href: "/student-life#wellbeing" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    blurb: "How to enroll your child, what it costs, and how to visit us.",
    /*
       #enroll, #fees and #visit are load-bearing anchors and must keep those
       ids: Navbar, Hero, Footer, About and Academics all link straight to
       them. Only the labels and the two new sections (#why, #entry, #team)
       changed when this page was rebuilt.
    */
    children: [
      { label: "Why Crimson", href: "/admissions#why" },
      { label: "Fees", href: "/admissions#fees" },
      { label: "Getting In", href: "/admissions#entry" },
      { label: "The Process", href: "/admissions#enroll" },
      { label: "Our Team", href: "/admissions#team" },
      { label: "Visit Us", href: "/admissions#visit" },
      { label: "FAQ", href: "/admissions#faq" },
    ],
  },
  {
    label: "News & Events",
    href: "/news",
    blurb: "What is happening on campus, and when.",
    children: [
      { label: "School News", href: "/news#news" },
      { label: "Calendar & Term Dates", href: "/news#calendar" },
    ],
  },
  {
    label: "Crimson for Life",
    href: "/crimson-for-life",
    blurb: "Where a gift goes, what it buys, and how to give.",
    /*
       Replaces the old "Support Us" section rather than sitting beside it —
       this is the giving page, and two nav items for one job made the nav
       worse. /support is kept as a hash-preserving redirect in App.tsx, and
       #sponsor / #give / #partners / #annual-report are carried over as ids on
       the new page so the old deep links still land in the right place.
    */
    children: [
      { label: "Why Give", href: "/crimson-for-life#why" },
      { label: "Where It Goes", href: "/crimson-for-life#where" },
      { label: "What a Gift Buys", href: "/crimson-for-life#buys" },
      { label: "Sponsor a Student", href: "/crimson-for-life#sponsor" },
      { label: "Ways to Give", href: "/crimson-for-life#give" },
      { label: "Annual Report", href: "/crimson-for-life#annual-report" },
    ],
  },
  {
    label: "Portal",
    href: "/portal",
    blurb: "Sign in to the Crimson Foundation Portal — grades, attendance, and sponsorship updates.",
    /*
       Placed last, deliberately: this is the newest section and the most
       utility-like (a link-out, not content), so it sits after the six
       content sections rather than interrupting them. Flagged as a judgment
       call in the mockup review — revisit if that reads wrong once live.
    */
    children: [
      { label: "Overview", href: "/portal#overview" },
      { label: "Who Can Access", href: "/portal#roles" },
      { label: "Sign In", href: "/portal#login" },
      { label: "Need Help", href: "/portal#help" },
    ],
  },
];

export const findSection = (pathname: string) =>
  sections.find((s) => s.href === pathname);
