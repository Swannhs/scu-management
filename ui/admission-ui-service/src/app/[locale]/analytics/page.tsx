import { HostelShell, Panel } from "@/modules/hostel/ui";

export default function AnalyticsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <HostelShell
      locale={locale}
      currentPath="/analytics"
      title="Hostel Analytics Dashboard"
      description="Track occupancy, finance recovery, and issue load with a desktop analytics page modeled on the Stitch layout language."
    >
      <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <Panel title="Occupancy by block" description="A simple visual summary without introducing a separate charting dependency.">
          <div className="space-y-4">
            {[
              ["Block A", "96%", "bg-emerald-500"],
              ["Block B", "88%", "bg-sky-500"],
              ["Block C", "94%", "bg-violet-500"],
              ["Block D", "79%", "bg-amber-500"],
            ].map(([label, value, bar]) => (
              <div key={label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-700">{label}</span>
                  <span className="text-slate-500">{value}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className={`h-3 rounded-full ${bar}`} style={{ width: value }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Trend notes" description="The analytics page should still feel operational, not abstract.">
          <div className="space-y-4 text-sm leading-7 text-slate-500">
            <p>Fee recovery improved 7.1% week over week after tightening reminder cadences for overdue balances.</p>
            <p>Maintenance backlog is falling in Block B but still creates room unavailability during peak move-in hours.</p>
            <p>Transfers are clustering around academic block re-alignment rather than resident preference this cycle.</p>
          </div>
        </Panel>
      </div>
    </HostelShell>
  );
}
