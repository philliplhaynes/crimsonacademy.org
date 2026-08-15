import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { EnrollmentForm } from "@/components/EnrollmentForm";

/**
 * Every "Enroll Your Child" / "Enroll Now" trigger on the site — Navbar
 * (desktop and mobile), Hero, Footer, News, and the Admissions sub-nav pill —
 * opens this same modal rather than each one navigating to a permanent
 * on-page section. One instance lives at the root (see App.tsx) so it works
 * identically from any page, without first routing to Admissions.
 */
interface EnrollmentModalContextValue {
  openEnrollmentModal: () => void;
}

const EnrollmentModalContext = createContext<EnrollmentModalContextValue | null>(null);

export const EnrollmentModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const value = useMemo(() => ({ openEnrollmentModal: () => setOpen(true) }), []);

  return (
    <EnrollmentModalContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tell us about your child</DialogTitle>
            <DialogDescription>
              Fill this in and it opens your own email app with the message already written to
              us — no account, no portal, nothing to sign in to.
            </DialogDescription>
          </DialogHeader>
          {/* Closes the modal once the mailto: link has been handed to the
              browser — there's nothing left to do here after that. */}
          <EnrollmentForm onSubmitted={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </EnrollmentModalContext.Provider>
  );
};

export const useEnrollmentModal = () => {
  const ctx = useContext(EnrollmentModalContext);
  if (!ctx) throw new Error("useEnrollmentModal must be used within EnrollmentModalProvider");
  return ctx;
};
