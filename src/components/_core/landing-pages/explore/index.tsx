"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ExploreBusinessCard } from "./business-card";
import {
    EXPLORE_BUSINESSES,
    EXPLORE_TABS,
    RATING_FILTER_OPTIONS,
    type ExploreTabId,
} from "./data";

const PRICE_MAX = 4500;

function formatNaira(value: number) {
    return `₦${value.toLocaleString("en-NG")}`;
}

function RatingStars({ count }: { count: number }) {
    return (
        <span className="inline-flex gap-0.5" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    className={cn(
                        "size-3.5",
                        i < count
                            ? "fill-amber-400 text-amber-400"
                            : "fill-neutral-200 text-neutral-200",
                    )}
                />
            ))}
        </span>
    );
}

export function ExplorePage() {
    const [activeTab, setActiveTab] = useState<ExploreTabId>("all");
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(PRICE_MAX);
    const [selectedRatings, setSelectedRatings] = useState<Set<string>>(
        () => new Set(["all"]),
    );
    const [priceOpen, setPriceOpen] = useState(true);
    const [ratingsOpen, setRatingsOpen] = useState(true);

    function toggleRatingFilter(id: string) {
        setSelectedRatings((prev) => {
            if (id === "all") {
                return new Set(["all"]);
            }
            const next = new Set(prev);
            next.delete("all");
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            if (next.size === 0) {
                return new Set(["all"]);
            }
            return next;
        });
    }

    const filteredBusinesses = useMemo(() => {
        const tab = EXPLORE_TABS.find((t) => t.id === activeTab);
        const categoryFilter =
            tab && "category" in tab ? tab.category : undefined;

        const ratingThresholds = RATING_FILTER_OPTIONS.filter(
            (o): o is (typeof RATING_FILTER_OPTIONS)[number] & { minRating: number } =>
                selectedRatings.has(o.id) && "minRating" in o,
        ).map((o) => o.minRating);

        return EXPLORE_BUSINESSES.filter((b) => {
            if (categoryFilter && b.category !== categoryFilter) return false;
            if (
                !selectedRatings.has("all") &&
                ratingThresholds.length > 0 &&
                !ratingThresholds.some((min) => b.rating >= min)
            ) {
                return false;
            }
            return true;
        });
    }, [activeTab, selectedRatings]);

    const activeTabMeta = EXPLORE_TABS.find((t) => t.id === activeTab);
    const pageTitle = activeTabMeta?.pageTitle ?? "All Businesses";

    function clearFilters() {
        setPriceMin(0);
        setPriceMax(PRICE_MAX);
        setSelectedRatings(new Set(["all"]));
    }

    return (
        <div className="min-h-screen bg-white">
            <nav
                className="border-b border-neutral-100"
                aria-label="Business categories"
            >
                <div className="app-width flex justify-center gap-8 overflow-x-auto px-4 pt-4 sm:gap-12 sm:px-6 lg:px-8">
                    {EXPLORE_TABS.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "shrink-0 border-b-2 pb-3 text-sm font-medium transition-colors",
                                activeTab === tab.id
                                    ? "border-primary text-primary"
                                    : "border-transparent text-neutral-500 hover:text-neutral-800",
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </nav>

            <div className="app-width px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                        {pageTitle}
                    </h1>
                    <p className="text-sm text-neutral-500">
                        {filteredBusinesses.length} businesses found
                    </p>
                </div>

                <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:gap-10">
                    <aside className="w-full shrink-0 lg:sticky lg:top-20 lg:z-10 lg:max-h-[calc(100dvh-5rem)] lg:w-64 lg:self-start lg:overflow-y-auto xl:w-72">
                        <div className="">
                            <div className="border border-neutral-200/90 rounded-md py-4">
                                <div className="flex items-center border-b justify-between px-4 pb-2">
                                    <h2 className="font-bold text-neutral-900">Filters</h2>
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="text-sm font-medium text-primary hover:text-primary/90"
                                    >
                                        Clear all
                                    </button>
                                </div>
                                <div className="mt-1 border-neutral-100 px-4">
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-between text-left font-semibold text-neutral-900"
                                        onClick={() => setPriceOpen((v) => !v)}
                                        aria-expanded={priceOpen}
                                    >
                                        Price Range
                                        <ChevronDown
                                            className={cn(
                                                "size-4 text-neutral-500 transition-transform",
                                                priceOpen && "rotate-180",
                                            )}
                                        />
                                    </button>
                                    {priceOpen ? (
                                        <div className="mt-4 space-y-4">
                                            <div className="relative pt-2">
                                                <div className="relative h-1.5 rounded-full bg-neutral-200">
                                                    <div
                                                        className="absolute h-full rounded-full bg-primary"
                                                        style={{
                                                            left: `${(priceMin / PRICE_MAX) * 100}%`,
                                                            right: `${100 - (priceMax / PRICE_MAX) * 100}%`,
                                                        }}
                                                    />
                                                </div>
                                                <input
                                                    type="range"
                                                    min={0}
                                                    max={PRICE_MAX}
                                                    value={priceMin}
                                                    onChange={(e) => {
                                                        const v = Number(e.target.value);
                                                        setPriceMin(Math.min(v, priceMax - 100));
                                                    }}
                                                    className="pointer-events-none absolute inset-0 h-1.5 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-primary [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-primary"
                                                    aria-label="Minimum price"
                                                />
                                                <input
                                                    type="range"
                                                    min={0}
                                                    max={PRICE_MAX}
                                                    value={priceMax}
                                                    onChange={(e) => {
                                                        const v = Number(e.target.value);
                                                        setPriceMax(Math.max(v, priceMin + 100));
                                                    }}
                                                    className="pointer-events-none absolute inset-0 h-1.5 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-primary [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-primary"
                                                    aria-label="Maximum price"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <label className="block">
                                                    <span className="mb-1.5 block text-xs text-neutral-500">
                                                        Min
                                                    </span>
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        value={formatNaira(priceMin)}
                                                        className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-800"
                                                    />
                                                </label>
                                                <label className="block">
                                                    <span className="mb-1.5 block text-xs text-neutral-500">
                                                        Max
                                                    </span>
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        value={formatNaira(priceMax)}
                                                        className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-800"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>


                            <div className="mt-1 border border-neutral-200/90 rounded-md p-4">
                                <button
                                    type="button"
                                    className="flex w-full items-center justify-between text-left font-semibold text-neutral-900"
                                    onClick={() => setRatingsOpen((v) => !v)}
                                    aria-expanded={ratingsOpen}
                                >
                                    Ratings
                                    <ChevronDown
                                        className={cn(
                                            "size-4 text-neutral-500 transition-transform",
                                            ratingsOpen && "rotate-180",
                                        )}
                                    />
                                </button>
                                {ratingsOpen ? (
                                    <ul className="mt-4 space-y-3">
                                        {RATING_FILTER_OPTIONS.map((option) => (
                                            <li key={option.id}>
                                                <label className="flex cursor-pointer items-center gap-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRatings.has(
                                                            option.id,
                                                        )}
                                                        onChange={() =>
                                                            toggleRatingFilter(option.id)
                                                        }
                                                        className="size-4 shrink-0 rounded border-neutral-300 accent-primary"
                                                    />
                                                    <span className="flex flex-1 items-center gap-2 text-sm text-neutral-700">
                                                        {option.id === "all" ? (
                                                            option.label
                                                        ) : (
                                                            <>
                                                                <RatingStars
                                                                    count={Math.min(
                                                                        5,
                                                                        Math.floor(Number(option.id)),
                                                                    )}
                                                                />
                                                                <span>{option.label}</span>
                                                            </>
                                                        )}
                                                    </span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                            </div>
                        </div>
                    </aside>

                    <div className="min-w-0 flex-1">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {filteredBusinesses.map((business) => (
                                <ExploreBusinessCard key={business.id} business={business} />
                            ))}
                        </div>

                        {filteredBusinesses.length === 0 ? (
                            <p className="py-16 text-center text-neutral-500">
                                No businesses match your filters.
                            </p>
                        ) : null}

                        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100 pt-6">
                            <label className="flex items-center gap-2 text-sm text-neutral-600">
                                Rows per page
                                <select
                                    defaultValue="10"
                                    className="rounded-lg border border-neutral-200 bg-white px-2 py-1.5 text-sm text-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                >
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                            </label>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-neutral-600">Pages 1 of 1</span>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon-sm"
                                    className="rounded-full"
                                    disabled
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft className="size-4" />
                                </Button>
                                <Button
                                    type="button"
                                    size="icon-sm"
                                    className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                                    aria-label="Next page"
                                >
                                    <ChevronRight className="size-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
