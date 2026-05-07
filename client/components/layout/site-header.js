"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HeartHandshake, LayoutDashboard, LogOut, MessageSquareMore, Users } from "lucide-react";
import { useAuth } from "../../context/auth-context";
import { cn, getDashboardPath } from "../../lib/utils";
import { Button } from "../ui/button";

const publicLinks = [
  { href: "/profiles", label: "Profiles" },
  { href: "/bookings", label: "Bookings" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const links = [
    ...publicLinks,
    ...(user
      ? [{ href: getDashboardPath(user.role), label: "Dashboard", icon: LayoutDashboard }]
      : [])
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-[#fff8f2]/80 backdrop-blur-xl">
      <div className="page-shell flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-full bg-rosewood p-3 text-white">
            <HeartHandshake className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold">Companion Circle</p>
            <p className="text-xs uppercase tracking-[0.24em] text-black/50">
              Safe social companionship
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                pathname === link.href ? "bg-white text-ink shadow-soft" : "text-black/60 hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <div className="hidden rounded-full bg-white/80 px-4 py-2 text-sm text-black/65 sm:block">
                {user.email}
              </div>
              <Button
                variant="secondary"
                className="gap-2"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="secondary">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button>Join now</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="page-shell flex gap-2 overflow-x-auto pb-4 md:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium",
              pathname === link.href
                ? "border-transparent bg-ink text-white"
                : "border-black/10 bg-white/80 text-black/70"
            )}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/profiles" className="whitespace-nowrap rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-black/70">
          <Users className="mr-2 inline h-4 w-4" />
          Explore
        </Link>
        <Link href="/bookings" className="whitespace-nowrap rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-black/70">
          <MessageSquareMore className="mr-2 inline h-4 w-4" />
          Sessions
        </Link>
      </div>
    </header>
  );
}
