import Header from "./(layout)/Header";
import Footer from "./(layout)/Footer";
import "@/app/globals.css";
import { AlertProvider } from "../custom/Alert";
import ContactForm from "../custom/ContactMeForm";

export default function MainRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen dark:bg-boxdark-2 dark:text-white">
          <div className="scroll-smooth">
            <div className="bg-white">
              <Header />
              <AlertProvider>
                {children}
                <div className="mt-20">
                  <ContactForm />
                </div>
              </AlertProvider>
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
