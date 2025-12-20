"use client";

import { Bell, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="h-16 border-b border-border glass px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input 
          type="text" 
          placeholder="Search records, students, invoices..." 
          className="w-full bg-white/5 border border-border rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-xl bg-white/5 border border-border flex items-center justify-center hover:bg-white/10 transition-colors relative">
          <Bell className="w-5 h-5 text-muted" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full glow" />
        </button>
        
        <div className="h-10 border-l border-border mx-2" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium">Campus Admin</p>
            <p className="text-xs text-muted">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center border border-white/10">
            <User className="text-white w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
