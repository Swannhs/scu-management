import { HostelShell, Panel, StatusBadge } from "@/modules/hostel/ui";
import { checkInSchedule } from "@/modules/hostel/data";

export default function CheckInsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <HostelShell
      locale={locale}
      currentPath="/check-ins"
      title="Student Check-In / Out Workflow"
      description="Desk-led processing for arrivals and departures, with verification checkpoints and rapid exception handling."
    >
      <div className="grid gap-6 xl:grid-cols-[1fr,0.95fr]">
        <Panel title="Desk schedule" description="Today’s arrival and departure windows for the front office team.">
          <div className="space-y-4">
            {checkInSchedule.map((item) => (
              <div key={`${item.slot}-${item.student}`} className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="hostel-heading text-xl font-black">{item.student}</p>
                    <p className="text-sm text-slate-500">{item.slot} • {item.desk}</p>
                  </div>
                  <StatusBadge value={item.action} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Process checklist" description="Keep the workflow strict so rooms, fees, and key handover stay in sync.">
          <div className="space-y-3">
            {[
              "Verify identity and hostel contract",
              "Match payment receipt against invoice balance",
              "Issue key and confirm room inventory",
              "Collect signature and update resident status",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 px-4 py-4 text-sm text-slate-600">
                {item}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </HostelShell>
  );
}
