import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ROICalculator() {
  const [investment, setInvestment] = useState(5000000);
  const [years, setYears] = useState(5);
  const [model, setModel] = useState('fractional');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const ROI_RATES = {
    direct: 0.20,
    fractional: 0.25,
    emi: 0.18,
    rental: 0.10,
  };

  const rate = ROI_RATES[model];
  const finalValue = investment * Math.pow(1 + rate, years);
  const totalReturns = finalValue - investment;

  const formatCurrency = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
    return `₹${val.toLocaleString()}`;
  };

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
          <span className="text-yellow-400 text-sm font-bold tracking-widest">ROI SIMULATOR</span>
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-white mt-4 mb-6 leading-tight">
            Calculate Your <span className="text-yellow-400">Returns</span>
          </h2>
        </motion.div>

        {/* Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-12">
            {/* Inputs */}
            <div className="space-y-8">
              {/* Investment Amount */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-white/70 font-medium">Investment Amount</label>
                  <span className="font-cinzel font-bold text-yellow-400">{formatCurrency(investment)}</span>
                </div>
                <input
                  type="range"
                  min="2000000"
                  max="50000000"
                  step="1000000"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #FBBF24 ${((investment - 2000000) / 48000000) * 100}%, rgba(255,255,255,0.1) 0%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-white/30 mt-2">
                  <span>₹20L</span><span>₹5Cr</span>
                </div>
              </div>

              {/* Duration */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-white/70 font-medium">Duration</label>
                  <span className="font-cinzel font-bold text-yellow-400">{years} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #FBBF24 ${((years - 1) / 14) * 100}%, rgba(255,255,255,0.1) 0%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-white/30 mt-2">
                  <span>1 Year</span><span>15 Years</span>
                </div>
              </div>

              {/* Model Selection */}
              <div>
                <label className="text-white/70 font-medium mb-4 block">Investment Model</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'direct', label: 'Direct' },
                    { key: 'fractional', label: 'Fractional' },
                    { key: 'emi', label: 'EMI' },
                    { key: 'rental', label: 'Rental' },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setModel(key)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        model === key
                          ? 'bg-yellow-500/30 border border-yellow-500/60 text-yellow-400'
                          : 'bg-white/5 border border-yellow-500/20 text-white/60 hover:text-white'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Total Value', value: formatCurrency(finalValue), color: 'text-yellow-400' },
                  { label: 'Total Returns', value: formatCurrency(totalReturns), color: 'text-green-400' },
                  { label: 'ROI Rate', value: `${(rate * 100).toFixed(0)}% p.a.`, color: 'text-blue-400' },
                  { label: 'Annual Income', value: formatCurrency((investment * rate) / 12 * 12), color: 'text-purple-400' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-white/5 rounded-lg p-4 text-center border border-yellow-500/10">
                    <div className={`font-cinzel font-bold text-2xl ${color}`}>{value}</div>
                    <div className="text-xs text-white/50 mt-2">{label}</div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-lg p-6 text-center">
                <p className="text-white/60 text-sm">
                  <span className="text-yellow-400 font-semibold">{formatCurrency(investment)}</span> invested today becomes{' '}
                  <span className="text-green-400 font-semibold">{formatCurrency(finalValue)}</span> in {years} years
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
