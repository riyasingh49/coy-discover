"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Heart, Sparkles } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    {
      name: "Discover",
      href: "/discover",
      icon: Compass,
    },
    {
      name: "Matches",
      href: "/matches",
      icon: Heart,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-pink-100 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">

        {/* Logo */}
        <Link href="/discover" className="flex items-center gap-2">
          <div className="rounded-xl bg-pink-500 p-2 text-white">
            <Sparkles size={20} />
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            coy<span className="text-pink-500">.</span>
          </span>
        </Link>

        {/* Navigation links */}
        <div className="flex items-center gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-pink-500 text-white shadow-md shadow-pink-200"
                    : "text-gray-500 hover:bg-pink-50 hover:text-pink-600"
                }`}
              >
                <Icon size={17} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
