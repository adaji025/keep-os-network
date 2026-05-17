import { Footer } from "@/components/_core/shared/footer";
import { SupermarketDetailsPage } from "@/components/_core/landing-pages/explore/supermarket";
import { Navbar } from "@/components/_core/shared/navbar";

type SupermarketPageProps = {
    params: Promise<{ id: string }>;
};

export default async function SupermarketPage({ params }: SupermarketPageProps) {
    const { id } = await params;

    return (
        <>
            <div className="flex min-h-screen flex-col bg-white">
                <Navbar />
                <SupermarketDetailsPage supermarketId={id} />
            </div>
            <Footer />
        </>
    );
}
