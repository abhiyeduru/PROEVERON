// src/pages/admin/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { db } from '../../firebase/config';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Building2, Users, TrendingUp, IndianRupee, MessageSquare, ArrowRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const REVENUE_DATA = [
  { month: 'Jul', revenue: 8500000, leads: 45 },
  { month: 'Aug', revenue: 9200000, leads: 52 },
  { month: 'Sep', revenue: 11000000, leads: 61 },
  { month: 'Oct', revenue: 13500000, leads: 74 },
  { month: 'Nov', revenue: 15000000, leads: 88 },
  { month: 'Dec', revenue: 18000000, leads: 102 },
];

const fmt = (v) => {
  if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)}Cr`;
  if (v >= 100000) return `₹${(v / 100000).toFixed(0)}L`;
  return `₹${v.toLocaleString()}`;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 8, leads: 247, investors: 2043, revenue: 500000000 });
  const [recentLeads, setRecentLeads] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leads = await getDocs(query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(5)));
        if (!leads.empty) {
          setRecentLeads(leads.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
      } catch { /* use defaults */ }
    };
    fetchData();
  }, []);

  const sampleLeads = [
    { name: 'Arjun Reddy', phone: '+91 98765 43210', budget: '50L', status: 'new', createdAt: '2 mins ago' },
    { name: 'Kavitha Nair', phone: '+91 87654 32109', budget: '1Cr', status: 'contacted', createdAt: '1 hr ago' },
    { name: 'Suresh Patel', phone: '+91 76543 21098', budget: '25L', status: 'new', createdAt: '3 hrs ago' },
    { name: 'Meena Sharma', phone: '+91 65432 10987', budget: '2Cr', status: 'closed', createdAt: '1 day ago' },
    { name: 'Raj Kumar', phone: '+91 54321 09876', budget: '75L', status: 'contacted', createdAt: '2 days ago' },
  ];

  const displayLeads = recentLeads.length > 0 ? recentLeads : sampleLeads;

  const statusStyles = {
    new: 'bg-blue-500/20 text-blue-400',
    contacted: 'bg-yellow-500/20 text-yellow-400',
    closed: 'bg-green-500/20 text-green-400',
  };

  const statusIcons = {
    new: AlertCircle,
    contacted: Clock,
    closed: CheckCircle,
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-cinzel font-bold text-3xl text-white">Admin Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">PROEVERON Platform Overview — {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Projects', value: stats.projects, icon: Building2, color: 'from-blue-600 to-blue-800', link: '/admin/projects' },
          { label: 'Total Leads', value: stats.leads, icon: MessageSquare, color: 'from-yellow-600 to-yellow-800', link: '/admin/leads' },
          { label: 'Active Investors', value: `${(stats.investors / 1000).toFixed(1)}K`, icon: Users, color: 'from-green-600 to-green-800', link: '/admin/investors' },
          { label: 'Total Revenue', value: fmt(stats.revenue), icon: IndianRupee, color: 'from-purple-600 to-purple-800', link: '#' },
        ].map(({ label, value, icon: Icon, color, link }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Link to={link} className="block glass rounded-2xl p-5 relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg`}>
                <Icon size={20} className="text-white" />
              </div>
              <div className="text-white/50 text-xs mb-1">{label}</div>
              <div className="font-cinzel font-bold text-2xl text-white">{value}</div>
              <div className="text-xs text-yellow-400/60 mt-1 flex items-center gap-1 group-hover:text-yellow-400 transition-colors">
                View details <ArrowRight size={12} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6">
          <h3 className="font-cinzel font-bold text-lg text-white mb-5">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={REVENUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={fmt} />
              <Tooltip contentStyle={{ background: '#0B1C3D', border: '1px solid rgba(201,163,78,0.3)', borderRadius: '12px', color: '#fff' }} formatter={(v) => [fmt(v), 'Revenue']} />
              <Bar dataKey="revenue" fill="url(#barGold)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="barGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9A34E" />
                  <stop offset="100%" stopColor="#8B6B2E" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Leads chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-6">
          <h3 className="font-cinzel font-bold text-lg text-white mb-5">Lead Generation</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={REVENUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#0B1C3D', border: '1px solid rgba(201,163,78,0.3)', borderRadius: '12px', color: '#fff' }} />
              <Line type="monotone" dataKey="leads" stroke="#C9A34E" strokeWidth={2} dot={{ fill: '#C9A34E', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent leads */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-cinzel font-bold text-lg text-white">Recent Leads</h3>
          <Link to="/admin/leads" className="text-yellow-400 text-sm hover:text-yellow-300 flex items-center gap-1">View all <ArrowRight size={14} /></Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {['Name', 'Phone', 'Budget', 'Status', 'Time', 'Action'].map((h) => (
                  <th key={h} className="text-left py-3 text-xs text-white/40 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayLeads.map((lead, i) => {
                const StatusIcon = statusIcons[lead.status] || AlertCircle;
                return (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 text-sm text-white font-medium">{lead.name}</td>
                    <td className="py-3 text-sm text-white/60">{lead.phone}</td>
                    <td className="py-3 text-sm text-yellow-400 font-medium">{lead.budget}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[lead.status] || 'bg-white/10 text-white/50'}`}>
                        <StatusIcon size={10} />
                        {lead.status || 'new'}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-white/40">{lead.createdAt?.toString?.().slice(0, 16) || lead.createdAt}</td>
                    <td className="py-3">
                      <button className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors">Update</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
