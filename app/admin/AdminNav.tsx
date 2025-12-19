"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin/jobs", label: "Jobs" },
    { href: "/admin/pros", label: "Pros" },
  ];

  return (
    <div className="flex gap-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm font-medium transition-colors ${
            pathname === item.href
              ? "text-donezo-orange border-b-2 border-donezo-orange pb-1"
              : "text-[#6B7280] hover:text-[#0B1220]"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}


