"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Listings", href: "/listings" },
  { label: "Blogs", href: "/blogs" },
  { label: "About", href: "/about" },
];

export default function Header() {
  return (
    <nav className="sticky top-0 left-0 w-full bg-white/95 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-5 xl:px-0 max-w-7xl">
        {/* Logo and Mobile Menu Toggle */}
        <div className="flex justify-between items-center space-x-2">
          <Link
            href="/"
            className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            <span className="block md:hidden">pb</span>
            <span className="hidden md:block">Parminder Bajwa</span>
          </Link>

          {/* Mobile Menu Sheet */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <HamburgerMenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] flex flex-col p-8">
                {/* Navigation Links */}
                <div className="flex flex-col space-y-6 mb-8">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-foreground hover:text-primary transition-colors text-2xl font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Hire Me Button */}
                <Button variant="default" className="w-full mt-auto bg-[#3b82f6]">
                  <Link
                    href="#contactMe"
                  >
                    Get in Touch
                  </Link>
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex flex-1 justify-center space-x-6 items-center">
          {/* Centered Navigation Links */}
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Social Links, Theme Toggle, Hire Me - Right side */}
        <div className="flex items-center space-x-6">
          {/* Hire Me Button - Visible on all screen sizes */}
          <Button variant="default" className="rounded-full bg-[#3b82f6]">
            <Link href="#contactMe">
              Get in Touch
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
