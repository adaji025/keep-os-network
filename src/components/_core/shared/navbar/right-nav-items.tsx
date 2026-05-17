import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { GemSvg } from "../svg";

type RightNavItemsProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  panelId: string;
};

export default function RightNavItems({
  open,
  setOpen,
  panelId,
}: RightNavItemsProps) {
  return (
    <div className="flex items-center justify-self-end gap-1 sm:gap-2 md:gap-3">
      <div className="hidden items-center gap-1.5 rounded-full border border-primary/40 bg-primary/12 px-3 py-1.5 text-xs font-semibold text-primary md:flex">
        <GemSvg />
        <span className="whitespace-nowrap">4,958 KPS</span>
      </div>
      <Link
        href="/favourite"
        className="inline-flex size-9 items-center justify-center rounded-full border text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
        aria-label="Favourites"
      >
        <Heart className="size-5" strokeWidth={1.75} />
      </Link>
      <Button
        variant="ghost"
        size="sm"
        className="hidden md:inline-flex"
        asChild
      >
        <Link href="/explore/auth/login">Login</Link>
      </Button>
      <Button
        size="sm"
        className="hidden h-9 rounded-lg bg-primary px-3 font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 sm:inline-flex sm:px-4"
        asChild
      >
        <Link href="/explore/auth/register">Sign Up</Link>
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
  );
}
