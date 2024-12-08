import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="sticky px-5 py-8 text-gray-600 bg-primary/5 xl:px-0">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-2 lg:grid-cols-4 md:text-left">
          {/* Contact Information */}
          <div>
            <h3 className="mb-4 text-lg font-semibold md:text-xl">
              Contact Information
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-center md:justify-start">
                <Phone className="w-5 h-5 mr-2" />
                <span className="text-sm md:text-base">(+64) 210 249 6278</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Mail className="w-5 h-5 mr-2" />
                <a
                  href="mailto:p.bajwa@barfoot.co.nz"
                  className="text-sm hover:text-gray-900 md:text-base"
                >
                  p.bajwa@barfoot.co.nz
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="mb-4 text-lg font-semibold md:text-xl">
              Quick Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm hover:text-gray-900 md:text-base"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/listings"
                  className="text-sm hover:text-gray-900 md:text-base"
                >
                  Listings
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-sm hover:text-gray-900 md:text-base"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm hover:text-gray-900 md:text-base"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-lg font-semibold md:text-xl">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://www.barfoot.co.nz/global/legal-documents/privacy-statement"
                  className="text-sm hover:text-gray-900 md:text-base"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.barfoot.co.nz/global/legal-documents/terms-of-use"
                  className="text-sm hover:text-gray-900 md:text-base"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 text-lg font-semibold md:text-xl">
              Social Media
            </h3>
            <div className="flex justify-center space-x-4 md:justify-start">
              <a
                href="https://www.facebook.com/profile.php?id=100075699308387"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900"
              >
                <Image
                  src="icons/facebook.svg"
                  alt="facebook logo"
                  width={24}
                  height={24}
                />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://www.tiktok.com/@parminderbajwabarfoot"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900"
              >
                <Image
                  src="icons/tiktok.svg"
                  alt="tiktok Logo"
                  width={24}
                  height={24}
                />
                <span className="sr-only">TikTok</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 text-center border-t border-gray-200">
          <p className="text-sm md:text-base">
            &copy; {currentYear} Parminder Bajwa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
