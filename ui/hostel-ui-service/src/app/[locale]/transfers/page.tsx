import { HostelShell, Panel, StatusBadge } from "@/modules/hostel/ui";
import { transferQueue } from "@/modules/hostel/data";

export default function TransfersPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <HostelShell
      locale={locale}
      currentPath="/transfers"
      title="Room Transfer Workflow"
      description="Review current transfer requests, compare source and target rooms, and move only the exceptions that satisfy finance and operations checks."
    >
      <Panel title="Transfer queue" description="The Stitch transfer screen emphasized progression and approvals, so the live page makes the decision trail explicit.">
        <div className="grid gap-4">
          {transferQueue.map((item) => (
            <div key={item.student} className="rounded-[28px] border border-slate-200 bg-white p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="hostel-heading text-xl font-black">{item.student}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.reason}</p>
                </div>
                <StatusBadge value={item.eta} />
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Current room</p>
                  <p className="mt-2 font-semibold text-slate-900">{item.from}</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-emerald-700">Recommended room</p>
                  <p className="mt-2 font-semibold text-slate-900">{item.to}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <button className="hostel-button-primary">Approve transfer</button>
                <button className="hostel-button-secondary">Hold request</button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </HostelShell>
  );
}
