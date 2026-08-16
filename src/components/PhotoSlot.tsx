import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Placeholder for a photograph that has not been taken/supplied yet.
 *
 * Deliberately NOT stock photography: on a school site, stock images of children
 * who are not your students misrepresent the school. These slots are branded,
 * obviously temporary, and carry the brief for the shot that belongs here.
 *
 * TO REPLACE: drop the real file in `src/assets/`, import it, and swap
 * `<PhotoSlot ... />` for a plain `<img src={...} alt="..." />`.
 * Find every remaining slot with:  grep -rn "PhotoSlot" src/
 *
 * The shot list lives in PHOTOS-NEEDED.md.
 */

export type PhotoSlotRatio =
  | "hero"
  | "wide"
  | "landscape"
  | "square"
  | "portrait"
  /** Sets no size of its own — use when the caller/parent fixes the height. */
  | "fill";

/**
 * `hero` and `wide` are used full-bleed, so they take explicit heights — an
 * aspect ratio at container width balloons past the fold, and capping that with
 * max-height shrinks the width instead. The grid-column ratios keep aspect-ratio,
 * which is what you want when the column sets the width.
 */
const ratioClass: Record<PhotoSlotRatio, string> = {
  hero: "w-full h-72 sm:h-80 md:h-96",
  wide: "w-full h-56 sm:h-64 md:h-72",
  landscape: "w-full aspect-[4/3]",
  square: "w-full aspect-square",
  portrait: "w-full aspect-[3/4]",
  fill: "w-full h-full",
};

interface PhotoSlotProps {
  /** What to shoot. Shown on the placeholder. */
  brief: string;
  ratio?: PhotoSlotRatio;
  /** Suggested minimum pixel width, e.g. "1600px wide". */
  size?: string;
  /**
   * Where to find this shot if it already exists — e.g. an archive folder.
   * Saves whoever fills the slot from hunting for it.
   */
  source?: string;
  /** Drops the icon and tightens padding, for short/constrained containers. */
  compact?: boolean;
  className?: string;
}

export const PhotoSlot = ({
  brief,
  ratio = "landscape",
  size,
  source,
  compact = false,
  className,
}: PhotoSlotProps) => (
  <div
    role="img"
    aria-label={`Photograph placeholder: ${brief}`}
    className={cn(
      "relative flex flex-col items-center justify-center overflow-hidden rounded-lg text-center",
      compact ? "gap-1.5 p-3" : "gap-3 p-6",
      "border-2 border-dashed border-primary/25 bg-primary/[0.06]",
      ratioClass[ratio],
      className,
    )}
  >
    {/* faint diagonal hatch so it reads as "nothing here yet" at a glance */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, hsl(var(--primary)) 0 1px, transparent 1px 9px)",
      }}
    />
    {!compact && (
      <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
        <Camera className="h-5 w-5 text-primary/70" aria-hidden="true" />
      </div>
    )}
    <div className="relative max-w-xs">
      <div className="flex items-center justify-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-widest text-primary/60">
        {compact && <Camera className="h-3 w-3" aria-hidden="true" />}
        Photo needed
      </div>
      <p
        className={cn(
          "font-medium leading-snug text-foreground/75",
          compact ? "mt-1 text-xs" : "mt-1.5 text-sm",
        )}
      >
        {brief}
      </p>
      {size && !compact && <p className="mt-1 text-xs text-muted-foreground">{size}</p>}
      {source && !compact && (
        <p className="mt-2 break-words font-mono text-[0.65rem] leading-snug text-primary/55">
          {source}
        </p>
      )}
    </div>
  </div>
);
