// src/pages/admin/AdminProjects.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../../firebase/config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Plus, Edit2, Trash2, X, Upload, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { hasPermission, PERMISSIONS } from '../../utils/permissions';

const CLOUDINARY_UPLOAD_PRESET = 'cryptchat';
const CLOUDINARY_CLOUD_NAME = 'dp8bfdbab';
const CLOUDINARY_API_KEY = '337739287121541';

const EMPTY_FORM = { title: '', location: '', price: '', roi: '', type: 'Residential', status: 'Active', tag: '', description: '', beds: '', area: '', image: '' };

const TYPE_OPTIONS = ['Residential', 'Luxury', 'Villa', 'Commercial', 'Fractional', 'Wellness', 'Plots'];
const STATUS_OPTIONS = ['Active', 'Upcoming', 'Completed', 'Sold Out'];
const TAG_OPTIONS = ['FEATURED', 'PREMIUM', 'HOT DEAL', 'NEW', 'RERA APPROVED', 'EXCLUSIVE', 'FRACTIONAL', 'UPCOMING'];

const SAMPLE = [
  { id: 'p1', title: 'Azure Heights', location: 'Jubilee Hills, Hyderabad', price: '₹1.2 Cr', roi: '22%', type: 'Residential', status: 'Active', image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&q=70', tag: 'FEATURED' },
  { id: 'p2', title: 'Palm Residences', location: 'Downtown Dubai, UAE', price: '₹2.8 Cr', roi: '28%', type: 'Luxury', status: 'Active', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=70', tag: 'PREMIUM' },
  { id: 'p3', title: 'Greenfield Villas', location: 'Gachibowli, Hyderabad', price: '₹95 Lakh', roi: '18%', type: 'Villa', status: 'Active', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=70', tag: 'HOT DEAL' },
];

export default function AdminProjects() {
  const { userRole } = useAuth();
  const [projects, setProjects] = useState(SAMPLE);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [error, setError] = useState(null);

  // Check permissions
  const canCreate = hasPermission(userRole, PERMISSIONS.CREATE_PROJECT);
  const canEdit = hasPermission(userRole, PERMISSIONS.EDIT_PROJECT);
  const canDelete = hasPermission(userRole, PERMISSIONS.DELETE_PROJECT);
  const canView = hasPermission(userRole, PERMISSIONS.VIEW_PROJECTS);

  if (!canView) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-400 text-lg">Access Denied</div>
        <p className="text-white/50 mt-2">You don't have permission to view projects.</p>
      </div>
    );
  }

  useEffect(() => {
    getDocs(collection(db, 'projects')).then((snap) => {
      if (!snap.empty) setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }).catch(() => {});
  }, []);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      if (data.secure_url) {
        setForm((prev) => ({ ...prev, image: data.secure_url }));
      } else {
        alert('Image upload failed. Check your Cloudinary credentials.');
      }
    } catch (err) {
      alert('Image upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(true); };
  const openEdit = (project) => { setForm(project); setEditId(project.id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditId(null); };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!canCreate && !canEdit) {
      setError('You do not have permission to perform this action.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      if (editId) {
        if (!canEdit) throw new Error('You do not have permission to edit projects.');
        await updateDoc(doc(db, 'projects', editId), { ...form, updatedAt: serverTimestamp() });
        setProjects((prev) => prev.map((p) => p.id === editId ? { ...p, ...form } : p));
      } else {
        if (!canCreate) throw new Error('You do not have permission to create projects.');
        const docRef = await addDoc(collection(db, 'projects'), { ...form, createdAt: serverTimestamp() });
        setProjects((prev) => [...prev, { id: docRef.id, ...form }]);
      }
      closeForm();
    } catch (err) {
      setError(err.message || 'Failed to save project');
      // For demo, update locally only
      if (editId) {
        setProjects((prev) => prev.map((p) => p.id === editId ? { ...p, ...form } : p));
      } else {
        setProjects((prev) => [...prev, { id: `local_${Date.now()}`, ...form }]);
      }
      closeForm();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch { /* local only */ }
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-cinzel font-bold text-3xl text-white">Projects</h1>
          <p className="text-white/40 text-sm mt-1">{projects.length} total projects</p>
        </div>
        {canCreate && (
          <button onClick={openAdd} className="btn-gold flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold">
            <Plus size={16} /> Add Project
          </button>
        )}
      </div>

      {/* Projects grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl overflow-hidden group">
            <div className="relative h-44 overflow-hidden">
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/5">
                  <Building2 size={40} className="text-white/20" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070f22] to-transparent" />
              <div className="absolute top-2 right-2 flex gap-2">
                {canEdit && (
                  <button onClick={() => openEdit(project)} className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/60 hover:text-yellow-400 transition-colors">
                    <Edit2 size={13} />
                  </button>
                )}
                {canDelete && (
                  <button onClick={() => setDeleteConfirm(project.id)} className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/60 hover:text-red-400 transition-colors">
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
              <span className={`absolute bottom-2 left-2 text-[9px] px-2 py-0.5 rounded-full font-bold border ${project.status === 'Active' ? 'text-green-400 border-green-500/30 bg-green-500/10' : 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10'}`}>
                {project.status}
              </span>
            </div>
            <div className="p-4">
              <div className="text-[10px] text-yellow-400/70 mb-0.5">{project.type}</div>
              <h3 className="font-cinzel font-bold text-base text-white mb-0.5">{project.title}</h3>
              <p className="text-xs text-white/40 mb-3">{project.location}</p>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-white">{project.price}</span>
                <span className="text-green-400 font-semibold">{project.roi} ROI</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-cinzel font-bold text-xl text-white">{editId ? 'Edit Project' : 'Add New Project'}</h2>
                <button onClick={closeForm} className="text-white/40 hover:text-white"><X size={20} /></button>
              </div>

              <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs text-white/50 mb-1 block">Project Title</label>
                  <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Azure Heights" className="input-gold w-full px-4 py-2.5 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Location</label>
                  <input name="location" value={form.location} onChange={handleChange} required placeholder="City, Country" className="input-gold w-full px-4 py-2.5 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Price</label>
                  <input name="price" value={form.price} onChange={handleChange} required placeholder="₹1.2 Cr" className="input-gold w-full px-4 py-2.5 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">ROI</label>
                  <input name="roi" value={form.roi} onChange={handleChange} required placeholder="22%" className="input-gold w-full px-4 py-2.5 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Area</label>
                  <input name="area" value={form.area} onChange={handleChange} placeholder="2400 sqft" className="input-gold w-full px-4 py-2.5 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Type</label>
                  <select name="type" value={form.type} onChange={handleChange} className="input-gold w-full px-4 py-2.5 rounded-xl text-sm">
                    {TYPE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Status</label>
                  <select name="status" value={form.status} onChange={handleChange} className="input-gold w-full px-4 py-2.5 rounded-xl text-sm">
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-white/50 mb-1 block">Tag</label>
                  <select name="tag" value={form.tag} onChange={handleChange} className="input-gold w-full px-4 py-2.5 rounded-xl text-sm">
                    <option value="">None</option>
                    {TAG_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-white/50 mb-1 block">Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Project description..." className="input-gold w-full px-4 py-2.5 rounded-xl text-sm resize-none" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-white/50 mb-1 block">Image URL or Upload</label>
                  <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." className="input-gold w-full px-4 py-2.5 rounded-xl text-sm mb-2" />
                  <label className="flex items-center gap-2 cursor-pointer glass px-4 py-2.5 rounded-xl text-sm text-white/60 hover:text-white transition-colors w-fit">
                    <Upload size={14} />
                    {uploading ? 'Uploading...' : 'Upload Image'}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                  </label>
                  {form.image && <img src={form.image} alt="Preview" className="mt-2 h-20 rounded-lg object-cover" />}
                </div>

                <div className="col-span-2 flex gap-3">
                  <button type="button" onClick={closeForm} className="flex-1 btn-outline-gold py-2.5 rounded-xl font-medium">Cancel</button>
                  <button type="submit" disabled={saving} className="flex-1 btn-gold py-2.5 rounded-xl font-semibold">
                    {saving ? 'Saving...' : editId ? 'Update Project' : 'Add Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="glass rounded-2xl p-6 w-full max-w-sm text-center">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="font-cinzel font-bold text-xl text-white mb-2">Delete Project?</h3>
              <p className="text-white/50 text-sm mb-6">This action cannot be undone. The project will be permanently deleted.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 btn-outline-gold py-2 rounded-xl">Cancel</button>
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2 rounded-xl bg-red-500/80 text-white font-semibold hover:bg-red-500 transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
