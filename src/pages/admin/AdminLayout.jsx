// src/pages/admin/AdminLayout.jsx
import { useState } from 'react';
import { Link, useLocation, Navigate, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Building2, Users, TrendingUp, FileText,
  Image, Settings, LogOut, Menu, X, ChevronRight, MessageSquare
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Projects', path: '/admin/projects', icon: Building2 },
  { label: 'Leads', path: '/admin/leads', icon: MessageSquare },
  { label: 'Investors', path: '/admin/investors', icon: Users },
  { label: 'Investments', path: '/admin/investments', icon: TrendingUp },
  { label: 'Content (CMS)', path: '/admin/cms', icon: FileText },
  { label: 'Media Library', path: '/admin/media', icon: Image },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const { user, isAdmin, loading, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#070f22]"><div className="text-yellow-400 font-cinzel text-xl">Loading...</div></div>;
  if (!user || !isAdmin) return <Navigate to="/login" />;

  const isActive = (path, exact) => exact ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <div className="flex min-h-screen" style={{ background: '#070f22' }}>
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative flex flex-col glass border-r border-yellow-500/10 z-20 overflow-hidden"
        style={{ minHeight: '100vh' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-4 border-b border-yellow-500/10">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center font-cinzel font-bold text-sm text-[#0B1C3D] shrink-0">P</div>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <div className="font-cinzel font-bold text-sm text-white">PROEVERON</div>
              <div className="text-[10px] text-yellow-500/70 tracking-wider">ADMIN PANEL</div>
            </motion.div>
          )}
        </div>

        {/* Collapse toggle */}
        <button onClick={() => setCollapsed(!collapsed)} className="absolute top-4 right-2 text-white/40 hover:text-yellow-400 transition-colors">
          {collapsed ? <ChevronRight size={16} /> : <X size={14} />}
        </button>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2">
          {NAV_ITEMS.map(({ label, path, icon: Icon, exact }) => (
            <Link
              key={path}
              to={path}
              title={label}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                isActive(path, exact)
                  ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{label}</motion.span>}
            </Link>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="p-3 border-t border-white/10">
          {!collapsed && (
            <div className="mb-2 px-2">
              <div className="text-xs text-white/30">{user.email}</div>
              <div className="text-[10px] text-yellow-400">Administrator</div>
            </div>
          )}
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all w-full text-sm" title="Logout">
            <LogOut size={16} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
