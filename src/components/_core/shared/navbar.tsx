"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Coins, Heart, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#", label: "Explore" },
  { href: "#", label: "About Us" },
  { href: "#", label: "Contact Us" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white">
      <div className="app-width flex h-16 items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2 justify-self-start sm:gap-3">
          <div
            className="size-9 shrink-0 rounded-full bg-neutral-200 sm:size-10"
            aria-hidden
          />
          <span className="sr-only">Home</span>
        </Link>

        <nav
          className="hidden items-center justify-center gap-8 text-sm font-medium text-neutral-700 md:flex"
          aria-label="Main"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              className="transition-colors hover:text-neutral-900"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-1 sm:gap-2 md:gap-3">
          <div className="hidden items-center gap-1.5 rounded-full border border-primary/40 bg-primary/12 px-3 py-1.5 text-xs font-semibold text-primary md:flex">
            <Coins className="size-3.5" aria-hidden />
            <span className="whitespace-nowrap">4,958 KPS</span>
          </div>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            aria-label="Wishlist"
          >
            <Heart className="size-5" strokeWidth={1.75} />
          </button>
          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            Login
          </Button>
          <Button
            size="sm"
            className="hidden h-9 rounded-lg bg-primary px-3 font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 sm:inline-flex sm:px-4"
          >
            Sign Up
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="size-5" strokeWidth={2} />
            ) : (
              <Menu className="size-5" strokeWidth={2} />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile drawer + backdrop (md:hidden) */}
      <div className="md:hidden" aria-hidden={!open}>
        <div
          className={cn(
            "fixed inset-0 top-16 z-40 bg-black/40 transition-opacity duration-300 ease-out",
            open ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <aside
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          aria-hidden={!open}
          inert={!open}
          className={cn(
            "fixed bottom-0 left-0 top-16 z-50 flex w-[min(22rem,88vw)] max-w-full flex-col border-r border-neutral-100 bg-white shadow-xl transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
            <span className="text-sm font-semibold text-neutral-900">Menu</span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" strokeWidth={2} />
            </Button>
          </div>

          <nav
            className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4"
            aria-label="Mobile"
            onClick={(e) => {
              const t = e.target as HTMLElement;
              if (t.closest("a")) setOpen(false);
            }}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="rounded-lg px-3 py-3 text-base font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
              >
                {label}
              </a>
            ))}
            <div className="mt-auto border-t border-neutral-100 pt-4">
              <div className="flex items-center gap-2 rounded-full border border-primary/40 bg-primary/12 px-3 py-2 text-sm font-semibold text-primary">
                <Coins className="size-4 shrink-0" aria-hidden />
                <span>4,958 KPS</span>
              </div>
              <Button
                variant="outline"
                className="mt-3 w-full justify-center"
                onClick={() => setOpen(false)}
              >
                Login
              </Button>
              <Button
                className="mt-2 w-full justify-center rounded-lg bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
                onClick={() => setOpen(false)}
              >
                Sign Up
              </Button>
            </div>
          </nav>
        </aside>
      </div>
    </header>
  );
}
