import { LandingHero } from "@/components/_core/landing-pages/hero";
import { Footer } from "@/components/_core/shared/footer";
import { Navbar } from "@/components/_core/shared/navbar";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <LandingHero />
      </div>
      <Footer />
    </>
  );
}
