import { redirect } from "next/navigation";

export default function AccountProfilePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  redirect(`/${locale}`);
}
