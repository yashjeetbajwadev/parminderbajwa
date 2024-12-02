import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 sticky text-gray-600 py-8 mt-10 ">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>(+64) 210 249 6278</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a
                  href="mailto:p.bajwa@barfoot.co.nz"
                  className="hover:text-gray-900"
                >
                  p.bajwa@barfoot.co.nz
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-gray-900">
                  Listings
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-gray-900">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-900">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://www.barfoot.co.nz/global/legal-documents/privacy-statement"
                  className="hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.barfoot.co.nz/global/legal-documents/terms-of-use"
                  className="hover:text-gray-900"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Social Media</h3>
            <div className="flex space-x-4">
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
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p>&copy; {currentYear} Parminder Bajwa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
