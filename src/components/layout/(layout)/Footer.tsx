import Link from 'next/link'
import { Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react'
import { ContactMe } from '@/components/custom/ContactMe/ContactMe'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 text-gray-600 py-8 mt-10 ">
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
                <a href="mailto:p.bajwa@barfoot.co.nz" className="hover:text-gray-900">p.bajwa@barfoot.co.nz</a>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
              <li><Link href="/listings" className="hover:text-gray-900">Listings</Link></li>
              <li><Link href="/blogs" className="hover:text-gray-900">Blogs</Link></li>
              <li><Link href="/about" className="hover:text-gray-900">About Us</Link></li>
              <ContactMe openInModal />
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-gray-900">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Social Media</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                <Facebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                <Twitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
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
  )
}

