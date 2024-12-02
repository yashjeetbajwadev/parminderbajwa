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
        <div className="min-h-screen dark:bg-boxdark-2 dark:text-white text-gray-700">
          <div className="scroll-smooth">
            <div className="bg-white">
              <AlertProvider>
              <Header />
                {children}
              <Footer />
              </AlertProvider>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
