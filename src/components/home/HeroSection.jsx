import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

const FALLBACK_VIDEO = 'https://videos.pexels.com/video-files/3811499/3811499-uhd_2560_1440_25fps.mp4';

export default function HeroSection() {
  const { content } = useContent();
  const hero = content?.hero || {};
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={hero.videoUrl || FALLBACK_VIDEO}
        autoPlay
        muted
        loop
        playsInline
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1C3D]/60 via-[#0B1C3D]/40 to-[#0B1C3D]/60" />

      {/* Content */}
      <div className="relative z-10 container-max w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl space-y-6"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-block">
            <span className="px-3 py-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 text-xs font-medium tracking-wider">
              GLOBAL REAL ESTATE INVESTMENT
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-6xl lg:text-6xl font-poppins font-bold text-white leading-tight">
              Own Property.
              <br />
              <span className="text-yellow-400">Earn Like Equity.</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-base text-white/60 leading-relaxed max-w-xl font-poppins">
            PROEVERON connects investors to high-growth real estate across India, UAE & USA — combining asset ownership with equity-style returns, backed by structured models and transparent execution.
          </motion.p>

          {/* Tagline */}
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-yellow-400 font-poppins font-semibold">
            Not just buying land — building income-generating assets.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/projects"
              className="px-6 py-3 bg-yellow-500 text-[#0B1C3D] font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto text-sm"
            >
              View Live Opportunities <ArrowRight size={18} />
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 border border-yellow-500 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-500/10 transition-all duration-300 w-full sm:w-auto text-center text-sm"
            >
              Start Investing Today
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="pt-8 border-t border-white/10">
            <div className="text-sm text-white/60 font-poppins mb-3">Across managed & partnered projects</div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '500+', label: '' },
                { value: '45+', label: '' },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-3xl font-poppins font-bold text-yellow-400">{stat.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-yellow-400/50" size={20} />
      </motion.div>
    </section>
  );
}
