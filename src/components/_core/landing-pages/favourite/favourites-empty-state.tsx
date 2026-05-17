import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";

function EmptyFavoritesHeart() {
    return (
        <div className="relative mx-auto size-14" aria-hidden>
            <Heart
                className="size-14 fill-neutral-200 text-neutral-200"
                strokeWidth={0}
            />
            <div className="absolute inset-x-0 top-0 h-[52%] overflow-hidden">
                <Heart
                    className="size-14 fill-neutral-400 text-neutral-400"
                    strokeWidth={0}
                />
            </div>
        </div>
    );
}

export function FavouritesEmptyState() {
    return (
        <div className="mt-8 flex justify-center">
            <div className="w-full max-w-xl rounded-2xl border border-neutral-200 bg-white px-6 py-12 text-center shadow-sm sm:px-12 sm:py-14">
                <EmptyFavoritesHeart />
                <h2 className="mt-6 text-lg font-bold text-neutral-900 sm:text-xl">
                    Your Favorites Are Empty
                </h2>
                <p className="mt-2 text-sm text-neutral-500">
                    Bookmark vendors for quicker access anytime.
                </p>
                <Button
                    asChild
                    className="mt-8 h-11 gap-2 rounded-xl px-6 text-sm font-semibold"
                >
                    <Link href="/explore">
                        Explore Vendors
                        <ArrowRight className="size-4" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
