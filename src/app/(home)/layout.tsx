import type {Metadata} from "next";
import {Inter as FontSans} from "next/font/google";
import "../../styles/globals.css";
import React from "react";
import {cn} from "@/lib/utils"

const fontSans = FontSans({
    subsets: ["latin"], variable: "--font-sans",
})

export const metadata: Metadata = {
    title: "Parminder Bajwa", description: "Parminder Bajwa - Real Estate Agent",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (<html lang="en">
    <body
        className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}
    >{children}
    </body>
    </html>);
}
