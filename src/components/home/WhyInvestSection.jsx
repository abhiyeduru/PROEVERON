import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useContent } from '../../context/ContentContext';

export default function WhyInvestSection() {
  const { content } = useContent();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const reasons = content?.whyInvest || [
    { title: 'Clear Legal Titles', desc: 'Every project is RERA registered with 100% transparent documentation.', icon: '📜' },
    { title: 'High ROI Locations', desc: 'Prime locations in growth corridors delivering 15–28% annual returns.', icon: '📊' },
    { title: 'Clear Exit Strategy', desc: 'Defined exit options including buyback guarantees and secondary markets.', icon: '🚪' },
    { title: 'Professional Execution', desc: 'ISO-certified construction with international quality standards.', icon: '🏗️' },
    { title: 'Diversified Portfolio', desc: 'Spread investments across multiple asset classes for risk mitigation.', icon: '💼' },
    { title: 'Global Presence', desc: 'Operations in India, UAE & USA — your investment knows no borders.', icon: '🌍' },
  ];

  return (
    <section ref={ref} className="section-pad bg-[#0B1C3D]">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-yellow-400 text-sm font-bold tracking-widest">WHY CHOOSE US</span>
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-white mt-4 mb-6 leading-tight">
            Why Invest With <span className="text-yellow-400">PROEVERON</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            We've built a real estate investment platform that stands at the intersection of luxury, transparency, and technology.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-white/5 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/60 hover:bg-white/10 transition-all duration-300 h-full"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{reason.icon}</div>
              <h3 className="text-lg font-cinzel font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                {reason.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {[
            { label: 'RERA Registered', icon: '🏆' },
            { label: 'ISO 9001:2015', icon: '✅' },
            { label: 'FICCI Member', icon: '🤝' },
            { label: 'ASSOCHAM Certified', icon: '🎖️' },
            { label: 'Verified by CREDAI', icon: '🛡️' },
          ].map(({ label, icon }) => (
            <div key={label} className="flex items-center gap-2 bg-white/5 border border-yellow-500/20 px-4 py-2 rounded-full">
              <span>{icon}</span>
              <span className="text-white/70 text-sm font-medium">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
