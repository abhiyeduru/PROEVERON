// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
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
      await register(form.email, form.password, form.name);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message?.replace('Firebase: ', '') || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch {
      setError('Google sign-in failed');
    }
  };

  const fields = [
    { name: 'name', type: 'text', placeholder: 'Full Name', icon: User },
    { name: 'email', type: 'email', placeholder: 'Email', icon: Mail },
    { name: 'phone', type: 'tel', placeholder: 'Phone', icon: Phone },
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
          <h1 className="font-poppins font-bold text-3xl text-white mb-2">Create Account</h1>
          <p className="text-white/60 text-sm font-poppins">Start your investment journey</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg px-4 py-3 mb-6 font-poppins">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-3 mb-6">
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

          {/* Terms */}
          <p className="text-xs text-white/50 font-poppins">
            By registering, you agree to our <Link to="/terms" className="text-yellow-400 hover:text-yellow-300">Terms</Link> and <Link to="/privacy" className="text-yellow-400 hover:text-yellow-300">Privacy</Link>
          </p>

          {/* Submit */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-yellow-500 text-[#0B1C3D] font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-300 text-sm font-poppins"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/30 text-xs font-poppins">OR</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Google */}
        <button 
          onClick={handleGoogle}
          className="w-full py-3 border border-yellow-500 text-yellow-400 font-medium rounded-lg hover:bg-yellow-500/10 transition-all duration-300 text-sm font-poppins mb-8"
        >
          Continue with Google
        </button>

        {/* Links */}
        <p className="text-center text-sm text-white/60 font-poppins">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-400 hover:text-yellow-300 font-semibold">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
