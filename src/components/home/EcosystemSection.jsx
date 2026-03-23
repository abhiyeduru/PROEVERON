import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export default function EcosystemSection() {
  const { content } = useContent();
  const ecosystem = content?.ecosystem || [];
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const defaultItems = [
    {
      title: 'PROEVERON Realty',
      desc: 'Premium residential & commercial projects across tier-1 cities with world-class amenities.',
      icon: '🏙️',
    },
    {
      title: 'RealQuity',
      desc: 'Fractional ownership — invest in luxury properties from ₹20 Lakhs and earn like an equity holder.',
      icon: '📈',
    },
    {
      title: 'Axel Wellness',
      desc: 'Wellness-integrated living spaces redefining modern lifestyle with nature and technology.',
      icon: '🌿',
    },
    {
      title: 'TeQZen AI',
      desc: 'AI-powered property analytics and smart investment insights for data-driven decisions.',
      icon: '🤖',
    },
  ];

  const items = ecosystem.length > 0 ? ecosystem : defaultItems;

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
          <span className="text-yellow-400 text-sm font-bold tracking-widest">OUR ECOSYSTEM</span>
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-white mt-4 mb-6 leading-tight">
            One Platform. <span className="text-yellow-400">Four Powerhouses.</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            A fully integrated ecosystem designed to maximize your real estate wealth across every investment angle.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-white/5 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/60 hover:bg-white/10 transition-all duration-300 cursor-pointer h-full flex flex-col"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-lg font-cinzel font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4 flex-grow">{item.desc}</p>
              <div className="flex items-center gap-2 text-yellow-400/60 group-hover:text-yellow-400 transition-colors text-sm font-medium">
                Learn More <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
