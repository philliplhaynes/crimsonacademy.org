import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The school's social accounts, as circular badge buttons — the same
 * general placement berkeleycarroll.org uses in the dark band at the very
 * bottom of every page.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * Facebook and YouTube are taken from crimsonfoundation.org. Instagram is
 * the school's own account (@crimsonacademykagina), not the Foundation's
 * (@crimsonfoundationinc) — given directly, not looked up. If an account
 * moves, check crimsonfoundation.org first for Facebook/YouTube; Instagram
 * has no sister-site fallback.
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
    href: "https://www.facebook.com/crimsonfoundation/",
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
