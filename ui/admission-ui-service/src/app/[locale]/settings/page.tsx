import { HostelShell, Panel } from "@/modules/hostel/ui";
import { settingsSections } from "@/modules/hostel/data";

export default function SettingsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <HostelShell
      locale={locale}
      currentPath="/settings"
      title="Hostel Settings"
      description="Operational controls for allocation rules, finance reminders, and notifications."
    >
      <div className="grid gap-6 xl:grid-cols-3">
        {settingsSections.map((section) => (
          <Panel key={section.title} title={section.title} description={section.description}>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-600">
                  {item}
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </HostelShell>
  );
}
