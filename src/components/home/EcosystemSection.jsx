import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';

export default function EcosystemSection() {
  const { content } = useContent();
  const ecosystem = content?.ecosystem || [];
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const defaultItems = [
    {
      title: 'PROEVERON REALTY',
      desc: 'Institutional-grade residential & commercial developments in high-growth markets. Focused on land acquisition, development, and value creation in prime corridors.',
      cta: 'Explore Projects →',
      icon: '🏙️',
    },
    {
      title: 'REALQUITY',
      desc: 'Fractional ownership for premium real estate — starting from ₹20 Lakhs. Access high-value assets with lower entry, structured returns, and shared ownership.',
      cta: 'View Opportunities →',
      icon: '📈',
    },
    {
      title: 'AXEL WELLNESS',
      desc: 'Wellness-driven real estate designed for modern lifestyle and long-term value. Integrating nature, health, and living spaces to enhance both experience and asset appreciation.',
      cta: 'Discover Concept →',
      icon: '🌿',
    },
    {
      title: 'TEQZEN',
      desc: 'AI-powered analytics for smarter real estate investment decisions. Data-driven insights, risk analysis, and opportunity tracking across markets.',
      cta: 'See Insights →',
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
            One Platform. <span className="text-yellow-400">Four Investment Engines.</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            An integrated ecosystem designed to create, grow, and multiply real estate wealth — across ownership, income, and innovation.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {items.map((item, i) => {
            const isProeveronRealty = item.title === 'PROEVERON REALTY';
            const isRealQuity = item.title === 'REALQUITY';
            const isAxelWellness = item.title === 'AXEL WELLNESS';
            const isTeQZen = item.title === 'TEQZEN';
            const CardComponent = (isProeveronRealty || isRealQuity || isAxelWellness || isTeQZen) ? Link : 'div';
            const cardProps = isProeveronRealty ? { to: '/proeveron-realty' } : isRealQuity ? { to: '/realequity' } : isAxelWellness ? { to: '/axel-wellness' } : isTeQZen ? { to: '/teqzen' } : {};

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group bg-white/5 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/60 hover:bg-white/10 transition-all duration-300 cursor-pointer h-full flex flex-col"
                as={CardComponent}
                {...cardProps}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-lg font-poppins font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4 flex-grow font-poppins">{item.desc}</p>
                <div className="flex items-center gap-2 text-yellow-400/60 group-hover:text-yellow-400 transition-colors text-sm font-medium font-poppins">
                  {item.cta || 'Learn More →'}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-white/70 text-lg font-poppins max-w-2xl mx-auto">
            Together, these four verticals transform real estate from a static asset into a dynamic wealth-building system.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
