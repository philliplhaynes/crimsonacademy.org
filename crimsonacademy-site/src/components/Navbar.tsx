import logoHoriz from "@/assets/logo-horiz.webp";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { sections } from "@/nav";
import { cn } from "@/lib/utils";
import { ZEFFY_DONATE_URL } from "@/lib/links";

const CLOSE_DELAY = 200;

const DesktopNav = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const navRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => setOpenIndex(null), [pathname]);

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenIndex(null), CLOSE_DELAY);
  };

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenIndex(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <div ref={navRef} className="hidden lg:flex items-center gap-0.5" onMouseLeave={scheduleClose}>
      {sections.map((section, i) => {
        const isOpen = openIndex === i;
        const isActive = pathname === section.href;
        const panelId = `nav-panel-${i}`;
        return (
          <div
            key={section.label}
            className="relative"
            onMouseEnter={() => {
              cancelClose();
              setOpenIndex(i);
            }}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpenIndex(null);
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setOpenIndex(i);
                }
              }}
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive && "text-primary",
              )}
            >
              {section.label}
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>

            {isOpen && (
              <div
                id={panelId}
                className="absolute left-0 top-full z-50 w-64 rounded-lg border bg-popover p-2 shadow-lg"
                onKeyDown={(e) => e.key === "Escape" && setOpenIndex(null)}
              >
                <Link
                  to={section.href}
                  className="block rounded-md px-3 py-2 text-sm font-semibold text-primary hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {section.label} overview
                </Link>
                <div className="my-1 h-px bg-border" />
                {section.children.map((child) => (
                  <Link
                    key={child.href}
                    to={child.href}
                    className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden flex items-center gap-1">
      <ModeToggle />
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && createPortal(
        <div className="fixed inset-0 top-16 z-50 overflow-y-auto bg-background">
          <div className="flex flex-col gap-2 p-4 pb-24">
            <Link to="/admissions#inquire" className={buttonVariants({ variant: "default" })}>
              Enroll Your Child
            </Link>
            <a
              href={ZEFFY_DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              Sponsor a Student
            </a>

            <nav className="mt-4 divide-y">
              {sections.map((section, i) => {
                const isExpanded = expanded === i;
                return (
                  <div key={section.label} className="py-1">
                    <div className="flex items-center">
                      <Link
                        to={section.href}
                        className="flex-1 py-3 font-heading text-lg font-semibold"
                      >
                        {section.label}
                      </Link>
                      <button
                        type="button"
                        aria-label={`${isExpanded ? "Collapse" : "Expand"} ${section.label}`}
                        aria-expanded={isExpanded}
                        onClick={() => setExpanded(isExpanded ? null : i)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <ChevronDown
                          className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    {isExpanded && (
                      <div className="flex flex-col pb-2">
                        {section.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="rounded-md px-3 py-3 text-sm text-muted-foreground hover:bg-secondary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="mt-6 rounded-lg border bg-secondary/40 p-4 text-sm text-muted-foreground">
              Taught in English, Français &amp; Kinyarwanda
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
};

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center">
          <img src={logoHoriz} alt="Crimson Academy" className="h-11 w-auto object-contain" />
        </Link>

        <DesktopNav />

        <div className="hidden lg:flex shrink-0 items-center gap-2">
          <ModeToggle />
          <a
            href={ZEFFY_DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Sponsor
          </a>
          <Link to="/admissions#inquire" className={buttonVariants({ variant: "default", size: "sm" })}>
            Enroll
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
};
