// src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../components/layout/Navbar';
import { TrendingUp, Wallet, BarChart3, Building2, Clock, CheckCircle, ChevronRight } from 'lucide-react';

const CHART_DATA = [
  { month: 'Jan', value: 2000000 },
  { month: 'Feb', value: 2180000 },
  { month: 'Mar', value: 2350000 },
  { month: 'Apr', value: 2520000 },
  { month: 'May', value: 2780000 },
  { month: 'Jun', value: 3100000 },
  { month: 'Jul', value: 3250000 },
  { month: 'Aug', value: 3480000 },
  { month: 'Sep', value: 3720000 },
  { month: 'Oct', value: 3950000 },
  { month: 'Nov', value: 4200000 },
  { month: 'Dec', value: 4500000 },
];

const fmt = (v) => {
  if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)}Cr`;
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
  return `₹${v.toLocaleString()}`;
};

const SAMPLE_PORTFOLIO = [
  { name: 'Azure Heights', location: 'Hyderabad', invested: 1200000, current: 1560000, roi: '22%', status: 'Active' },
  { name: 'Palm Residences Share', location: 'Dubai', invested: 2000000, current: 2680000, roi: '28%', status: 'Active' },
  { name: 'RealQuity Plot 14', location: 'Hyderabad', invested: 400000, current: 520000, roi: '26%', status: 'Active' },
];

const EMI_DATA = [
  { project: 'Azure Heights', emi: '₹42,000/mo', nextDate: '15 Jan 2025', status: 'Paid', progress: 60 },
  { project: 'Skyline Towers', emi: '₹38,000/mo', nextDate: '20 Jan 2025', status: 'Due', progress: 35 },
];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      getDoc(doc(db, 'users', user.uid)).then((snap) => {
        if (snap.exists()) setUserData(snap.data());
      }).catch(() => {});
    }
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center" style={{ background: '#070f22' }}><div className="text-yellow-400 font-cinzel text-xl">Loading...</div></div>;
  if (!user) return <Navigate to="/login" />;

  const totalInvested = SAMPLE_PORTFOLIO.reduce((a, p) => a + p.invested, 0);
  const totalCurrent = SAMPLE_PORTFOLIO.reduce((a, p) => a + p.current, 0);
  const totalReturn = totalCurrent - totalInvested;
  const returnPct = ((totalReturn / totalInvested) * 100).toFixed(1);

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-12" style={{ background: 'linear-gradient(180deg, #070f22 0%, #0B1C3D 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <p className="text-white/50 text-sm mb-1">Welcome back,</p>
            <h1 className="font-cinzel font-bold text-3xl text-white">
              {userData?.name || user.email?.split('@')[0]} 👋
            </h1>
            <p className="text-white/40 text-sm mt-1">Your PROEVERON Portfolio Dashboard</p>
          </motion.div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Invested', value: fmt(totalInvested), icon: Wallet, color: 'from-blue-600 to-blue-800', delta: null },
              { label: 'Portfolio Value', value: fmt(totalCurrent), icon: TrendingUp, color: 'from-yellow-600 to-yellow-800', delta: `+${returnPct}%` },
              { label: 'Total Returns', value: fmt(totalReturn), icon: BarChart3, color: 'from-green-600 to-green-800', delta: '+22.4%' },
              { label: 'Active Projects', value: SAMPLE_PORTFOLIO.length, icon: Building2, color: 'from-purple-600 to-purple-800', delta: null },
            ].map(({ label, value, icon: Icon, color, delta }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-5 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br ${color} opacity-10 blur-xl`} />
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                  <Icon size={18} className="text-white" />
                </div>
                <div className="text-white/50 text-xs mb-1">{label}</div>
                <div className="font-cinzel font-bold text-xl text-white">{value}</div>
                {delta && <div className="text-green-400 text-xs mt-1 font-medium">{delta} this year</div>}
              </motion.div>
            ))}
          </div>

          {/* Chart + EMI */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Growth chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-cinzel font-bold text-lg text-white">Portfolio Growth</h3>
                  <p className="text-white/40 text-sm">12-month performance</p>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold text-lg">+{returnPct}%</div>
                  <div className="text-white/40 text-xs">Annual Return</div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C9A34E" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#C9A34E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => fmt(v)} />
                  <Tooltip
                    contentStyle={{ background: '#0B1C3D', border: '1px solid rgba(201,163,78,0.3)', borderRadius: '12px', color: '#fff' }}
                    formatter={(v) => [fmt(v), 'Value']}
                    labelStyle={{ color: '#C9A34E' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#C9A34E" strokeWidth={2} fill="url(#goldGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* EMI Status */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-6">
              <h3 className="font-cinzel font-bold text-lg text-white mb-5">EMI Status</h3>
              <div className="space-y-5">
                {EMI_DATA.map((emi, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <div className="text-white text-sm font-medium">{emi.project}</div>
                        <div className="text-yellow-400 text-xs">{emi.emi}</div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${emi.status === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {emi.status}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${emi.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                        className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-white/30 mt-1">
                      <span>{emi.progress}% paid</span>
                      <span>Next: {emi.nextDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Portfolio table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-2xl p-6">
            <h3 className="font-cinzel font-bold text-lg text-white mb-5">My Portfolio</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-xs text-white/40 font-medium">Property</th>
                    <th className="text-right py-3 text-xs text-white/40 font-medium">Invested</th>
                    <th className="text-right py-3 text-xs text-white/40 font-medium">Current Value</th>
                    <th className="text-right py-3 text-xs text-white/40 font-medium">Returns</th>
                    <th className="text-right py-3 text-xs text-white/40 font-medium">ROI</th>
                    <th className="text-right py-3 text-xs text-white/40 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_PORTFOLIO.map((item, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4">
                        <div className="font-medium text-white text-sm">{item.name}</div>
                        <div className="text-xs text-white/40">{item.location}</div>
                      </td>
                      <td className="text-right py-4 text-sm text-white/70">{fmt(item.invested)}</td>
                      <td className="text-right py-4 text-sm font-semibold text-white">{fmt(item.current)}</td>
                      <td className="text-right py-4 text-sm font-semibold text-green-400">+{fmt(item.current - item.invested)}</td>
                      <td className="text-right py-4">
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-semibold">{item.roi}</span>
                      </td>
                      <td className="text-right py-4">
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">{item.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
