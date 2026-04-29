import { redirect } from "next/navigation";

export default function AccountPasswordPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  redirect(`/${locale}/settings`);
}
