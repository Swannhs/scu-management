"use client";

import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Plus,
  ArrowUpRight,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Total Students", value: "24,512", icon: Users, change: "+12.5%", color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Faculty Members", value: "1,208", icon: GraduationCap, change: "+3.2%", color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Active Programs", value: "48", icon: BookOpen, change: "Stable", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "System Uptime", value: "99.9%", icon: ShieldCheck, change: "Normal", color: "text-amber-500", bg: "bg-amber-500/10" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
          <p className="text-muted mt-1">Institutional metrics and real-time operations.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium hover:bg-primary/90 transition-all glow">
          <Plus className="w-4 h-4" />
          Quick Actions
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-2xl relative group overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className={cn("p-3 rounded-xl", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-muted font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1 tracking-tight">{stat.value}</h3>
            </div>

            <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* Charts / Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-3xl p-8 h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Enrollment Trends</h2>
            <select className="bg-white/5 border border-border rounded-lg px-3 py-1.5 text-sm outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="flex-1 flex items-end gap-2 px-2">
            {[45, 60, 40, 80, 55, 90, 70, 85, 50, 75, 65, 95].map((val, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${val}%` }}
                transition={{ delay: 0.5 + i * 0.05, type: "spring", damping: 15 }}
                className="flex-1 bg-gradient-to-t from-primary/20 to-primary rounded-t-lg relative group"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {val}%
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-8">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-border flex items-center justify-center flex-shrink-0">
                  <ArrowUpRight className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">New Student Enrolled</p>
                  <p className="text-xs text-muted">2 minutes ago • B.S. CS</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full h-12 border border-border rounded-2xl mt-8 text-sm font-medium hover:bg-white/5 transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
