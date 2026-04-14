import { HostelShell, Panel, StatusBadge } from "@/modules/hostel/ui";
import { complaintRecords } from "@/modules/hostel/data";

export default function ComplaintsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <HostelShell
      locale={locale}
      currentPath="/complaints"
      title="Complaints & Maintenance"
      description="A combined view for resident complaints, maintenance queues, and ownership routing."
    >
      <Panel title="Open issues" description="Prioritize complaints with block context and clear operational ownership.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {complaintRecords.map((complaint) => (
            <div key={complaint.id} className="rounded-[28px] border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-slate-900">{complaint.id}</p>
                <StatusBadge value={complaint.priority} />
              </div>
              <p className="mt-4 hostel-heading text-xl font-black">{complaint.title}</p>
              <p className="mt-2 text-sm text-slate-500">{complaint.block} • {complaint.owner}</p>
            </div>
          ))}
        </div>
      </Panel>
    </HostelShell>
  );
}
