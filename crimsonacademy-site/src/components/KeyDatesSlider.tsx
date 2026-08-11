import { Carousel } from "@/components/Carousel";
import { cn } from "@/lib/utils";

export interface KeyDate {
  year: string;
  text: string;
}

/** Key dates on the shared Carousel, with a timeline rail behind the cards. */
export const KeyDatesSlider = ({ dates }: { dates: KeyDate[] }) => (
  <Carousel
    label="key dates"
    autoplay
    railClassName="top-[3.25rem]"
    items={dates.map((d, i) => (
      <div key={`${d.year}-${i}`}>
        <div className="font-heading text-2xl font-semibold text-primary">{d.year}</div>
        {/* node on the rail */}
        <div className="mt-3 flex h-4 items-center" aria-hidden="true">
          <span
            className={cn(
              "h-2.5 w-2.5 rounded-full border-2 border-border bg-background",
            )}
          />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.text}</p>
      </div>
    ))}
  />
);
