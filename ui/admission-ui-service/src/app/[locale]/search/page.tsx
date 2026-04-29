import { redirect } from "next/navigation";

export default function SearchPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  redirect(`/${locale}/rooms`);
}
