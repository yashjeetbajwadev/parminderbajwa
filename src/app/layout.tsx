"use client";
import MainRootLayout from "@/components/layout/MainRootLayout"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MainRootLayout>
      <div className="container mx-auto py-8 w-full md:w-4/5">
        {children}
      </div>
    </MainRootLayout>
  )
}
