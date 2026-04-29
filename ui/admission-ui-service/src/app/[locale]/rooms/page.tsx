import { HostelShell, Panel, StatusBadge } from "@/modules/hostel/ui";
import { rooms } from "@/modules/hostel/data";

export default function RoomsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <HostelShell
      locale={locale}
      currentPath="/rooms"
      title="Hostel Room Management"
      description="Room inventory, occupancy visibility, and the add/edit room workflow distilled into one management page."
      action={
        <button className="hostel-button-primary">
          <span className="material-symbols-outlined text-[20px]">add_home</span>
          Add room
        </button>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
        <Panel title="Room inventory" description="Current live capacity by block, status, and lead resident.">
          <div className="grid gap-4 md:grid-cols-2">
            {rooms.map((room) => (
              <article key={room.id} className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="hostel-heading text-xl font-black">{room.code}</p>
                    <p className="text-sm text-slate-500">{room.block} • {room.type}</p>
                  </div>
                  <StatusBadge value={room.status} />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Occupancy</p>
                    <p className="mt-1 font-semibold text-slate-900">{room.occupied} / {room.capacity}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Rate</p>
                    <p className="mt-1 font-semibold text-slate-900">{room.rate}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  {room.residentLead ? `Lead resident: ${room.residentLead}` : "Awaiting maintenance close-out before reopening."}
                </p>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="Add / edit room" description="A code-native version of the Stitch add/edit room screen.">
          <div className="space-y-4">
            <input className="hostel-input" defaultValue="A-203" placeholder="Room code" />
            <div className="grid gap-4 md:grid-cols-2">
              <input className="hostel-input" defaultValue="Block A" placeholder="Block" />
              <input className="hostel-input" defaultValue="Double Deluxe" placeholder="Room type" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input className="hostel-input" defaultValue="2" placeholder="Capacity" />
              <input className="hostel-input" defaultValue="$1,250 / term" placeholder="Rate" />
            </div>
            <textarea
              className="hostel-input min-h-[140px] resize-none"
              defaultValue="Garden-facing room with upgraded storage and preferred placement for Year 3 and Year 4 students."
            />
            <div className="flex gap-3">
              <button className="hostel-button-primary flex-1">Save room profile</button>
              <button className="hostel-button-secondary">Reset</button>
            </div>
          </div>
        </Panel>
      </div>
    </HostelShell>
  );
}
