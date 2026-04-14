import { redirect } from "next/navigation";

export default function AccountPropertiesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  redirect(`/${locale}/students`);
}
