import { HostelShell, Panel, StatusBadge } from "@/modules/hostel/ui";
import { paymentRecords } from "@/modules/hostel/data";

export default function PaymentsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <HostelShell
      locale={locale}
      currentPath="/payments"
      title="Hostel Payment Details"
      description="A payment-centric page for reconciling methods, invoice references, and finance exceptions."
    >
      <Panel title="Payment detail feed" description="Mirrors the Stitch payment details screen with emphasis on clarity over dense accounting jargon.">
        <div className="space-y-4">
          {paymentRecords.map((record) => (
            <div key={record.invoice} className="rounded-[28px] border border-slate-200 bg-white p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="hostel-heading text-xl font-black">{record.invoice}</p>
                  <p className="mt-1 text-sm text-slate-500">{record.student} • {record.method}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="hostel-heading text-2xl font-black">{record.amount}</p>
                  <StatusBadge value={record.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </HostelShell>
  );
}
