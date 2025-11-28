"use client";

import {
  LayoutDashboard,
  Newspaper,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Newspaper, label: "News", href: "/news" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button - Fixed on left edge */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed top-4 z-50 transition-all duration-300 bg-background border border-border hover:bg-background-tertiary rounded-r-lg rounded-l-none h-8 w-8 p-0",
          isOpen ? "left-64" : "left-0"
        )}
      >
        {isOpen ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "h-screen bg-background border-r border-border p-6 flex flex-col fixed left-0 top-0 z-40 transition-transform duration-300",
          "w-64",
          !isOpen && "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="mb-8 mt-12">
          <h1 className="text-2xl font-bold gradient-text">Sentiment Radar</h1>
          <p className="text-sm text-muted-foreground mt-1">Crypto emotions</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-button",
                  "transition-all duration-200",
                  isActive
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-background-tertiary hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
