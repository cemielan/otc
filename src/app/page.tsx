import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { WhatsappFab } from "@/components/layout/whatsapp-fab";
import { About } from "@/components/sections/about";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Location } from "@/components/sections/location";
import { Packages } from "@/components/sections/packages";
import { Programs } from "@/components/sections/programs";
import { Steps } from "@/components/sections/steps";
import { Subjects } from "@/components/sections/subjects";

/**
 * The landing page is only composition: every block owns its own copy, data and
 * animation, so sections can be reordered or dropped without touching the rest.
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Programs />
        <Subjects />
        <About />
        <Packages />
        <Steps />
        <Location />
        <Contact />
        <ClosingCta />
      </main>
      <Footer />
      <WhatsappFab />
    </>
  );
}
