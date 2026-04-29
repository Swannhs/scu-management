import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { admissionNav, getStatusTone } from "./data";

function toneClasses(tone: string) {
  switch (tone) {
    case "emerald":
      return "bg-emerald-50 text-emerald-700 border border-emerald-100";
    case "sky":
      return "bg-sky-50 text-sky-700 border border-sky-100";
    case "amber":
      return "bg-amber-50 text-amber-700 border border-amber-100";
    case "indigo":
      return "bg-indigo-50 text-indigo-700 border border-indigo-100";
    case "rose":
      return "bg-rose-50 text-rose-700 border border-rose-100";
    default:
      return "bg-slate-100 text-slate-700 border border-slate-200";
  }
}

export function StatusBadge({ value }: { value: string }) {
  return (
    <span className={`admission-badge ${toneClasses(getStatusTone(value))}`}>
      <span className="h-2 w-2 rounded-full bg-current/70" />
      {value}
    </span>
  );
}

export function Panel({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="admission-panel p-6 lg:p-7">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="admission-heading text-xl font-bold">{title}</h2>
          {description ? <p className="mt-1 max-w-2xl text-sm text-slate-500">{description}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function MetricCard({
  label,
  value,
  delta,
  icon,
  tone,
}: {
  label: string;
  value: string;
  delta: string;
  icon: string;
  tone: string;
}) {
  return (
    <article className="admission-panel p-5">
      <div className="mb-5 flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${toneClasses(tone)}`}>
          <span className="material-symbols-outlined text-[26px]">{icon}</span>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${toneClasses(tone)}`}>{delta}</span>
      </div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 admission-heading text-3xl font-black">{value}</p>
    </article>
  );
}

export function PreviewCard({
  title,
  subtitle,
  href,
  image,
}: {
  title: string;
  subtitle: string;
  href: string;
  image: string;
}) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover transition duration-500 group-hover:scale-[1.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-slate-900/10 to-transparent" />
      </div>
      <div className="space-y-2 p-5">
        <p className="admission-heading text-lg font-bold">{title}</p>
        <p className="text-sm leading-6 text-slate-500">{subtitle}</p>
      </div>
    </Link>
  );
}

export function AdmissionShell({
  locale,
  currentPath,
  title,
  description,
  children,
  action,
}: {
  locale: string;
  currentPath: string;
  title: string;
  description: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto flex min-h-screen max-w-[1680px] gap-6 px-4 py-4 lg:px-6">
        <aside className="hidden w-[290px] shrink-0 rounded-[32px] border border-slate-200/70 bg-white/90 p-5 shadow-[0_20px_60px_-40px_rgba(16,29,39,0.55)] lg:flex lg:flex-col">
          <div className="mb-8 flex items-center gap-3 px-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
              <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                school
              </span>
            </div>
            <div>
              <p className="admission-heading text-lg font-black">SCU AdmissionOps</p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Admissions CMS</p>
            </div>
          </div>
          <nav className="space-y-1">
            {admissionNav.map((item) => {
              const href = `/${locale}${item.href}`;
              const isActive = currentPath === item.href;
              return (
                <Link
                  key={item.href || "dashboard"}
                  href={href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive ? "bg-indigo-50 text-indigo-700 shadow-inner" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto rounded-[28px] bg-slate-900 p-5 text-white">
            <p className="text-xs uppercase tracking-[0.32em] text-sky-200">Cycle Status</p>
            <p className="mt-3 admission-heading text-2xl font-black">Decision week active</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              22 final reviews, 8 interview confirmations, and 6 payment exceptions need action before release.
            </p>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <header className="admission-panel flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between lg:px-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600">Minimal Template UI</p>
              <h1 className="admission-heading mt-2 text-3xl font-black lg:text-[2.5rem]">{title}</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-500">
                <span className="material-symbols-outlined text-[20px]">search</span>
                Search applicants, programs, or invoices
              </div>
              {action}
            </div>
          </header>
          <div className="grid gap-3 lg:hidden">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {admissionNav.slice(0, 6).map((item) => (
                <Link
                  key={item.href || "dashboard-mobile"}
                  href={`/${locale}${item.href}`}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                    currentPath === item.href ? "border-indigo-200 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  <span className="material-symbols-outlined mb-2 block text-[22px]">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <main className="pb-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
