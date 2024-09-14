"use client"
import LandingPage from "./(landingPage)/LandingPage"
export default function Page({
    params,
    searchParams,
}: Readonly<{
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}>) {
    return <LandingPage />
}