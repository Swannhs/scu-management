import React from "react";

const BookDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      {/* Page Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-2 font-medium">
            <a className="hover:text-primary-500 transition-colors" href="#">Catalog</a>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-neutral-900 dark:text-neutral-100 font-bold">Book Details</span>
          </nav>
          <h2 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-neutral-100 font-display">The Great Gatsby</h2>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 text-red-500 font-black text-xs uppercase tracking-widest hover:bg-red-500/10 rounded-xl transition-colors">
            <span className="material-symbols-outlined text-lg">delete</span>
            Delete
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
            <span className="material-symbols-outlined text-lg">edit</span>
            Edit
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-br from-primary-500 to-primary-600 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-primary-500/20 hover:opacity-90 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-lg">send</span>
            Issue Book
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Book Info Section */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-10 flex flex-col md:flex-row gap-12 shadow-sm border border-neutral-200 dark:border-neutral-700">
            <div className="w-full md:w-64 shrink-0 aspect-[2/3] rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 shadow-2xl shadow-black/10">
              <img 
                className="w-full h-full object-cover" 
                alt="The Great Gatsby" 
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
              />
            </div>
            <div className="flex-1 space-y-8">
              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                <div>
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-2">Author</p>
                  <p className="text-xl font-black text-neutral-900 dark:text-neutral-100 font-display">F. Scott Fitzgerald</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-2">ISBN</p>
                  <p className="text-xl font-black text-neutral-900 dark:text-neutral-100 font-display">978-0743273565</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-2">Category</p>
                  <span className="inline-flex items-center px-4 py-1 bg-primary-500/10 text-primary-500 rounded-full text-[10px] font-black uppercase tracking-widest">Classic Literature</span>
                </div>
                <div>
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-2">Publisher</p>
                  <p className="text-xl font-black text-neutral-900 dark:text-neutral-100 font-display">Scribner</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-2">Language</p>
                  <p className="text-xl font-black text-neutral-900 dark:text-neutral-100 font-display">English</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-2">Published</p>
                  <p className="text-xl font-black text-neutral-900 dark:text-neutral-100 font-display">April 10, 1925</p>
                </div>
              </div>
              <div className="pt-8 border-t border-neutral-100 dark:border-neutral-700">
                <p className="text-neutral-500 font-medium leading-relaxed italic">
                  \"A portrait of the Jazz Age in all of its decadence and excess, Gatsby captured the spirit of the author's generation and earned him a reputation as one of the greatest American writers of the twentieth century.\"
                </p>
              </div>
            </div>
          </div>

          {/* Copies List Table */}
          <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-700">
            <div className="px-10 py-8 border-b border-neutral-100 dark:border-neutral-700 flex justify-between items-center">
              <h3 className="text-2xl font-black text-neutral-900 dark:text-neutral-100 font-display">Physical Copies</h3>
              <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Inventory Count: 08</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 dark:bg-neutral-900/50">
                    <th className="px-10 py-5 text-[10px] font-black text-neutral-500 uppercase tracking-widest">Book ID</th>
                    <th className="px-10 py-5 text-[10px] font-black text-neutral-500 uppercase tracking-widest">Condition</th>
                    <th className="px-10 py-5 text-[10px] font-black text-neutral-500 uppercase tracking-widest">Shelf Location</th>
                    <th className="px-10 py-5 text-[10px] font-black text-neutral-500 uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
                  <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 transition-colors">
                    <td className="px-10 py-6 font-mono text-sm text-primary-500 font-bold">LIB-GAT-001</td>
                    <td className="px-10 py-6 text-sm font-bold text-neutral-900 dark:text-neutral-100">Mint</td>
                    <td className="px-10 py-6 text-sm font-bold text-neutral-700 dark:text-neutral-300">Aisle 4, Shelf B-12</td>
                    <td className="px-10 py-6 text-right">
                      <span className="inline-flex items-center gap-2 text-primary-500 text-[10px] font-black uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                        On Shelf
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 transition-colors">
                    <td className="px-10 py-6 font-mono text-sm text-primary-500 font-bold">LIB-GAT-002</td>
                    <td className="px-10 py-6 text-sm font-bold text-neutral-900 dark:text-neutral-100">Good</td>
                    <td className="px-10 py-6 text-sm font-bold text-neutral-700 dark:text-neutral-300">Aisle 4, Shelf B-12</td>
                    <td className="px-10 py-6 text-right">
                      <span className="inline-flex items-center gap-2 text-neutral-400 text-[10px] font-black uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
                        Issued
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          {/* Availability Card */}
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-10 rounded-[2.5rem] text-white shadow-xl shadow-primary-500/20 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-8">Current Availability</h3>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-7xl font-black font-display tracking-tighter">5</span>
                <span className="text-xl font-bold opacity-70">of 8 copies</span>
              </div>
              <div className="w-full bg-white/20 h-2.5 rounded-full mt-6 overflow-hidden">
                <div className="bg-white h-full w-[62.5%] rounded-full"></div>
              </div>
              <p className="mt-8 text-sm font-bold opacity-90 leading-snug">All copies are currently located in the Main Campus Library, Arts & Humanities section.</p>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <span className="material-symbols-outlined text-[200px]">library_books</span>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-10 shadow-sm border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-2xl font-black text-neutral-900 dark:text-neutral-100 font-display mb-8">Recent Activity</h3>
            <div className="space-y-8">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary-500">person</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-neutral-900 dark:text-neutral-100">Jonathan Harker</p>
                  <p className="text-xs font-bold text-neutral-400">Issued: Oct 12, 2023</p>
                </div>
                <span className="px-3 py-1 bg-primary-500/10 text-primary-500 text-[9px] font-black rounded-full uppercase tracking-widest">Returned</span>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary-500">person</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-neutral-900 dark:text-neutral-100">Mina Murray</p>
                  <p className="text-xs font-bold text-neutral-400">Issued: Nov 01, 2023</p>
                </div>
                <span className="px-3 py-1 bg-red-500/10 text-red-500 text-[9px] font-black rounded-full uppercase tracking-widest">Overdue</span>
              </div>
            </div>
            <button className="w-full mt-10 py-4 text-xs font-black text-primary-500 uppercase tracking-widest hover:bg-primary-500/5 rounded-2xl transition-colors border border-primary-500/20">View Full History</button>
          </div>

          {/* Quick Metadata */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-800">
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2">Rank</p>
              <p className="text-3xl font-black text-primary-500 font-display">#12</p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-800">
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2">Issues</p>
              <p className="text-3xl font-black text-primary-500 font-display">142</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
