import { LegalPageHeader } from "@/components/LegalPageHeader";

/**
 * /privacy-policy — linked from the footer's bottom bar, alongside
 * /non-discrimination-policy and /site-map.
 *
 * Structured after berkeleycarroll.org/privacy-policy's section list
 * (Collection of Personal Information, Use of Information, Cookies,
 * Security, Links to External Sites, Contacting Us) — that page's own body
 * text wasn't reachable in the DOM (an accordion that only exposed section
 * titles), so nothing here is copied from it; the wording below is written
 * fresh for how this site actually works.
 *
 * One real, site-specific fact drives the "Sharing Information" section:
 * this site has a genuine third-party relationship, the Crimson Foundation
 * Portal (see /portal), and that section says so plainly rather than with
 * boilerplate about unnamed "service providers."
 */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border-b py-8 first:pt-0 last:border-b-0">
    <h2 className="font-heading text-xl font-semibold text-primary">{title}</h2>
    <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">{children}</div>
  </div>
);

const PrivacyPolicy = () => {
  return (
    <>
      <LegalPageHeader
        title="Privacy Policy"
        lede="What information this website collects, why, and who it is shared with."
      />

      <div className="container py-14">
        <div className="mx-auto max-w-3xl">
          <p className="leading-relaxed text-muted-foreground">
            This policy covers crimsonacademy.org, the website of Crimson Academy of Kagina. It
            does not cover the separate Crimson Foundation Portal (portal.crimsonfoundation.org),
            which has its own privacy practices — see{" "}
            <a
              href="https://www.crimsonfoundation.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline underline-offset-4"
            >
              crimsonfoundation.org
            </a>{" "}
            for that.
          </p>

          <div className="mt-4">
            <Section title="Information We Collect">
              <p>
                Visiting this site does not require you to give us anything. If you email us,
                fill out a contact or enrollment enquiry, or sponsor a student, we receive
                whatever you choose to include — typically a name, an email address, and the
                content of your message.
              </p>
              <p>
                Like most websites, this one also collects basic technical information
                automatically: the pages visited, the browser and device used, and the referring
                site. This is used in aggregate to understand how the site is used, not to
                identify individual visitors.
              </p>
            </Section>

            <Section title="How We Use It">
              <p>
                Information you send us is used to respond to you — to answer an admissions
                question, process a sponsorship, or follow up on a message. We do not sell or
                rent visitor information to third parties, and we do not use it for purposes
                unrelated to why you gave it to us.
              </p>
            </Section>

            <Section title="Sharing Information">
              <p>
                Crimson Academy operates in partnership with the{" "}
                <a
                  href="https://www.crimsonfoundation.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline underline-offset-4"
                >
                  Crimson Foundation
                </a>
                , a U.S. 501(c)(3) nonprofit. Enrollment and academic records live on the
                Foundation's own Portal system, not on this website — see the{" "}
                <a href="/portal" className="font-medium text-primary underline underline-offset-4">
                  Portal page
                </a>{" "}
                for how that sign-in works. Beyond that relationship, we do not share visitor
                information with other organizations except where required by law.
              </p>
            </Section>

            <Section title="Children's Information">
              <p>
                Crimson Academy is a primary school serving children from nursery through Primary
                6. This website is directed at parents, guardians, donors, and prospective
                families, not at children — we do not knowingly collect personal information
                directly from children through this site. Student academic and enrollment
                records are handled through the school and the Crimson Foundation Portal, under
                the arrangements a family agrees to at enrollment.
              </p>
            </Section>

            <Section title="Cookies">
              <p>
                This site may use basic cookies or similar technology to remember simple
                preferences, such as light or dark mode, and to understand overall visitor
                traffic. These do not identify you personally. You can disable cookies in your
                browser settings; the site will still work, though a preference like your chosen
                theme may not be remembered between visits.
              </p>
            </Section>

            <Section title="Security">
              <p>
                We take reasonable measures to protect information sent to us, but no method of
                transmission over the internet is completely secure. Please avoid sending
                sensitive information — financial details, national ID numbers — by email or
                contact form.
              </p>
            </Section>

            <Section title="Links to Other Sites">
              <p>
                This site links to others we don't control, including the Crimson Foundation and
                various social media platforms. Once you leave crimsonacademy.org, that site's
                own privacy policy applies, not this one.
              </p>
            </Section>

            <Section title="Changes to This Policy">
              <p>
                If this policy changes in a meaningful way, we will update this page and note the
                date below.
              </p>
              <p className="text-sm text-muted-foreground/80">Last updated: 2026.</p>
            </Section>

            <Section title="Contact Us">
              <p>
                Questions about this policy or about information you've sent us can go to{" "}
                <a
                  href="mailto:news@crimsonfoundation.org"
                  className="font-medium text-primary underline underline-offset-4"
                >
                  news@crimsonfoundation.org
                </a>
                .
              </p>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
