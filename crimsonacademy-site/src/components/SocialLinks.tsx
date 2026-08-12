import { Facebook, Instagram, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The school's social accounts, as circular outline buttons — the same
 * treatment berkeleycarroll.org uses in the dark band at the very bottom of
 * every page.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * EVERY URL HERE WAS TAKEN FROM crimsonfoundation.org AND CHECKED (HTTP 200).
 * None of them is a guess. If an account moves, check the sister site first.
 *
 * LINKEDIN IS MISSING ON PURPOSE. It was asked for, but the Foundation
 * publishes no LinkedIn account and the obvious guess —
 * linkedin.com/company/crimson-foundation — returns 404. A dead link in the
 * footer of every page on the site is worse than one missing icon, so it is
 * left out until someone supplies the real URL. Adding it back is one entry
 * in the array below plus the Linkedin icon from lucide-react.
 *
 * There is also a live Twitter/X account, twitter.com/crimsonfound (200),
 * left out only because it was not among the four requested. Same one-line
 * addition if it is wanted.
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
    href: "https://www.instagram.com/crimsonfoundationinc/",
    Icon: Instagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@CrimsonAcademy",
    Icon: Youtube,
  },
];

export const SocialLinks = ({ className }: { className?: string }) => (
  <ul className={cn("flex list-none items-center gap-2.5 p-0", className)}>
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
          className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/40 text-primary-foreground/80 transition-colors hover:border-accent hover:bg-primary-foreground/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
        </a>
      </li>
    ))}
  </ul>
);
