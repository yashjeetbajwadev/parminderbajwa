import MainRootLayout from "@/components/layout/MainRootLayout";
import { websiteName } from "@/app/contentSections";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: websiteName,
  description: "Experience seamless real estate transactions with Parminder Bajwa. Committed to integrity and respect, I prioritize your needs for successful outcomes.",
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainRootLayout>
      <div className="container w-full py-8 mx-auto">{children}</div>
    </MainRootLayout>
  );
}
