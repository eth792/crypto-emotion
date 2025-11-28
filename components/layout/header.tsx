"use client";

import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="h-14 sm:h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="h-full px-3 sm:px-6 flex items-center justify-between">
        {/* Left Spacer - Hidden on mobile */}
        <div className="hidden sm:block flex-1"></div>

        {/* Title - Centered */}
        <div className="flex items-center justify-center flex-1 sm:flex-none">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Market Sentiment</h2>
        </div>

        {/* Right: Search + Actions */}
        <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3">
          {/* Search - Hidden on mobile, visible on desktop */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10 w-48 lg:w-64 bg-background-secondary border-0"
            />
          </div>

          {/* Search icon button - Visible on mobile only */}
          <Button variant="ghost" size="icon" className="md:hidden h-8 w-8 sm:h-10 sm:w-10">
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>

          <ThemeToggle />

          <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-10 sm:w-10">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full" />
          </Button>
        </div>
      </div>
    </header>
  );
}
