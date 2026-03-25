import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, MessageCircle, Download, ArrowRight } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { openWhatsApp } from '../../utils/whatsapp';

function LeadForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', budget: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const [{ db }, { collection, addDoc, serverTimestamp }] = await Promise.all([
        import('../../firebase/config'),
        import('firebase/firestore'),
      ]);
      await addDoc(collection(db, 'leads'), {
        ...form,
        status: 'new',
        createdAt: serverTimestamp(),
        source: 'homepage_cta',
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('Lead save error:', err.message);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">✅</div>
        <h4 className="font-cinzel font-bold text-2xl text-white mb-2">Thank You!</h4>
        <p className="text-white/60">Our investment advisor will contact you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
      {[
        { name: 'name', placeholder: 'Full Name', type: 'text' },
        { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
        { name: 'email', placeholder: 'Email Address', type: 'email' },
        { name: 'budget', placeholder: 'Investment Budget (e.g. 50L)', type: 'text' },
      ].map(({ name, placeholder, type }) => (
        <input
          key={name}
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          required
          className="px-4 py-3 rounded-lg bg-white/10 border border-yellow-500/20 text-white placeholder-white/40 focus:border-yellow-500/60 focus:outline-none transition-all"
        />
      ))}
      <button
        type="submit"
        disabled={loading}
        className="sm:col-span-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-[#0B1C3D] font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Get Free Consultation'}
      </button>
    </form>
  );
}

export default function CTASection() {
  const { content } = useContent();
  const cta = content?.cta || {};
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="section-pad bg-gradient-to-r from-[#0B1C3D] via-[#070f22] to-[#0B1C3D]">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-yellow-400 text-sm font-bold tracking-widest">START TODAY</span>
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-white mt-4 mb-6 leading-tight">
            Start Your Investment
            <br />
            <span className="text-yellow-400">Journey Today</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Join 2000+ investors already building wealth with PROEVERON.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <a
            href={`tel:${cta.phone || '+919063272652'}`}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-[#0B1C3D] font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Phone size={18} /> Book a Call
          </a>
          <button
            onClick={() => openWhatsApp('Hi PROEVERON, I\'m interested in investing.')}
            className="px-6 py-3 bg-green-500/90 text-white font-bold rounded-lg hover:bg-green-400 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <MessageCircle size={18} /> WhatsApp Us
          </button>
          <button className="px-6 py-3 border-2 border-yellow-500 text-yellow-400 font-bold rounded-lg hover:bg-yellow-500/10 transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
            <Download size={18} /> Download Brochure
          </button>
        </motion.div>

        {/* Lead Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 max-w-2xl mx-auto"
        >
          <h3 className="font-cinzel font-bold text-2xl text-white mb-2">Get Investment Details</h3>
          <p className="text-white/50 mb-8">Our advisor will call you within 24 hours</p>
          <LeadForm />
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-white/50"
        >
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400" /> 100% Secure & RERA Approved</span>
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-400" /> Free Consultation</span>
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400" /> No Hidden Charges</span>
        </motion.div>
      </div>
    </section>
  );
}
