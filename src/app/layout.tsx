"use client";
import MainRootLayout from "@/components/layout/MainRootLayout"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MainRootLayout>
      {children}
    </MainRootLayout>
  )
}
