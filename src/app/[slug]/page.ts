import { redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
}>) {
  let { slug } = await params;
  redirect(`/${slug}/1`);
}
