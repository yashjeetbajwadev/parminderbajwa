"use client";
import Header from "./(layout)/Header";
import Footer from "./(layout)/Footer";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen dark:bg-boxdark-2 dark:text-white">
          <div className="scroll-smooth">
            <div className="bg-white">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
