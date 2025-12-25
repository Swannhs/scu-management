"use client";

import { motion } from "framer-motion";
import {
    Plus,
    Wallet,
    ArrowUpRight,
    ArrowDownLeft,
    DollarSign,
    Search,
    MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

const invoices = [
    { id: "INV-8821", name: "Alice Thompson", date: "Oct 24, 2025", amount: "$5,200.00", status: "Paid" },
    { id: "INV-8822", name: "Marcus Wright", date: "Oct 25, 2025", amount: "$3,400.00", status: "Pending" },
    { id: "INV-8823", name: "Sarah Chen", date: "Oct 26, 2025", amount: "$1,800.00", status: "Paid" },
    { id: "INV-8824", name: "David Miller", date: "Oct 26, 2025", amount: "$4,100.00", status: "Cancelled" },
];

export default function FinancePage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Finance & Billing</h1>
                    <p className="text-muted mt-1">Monitor revenue, student invoices, and institutional payments.</p>
                </div>
                <div className="flex gap-4">
                    <button className="glass px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/5 transition-all">
                        Export Report
                    </button>
                    <button className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium hover:bg-primary/90 transition-all glow">
                        <Plus className="w-4 h-4" />
                        Create Invoice
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-8 rounded-3xl bg-linear-to-br from-primary/10 to-transparent">
                    <p className="text-sm font-medium text-muted">Monthly Revenue</p>
                    <div className="flex items-center gap-4 mt-2">
                        <h2 className="text-3xl font-bold">$124,502.00</h2>
                        <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">+18%</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted">
                        <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                        $12,400 more than last month
                    </div>
                </div>

                <div className="glass p-8 rounded-3xl">
                    <p className="text-sm font-medium text-muted">Pending Invoices</p>
                    <div className="flex items-center gap-4 mt-2">
                        <h2 className="text-3xl font-bold">42</h2>
                        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full">Action Needed</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted">
                        <DollarSign className="w-4 h-4 text-amber-500" />
                        Totaling $18,240.00
                    </div>
                </div>

                <div className="glass p-8 rounded-3xl">
                    <p className="text-sm font-medium text-muted">Collection Rate</p>
                    <div className="flex items-center gap-4 mt-2">
                        <h2 className="text-3xl font-bold">94.2%</h2>
                        <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full">Excellent</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted">
                        <ArrowDownLeft className="w-4 h-4 text-blue-500" />
                        2% increase this quarter
                    </div>
                </div>
            </div>

            <div className="glass rounded-3xl p-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold">Recent Invoices</h2>
                    <div className="flex gap-4">
                        <div className="bg-white/5 border border-border rounded-xl px-4 py-1.5 flex items-center gap-2">
                            <Search className="w-4 h-4 text-muted" />
                            <input type="text" placeholder="Filter..." className="bg-transparent border-none outline-none text-xs" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {invoices.map((inv, i) => (
                        <motion.div
                            key={inv.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-border transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-border flex items-center justify-center">
                                    <Wallet className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold">{inv.name}</h3>
                                    <p className="text-xs text-muted">{inv.id} • {inv.date}</p>
                                </div>
                            </div>

                            <div className="text-right flex items-center gap-8">
                                <div>
                                    <p className="text-sm font-bold">{inv.amount}</p>
                                    <p className={cn(
                                        "text-[10px] font-bold uppercase",
                                        inv.status === 'Paid' ? 'text-emerald-500' :
                                            inv.status === 'Pending' ? 'text-amber-500' : 'text-rose-500'
                                    )}>{inv.status}</p>
                                </div>
                                <button className="p-2 text-muted hover:text-white transition-colors">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
