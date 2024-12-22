"use client";
import Header from "./(layout)/Header";
import Footer from "./(layout)/Footer";
import "@/app/globals.css";
import { AlertProvider } from "../custom/Alert";
import { GoogleTagManager } from '@next/third-parties/google'

export default function MainRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM ?? ""} />
      <body>
        <main className="min-h-screen text-gray-800 dark:bg-boxdark-2 dark:text-white">
          <div className="scroll-smooth">
            <div className="bg-white">
              <AlertProvider>
                <div className="flex flex-col justify-between h-screen">
                  <div>
                    <Header />
                    <div className="flex container items-center mx-auto max-w-7xl space-x-4 px-5 xl:px-0 m-0">
                      {children}
                    </div>
                  </div>
                  <Footer />
                </div>
              </AlertProvider>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
