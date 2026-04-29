import { HostelShell, Panel, StatusBadge } from "@/modules/hostel/ui";
import { students } from "@/modules/hostel/data";

export default function FeesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <HostelShell
      locale={locale}
      currentPath="/fees"
      title="Hostel Fee Management"
      description="Manage hostel invoices, installment plans, and overdue recovery without leaving the operations console."
    >
      <Panel title="Fee ledger" description="A stitched-together finance view for term charges, waivers, and collection status.">
        <div className="space-y-4">
          {students.map((student, index) => (
            <div key={student.id} className="grid gap-4 rounded-[28px] border border-slate-200 bg-white p-5 md:grid-cols-[1.2fr,0.8fr,0.6fr,0.5fr]">
              <div>
                <p className="font-semibold text-slate-900">{student.name}</p>
                <p className="text-sm text-slate-500">{student.room} • Spring 2026 hostel fee</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Outstanding</p>
                <p className="mt-1 hostel-heading text-2xl font-black">
                  {index === 1 ? "$420" : index === 2 ? "$640" : "$0"}
                </p>
              </div>
              <div className="flex items-center">
                <StatusBadge value={student.feeStatus} />
              </div>
              <div className="flex items-center justify-end">
                <button className="hostel-button-secondary">Open</button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </HostelShell>
  );
}
