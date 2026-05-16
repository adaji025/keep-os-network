import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hotel, ShoppingCart, UtensilsCrossed } from "lucide-react";

import { cn } from "@/lib/utils";

type IconComponent = typeof Hotel;

type Category = {
    title: string;
    description: string;
    cta: string;
    href: string;
    imageSrc: string;
    imageAlt: string;
    icon: IconComponent;
    bg: string;
    border: string;
    accent: string;
    iconColor: string;
};

const CATEGORIES: Category[] = [
    {
        title: "Hotels",
        description: "Book comfortable stays from top-rated hotels.",
        cta: "Explore Hotels",
        href: "#",
        imageSrc:
            "/images/pngs/landing-pages/shop-by-categories/hotels.png",
        imageAlt: "Modern hotel room with a comfortable bed",
        icon: Hotel,
        bg: "bg-[#f3f4ff]",
    border: "border-primary/40",
    accent: "text-primary",
    iconColor: "text-primary",
    },
    {
        title: "Restaurants",
        description: "Delicious meals from your favorite spots.",
        cta: "Explore Restaurants",
        href: "#",
        imageSrc:
            "/images/pngs/landing-pages/shop-by-categories/restaurants.png",
        imageAlt: "Plated meal with wine at a restaurant",
        icon: UtensilsCrossed,
        bg: "bg-[#fff7ed]",
        border: "border-[#ea580c]/35",
        accent: "text-[#ea580c]",
        iconColor: "text-[#ea580c]",
    },
    {
        title: "Supermarkets",
        description: "Groceries and essentials near you.",
        cta: "Explore Supermarkets",
        href: "#",
        imageSrc:
            "/images/pngs/landing-pages/shop-by-categories/supermarkets.png",
        imageAlt: "Supermarket aisle with fresh produce",
        icon: ShoppingCart,
        bg: "bg-[#f0fdf4]",
        border: "border-[#16a34a]/35",
        accent: "text-[#16a34a]",
        iconColor: "text-[#16a34a]",
    },
];

function CategoryCard({
    title,
    description,
    cta,
    href,
    imageSrc,
    imageAlt,
    icon: Icon,
    bg,
    border,
    accent,
    iconColor,
}: Category) {
    return (
        <Link
            href={href}
            className={cn(
                "group flex flex-col overflow-hidden rounded-2xl border-2 transition-shadow hover:shadow-md sm:flex-row sm:items-center justify-between",
                bg,
                border,
            )}
        >
            <div className="flex flex-1 flex-row items-start gap-4 p-5 sm:min-h-44 sm:items-start sm:gap-5 sm:px-6 sm:py-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-neutral-100 bg-white shadow-sm sm:size-14">
                    <Icon className={cn("size-6 sm:size-7", iconColor)} strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1 h-full flex flex-col justify-between">
                    <div>
                        <h3 className="text-sm font-bold tracking-tight text-neutral-900">
                            {title}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-neutral-600">
                            {description}
                        </p>
                    </div>
                    <span
                        className={cn(
                            "mt-4 inline-flex items-center gap-0.5 text-xs font-semibold",
                            accent,
                        )}
                    >
                        {cta}
                        <ArrowRight
                            className="size-4 transition-transform group-hover:translate-x-0.5"
                            aria-hidden
                        />
                    </span>
                </div>
            </div>
            <div className="pr-5">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    height={122}
                    width={142}
                    sizes="w-[141px] h-[126px] rounded-2xl"
                    className="object-cover"
                />
            </div>
        </Link>
    );
}

export function ShopByCategories() {
    return (
        <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="app-width">
                <h2 className="text-center text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                    Shop By Categories
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-8">
                    {CATEGORIES.map((cat) => (
                        <CategoryCard key={cat.title} {...cat} />
                    ))}
                </div>
            </div>
        </section>
    );
}
