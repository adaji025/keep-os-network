"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import RightNavItems from "./right-nav-items";
import MobileDrawer from "./mobile-drawer";

const NAV_LINKS = [
  { href: "/explore", label: "Explore" },
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

        <RightNavItems
          open={open}
          setOpen={setOpen}
          panelId={panelId}
        />
      </div>

      <MobileDrawer
        open={open}
        setOpen={setOpen}
        panelId={panelId}
        navLinks={NAV_LINKS}
      />
    </header>
  );
}
