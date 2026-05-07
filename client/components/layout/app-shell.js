import { DisclaimerBanner } from "../disclaimer-banner";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function AppShell({ children, showDisclaimer = true }) {
  return (
    <>
      <SiteHeader />
      <main className="page-shell space-y-6">
        {showDisclaimer ? <DisclaimerBanner /> : null}
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
