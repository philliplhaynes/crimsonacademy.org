import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The core values Venn, rebuilt as SVG rather than shipped as a flat image so
 * it stays sharp, scales, reflows, and — most importantly — is readable to a
 * screen reader.
 *
 * The diagram carries real meaning: Truth, Discipline and Service are the
 * values that are practised, and Faith, Hope and Love are what appears where
 * they overlap — the same three that 1 Corinthians 13 ends on. Hovering or
 * focusing an entry in the list lights up its region.
 *
 * The SVG is aria-hidden: the definitions list beneath it is the accessible
 * source of the same information, so nothing is lost without it.
 */

type Key = "truth" | "discipline" | "service" | "faith" | "hope" | "love";

interface Value {
  key: Key;
  name: string;
  ref: string;
  verse: string;
  /** Which two circles this sits between, for the intersections. */
  between?: [string, string];
}

const values: Value[] = [
  {
    key: "truth",
    name: "Truth",
    ref: "John 3:21",
    verse:
      "But whoever lives by the truth comes into the light, so that it may be seen plainly that what they have done has been done in the sight of God.",
  },
  {
    key: "faith",
    name: "Faith",
    ref: "Hebrews 11:1",
    verse: "Now faith is the substance of things hoped for, the evidence of things not seen.",
    between: ["Truth", "Discipline"],
  },
  {
    key: "discipline",
    name: "Discipline",
    ref: "1 Corinthians 9:27",
    verse:
      "But I discipline my body and bring it into subjection, lest, when I have preached to others, I myself should become disqualified.",
  },
  {
    key: "hope",
    name: "Hope",
    ref: "Psalm 31:24",
    verse:
      "Be of good courage, And He shall strengthen your heart, All you who hope in the Lord.",
    between: ["Truth", "Service"],
  },
  {
    key: "service",
    name: "Service",
    ref: "Mark 10:45",
    verse:
      "For even the Son of Man did not come to be served, but to serve, and to give His life a ransom for many.",
  },
  {
    key: "love",
    name: "Love",
    ref: "1 Corinthians 13",
    verse: "These three abide, faith, hope, and love; but the greatest of these is love.",
    between: ["Discipline", "Service"],
  },
];

/* Circle geometry — three circles at 120° around a common centre. */
const R = 112;
const C = { truth: [210, 142], discipline: [156, 235], service: [264, 235] } as const;

export const CoreValues = () => {
  const [active, setActive] = useState<Key | null>(null);
  const on = (k: Key) => active === k;
  const dim = active !== null;

  /** A circle is lit when it is active, or when an active overlap touches it. */
  const litCircle = (k: "truth" | "discipline" | "service") => {
    if (!active) return true;
    if (active === k) return true;
    const v = values.find((x) => x.key === active);
    return !!v?.between?.some((n) => n.toLowerCase() === k);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
      {/* ---------- the diagram ---------- */}
      <div className="mx-auto w-full max-w-[26rem]">
        <svg viewBox="0 0 420 400" className="h-auto w-full" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="cv-truth">
              <circle cx={C.truth[0]} cy={C.truth[1]} r={R} />
            </clipPath>
            <clipPath id="cv-discipline">
              <circle cx={C.discipline[0]} cy={C.discipline[1]} r={R} />
            </clipPath>
            <clipPath id="cv-service">
              <circle cx={C.service[0]} cy={C.service[1]} r={R} />
            </clipPath>
          </defs>

          {/* base circles */}
          <g>
            <circle
              cx={C.truth[0]} cy={C.truth[1]} r={R}
              className={cn(
                "fill-primary transition-opacity duration-300",
                litCircle("truth") ? "opacity-40" : "opacity-10",
              )}
            />
            <circle
              cx={C.discipline[0]} cy={C.discipline[1]} r={R}
              className={cn(
                "fill-eyebrow transition-opacity duration-300",
                litCircle("discipline") ? "opacity-25" : "opacity-[0.06]",
              )}
            />
            <circle
              cx={C.service[0]} cy={C.service[1]} r={R}
              className={cn(
                "fill-accent transition-opacity duration-300",
                litCircle("service") ? "opacity-45" : "opacity-10",
              )}
            />
          </g>

          {/* overlap lenses — one circle clipped by another */}
          <g clipPath="url(#cv-truth)">
            <circle
              cx={C.discipline[0]} cy={C.discipline[1]} r={R}
              className={cn(
                "fill-primary transition-opacity duration-300",
                on("faith") ? "opacity-55" : "opacity-0",
              )}
            />
          </g>
          <g clipPath="url(#cv-truth)">
            <circle
              cx={C.service[0]} cy={C.service[1]} r={R}
              className={cn(
                "fill-primary transition-opacity duration-300",
                on("hope") ? "opacity-55" : "opacity-0",
              )}
            />
          </g>
          <g clipPath="url(#cv-discipline)">
            <circle
              cx={C.service[0]} cy={C.service[1]} r={R}
              className={cn(
                "fill-primary transition-opacity duration-300",
                on("love") ? "opacity-55" : "opacity-0",
              )}
            />
          </g>

          {/* outlines, drawn last so they sit above the fills */}
          {(["truth", "discipline", "service"] as const).map((k) => (
            <circle
              key={k}
              cx={C[k][0]} cy={C[k][1]} r={R}
              fill="none"
              className={cn(
                "stroke-foreground/20 transition-opacity duration-300",
                litCircle(k) ? "opacity-100" : "opacity-30",
              )}
              strokeWidth={1.5}
            />
          ))}

          {/* labels */}
          <g className="font-heading" textAnchor="middle">
            <text x={210} y={96} className={cn("fill-foreground text-[26px] font-semibold transition-opacity", dim && !litCircle("truth") && "opacity-40")}>
              Truth
            </text>
            <text x={118} y={288} className={cn("fill-foreground text-[26px] font-semibold transition-opacity", dim && !litCircle("discipline") && "opacity-40")}>
              Discipline
            </text>
            <text x={302} y={288} className={cn("fill-foreground text-[26px] font-semibold transition-opacity", dim && !litCircle("service") && "opacity-40")}>
              Service
            </text>

            <text x={176} y={190} className={cn("fill-foreground/80 text-[18px] transition-opacity", dim && !on("faith") && "opacity-35")}>
              Faith
            </text>
            <text x={244} y={190} className={cn("fill-foreground/80 text-[18px] transition-opacity", dim && !on("hope") && "opacity-35")}>
              Hope
            </text>
            {/* Love sits below the triple overlap, in the Discipline∩Service lens */}
            <text x={210} y={252} className={cn("fill-foreground/80 text-[18px] transition-opacity", dim && !on("love") && "opacity-35")}>
              Love
            </text>
          </g>
        </svg>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Truth, Discipline and Service are practised. Faith, Hope and Love are what grows where
          they meet.
        </p>
      </div>

      {/* ---------- the definitions ---------- */}
      <dl className="space-y-0">
        {values.map((v) => (
          <div
            key={v.key}
            onMouseEnter={() => setActive(v.key)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(v.key)}
            onBlur={() => setActive(null)}
            tabIndex={0}
            className={cn(
              "cursor-default border-b py-4 outline-none transition-colors last:border-b-0",
              "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              on(v.key) && "bg-secondary/50",
            )}
          >
            <dt className="flex flex-wrap items-baseline gap-x-3">
              <span
                className={cn(
                  "font-heading text-lg font-semibold",
                  v.between ? "text-eyebrow" : "text-primary",
                )}
              >
                {v.name}
              </span>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {v.ref}
              </span>
              {v.between && (
                <span className="text-xs text-muted-foreground">
                  where {v.between[0]} meets {v.between[1]}
                </span>
              )}
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.verse}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
