import { Dialog } from '@/components/ui/dialog';
import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiBars3 } from 'react-icons/hi2';
import Image from "next/image";

export const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Listings', href: '/listings' },
    { name: 'About', href: '/about' },
];

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    const NavLogo = () => <Image 
    className='h-8 w-8' 
    src={"/PB.png"} 
    alt='Parminder Bajwa'
    width={32}
    height={32} />;

    if (typeof window !== 'undefined') {
        window.onscroll = () => {
            setIsScrolling(window.scrollY > 10);
        };
    }

    return (
        <header
            className={`sticky top-0 z-50 w-full rounded-b-xl bg-white ${isScrolling ? 'shadow-[0_5px_10px_rgba(154,161,177,.1)]' : ''
            }`}
        >
            <nav className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8' aria-label='Global'>
                <div className='flex items-center lg:flex-1'>
                    <a
                        href='/'
                        className='-m-1.5 flex items-center p-1.5 text-gray-900 duration-300 ease-in-out hover:text-blue-500'
                    >
                        <NavLogo />
                        <span className='ml-2 text-sm font-semibold leading-6'>Parminder Bajwa</span>
                    </a>
                </div>
                <div className='flex lg:hidden'>
                    <button
                        type='button'
                        className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className='sr-only'>Open main menu</span>
                        <HiBars3 className='h-6 w-6' aria-hidden='true' />
                    </button>
                </div>
                <div className='hidden lg:flex lg:gap-x-12'>
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className='text-sm font-semibold leading-6 text-gray-900 duration-300 ease-in-out hover:text-blue-500'
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </nav>
            <Dialog className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className='fixed inset-0 z-50' />
                <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
                    <div className='flex items-center justify-between'>
                        <a href='/' className='-m-1.5 p-1.5'>
                            <span className='sr-only'>Your SaaS</span>
                            <NavLogo />
                        </a>
                        <button
                            type='button'
                            className='-m-2.5 rounded-md p-2.5 text-gray-700'
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className='sr-only'>Close menu</span>
                            <AiFillCloseCircle className='h-6 w-6' aria-hidden='true' />
                        </button>
                    </div>
                    <div className='mt-6 flow-root'>
                        <div className='-my-6 divide-y divide-gray-500/10'>
                            <div className='space-y-2 py-6'>
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}

export default Header;