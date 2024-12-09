import Header from "./(layout)/Header";
import Footer from "./(layout)/Footer";
import "@/app/globals.css";
import { AlertProvider } from "../custom/Alert";

export default function MainRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen text-gray-800 dark:bg-boxdark-2 dark:text-white">
          <div className="scroll-smooth">
            <div className="bg-white">
              <AlertProvider>
                <div className="flex flex-col justify-between h-screen">
                  <div>
                    <Header />
                    {children}
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
