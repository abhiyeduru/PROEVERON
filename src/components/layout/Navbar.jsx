// src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  {
    label: 'Ecosystem', path: '#',
    children: [
      { label: 'PROEVERON Realty', path: '/ecosystem/realty' },
      { label: 'RealQuity', path: '/ecosystem/realquity' },
      { label: 'Axel Wellness', path: '/ecosystem/wellness' },
      { label: 'TeQZen AI', path: '/ecosystem/teqzen' },
    ]
  },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'nav-blur py-3' : 'py-5'
        }`}
      >
        <div className="container-max flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img src="/logo.png" alt="PROEVERON" className="w-10 h-10 rounded-lg shadow-lg" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity blur-sm -z-10"></div>
            </div>
            <div>
              <div className="font-cinzel font-bold text-xl tracking-wider text-white">PROEVERON</div>
              <div className="text-xs text-yellow-500/80 tracking-widest -mt-1">GLOBAL INVESTMENTS</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.children ? (
                <div key={link.label} className="relative group" onMouseEnter={() => setDropdownOpen(link.label)} onMouseLeave={() => setDropdownOpen(null)}>
                  <button className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-yellow-400 transition-colors">
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform ${dropdownOpen === link.label ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-8 left-0 w-52 glass rounded-xl py-2 shadow-2xl"
                      >
                        {link.children.map((child) => (
                          <Link key={child.path} to={child.path} className="block px-4 py-2.5 text-sm text-white/80 hover:text-yellow-400 hover:bg-white/5 transition-colors">
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.path} to={link.path} className={`text-sm font-medium transition-colors relative group ${location.pathname === link.path ? 'text-yellow-400' : 'text-white/80 hover:text-white'}`}>
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-yellow-400 transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              )
            ))}
          </div>

          {/* Right: Auth / CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-white/90 hover:text-white transition-colors">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center text-xs font-bold text-navy">
                    {user.email?.[0]?.toUpperCase()}
                  </div>
                  {user.email?.split('@')[0]}
                  <ChevronDown size={14} />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-12 right-0 w-48 glass rounded-xl py-2 shadow-2xl"
                    >
                      <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/80 hover:text-yellow-400 hover:bg-white/5 transition-colors" onClick={() => setUserMenuOpen(false)}>
                        <User size={14} /> Dashboard
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/80 hover:text-yellow-400 hover:bg-white/5 transition-colors" onClick={() => setUserMenuOpen(false)}>
                          <LayoutDashboard size={14} /> Admin Panel
                        </Link>
                      )}
                      <hr className="border-white/10 my-1" />
                      <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 transition-colors w-full text-left">
                        <LogOut size={14} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm text-white/80 hover:text-white transition-colors">Login</Link>
                <Link to="/register" className="btn-gold px-5 py-2 rounded-full text-sm font-semibold">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Btn */}
          <button className="lg:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-80 z-40 nav-blur flex flex-col pt-24 px-6 gap-4 lg:hidden"
          >
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link to={link.children ? '#' : link.path} className="block py-3 text-base font-medium text-white/90 hover:text-yellow-400 border-b border-white/10 transition-colors">
                  {link.label}
                </Link>
                {link.children && link.children.map((child) => (
                  <Link key={child.path} to={child.path} className="block pl-4 py-2 text-sm text-white/60 hover:text-yellow-400 transition-colors">
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              {user ? (
                <>
                  <Link to="/dashboard" className="btn-outline-gold px-5 py-2.5 rounded-full text-sm text-center">Dashboard</Link>
                  {isAdmin && <Link to="/admin" className="btn-outline-gold px-5 py-2.5 rounded-full text-sm text-center">Admin Panel</Link>}
                  <button onClick={handleLogout} className="text-red-400 text-sm py-2">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-outline-gold px-5 py-2.5 rounded-full text-sm text-center">Login</Link>
                  <Link to="/register" className="btn-gold px-5 py-2.5 rounded-full text-sm text-center font-semibold">Get Started</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
