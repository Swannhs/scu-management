import React from "react";

const MemberDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      {/* Member Profile Header */}
      <section className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-neutral-200 dark:border-neutral-700 flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="relative">
            <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-neutral-50 dark:ring-neutral-900">
              <img 
                className="w-full h-full object-cover" 
                alt="Sarah Jenkins" 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary-500 w-8 h-8 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xs">check_circle</span>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left space-y-6">
            <div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-2">
                <h3 className="text-3xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight font-display">Sarah Jenkins</h3>
                <span className="bg-primary-500/10 text-primary-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Student</span>
              </div>
              <p className="text-neutral-500 font-bold text-sm tracking-tight">ID: #CS-2024-8892 • <span className="text-primary-500">Computer Science Dept.</span></p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-8">
              <div className="flex items-center gap-2 text-sm font-bold text-neutral-600 dark:text-neutral-400">
                <span className="material-symbols-outlined text-primary-500">mail</span>
                <span>s.jenkins@university.edu</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-neutral-600 dark:text-neutral-400">
                <span className="material-symbols-outlined text-primary-500">phone</span>
                <span>+1 (555) 012-3456</span>
              </div>
            </div>
            <div className="flex gap-4 pt-2 justify-center md:justify-start">
              <button className="bg-gradient-to-br from-primary-500 to-primary-600 text-white px-8 py-3.5 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-primary-500/20 hover:opacity-90 active:scale-95 transition-all uppercase tracking-widest text-xs">
                <span className="material-symbols-outlined text-lg">add_box</span>
                Issue Book
              </button>
              <button className="bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-8 py-3.5 rounded-2xl font-black border border-transparent hover:border-red-500/20 hover:text-red-500 transition-all uppercase tracking-widest text-xs">
                Block Member
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Info Panel */}
        <div className="col-span-12 lg:col-span-4 bg-neutral-50 dark:bg-neutral-900/50 p-10 rounded-[2.5rem] space-y-8 border border-neutral-100 dark:border-neutral-800">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Membership Status</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700">
              <span className="text-xs font-bold text-neutral-500">Account Valid Until</span>
              <span className="text-sm font-black text-neutral-900 dark:text-neutral-100">Sept 20, 2025</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700">
              <span className="text-xs font-bold text-neutral-500">Borrowing Limit</span>
              <span className="text-sm font-black text-neutral-900 dark:text-neutral-100">5 / 8 Books</span>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-2.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-primary-500 h-full w-[62%] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Currently Issued", val: "03", sub: "Active", icon: "auto_stories", color: "primary" },
          { label: "Total Loans", val: "42", sub: "Historical", icon: "history_edu", color: "blue" },
          { label: "Outstanding Fines", val: "$12.50", sub: "Unpaid", icon: "payments", color: "red" },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-neutral-200 dark:border-neutral-700 relative overflow-hidden group">
            <div className={`absolute right-[-5%] top-[-5%] text-${stat.color}-500/5 group-hover:scale-110 transition-transform duration-500`}>
              <span className="material-symbols-outlined text-9xl">{stat.icon}</span>
            </div>
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-3">{stat.label}</p>
            <div className="flex items-end gap-3 relative z-10">
              <h4 className={`text-4xl font-black text-neutral-900 dark:text-neutral-100 font-display ${stat.color === 'red' ? 'text-red-500' : ''}`}>{stat.val}</h4>
              <span className={`text-[10px] font-black uppercase tracking-widest mb-2 text-${stat.color}-500`}>
                {stat.sub}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Active Loans Table */}
      <section className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="flex border-b border-neutral-100 dark:border-neutral-700 px-4">
          <button className="px-8 py-6 text-[10px] font-black uppercase tracking-widest border-b-2 border-primary-500 text-primary-500">Active Loans</button>
          <button className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all">Fine History</button>
          <button className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all">Activity Log</button>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl">
                  <th className="px-8 py-5 text-[10px] font-black text-neutral-500 uppercase tracking-widest first:rounded-l-2xl">Book Title</th>
                  <th className="px-8 py-5 text-[10px] font-black text-neutral-500 uppercase tracking-widest">Issue Date</th>
                  <th className="px-8 py-5 text-[10px] font-black text-neutral-500 uppercase tracking-widest">Due Date</th>
                  <th className="px-8 py-5 text-[10px] font-black text-neutral-500 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-neutral-500 uppercase tracking-widest text-right last:rounded-r-2xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
                {[
                  { title: "Advanced Quantum Mechanics", isbn: "978-0123456789", issued: "May 12, 2024", due: "May 26, 2024", status: "On Time", color: "primary" },
                  { title: "Discrete Mathematics & Logic", isbn: "978-1567890123", issued: "May 05, 2024", due: "May 19, 2024", status: "Overdue", color: "red" },
                ].map((loan, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-14 bg-neutral-100 dark:bg-neutral-700 rounded-lg shadow-sm flex-shrink-0 flex items-center justify-center">
                          <span className="material-symbols-outlined text-neutral-400">book</span>
                        </div>
                        <div>
                          <div className="font-black text-sm text-neutral-900 dark:text-neutral-100">{loan.title}</div>
                          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">ISBN: {loan.isbn}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-neutral-600 dark:text-neutral-400">{loan.issued}</td>
                    <td className={`px-8 py-6 text-sm font-black text-${loan.color}-500`}>{loan.due}</td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 bg-${loan.color}-500/10 text-${loan.color}-500 text-[9px] font-black uppercase tracking-widest rounded-full`}>{loan.status}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-primary-500 text-[10px] font-black uppercase tracking-[0.15em] hover:underline">Renew</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Activity Log */}
      <section className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-neutral-200 dark:border-neutral-700">
        <div className="flex justify-between items-center mb-10">
          <h4 className="text-2xl font-black text-neutral-900 dark:text-neutral-100 font-display tracking-tight">Recent Activity</h4>
          <button className="text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
            View All History <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        <div className="space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-neutral-100 dark:before:bg-neutral-800">
          {[
            { icon: "book", color: "primary", action: "Issued 'Clean Code'", meta: "Handled by: Library Staff #4", time: "Today, 10:42 AM" },
            { icon: "payments", color: "red", action: "Fine Accrued ($2.50)", meta: "Reason: Late return - 'Data Structures'", time: "Yesterday, 06:00 PM" },
            { icon: "history", color: "blue", action: "Returned 'Atomic Habits'", meta: "Excellent condition check completed", time: "May 15, 2024" },
          ].map((activity, i) => (
            <div key={i} className="relative pl-12 group">
              <div className={`absolute left-0 top-1 w-6 h-6 bg-${activity.color}-500/10 text-${activity.color}-500 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-slate-800 group-hover:scale-125 transition-transform`}>
                <span className="material-symbols-outlined text-xs">{activity.icon}</span>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div>
                  <span className="font-black text-sm text-neutral-900 dark:text-neutral-100">{activity.action}</span>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1 italic">{activity.meta}</p>
                </div>
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MemberDetailPage;
