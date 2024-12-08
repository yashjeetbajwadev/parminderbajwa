"use client";
import MainRootLayout from "@/components/layout/MainRootLayout";

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
