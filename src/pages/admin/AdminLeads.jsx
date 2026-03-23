// src/pages/admin/AdminLeads.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../../firebase/config';
import { collection, getDocs, updateDoc, doc, orderBy, query } from 'firebase/firestore';
import { Search, Phone, Mail, MessageCircle, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const SAMPLE_LEADS = [
  { id: 'l1', name: 'Arjun Reddy', phone: '+91 98765 43210', email: 'arjun@email.com', budget: '50L', status: 'new', source: 'homepage_cta', createdAt: '2024-12-20T10:30:00' },
  { id: 'l2', name: 'Kavitha Nair', phone: '+91 87654 32109', email: 'kavitha@email.com', budget: '1Cr', status: 'contacted', source: 'homepage_cta', createdAt: '2024-12-20T09:00:00' },
  { id: 'l3', name: 'Suresh Patel', phone: '+91 76543 21098', email: 'suresh@email.com', budget: '25L', status: 'new', source: 'projects_page', createdAt: '2024-12-19T16:00:00' },
  { id: 'l4', name: 'Meena Sharma', phone: '+91 65432 10987', email: 'meena@email.com', budget: '2Cr', status: 'closed', source: 'homepage_cta', createdAt: '2024-12-18T11:00:00' },
  { id: 'l5', name: 'Raj Kumar', phone: '+91 54321 09876', email: 'raj@email.com', budget: '75L', status: 'contacted', source: 'whatsapp', createdAt: '2024-12-17T14:00:00' },
  { id: 'l6', name: 'Ananya Krishnan', phone: '+91 43210 98765', email: 'ananya@email.com', budget: '40L', status: 'new', source: 'homepage_cta', createdAt: '2024-12-17T09:30:00' },
];

const STATUS_CONFIG = {
  new: { label: 'New Lead', icon: AlertCircle, bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
  contacted: { label: 'Contacted', icon: Clock, bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  closed: { label: 'Closed', icon: CheckCircle, bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
};

export default function AdminLeads() {
  const [leads, setLeads] = useState(SAMPLE_LEADS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    getDocs(query(collection(db, 'leads'), orderBy('createdAt', 'desc'))).then((snap) => {
      if (!snap.empty) setLeads(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }).catch(() => {});
  }, []);

  const updateStatus = async (leadId, newStatus) => {
    try {
      await updateDoc(doc(db, 'leads', leadId), { status: newStatus });
    } catch { /* local only */ }
    setLeads((prev) => prev.map((l) => l.id === leadId ? { ...l, status: newStatus } : l));
  };

  const filtered = leads.filter((lead) => {
    const matchSearch = lead.name?.toLowerCase().includes(search.toLowerCase()) || lead.phone?.includes(search);
    const matchStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = { all: leads.length, new: leads.filter((l) => l.status === 'new').length, contacted: leads.filter((l) => l.status === 'contacted').length, closed: leads.filter((l) => l.status === 'closed').length };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-cinzel font-bold text-3xl text-white">Lead Management</h1>
        <p className="text-white/40 text-sm mt-1">{leads.length} total leads captured</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { status: 'all', label: 'Total Leads', color: 'from-blue-600 to-blue-800' },
          { status: 'new', label: 'New', color: 'from-orange-600 to-orange-800' },
          { status: 'contacted', label: 'Contacted', color: 'from-yellow-600 to-yellow-800' },
          { status: 'closed', label: 'Closed', color: 'from-green-600 to-green-800' },
        ].map(({ status, label, color }) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`glass rounded-2xl p-4 text-left transition-all ${statusFilter === status ? 'border border-yellow-500/40' : ''}`}
          >
            <div className={`text-3xl font-cinzel font-bold bg-gradient-to-br ${color} bg-clip-text text-transparent`}>{counts[status]}</div>
            <div className="text-white/50 text-sm mt-1">{label}</div>
          </button>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or phone..."
            className="input-gold w-full pl-10 pr-4 py-3 rounded-xl text-sm"
          />
        </div>
      </div>

      {/* Leads table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                {['Name', 'Contact', 'Budget', 'Source', 'Status', 'Date', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-4 text-xs text-white/40 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, i) => {
                const cfg = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
                const StatusIcon = cfg.icon;
                return (
                  <motion.tr key={lead.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-white text-sm">{lead.name}</div>
                      <div className="text-xs text-white/40">{lead.email}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <a href={`tel:${lead.phone}`} className="text-white/60 hover:text-yellow-400 transition-colors"><Phone size={14} /></a>
                        <a href={`mailto:${lead.email}`} className="text-white/60 hover:text-yellow-400 transition-colors"><Mail size={14} /></a>
                        <a href={`https://wa.me/${lead.phone?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-green-400 transition-colors"><MessageCircle size={14} /></a>
                      </div>
                      <div className="text-xs text-white/50 mt-1">{lead.phone}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-semibold text-yellow-400">{lead.budget}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs glass px-2 py-0.5 rounded-full text-white/50">{lead.source?.replace('_', ' ')}</span>
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className={`text-xs px-3 py-1.5 rounded-full font-medium border cursor-pointer ${cfg.bg} ${cfg.text} ${cfg.border} focus:outline-none`}
                      >
                        <option value="new">New Lead</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-4 py-4 text-xs text-white/40">
                      {lead.createdAt?.toDate?.()?.toLocaleDateString?.('en-IN') || lead.createdAt?.toString?.().slice(0, 10) || lead.createdAt}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => updateStatus(lead.id, 'contacted')} className="text-xs text-yellow-400 hover:text-yellow-300 glass px-2 py-1 rounded-lg">Contact</button>
                        <button onClick={() => updateStatus(lead.id, 'closed')} className="text-xs text-green-400 hover:text-green-300 glass px-2 py-1 rounded-lg">Close</button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-white/30">No leads found.</div>
        )}
      </div>
    </div>
  );
}
