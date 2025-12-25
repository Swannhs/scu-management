"use client";

import { motion } from "framer-motion";
import { Plus, Search, Filter, MoreVertical, Mail, Phone, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const students = [
    { id: "STU-001", name: "Alice Thompson", email: "alice.t@university.edu", program: "Computer Science", year: "3rd Year", status: "Active" },
    { id: "STU-002", name: "Marcus Wright", email: "marcus.w@university.edu", program: "Mechanical Eng.", year: "2nd Year", status: "Probation" },
    { id: "STU-003", name: "Sarah Chen", email: "sarah.c@university.edu", program: "Business Admin", year: "1st Year", status: "Active" },
    { id: "STU-004", name: "David Miller", email: "david.m@university.edu", program: "Physics", year: "4th Year", status: "Graduated" },
    { id: "STU-005", name: "Elena Rodriguez", email: "elena.r@university.edu", program: "Biology", year: "2nd Year", status: "Active" },
];

export default function StudentsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Student Directory</h1>
                    <p className="text-muted mt-1">Manage student profiles, academic records, and status.</p>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium hover:bg-primary/90 transition-all glow">
                    <Plus className="w-4 h-4" />
                    Enroll New Student
                </button>
            </div>

            <div className="flex items-center gap-4">
                <div className="glass flex-1 flex items-center gap-3 px-4 py-2 rounded-xl">
                    <Search className="w-4 h-4 text-muted" />
                    <input
                        type="text"
                        placeholder="Search by name, ID, or email..."
                        className="flex-1 bg-transparent border-none outline-none text-sm"
                    />
                </div>
                <button className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-white/5 transition-all">
                    <Filter className="w-4 h-4" />
                    Filters
                </button>
            </div>

            <div className="glass rounded-3xl overflow-hidden border border-border">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 border-b border-border">
                            <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Student ID</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Program</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {students.map((student, i) => (
                            <motion.tr
                                key={student.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <span className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded-lg">
                                        {student.id}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="text-sm font-semibold">{student.name}</p>
                                        <p className="text-xs text-muted font-medium">{student.year}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm">{student.program}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full",
                                        student.status === "Active" ? "bg-emerald-500/10 text-emerald-500" :
                                            student.status === "Probation" ? "bg-amber-500/10 text-amber-500" :
                                                "bg-blue-500/10 text-blue-500"
                                    )}>
                                        {student.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                            <Mail className="w-3.5 h-3.5 text-muted hover:text-white" />
                                        </button>
                                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                            <Phone className="w-3.5 h-3.5 text-muted hover:text-white" />
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 rounded-lg hover:bg-white/10 text-muted hover:text-white transition-colors">
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-white/10 text-muted transition-colors">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>

                <div className="bg-white/5 px-6 py-4 border-t border-border flex items-center justify-between text-xs font-medium text-muted">
                    <p>Showing 1 to 5 of 24,512 entries</p>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">Previous</button>
                        <button className="px-3 py-1 bg-primary text-white rounded-lg glow">1</button>
                        <button className="px-3 py-1 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">2</button>
                        <button className="px-3 py-1 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
