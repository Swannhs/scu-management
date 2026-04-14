"use client";

import Link from "next/link";

export default function LoginPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[36px] border border-slate-200/80 bg-white/90 shadow-[0_30px_90px_-50px_rgba(16,29,39,0.7)] backdrop-blur lg:grid-cols-[1.1fr,0.9fr]">
        <section className="relative overflow-hidden bg-slate-900 px-8 py-10 text-white lg:px-12 lg:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(80,220,255,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(0,167,111,0.35),transparent_38%)]" />
          <div className="relative">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>
                  apartment
                </span>
              </div>
              <div>
                <p className="hostel-heading text-xl font-black text-white">SCU HostelOps</p>
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Minimal Template UI</p>
              </div>
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-200">
              Hostel Admin Login
            </p>
            <h1 className="mt-4 hostel-heading text-4xl font-black text-white lg:text-5xl">
              Manage residents, rooms, and revenue from one focused console.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
              This frontend is built in `ui/hostel-ui-service` and follows the hostel Stitch direction: emerald system color, structured operations hierarchy, and workflow-first admin layouts.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["1,284", "Active residents"],
                ["92.5%", "Occupancy"],
                ["18", "Transfers pending"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <p className="hostel-heading text-3xl font-black text-white">{value}</p>
                  <p className="mt-2 text-sm text-slate-300">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-8 lg:px-10 lg:py-12">
          <div className="mx-auto max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-600">
              Welcome back
            </p>
            <h2 className="mt-3 hostel-heading text-3xl font-black">Sign in to the hostel portal</h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              Use the form below to access operations. This demo is static, so the primary call to action takes you directly into the dashboard.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                <input className="hostel-input" placeholder="admin@scu-hostel.edu" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                <input className="hostel-input" type="password" placeholder="••••••••" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-500">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                  Remember this device
                </label>
                <span className="font-semibold text-emerald-700">Forgot password?</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link href={`/${locale}`} className="hostel-button-primary">
                <span className="material-symbols-outlined text-[20px]">login</span>
                Enter dashboard
              </Link>
              <button className="hostel-button-secondary">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
                Contact support
              </button>
            </div>

            <div className="mt-8 rounded-[28px] bg-slate-50 p-5">
              <p className="hostel-heading text-lg font-bold">Portal highlights</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-500">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-emerald-600">task_alt</span>
                  Room allocation and transfer workflows
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-emerald-600">task_alt</span>
                  Fee management and payment visibility
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-emerald-600">task_alt</span>
                  Complaints, maintenance, and settings controls
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
