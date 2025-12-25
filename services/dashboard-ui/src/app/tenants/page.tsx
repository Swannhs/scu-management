"use client";

import { motion } from "framer-motion";
import { Plus, Globe, Building2, MapPin, ExternalLink, Shield } from "lucide-react";

const tenants = [
    { id: "1", name: "Skyline University", domain: "skyline.edu", campuses: 3, status: "Active" },
    { id: "2", name: "Green Valley School", domain: "gv.school", campuses: 1, status: "Active" },
    { id: "3", name: "Tech Institute of Science", domain: "tis.tech", campuses: 2, status: "Pending" },
];

export default function TenantsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tenant Management</h1>
                    <p className="text-muted mt-1">Onboard and manage institutes, custom domains, and campuses.</p>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium hover:bg-primary/90 transition-all glow">
                    <Plus className="w-4 h-4" />
                    Add New Institute
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tenants.map((tenant, i) => (
                    <motion.div
                        key={tenant.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass p-6 rounded-3xl group cursor-pointer hover:border-primary/50 transition-all"
                    >
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-border flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                <Building2 className="w-6 h-6 text-primary" />
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${tenant.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                                }`}>
                                {tenant.status}
                            </span>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-xl font-bold">{tenant.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted mt-2">
                                <Globe className="w-4 h-4" />
                                {tenant.domain}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted mt-1">
                                <MapPin className="w-4 h-4" />
                                {tenant.campuses} Active Campuses
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                                <Shield className="w-3.5 h-3.5" />
                                SaaS Isolated
                            </div>
                            <button className="text-muted hover:text-white transition-colors">
                                <ExternalLink className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}

                <div className="border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center p-8 text-center group hover:border-primary/50 transition-all">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                        <Plus className="w-6 h-6 text-muted group-hover:text-primary" />
                    </div>
                    <p className="text-sm font-medium text-muted">Register New Institute</p>
                </div>
            </div>
        </div>
    );
}
