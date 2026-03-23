// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#070f22] border-t border-yellow-500/10">
      <div className="gold-divider" />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center font-cinzel font-bold text-[#0B1C3D] text-sm">P</div>
              <div>
                <div className="font-cinzel font-bold text-xl tracking-wider text-white">PROEVERON</div>
                <div className="text-xs text-yellow-500/70 tracking-widest -mt-1">GLOBAL INVESTMENTS</div>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Redefining real estate investment through innovation, transparency, and global expertise.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Youtube, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/50 hover:text-yellow-400 hover:border-yellow-400/50 transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel text-sm font-bold text-yellow-400 tracking-widest mb-5">QUICK LINKS</h4>
            <ul className="space-y-3">
              {['Home', 'Projects', 'About', 'Contact', 'Blog', 'Careers'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-sm text-white/50 hover:text-yellow-400 transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-yellow-500/50"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="font-cinzel text-sm font-bold text-yellow-400 tracking-widest mb-5">ECOSYSTEM</h4>
            <ul className="space-y-3">
              {['PROEVERON Realty', 'RealQuity', 'Axel Wellness', 'TeQZen AI', 'Investor Portal', 'Admin Panel'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-sm text-white/50 hover:text-yellow-400 transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-yellow-500/50"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-cinzel text-sm font-bold text-yellow-400 tracking-widest mb-5">CONTACT</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-yellow-500 mt-0.5 shrink-0" />
                <p className="text-sm text-white/50">Hyderabad, India | Dubai, UAE | San Diego, USA</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-yellow-500 shrink-0" />
                <a href="tel:+919876543210" className="text-sm text-white/50 hover:text-yellow-400 transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-yellow-500 shrink-0" />
                <a href="mailto:invest@proeveron.com" className="text-sm text-white/50 hover:text-yellow-400 transition-colors">invest@proeveron.com</a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs text-white/40 mb-2">GET INVESTMENT ALERTS</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email" className="input-gold flex-1 px-3 py-2 rounded-lg text-sm" />
                <button className="btn-gold px-4 py-2 rounded-lg text-sm font-semibold">Go</button>
              </div>
            </div>
          </div>
        </div>

        <div className="gold-divider mt-12 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <p>© 2024 PROEVERON. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-yellow-400 transition-colors">Terms of Use</Link>
            <Link to="/disclaimer" className="hover:text-yellow-400 transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
