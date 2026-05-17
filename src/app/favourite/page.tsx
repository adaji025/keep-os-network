import { FavouritesPage } from "@/components/_core/landing-pages/favourite";
import { Footer } from "@/components/_core/shared/footer";
import { ExploreNav } from "@/components/_core/shared/navbar/explore-nav";

export default function FavouritePage() {
    return (
        <>
            <div className="flex min-h-screen flex-col">
                <ExploreNav />
                <FavouritesPage />
            </div>
            <Footer />
        </>
    );
}
