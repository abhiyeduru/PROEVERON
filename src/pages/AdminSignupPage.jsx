// src/pages/AdminSignupPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminSignupPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', adminCode: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  // Admin registration code (change this to your secret code)
  const ADMIN_CODE = 'PROEVERON_ADMIN_2024';

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAdminSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Validate admin code
    if (form.adminCode !== ADMIN_CODE) {
      setError('Invalid admin registration code');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      // Register user
      const cred = await register(form.email, form.password, form.name);
      
      // Set admin role in Firestore
      await setDoc(doc(db, 'users', cred.user.uid), {
        uid: cred.user.uid,
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: 'admin',
        createdAt: serverTimestamp(),
        totalInvestment: 0,
        portfolio: [],
      }, { merge: true });

      navigate('/admin');
    } catch (err) {
      setError(err.message?.replace('Firebase: ', '') || 'Admin registration failed');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'name', type: 'text', placeholder: 'Full Name', icon: User },
    { name: 'email', type: 'email', placeholder: 'Email', icon: Mail },
    { name: 'phone', type: 'tel', placeholder: 'Phone', icon: Phone },
    { name: 'adminCode', type: 'password', placeholder: 'Admin Code', icon: Shield },
    { name: 'password', type: 'password', placeholder: 'Password', icon: Lock },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password', icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-[#070f22] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mb-12 justify-center">
          <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center font-poppins font-bold text-[#0B1C3D]">P</div>
          <span className="font-poppins font-bold text-xl text-white">PROEVERON</span>
        </Link>

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield size={24} className="text-yellow-400" />
            <h1 className="font-poppins font-bold text-3xl text-white">Admin Signup</h1>
          </div>
          <p className="text-white/60 text-sm font-poppins">Create your admin account</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg px-4 py-3 mb-6 font-poppins">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleAdminSignup} className="space-y-3 mb-6">
          {fields.map(({ name, type, placeholder, icon: Icon }) => (
            <div key={name} className="relative">
              <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required
                className="input-gold w-full pl-10 pr-4 py-3 rounded-lg text-sm font-poppins"
              />
            </div>
          ))}

          {/* Info */}
          <p className="text-xs text-yellow-400/70 font-poppins bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-2">
            ⚠️ Admin code required. Contact your administrator for the registration code.
          </p>

          {/* Submit */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-yellow-500 text-[#0B1C3D] font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-300 text-sm font-poppins disabled:opacity-50"
          >
            {loading ? 'Creating Admin Account...' : 'Create Admin Account'}
          </button>
        </form>

        {/* Links */}
        <p className="text-center text-sm text-white/60 font-poppins">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-400 hover:text-yellow-300 font-semibold">Sign In</Link>
        </p>
        <p className="text-center text-sm text-white/60 font-poppins mt-2">
          Not an admin?{' '}
          <Link to="/register" className="text-yellow-400 hover:text-yellow-300 font-semibold">User Signup</Link>
        </p>
      </motion.div>
    </div>
  );
}
