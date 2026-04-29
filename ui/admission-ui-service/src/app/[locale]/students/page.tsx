import Link from "next/link";
import { HostelShell, Panel, StatusBadge } from "@/modules/hostel/ui";
import { students } from "@/modules/hostel/data";

export default function StudentsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <HostelShell
      locale={locale}
      currentPath="/students"
      title="Hostel Student Management"
      description="Track resident status, room occupancy, fee standing, and guardian contact details from one operational roster."
      action={
        <button className="hostel-button-primary">
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          Add resident
        </button>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1.3fr,0.9fr]">
        <Panel title="Resident roster" description="Desktop-style management table inspired by the Stitch student management screens.">
          <div className="mb-4 grid gap-3 md:grid-cols-4">
            {["All blocks", "Resident status", "Fee status", "Academic year"].map((label) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                {label}
              </div>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="px-3 py-3 font-semibold">Student</th>
                  <th className="px-3 py-3 font-semibold">Room</th>
                  <th className="px-3 py-3 font-semibold">Program</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                  <th className="px-3 py-3 font-semibold">Fees</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-t border-slate-100">
                    <td className="px-3 py-4">
                      <Link href={`/${locale}/students/${student.id}`} className="block">
                        <p className="font-semibold text-slate-900">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.id}</p>
                      </Link>
                    </td>
                    <td className="px-3 py-4">
                      <p className="font-medium text-slate-800">{student.room}</p>
                      <p className="text-xs text-slate-500">{student.block} • {student.bed}</p>
                    </td>
                    <td className="px-3 py-4">
                      <p className="font-medium text-slate-800">{student.program}</p>
                      <p className="text-xs text-slate-500">{student.year}</p>
                    </td>
                    <td className="px-3 py-4">
                      <StatusBadge value={student.status} />
                    </td>
                    <td className="px-3 py-4">
                      <StatusBadge value={student.feeStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Management highlights" description="A compact overview of the same information the Stitch screen emphasized.">
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{student.name}</p>
                    <p className="text-sm text-slate-500">{student.program} • {student.year}</p>
                  </div>
                  <StatusBadge value={student.feeStatus} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-500">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Placement</p>
                    <p className="mt-1 font-medium text-slate-800">{student.block} • {student.room}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Guardian</p>
                    <p className="mt-1 font-medium text-slate-800">{student.guardian}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </HostelShell>
  );
}
