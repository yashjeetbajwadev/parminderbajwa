"use client"
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../app/globals.css'

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {


    return (
        <html lang="en">
            <body>
                <div className='scroll-smooth'>
                    <div className='bg-white dark:bg-boxdark-2 dark:text-white'>
                        <Header />
                        {children}
                        <Footer />
                    </div>
                </div>
            </body>

        </html>
    )
}