import { EarnRedeemSave } from "@/components/_core/landing-pages/home/earn-redeem-save";
import { HowItWorks } from "@/components/_core/landing-pages/home/how-works";
import { FeaturedBusinesses } from "@/components/_core/landing-pages/home/featured-business";
import { LandingHero } from "@/components/_core/landing-pages/home/hero";
import { ShopByCategories } from "@/components/_core/landing-pages/home/shop-by-categories";
import { Footer } from "@/components/_core/shared/footer";
import { Navbar } from "@/components/_core/shared/navbar";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <LandingHero />
        <ShopByCategories />
        <FeaturedBusinesses />
        <EarnRedeemSave />
        <HowItWorks />
      </div>
      <Footer />
    </>
  );
}
