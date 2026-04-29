import { notFound } from "next/navigation";
import { getStudentById } from "@/modules/hostel/data";
import { HostelShell, Panel, StatusBadge } from "@/modules/hostel/ui";

export default function StudentDetailPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  const student = getStudentById(id);

  if (!student) {
    notFound();
  }

  return (
    <HostelShell
      locale={locale}
      currentPath="/students"
      title="Hostel Student Detail"
      description="Resident profile, room placement, financial standing, and check-in activity in a single detail view."
    >
      <div className="grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
        <Panel title={student.name} description={`${student.id} • ${student.program} • ${student.year}`}>
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Room assignment</p>
                <p className="mt-2 hostel-heading text-2xl font-black">{student.room}</p>
                <p className="mt-1 text-sm text-slate-500">{student.block} • {student.bed}</p>
              </div>
              <div className="rounded-[24px] bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Resident status</p>
                <div className="mt-3">
                  <StatusBadge value={student.status} />
                </div>
                <div className="mt-3">
                  <StatusBadge value={student.feeStatus} />
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-slate-200 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Guardian</p>
                <p className="mt-2 font-semibold text-slate-900">{student.guardian}</p>
                <p className="text-sm text-slate-500">{student.phone}</p>
              </div>
              <div className="rounded-[24px] border border-slate-200 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Next milestone</p>
                <p className="mt-2 font-semibold text-slate-900">End-of-term checkout review</p>
                <p className="text-sm text-slate-500">May 26 • Finance and warden sign-off required</p>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Check-in and care timeline" description="The Stitch detail screen emphasized event visibility, so this page keeps that as a clear operational timeline.">
          <div className="space-y-4">
            {[
              ["Today • 09:10", "Fee reminder acknowledged", "Student confirmed final payment date with finance office."],
              ["Apr 10 • 16:45", "Transfer request reviewed", "Block alignment request escalated for warden approval."],
              ["Apr 02 • 08:32", "Resident check-in completed", "Identity, fee receipt, and room key verified at front office."],
            ].map(([time, title, detail]) => (
              <div key={time} className="relative rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-emerald-600">{time}</p>
                <p className="mt-2 hostel-heading text-lg font-bold">{title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-500">{detail}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </HostelShell>
  );
}
