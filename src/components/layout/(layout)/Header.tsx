"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, LinkButton } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ContactMe } from "@/components/custom/ContactMe/ContactMe";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Listings", href: "/listings/1" },
  { label: "Blogs", href: "/blogs/1" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`sticky top-0 left-0 w-full bg-white z-50 transition-shadow ${hasScrolled ? "shadow-md" : ""
        }`}
    >
      <div className="container flex items-center justify-between px-5 py-4 mx-auto xl:px-0 max-w-7xl">
        {/* Logo and Mobile Menu Toggle */}
        <div className="flex items-center justify-between space-x-2">
          <LinkButton
            buttonevent="header home"
            variant={"link"}
            href="/"
            className="p-0 text-2xl font-bold text-blue-900 transition-colors hover:text-blue-900/80"
          >
            <span className="block md:hidden">pb</span>
            <span className="hidden md:block">Parminder Bajwa</span>
          </LinkButton>

          {/* Mobile Menu Sheet */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  buttonevent="header open mobile menu"
                  variant="ghost" size="icon" className="mr-2">
                  <HamburgerMenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] flex flex-col p-8">
                <VisuallyHidden>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Navigation Links</SheetDescription>
                </VisuallyHidden>
                {/* Navigation Links */}
                <div className="flex flex-col mt-12 mb-8 space-y-6 text-gray-800">
                  {NAV_ITEMS.map((item) => (
                    <SheetTrigger asChild key={item.href}>
                      <LinkButton
                        buttonevent="header mobile menu"
                        variant={"link"}
                        key={item.href}
                        href={item.href}
                        className="text-2xl font-medium transition-colors text-foreground hover:text-primary"
                      >
                        {item.label}
                      </LinkButton>
                    </SheetTrigger>
                  ))}
                </div>
                <ContactMe openInModal />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="items-center justify-center flex-1 hidden space-x-6 md:flex">
          {/* Centered Navigation Links */}
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors text-foreground hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-6">
          <ContactMe openInModal />
        </div>
      </div>
    </nav>
  );
}
