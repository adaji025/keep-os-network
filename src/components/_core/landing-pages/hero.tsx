"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Coins,
  MapPin,
  Percent,
  Search,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const ROTATING_CATEGORIES = [
  "Restaurants",
  "Hotels",
  "Cafés",
] as const;

const FEATURES = [
  {
    title: "Earn KPS Points",
    description: "Earn points every time you spend.",
    icon: Coins,
  },
  {
    title: "Exclusive Deals",
    description: "Access special discounts and offers.",
    icon: Percent,
  },
  {
    title: "Trusted Businesses",
    description: "Verified businesses for a better experience.",
    icon: ShoppingBag,
  },
  {
    title: "Near You",
    description: "Discover top-rated places around you.",
    icon: MapPin,
  },
] as const;

export function LandingHero() {
  const [categoryIndex, setCategoryIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCategoryIndex((i) => (i + 1) % ROTATING_CATEGORIES.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] flex-1 flex-col">
        <div className="absolute inset-0">
          <Image
            src="/images/pngs/landing-pages/hero-bg.png"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-black/55"
            aria-hidden
          />
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-4 pb-10 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
          <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center text-center">
            <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-tight">
              Discover Amazing Places Near You
            </h1>
            <p className="mt-2 min-h-[1.2em] text-3xl font-bold tracking-tight text-[#4A72FF] transition-all duration-500 sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              {ROTATING_CATEGORIES[categoryIndex]}
            </p>
            <p className="mt-4 max-w-xl text-pretty text-base text-white/90 sm:text-lg">
              Find trusted businesses, earn rewards and save more.
            </p>

            <div className="mt-10 w-full max-w-3xl">
              <div className="flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-xl md:flex-row md:items-stretch md:rounded-full md:p-1.5 md:pl-2">
                <div className="flex shrink-0 items-center gap-2 border-b border-neutral-100 px-3 py-2 md:border-b-0 md:border-r md:py-0 md:pr-3">
                  <MapPin
                    className="size-5 shrink-0 text-neutral-400"
                    aria-hidden
                  />
                  <label className="sr-only" htmlFor="city-select">
                    City
                  </label>
                  <div className="relative min-w-0 flex-1">
                    <select
                      id="city-select"
                      defaultValue=""
                      className="w-full cursor-pointer appearance-none rounded-md bg-transparent py-1 pr-8 text-sm font-medium text-neutral-800 outline-none focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#4A72FF]"
                    >
                      <option value="" disabled>
                        Select City
                      </option>
                      <option value="lagos">Lagos</option>
                      <option value="abuja">Abuja</option>
                      <option value="port-harcourt">Port Harcourt</option>
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
                      aria-hidden
                    />
                  </div>
                </div>

                <div className="flex min-h-11 flex-1 items-center gap-2 px-3 md:px-2">
                  <Search
                    className="size-5 shrink-0 text-neutral-400"
                    aria-hidden
                  />
                  <label className="sr-only" htmlFor="hero-search">
                    Search businesses
                  </label>
                  <input
                    id="hero-search"
                    type="search"
                    placeholder="Search for hotels, restaurants, supermarkets..."
                    className="min-w-0 flex-1 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
                  />
                </div>

                <Button
                  type="button"
                  className="h-11 shrink-0 rounded-xl bg-[#4A72FF] px-8 font-semibold text-white hover:bg-[#3d62e6] md:h-auto md:rounded-full md:px-10"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-auto grid w-full max-w-6xl grid-cols-1 gap-8 pt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:pt-24">
            {FEATURES.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="flex gap-4 text-left sm:flex-col sm:gap-3 sm:text-center lg:flex-row lg:text-left"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#4A72FF] text-white shadow-md">
                  <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">{title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-white/80">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}
