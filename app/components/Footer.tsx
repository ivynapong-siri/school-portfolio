'use client';
import NewsletterForm from './NewsletterForm';
import React from 'react';
import Link from 'next/link';
import { 
  Facebook, Twitter, Instagram, Youtube, 
  MapPin, Phone, Mail, ArrowRight, Send 
} from 'lucide-react';

export default function Footer() {
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121212] text-stone-400 pt-20 pb-10 border-t border-stone-800">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1: Brand & About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white tracking-tight">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white">
                S
              </div>
              School<span className="text-orange-600">Next</span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-500">
              Empowering the next generation of leaders through innovation, creativity, and academic excellence.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Staff', href: '/staff' },
                { name: 'Showcase', href: '/showcase' },
                { name: 'Academics', href: '/academics' },
                { name: 'News & Events', href: '/news' },
                { name: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="hover:text-orange-500 hover:pl-2 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Contact Us</h3>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4">
                <MapPin className="shrink-0 text-orange-600" size={20} />
                <span>
                  123 Education Road, <br />
                  Bangkok, Thailand 10330
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="shrink-0 text-orange-600" size={20} />
                <a href="tel:+6621234567" className="hover:text-white transition-colors">
                  +66 2 123 4567
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="shrink-0 text-orange-600" size={20} />
                <a href="mailto:info@schoolnext.ac.th" className="hover:text-white transition-colors">
                  info@schoolnext.ac.th
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <NewsletterForm />

        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-stone-600">
            © {currentYear} SchoolNext. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            {[
              { icon: Facebook, href: "https://facebook.com" },
              { icon: Twitter, href: "https://twitter.com" },
              { icon: Instagram, href: "https://instagram.com" },
              { icon: Youtube, href: "https://youtube.com" },
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.href}
                target="_blank"
                rel="noreferrer" 
                className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-stone-400 hover:bg-orange-600 hover:text-white transition-all duration-300"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}