import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useContent } from '../../context/ContentContext';

export default function AboutSection() {
  const { content } = useContent();
  const about = content?.about || {};
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="section-pad bg-[#0B1C3D]">
      <div className="container-max">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"
              alt="Luxury Property"
              className="rounded-xl w-full"
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <span className="text-yellow-400 text-xs font-semibold tracking-wider">ABOUT PROEVERON</span>
              <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mt-3 mb-3 leading-tight">
                Structured Real Estate Investments with Predictable Returns
              </h2>
            </div>

            <p className="text-white/70 text-base leading-relaxed font-poppins">
              {about.description || 'PROEVERON connects investors to high-growth real estate across India, UAE & USA — combining asset ownership with equity-style returns, backed by structured models and transparent execution.'}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { label: 'Invested', value: '₹500Cr+' },
                { label: 'Investors', value: '2000+' },
                { label: 'Projects', value: '45+' },
                { label: 'Countries', value: '3' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 rounded-lg p-4 border border-yellow-500/10">
                  <div className="text-yellow-400 font-poppins font-bold text-2xl">{stat.value}</div>
                  <div className="text-white/50 text-xs mt-1 font-poppins">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
