import React from "react";

const ManageBookPage = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-neutral-100 font-display">Book Management</h1>
          <p className="text-neutral-500 font-medium text-lg leading-relaxed">Refine and update library catalog entries with institutional precision.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-8 py-3.5 rounded-2xl bg-white dark:bg-slate-800 text-neutral-900 dark:text-neutral-100 font-black text-xs uppercase tracking-widest shadow-sm border border-neutral-100 dark:border-neutral-700 hover:bg-neutral-50 transition-all">
            Cancel
          </button>
          <button className="px-8 py-3.5 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-primary-500/20 hover:opacity-90 active:scale-95 transition-all">
            Save Changes
          </button>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Main Form Fields */}
          <div className="md:col-span-8 p-10 space-y-12">
            {/* Section 1: Basic Information */}
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                  <span className="material-symbols-outlined">info</span>
                </div>
                <h3 className="text-xl font-black text-neutral-900 dark:text-neutral-100 font-display uppercase tracking-widest">Basic Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest px-1">Book Title</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors">title</span>
                    <input 
                      className="w-full bg-neutral-50 dark:bg-neutral-900 border-none rounded-2xl py-4 pl-14 pr-6 font-bold text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none" 
                      placeholder="e.g. The Architecture of Tomorrow" 
                      type="text"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest px-1">Author</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors">person</span>
                    <input 
                      className="w-full bg-neutral-50 dark:bg-neutral-900 border-none rounded-2xl py-4 pl-14 pr-6 font-bold text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none" 
                      placeholder="Full Name" 
                      type="text"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest px-1">ISBN-13</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors">barcode</span>
                    <input 
                      className="w-full bg-neutral-50 dark:bg-neutral-900 border-none rounded-2xl py-4 pl-14 pr-6 font-bold text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none" 
                      placeholder="978-0-..." 
                      type="text"
                    />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest px-1">Publisher</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors">business</span>
                    <input 
                      className="w-full bg-neutral-50 dark:bg-neutral-900 border-none rounded-2xl py-4 pl-14 pr-6 font-bold text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none" 
                      placeholder="Publishing House" 
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Classification */}
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                  <span className="material-symbols-outlined">category</span>
                </div>
                <h3 className="text-xl font-black text-neutral-900 dark:text-neutral-100 font-display uppercase tracking-widest">Classification</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest px-1">Primary Category</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400">list</span>
                    <select className="w-full bg-neutral-50 dark:bg-neutral-900 border-none rounded-2xl py-4 pl-14 pr-12 font-bold text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500/20 transition-all appearance-none outline-none">
                      <option>Architecture & Design</option>
                      <option>Computer Science</option>
                      <option>Mathematics</option>
                      <option>Social Sciences</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">expand_more</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest px-1">Tags</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors">label</span>
                    <div className="w-full bg-neutral-50 dark:bg-neutral-900 border-none rounded-2xl py-2 pl-14 pr-6 flex flex-wrap gap-2 items-center min-h-[56px]">
                      <span className="bg-primary-500/10 text-primary-500 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                        Modern <span className="material-symbols-outlined text-[14px] cursor-pointer">close</span>
                      </span>
                      <span className="bg-primary-500/10 text-primary-500 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                        Urban <span className="material-symbols-outlined text-[14px] cursor-pointer">close</span>
                      </span>
                      <input className="bg-transparent border-none focus:ring-0 p-0 text-xs font-bold w-24" placeholder="Add Tag..." type="text"/>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Inventory */}
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                  <span className="material-symbols-outlined">inventory_2</span>
                </div>
                <h3 className="text-xl font-black text-neutral-900 dark:text-neutral-100 font-display uppercase tracking-widest">Inventory & Logistics</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest px-1">Total Copies</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors">library_books</span>
                    <input 
                      className="w-full bg-neutral-50 dark:bg-neutral-900 border-none rounded-2xl py-4 pl-14 pr-6 font-bold text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none" 
                      type="number" 
                      defaultValue="1"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest px-1">Shelf Location</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors">grid_view</span>
                    <input 
                      className="w-full bg-neutral-50 dark:bg-neutral-900 border-none rounded-2xl py-4 pl-14 pr-6 font-bold text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none" 
                      placeholder="e.g. A2-404" 
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar: Cover Upload */}
          <div className="md:col-span-4 bg-neutral-50 dark:bg-neutral-900/30 border-l border-neutral-100 dark:border-neutral-700 p-10 flex flex-col items-center">
            <section className="w-full space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                  <span className="material-symbols-outlined">image</span>
                </div>
                <h3 className="text-xl font-black text-neutral-900 dark:text-neutral-100 font-display uppercase tracking-widest">Media</h3>
              </div>
              
              <div className="w-full aspect-[3/4.5] relative rounded-3xl overflow-hidden group bg-neutral-200 dark:bg-neutral-800 border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-primary-500/50 transition-all duration-500 shadow-inner">
                <img 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                  alt="Book Cover Preview" 
                  src="https://images.unsplash.com/photo-1543004218-283029ee9b6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                />
                <div className="absolute inset-0 bg-neutral-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-white text-3xl">cloud_upload</span>
                  </div>
                  <p className="text-white font-black text-xs uppercase tracking-widest">Drop cover here or click to upload</p>
                  <p className="text-white/50 text-[10px] mt-2 font-bold">PNG, JPG up to 10MB</p>
                </div>
              </div>

              <button className="w-full py-4 rounded-2xl bg-white dark:bg-slate-800 border border-neutral-100 dark:border-neutral-700 font-black text-[10px] uppercase tracking-widest text-neutral-900 dark:text-neutral-100 hover:shadow-lg transition-all flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-lg">photo_camera</span>
                Change Cover Image
              </button>

              <div className="p-6 rounded-2xl bg-primary-500/5 border border-primary-500/10 space-y-4">
                <h4 className="text-[10px] font-black text-primary-500 uppercase tracking-widest">Cover Guidelines</h4>
                <ul className="text-[10px] text-neutral-500 font-bold space-y-2 list-disc pl-4 uppercase tracking-[0.05em] leading-relaxed">
                  <li>Optimal resolution: 1200 x 1600 px</li>
                  <li>Maintain a 3:4 aspect ratio</li>
                  <li>Ensure high contrast for readability</li>
                </ul>
              </div>
            </section>
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-8 border-t border-neutral-100 dark:border-neutral-700 flex flex-col md:flex-row justify-between items-center gap-6 bg-neutral-50 dark:bg-neutral-900/20">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-primary-500 animate-pulse"></div>
            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest italic">Unsaved changes detected...</span>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-neutral-500 font-black text-[10px] uppercase tracking-widest hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
              <span className="material-symbols-outlined text-lg">delete</span>
              Discard
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-12 py-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-500/20 hover:opacity-90 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-lg">check_circle</span>
              Save Book Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBookPage;
