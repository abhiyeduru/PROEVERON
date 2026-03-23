// src/pages/LoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message?.replace('Firebase: ', '') || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Google sign-in failed');
    }
  };

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
          <h1 className="font-poppins font-bold text-3xl text-white mb-2">Sign In</h1>
          <p className="text-white/60 text-sm font-poppins">Access your investor account</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg px-4 py-3 mb-6 font-poppins">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 mb-6">
          {/* Email */}
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="input-gold w-full pl-10 pr-4 py-3 rounded-lg text-sm font-poppins"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="input-gold w-full pl-10 pr-4 py-3 rounded-lg text-sm font-poppins"
            />
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-yellow-500 text-[#0B1C3D] font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-300 text-sm font-poppins"
          >
            {loading ? 'Signing in...' : 'Sign In'}
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
        <div className="space-y-3 text-center text-sm font-poppins">
          <p className="text-white/60">
            Don't have an account?{' '}
            <Link to="/register" className="text-yellow-400 hover:text-yellow-300 font-semibold">Create one</Link>
          </p>
          <Link to="/forgot-password" className="text-yellow-400 hover:text-yellow-300 text-xs block">
            Forgot password?
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
