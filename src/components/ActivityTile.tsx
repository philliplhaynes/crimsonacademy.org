import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * One activity, as a photo tile with a crimson caption block.
 *
 * The shape is borrowed from Berkeley Carroll's Student Life page, where each
 * tile is a *doorway*: photo, name, arrow, and the content lives on a sub-page
 * one click away. Crimson has no sub-pages and shouldn't grow eight of them for
 * eight activities, so the silhouette is kept and the narrative comes with it —
 * caption block for the name and hook, cream body below for the prose.
 *
 * `span="full"` makes the tile straddle both grid columns and, above `lg`, turn
 * side-by-side: used for the two activities with the most to say (football, and
 * the after-school coaching programme).
 */
export interface ActivityTileProps {
  name: string;
  /** One line under the name, inside the crimson block. */
  hook: string;
  image: string;
  imageAlt: string;
  /**
   * Small chips above the prose — grades, who leads it. Prefix an entry with
   * "?" to render it as a dashed "to confirm" chip instead of a solid one, for
   * detail the school hasn't supplied yet. Better an visible gap than a
   * plausible invention: a parent who turns up on the wrong day does not come
   * back.
   */
  meta: string[];
  /**
   * Narrative paragraphs. Nodes rather than strings so a paragraph can carry
   * <strong> without the component having to inject raw HTML.
   */
  body: React.ReactNode[];
  span?: "half" | "full";
  /** Crop nudge for photos whose subject isn't centred. */
  imagePosition?: string;
}

export const ActivityTile = ({
  name,
  hook,
  image,
  imageAlt,
  meta,
  body,
  span = "half",
  imagePosition,
}: ActivityTileProps) => {
  const wide = span === "full";

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl bg-card shadow-[0_10px_28px_hsl(var(--ink)/0.10)]",
        wide && "sm:col-span-2 lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]",
      )}
    >
      <div className={cn("overflow-hidden bg-secondary", wide ? "lg:h-full" : "")}>
        <img
          src={image}
          alt={imageAlt}
          className={cn("w-full object-cover", wide ? "aspect-[16/10] lg:h-full" : "aspect-[16/10]")}
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
          loading="lazy"
        />
      </div>

      <div className={cn(wide && "flex flex-col")}>
        <div
          className={cn(
            "relative bg-primary px-6 pb-6 pt-5 text-primary-foreground",
            wide ? "lg:text-left" : "text-center",
          )}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(currentColor_0.6px,transparent_0.6px)] [background-size:14px_14px]"
          />
          <div className="relative">
            <h3 className="font-heading text-xl font-black uppercase leading-none tracking-[-0.015em] sm:text-2xl">
              {name}
            </h3>
            <p className="mt-2 text-[0.85rem] leading-snug text-primary-foreground/85">{hook}</p>
            {!wide && (
              <span
                aria-hidden="true"
                className="mt-3.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground"
              >
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <ul className="mb-3.5 flex flex-wrap gap-1.5">
            {meta.map((m) => {
              const tbc = m.startsWith("?");
              const label = tbc ? m.slice(1) : m;
              return (
                <li
                  key={m}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.05em]",
                    tbc
                      ? "border border-dashed border-accent/70 bg-accent/15 text-eyebrow"
                      : "bg-secondary text-eyebrow",
                  )}
                >
                  {label}
                </li>
              );
            })}
          </ul>
          <div className="space-y-2.5 text-sm leading-relaxed text-muted-foreground">
            {body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
