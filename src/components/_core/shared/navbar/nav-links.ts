import { cn } from "@/lib/utils";

export const NAV_LINKS = [
    { href: "/explore", label: "Explore" },
    { href: "#", label: "About Us" },
    { href: "#", label: "Contact Us" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];

export function isNavLinkActive(pathname: string, href: string) {
    if (href === "#") return false;
    if (href === "/") return pathname === "/";
    if (href === "/favourite") {
        return pathname === "/favourite" || pathname.startsWith("/favourite/");
    }
    return pathname === href || pathname.startsWith(`${href}/`);
}

export function desktopNavLinkClassName(isActive: boolean) {
    return cn(
        "transition-colors",
        isActive
            ? "font-semibold text-primary"
            : "text-neutral-700 hover:text-neutral-900",
    );
}

export function mobileNavLinkClassName(isActive: boolean) {
    return cn(
        "rounded-lg px-3 py-3 text-base font-medium transition-colors",
        isActive
            ? "bg-primary/10 font-semibold text-primary"
            : "text-neutral-800 hover:bg-neutral-50",
    );
}
