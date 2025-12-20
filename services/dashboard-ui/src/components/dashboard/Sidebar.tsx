"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    BookOpen,
    Wallet,
    Home,
    Settings,
    ChevronRight,
    ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";

const routes = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Students", icon: Users, path: "/students" },
    { name: "Faculty", icon: GraduationCap, path: "/faculty" },
    { name: "Programs", icon: BookOpen, path: "/programs" },
    { name: "Finance", icon: Wallet, path: "/finance" },
    { name: "Hostels", icon: Home, path: "/hostels" },
    { name: "Tenants", icon: ShieldCheck, path: "/tenants" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 h-full glass border-r border-border flex flex-col p-4">
            <div className="flex items-center gap-3 px-2 mb-10 mt-2">
                <div className="w-8 h-8 rounded-lg bg-primary glow flex items-center justify-center">
                    <GraduationCap className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-gradient">SCU Admin</span>
            </div>

            <nav className="flex-1 space-y-2">
                {routes.map((route) => {
                    const isActive = pathname === route.path;
                    return (
                        <Link
                            key={route.path}
                            href={route.path}
                            className={cn(
                                "group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200",
                                isActive
                                    ? "bg-primary/20 text-primary border border-primary/20"
                                    : "text-muted hover:text-white hover:bg-white/5"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <route.icon className={cn("w-5 h-5", isActive ? "text-primary" : "group-hover:text-white")} />
                                <span className="font-medium">{route.name}</span>
                            </div>
                            {isActive && (
                                <motion.div layoutId="sidebar-active" className="w-1.5 h-1.5 rounded-full bg-primary" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-6 border-t border-border">
                <Link
                    href="/settings"
                    className="flex items-center gap-3 px-3 py-2 text-muted hover:text-white transition-colors"
                >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                </Link>
            </div>
        </div>
    );
}
