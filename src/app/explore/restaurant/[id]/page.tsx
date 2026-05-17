import { Footer } from "@/components/_core/shared/footer";
import { RestaurantDetailsPage } from "@/components/_core/landing-pages/explore/restaurant";
import { Navbar } from "@/components/_core/shared/navbar";

type RestaurantPageProps = {
    params: Promise<{ id: string }>;
};

export default async function RestaurantPage({ params }: RestaurantPageProps) {
    const { id } = await params;

    return (
        <>
            <div className="flex min-h-screen flex-col bg-white">
                <Navbar />
                <RestaurantDetailsPage restaurantId={id} />
            </div>
            <Footer />
        </>
    );
}
