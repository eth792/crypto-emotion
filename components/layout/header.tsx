"use client";

import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Spacer */}
        <div className="flex-1"></div>

        {/* Title - Centered */}
        <div className="flex items-center justify-center">
          <h2 className="text-2xl font-bold">Market Sentiment</h2>
        </div>

        {/* Right: Search + Actions */}
        <div className="flex-1 flex items-center justify-end gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64 bg-background-secondary border-0"
            />
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </Button>
        </div>
      </div>
    </header>
  );
}
