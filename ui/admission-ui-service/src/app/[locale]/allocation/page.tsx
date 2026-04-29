import { HostelShell, Panel, StatusBadge } from "@/modules/hostel/ui";
import { roomRecommendations, students } from "@/modules/hostel/data";

export default function AllocationPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const student = students[0];

  return (
    <HostelShell
      locale={locale}
      currentPath="/allocation"
      title="Room Allocation Workflow"
      description="A workflow-first screen for assigning students to rooms using eligibility rules, fee checks, and recommended bed matches."
    >
      <div className="grid gap-6 xl:grid-cols-[0.92fr,1.08fr]">
        <Panel title="Student selection" description="Start from the selected student and validate eligibility before assigning a room.">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
            <p className="hostel-heading text-xl font-black">{student.name}</p>
            <p className="mt-1 text-sm text-slate-500">{student.program} • {student.year}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <StatusBadge value={student.status} />
              <StatusBadge value={student.feeStatus} />
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              Eligible blocks: A and B based on program alignment, room type preference, and current finance standing.
            </p>
          </div>
          <div className="mt-5 space-y-3">
            {[
              "1. Verify program-to-block rule",
              "2. Confirm no disciplinary hold",
              "3. Lock room and bed selection",
            ].map((step) => (
              <div key={step} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-600">
                {step}
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Recommended rooms" description="Suggested placements based on availability, resident fit, and operational policy.">
          <div className="space-y-4">
            {roomRecommendations.map((room) => (
              <div key={room.code} className="rounded-[28px] border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="hostel-heading text-xl font-black">{room.code}</p>
                    <p className="text-sm text-slate-500">{room.note}</p>
                  </div>
                  <StatusBadge value={room.match} />
                </div>
                <div className="mt-4 flex gap-3">
                  <button className="hostel-button-primary">Assign bed</button>
                  <button className="hostel-button-secondary">Inspect room</button>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </HostelShell>
  );
}
