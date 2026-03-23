// src/pages/admin/AdminInvestors.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../../firebase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Search, User, TrendingUp } from 'lucide-react';

const SAMPLE_INVESTORS = [
  { id: 'u1', name: 'Rajesh Sharma', email: 'rajesh@email.com', role: 'user', totalInvestment: 5000000, portfolio: ['Azure Heights', 'RealQuity Phase 2'], createdAt: '2022-03-15' },
  { id: 'u2', name: 'Priya Menon', email: 'priya@email.com', role: 'user', totalInvestment: 12000000, portfolio: ['Palm Residences'], createdAt: '2022-07-20' },
  { id: 'u3', name: 'Vikram Nair', email: 'vikram@email.com', role: 'user', totalInvestment: 2000000, portfolio: ['Greenfield Villas'], createdAt: '2023-01-10' },
  { id: 'u4', name: 'Ananya Krishnan', email: 'ananya@email.com', role: 'user', totalInvestment: 3500000, portfolio: ['Skyline Towers', 'Axel Wellness Hub'], createdAt: '2023-05-22' },
  { id: 'u5', name: 'Suresh Patel', email: 'suresh@email.com', role: 'user', totalInvestment: 8000000, portfolio: ['Manhattan Commercial'], createdAt: '2021-11-03' },
];

const fmt = (v) => {
  if (!v) return '₹0';
  if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)}Cr`;
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
  return `₹${v.toLocaleString()}`;
};

export default function AdminInvestors() {
  const [investors, setInvestors] = useState(SAMPLE_INVESTORS);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc'))).then((snap) => {
      if (!snap.empty) {
        const users = snap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((u) => u.role !== 'admin');
        if (users.length) setInvestors(users);
      }
    }).catch(() => {});
  }, []);

  const filtered = investors.filter((inv) =>
    inv.name?.toLowerCase().includes(search.toLowerCase()) ||
    inv.email?.toLowerCase().includes(search.toLowerCase())
  );

  const totalAUM = investors.reduce((a, i) => a + (i.totalInvestment || 0), 0);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-cinzel font-bold text-3xl text-white">Investor Management</h1>
          <p className="text-white/40 text-sm mt-1">Total AUM: <span className="text-yellow-400 font-semibold">{fmt(totalAUM)}</span></p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Investors', value: investors.length },
          { label: 'Total AUM', value: fmt(totalAUM) },
          { label: 'Avg Investment', value: fmt(totalAUM / investors.length) },
        ].map(({ label, value }) => (
          <div key={label} className="glass rounded-2xl p-4 text-center">
            <div className="font-cinzel font-bold text-2xl text-yellow-400">{value}</div>
            <div className="text-white/50 text-sm mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search investors..." className="input-gold w-full md:w-80 pl-10 pr-4 py-3 rounded-xl text-sm" />
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              {['Investor', 'Email', 'Portfolio', 'Total Invested', 'Joined', 'Action'].map((h) => (
                <th key={h} className="text-left px-4 py-4 text-xs text-white/40 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((inv, i) => (
              <motion.tr key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center text-xs font-bold text-[#0B1C3D]">
                      {inv.name?.[0] || 'U'}
                    </div>
                    <span className="text-white font-medium text-sm">{inv.name || 'Unknown'}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-white/60">{inv.email}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {(inv.portfolio || []).slice(0, 2).map((p) => (
                      <span key={p} className="text-[10px] glass px-2 py-0.5 rounded-full text-white/60">{p}</span>
                    ))}
                    {(inv.portfolio?.length || 0) > 2 && <span className="text-[10px] text-yellow-400">+{inv.portfolio.length - 2}</span>}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="font-bold text-yellow-400">{fmt(inv.totalInvestment)}</span>
                </td>
                <td className="px-4 py-4 text-xs text-white/40">{inv.createdAt?.toDate?.()?.toLocaleDateString?.('en-IN') || inv.createdAt?.toString?.().slice(0, 10) || 'N/A'}</td>
                <td className="px-4 py-4">
                  <button className="text-xs text-yellow-400 hover:text-yellow-300 glass px-3 py-1 rounded-lg transition-colors">View</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-12 text-white/30">No investors found.</div>}
      </div>
    </div>
  );
}
