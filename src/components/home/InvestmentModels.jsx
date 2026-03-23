import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2, PieChart, CreditCard, Banknote } from 'lucide-react';

const MODELS = [
  {
    icon: Building2,
    title: 'Direct Ownership',
    desc: 'Buy a complete property in your name. Full ownership with maximum capital appreciation.',
    range: '₹50L – ₹5Cr+',
    roi: '18–22% annually',
    highlight: false,
  },
  {
    icon: PieChart,
    title: 'Fractional Ownership',
    desc: 'Co-own premium properties with as little as ₹20 Lakhs. Earn proportional rental returns.',
    range: '₹20L – ₹1Cr',
    roi: '20–28% annually',
    highlight: true,
  },
  {
    icon: CreditCard,
    title: 'EMI Investment',
    desc: 'Invest in structured EMI plans. Secure property rights while managing cash flows.',
    range: '₹25K/month onwards',
    roi: '16–20% annually',
    highlight: false,
  },
  {
    icon: Banknote,
    title: 'Rental Yield',
    desc: 'Invest in rental-ready properties. Generate monthly passive income from Day 1.',
    range: '₹30L – ₹2Cr',
    roi: '8–12% net yield',
    highlight: false,
  },
];

export default function InvestmentModels() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-pad bg-[#070f22]">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-yellow-400 text-sm font-bold tracking-widest">HOW TO INVEST</span>
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-white mt-4 mb-6 leading-tight">
            Investment <span className="text-yellow-400">Models</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Choose the investment model that aligns with your financial goals. Every path leads to wealth.
          </p>
        </motion.div>

        {/* Models Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {MODELS.map((model, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`rounded-xl p-6 transition-all duration-300 h-full flex flex-col ${
                model.highlight
                  ? 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border-2 border-yellow-500/60'
                  : 'bg-white/5 border border-yellow-500/20 hover:border-yellow-500/60'
              }`}
            >
              {model.highlight && (
                <div className="text-xs font-bold text-yellow-400 mb-3 tracking-widest">★ POPULAR</div>
              )}

              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                model.highlight ? 'bg-yellow-500/30' : 'bg-white/10'
              }`}>
                <model.icon size={24} className="text-yellow-400" />
              </div>

              <h3 className="text-lg font-cinzel font-bold text-white mb-3">{model.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6 flex-grow">{model.desc}</p>

              <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/40">Investment Range</span>
                  <span className="text-yellow-400 font-semibold">{model.range}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/40">Expected ROI</span>
                  <span className="text-green-400 font-semibold">{model.roi}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Growth Promise */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl p-8 md:p-12 text-center"
        >
          <p className="text-white/50 text-sm mb-3">THE PROEVERON GROWTH PROMISE</p>
          <h3 className="text-3xl md:text-4xl font-cinzel font-bold text-white mb-6">
            <span className="text-yellow-400">₹20 Lakhs</span> → <span className="text-green-400">₹1 Crore</span>
          </h3>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Our investors have historically grown their wealth 5x in 7–10 years. Start small. Dream big. PROEVERON makes it real.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
