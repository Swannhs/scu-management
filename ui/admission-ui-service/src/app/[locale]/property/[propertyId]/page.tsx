import { redirect } from "next/navigation";

export default function PropertyRedirectPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  redirect(`/${locale}/rooms`);
}
