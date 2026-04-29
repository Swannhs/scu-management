import { redirect } from "next/navigation";

export default function AccountWishlistPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  redirect(`/${locale}/students`);
}
