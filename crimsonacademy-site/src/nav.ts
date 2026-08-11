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
      { label: "Our History", href: "/about/history" },
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
    children: [
      { label: "A Day at Crimson", href: "/student-life#day" },
      { label: "Sports & Activities", href: "/student-life#sports" },
      { label: "Arts & Music", href: "/student-life#arts" },
      { label: "Chapel & Devotions", href: "/student-life#chapel" },
      { label: "Health & Wellbeing", href: "/student-life#wellbeing" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    blurb: "How to enroll your child, what it costs, and how to visit us.",
    children: [
      { label: "How to Enroll", href: "/admissions#enroll" },
      { label: "Fees", href: "/admissions#fees" },
      { label: "Visit Us", href: "/admissions#visit" },
      { label: "Frequently Asked Questions", href: "/admissions#faq" },
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
    label: "Support Us",
    href: "/support",
    blurb: "Sponsor a child, give to the school, and meet our partners.",
    children: [
      { label: "Sponsor a Student", href: "/support#sponsor" },
      { label: "Make a Gift", href: "/support#give" },
      { label: "Our Partners", href: "/support#partners" },
      { label: "Annual Report", href: "/support#annual-report" },
    ],
  },
];

export const findSection = (pathname: string) =>
  sections.find((s) => s.href === pathname);
