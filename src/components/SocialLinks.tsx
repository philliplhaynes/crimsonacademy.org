import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * lucide-react (and @radix-ui/react-icons, the other icon set already in
 * this project) is a generic icon set — neither has a TikTok mark. Rather
 * than pull in a whole brand-icon package for one glyph, this is the
 * official TikTok logo path from simple-icons (MIT), inlined. Solid fill,
 * not a stroke icon like lucide's, so `strokeWidth` (passed uniformly to
 * every icon below) has no visible effect here — harmless, just unused.
 */
const TikTokIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

/**
 * The school's social accounts, as circular badge buttons — the same
 * general placement berkeleycarroll.org uses in the dark band at the very
 * bottom of every page.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * YouTube is taken from crimsonfoundation.org. Facebook, Instagram and
 * TikTok are the school's own accounts (@crimsonacademykagina, all three)
 * rather than the Foundation's — given directly, not looked up. If an
 * account moves, check crimsonfoundation.org first for YouTube; the other
 * three have no sister-site fallback.
 *
 * LINKEDIN HAS NO REAL URL YET. It was asked for twice now. Checked again
 * before adding this placeholder: crimsonfoundation.org's own homepage
 * lists Twitter/X, Instagram, Facebook and YouTube — no LinkedIn — and the
 * obvious guess, linkedin.com/company/crimson-foundation, doesn't resolve
 * to a company page at all; it redirects to LinkedIn's generic logged-out
 * language picker, not a 404 exactly, but not a real profile either.
 *
 * Rather than link that (a dead link in the footer of every page is worse
 * than a missing icon — same reasoning as before) or leave the icon out
 * again, it renders as a disabled placeholder styled IDENTICALLY to the
 * three live badges — same solid gold fill, same size, same icon weight —
 * so the row reads as one consistent set rather than singling this one out
 * as different. What actually makes it a placeholder and not a real link is
 * structural, not visual: a <span>, not an <a>, so there is no href to go
 * stale or 404, plus aria-disabled and a title/aria-label that say why. The
 * moment a real URL exists, move "LinkedIn" from PLACEHOLDER_LABEL into
 * `accounts` below with its href; nothing else about this file needs to
 * change.
 *
 * There is also a live Twitter/X account, twitter.com/crimsonfound (200),
 * left out only because it was not among the accounts requested. Same
 * one-line addition to `accounts` if it is wanted.
 * ─────────────────────────────────────────────────────────────────────────
 */
const accounts = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/crimsonacademykagina",
    Icon: Facebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/crimsonacademykagina/",
    Icon: Instagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@CrimsonAcademy",
    Icon: Youtube,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@crimsonacademykagina",
    Icon: TikTokIcon,
  },
];

const PLACEHOLDER_LABEL = "LinkedIn";

export const SocialLinks = ({ className }: { className?: string }) => (
  <ul className={cn("flex list-none items-center gap-3", className)}>
    {accounts.map(({ label, href, Icon }) => (
      <li key={label}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          /* The accessible name has to say where the link goes and that it
             leaves the site — the icon alone is not a name, and screen-reader
             users get no visual cue that a new tab is about to open. */
          aria-label={`${label} (opens in a new tab)`}
          /*
            Filled gold badge, not a thin translucent outline — an outline
            here read as barely-there against the crimson field. Solid
            bg-accent at rest, not just on hover, so the icons are legible
            without needing a pointer to find them.
          */
          className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm transition-colors hover:bg-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          <Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" strokeWidth={2.25} />
        </a>
      </li>
    ))}
    <li>
      <span
        role="img"
        aria-disabled="true"
        aria-label={`${PLACEHOLDER_LABEL} — account coming soon`}
        title={`${PLACEHOLDER_LABEL} — account coming soon`}
        /*
          Same bg-accent/text-accent-foreground/size as the live badges
          above — matched on request rather than visually dimmed, so the
          row reads as one set. cursor-default, not -pointer: it isn't an
          interactive control being blocked, it's just not a button at all,
          and there's no hover state to invite a click that goes nowhere.
        */
        className="flex h-10 w-10 cursor-default items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm"
      >
        <Linkedin className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" strokeWidth={2.25} />
      </span>
    </li>
  </ul>
);
