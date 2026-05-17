import { Footer } from "@/components/_core/shared/footer";
import { HotelDetailsPage } from "@/components/_core/landing-pages/explore/hotel";
import { Navbar } from "@/components/_core/shared/navbar";

type HotelPageProps = {
    params: Promise<{ id: string }>;
};

export default async function HotelPage({ params }: HotelPageProps) {
    const { id } = await params;

    return (
        <>
            <div className="flex min-h-screen flex-col bg-white">
                <Navbar />
                <HotelDetailsPage hotelId={id} />
            </div>
            <Footer />
        </>
    );
}
