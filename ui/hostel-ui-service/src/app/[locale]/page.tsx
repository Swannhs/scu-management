import Link from "next/link";
import {
  dashboardMetrics,
  paymentRecords,
  complaintRecords,
  roomRecommendations,
  screenPreviews,
} from "@/modules/hostel/data";
import { HostelShell, MetricCard, Panel, PreviewCard, StatusBadge } from "@/modules/hostel/ui";

export default function DashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <HostelShell
      locale={locale}
      currentPath=""
      title="Hostel Admin Dashboard"
      description="A focused operations center for residency, occupancy, finance recovery, and daily hostel workflows. The layout follows the Stitch hostel dashboard direction while staying code-native and easy to extend."
      action={
        <Link href={`/${locale}/allocation`} className="hostel-button-primary">
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          New allocation
        </Link>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr,1fr]">
        <Panel
          title="Operational hotspots"
          description="The current pulse across blocks, issue queues, and resident movement."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[28px] bg-emerald-500 p-5 text-white">
              <p className="text-xs uppercase tracking-[0.28em] text-emerald-100">Occupancy</p>
              <p className="mt-3 hostel-heading text-4xl font-black">92.5%</p>
              <p className="mt-3 text-sm leading-6 text-emerald-50">
                Block A and C are above target, while Block D needs a fast turnaround on maintenance.
              </p>
            </div>
            <div className="hostel-panel-soft p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Maintenance</p>
              <p className="mt-3 hostel-heading text-3xl font-black">12 open</p>
              <p className="mt-2 text-sm text-slate-500">3 high-priority tickets and 2 rooms temporarily offline.</p>
            </div>
            <div className="hostel-panel-soft p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Fee risk</p>
              <p className="mt-3 hostel-heading text-3xl font-black">$8.4k</p>
              <p className="mt-2 text-sm text-slate-500">Outstanding balances concentrated in Year 4 residents.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[28px] border border-slate-200 bg-white p-5">
              <p className="mb-4 hostel-heading text-lg font-bold">Recommended next allocations</p>
              <div className="space-y-3">
                {roomRecommendations.map((room) => (
                  <div
                    key={room.code}
                    className="flex items-start justify-between rounded-2xl bg-slate-50 p-4"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">{room.code}</p>
                      <p className="text-sm text-slate-500">{room.note}</p>
                    </div>
                    <StatusBadge value={room.match} />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5">
              <p className="mb-4 hostel-heading text-lg font-bold">Payment pulse</p>
              <div className="space-y-3">
                {paymentRecords.slice(0, 3).map((record) => (
                  <div key={record.invoice} className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{record.student}</p>
                        <p className="text-sm text-slate-500">{record.invoice} • {record.method}</p>
                      </div>
                      <StatusBadge value={record.status} />
                    </div>
                    <p className="mt-3 hostel-heading text-2xl font-black">{record.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>

        <Panel
          title="Immediate attention"
          description="What the admin team should act on next."
        >
          <div className="space-y-3">
            {complaintRecords.map((complaint) => (
              <div key={complaint.id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{complaint.title}</p>
                    <p className="text-sm text-slate-500">
                      {complaint.id} • {complaint.block} • {complaint.owner}
                    </p>
                  </div>
                  <StatusBadge value={complaint.priority} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[28px] bg-slate-900 p-5 text-white">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Today’s cadence</p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Check-in desk opens</span>
                <span className="font-semibold">08:30</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Finance cutoff sync</span>
                <span className="font-semibold">12:00</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Transfer approvals</span>
                <span className="font-semibold">16:30</span>
              </div>
            </div>
          </div>
        </Panel>
      </div>

      <div className="mt-6">
        <Panel
          title="Design-guided route previews"
          description="These route cards use the real Stitch screenshots as visual references while the live pages remain maintainable React/Tailwind implementations."
        >
          <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-4">
            {screenPreviews.map((preview) => (
              <PreviewCard key={preview.title} {...preview} href={`/${locale}${preview.href}`} />
            ))}
          </div>
        </Panel>
      </div>
    </HostelShell>
  );
}
