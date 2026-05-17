"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
    getRatingDistribution,
    getRestaurantReviews,
    type RestaurantReview,
} from "./data";

function RatingStars({
    count,
    size = "md",
}: {
    count: number;
    size?: "sm" | "md";
}) {
    const starSize = size === "sm" ? "size-3" : "size-4";

    return (
        <span className="inline-flex gap-0.5" aria-hidden>
            {Array.from({ length: 5 }, (_, index) => (
                <Star
                    key={index}
                    className={cn(
                        starSize,
                        index < count
                            ? "fill-amber-400 text-amber-400"
                            : "fill-neutral-200 text-neutral-200",
                    )}
                />
            ))}
        </span>
    );
}

function RatingDistributionBars({
    distribution,
}: {
    distribution: ReturnType<typeof getRatingDistribution>;
}) {
    const maxCount = Math.max(...distribution.map((row) => row.count), 1);

    return (
        <ul className="space-y-1.5">
            {distribution.map((row) => (
                <li
                    key={row.stars}
                    className="grid grid-cols-[1.25rem_1rem_2.5rem_1fr] items-center gap-2 text-xs text-neutral-600"
                >
                    <span className="text-right font-medium text-neutral-700">
                        {row.stars}
                    </span>
                    <Star className="size-3 fill-amber-400 text-amber-400" />
                    <span className="text-neutral-500">({row.count})</span>
                    <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100">
                        <div
                            className="h-full rounded-full bg-amber-400"
                            style={{
                                width: `${(row.count / maxCount) * 100}%`,
                            }}
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
}

function ReviewListItem({ review }: { review: RestaurantReview }) {
    return (
        <li className="flex gap-4 border-b border-neutral-100 py-5 last:border-b-0">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
                <Image
                    src={review.imageSrc}
                    alt={review.imageAlt}
                    fill
                    sizes="64px"
                    className="object-cover"
                />
            </div>
            <div className="min-w-0 flex-1">
                <RatingStars count={review.rating} size="sm" />
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                    {review.comment}
                </p>
                <div className="mt-2 flex items-center justify-between gap-3 text-sm">
                    <span className="text-neutral-500">{review.authorName}</span>
                    <span className="shrink-0 text-neutral-400">
                        {review.relativeTime}
                    </span>
                </div>
            </div>
        </li>
    );
}

type ReviewsProps = {
    restaurantId: string;
    rating: number;
    reviewCount: number;
};

export default function Reviews({
    restaurantId,
    rating,
    reviewCount,
}: ReviewsProps) {
    const reviews = useMemo(
        () => getRestaurantReviews(restaurantId),
        [restaurantId],
    );
    const distribution = useMemo(
        () => getRatingDistribution(reviewCount),
        [reviewCount],
    );

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(reviews.length / rowsPerPage));
    const currentPage = Math.min(page, totalPages);

    const paginatedReviews = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return reviews.slice(start, start + rowsPerPage);
    }, [reviews, currentPage, rowsPerPage]);

    return (
        <section className="mt-10 border-t border-neutral-200/90 ">
            <div className="border-b border-neutral-100 px-5 py-5 sm:px-6">

                <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-neutral-900 mb-4">
                            Reviews ({reviewCount})
                        </h2>
                        <div className="flex items-start gap-4">
                            <p className="text-4xl font-bold leading-none text-neutral-900">
                                {rating.toFixed(1)}
                            </p>
                            <div>
                                <RatingStars count={Math.round(rating)} />
                                <p className="mt-1 text-sm text-neutral-500">
                                    {reviewCount} Reviews
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full sm:max-w-5xl">
                        <RatingDistributionBars distribution={distribution} />
                    </div>
                </div>
            </div>

            <ul className="px-5 sm:px-6">
                {paginatedReviews.map((review) => (
                    <ReviewListItem key={review.id} review={review} />
                ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100 px-5 py-4 sm:px-6">
                <label className="flex items-center gap-2 text-sm text-neutral-600">
                    Rows per page
                    <select
                        value={rowsPerPage}
                        onChange={(event) => {
                            setRowsPerPage(Number(event.target.value));
                            setPage(1);
                        }}
                        className="rounded-lg border border-neutral-200 bg-white px-2 py-1.5 text-sm text-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </label>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-neutral-600">
                        Pages {currentPage} of {totalPages}
                    </span>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        className="rounded-full"
                        disabled={currentPage <= 1}
                        onClick={() => setPage((value) => Math.max(1, value - 1))}
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="size-4" />
                    </Button>
                    <Button
                        type="button"
                        size="icon-sm"
                        className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                        disabled={currentPage >= totalPages}
                        onClick={() =>
                            setPage((value) => Math.min(totalPages, value + 1))
                        }
                        aria-label="Next page"
                    >
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
