// src/pages/ProeveronRealtyPage.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, MapPin, TrendingUp, Users, CheckCircle, MessageCircle, Home, Zap } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export default function ProeveronRealtyPage() {
  const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref3, inView: inView3 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref4, inView: inView4 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref5, inView: inView5 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref6, inView: inView6 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref7, inView: inView7 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref8, inView: inView8 } = useInView({ triggerOnce: true, threshold: 0.2 });

  const projects = [
    {
      name: 'Urban Village Villas',
      location: 'Shankarpally, Hyderabad',
      type: 'Residential',
      units: '150+ Units',
      price: '₹8L - ₹25L',
      status: 'Active',
      progress: 65,
    },
    {
      name: 'Premium Residences',
      location: 'Gachibowli, Hyderabad',
      type: 'Luxury Apartments',
      units: '200+ Units',
      price: '₹15L - ₹50L',
      status: 'Active',
      progress: 45,
    },
    {
      name: 'Downtown Dubai',
      location: 'Dubai, UAE',
      type: 'Commercial',
      units: '100+ Units',
      price: '₹20L - ₹75L',
      status: 'Coming Soon',
      progress: 30,
    },
  ];

  const features = [
    { icon: '🏗️', title: 'Prime Locations', desc: 'High-growth markets across India, UAE & USA' },
    { icon: '📊', title: 'Value Creation', desc: 'Strategic land acquisition & development' },
    { icon: '🏢', title: 'Institutional Grade', desc: 'Professional execution & transparency' },
    { icon: '🌍', title: 'Global Reach', desc: 'International investment opportunities' },
  ];

  const steps = [
    { num: 1, title: 'Browse Projects', icon: Building2 },
    { num: 2, title: 'Select Property', icon: Home },
    { num: 3, title: 'Secure Investment', icon: CheckCircle },
    { num: 4, title: 'Track Growth', icon: TrendingUp },
  ];

  return (
    <div className="bg-[#070f22] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1C3D] via-transparent to-[#0B1C3D]" />
        </div>

        <div className="relative z-10 container-max w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h1 className="text-6xl md:text-7xl font-poppins font-bold text-white leading-tight">
              PROEVERON Realty
            </h1>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-yellow-400">
              Institutional-Grade Real Estate Development
            </h2>
            <p className="text-xl text-white/70 font-poppins max-w-2xl mx-auto">
              Premium residential & commercial developments in high-growth markets. Focused on land acquisition, development, and value creation in prime corridors.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/projects"
                className="px-8 py-4 bg-yellow-500 text-[#0B1C3D] font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-300 flex items-center justify-center gap-2 text-base"
              >
                Explore Opportunities <ArrowRight size={20} />
              </Link>
              <button
                onClick={() => openWhatsApp('Hi PROEVERON, I want to know more about PROEVERON Realty projects')}
                className="px-8 py-4 border border-yellow-500 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-base"
              >
                <MessageCircle size={20} /> Book a Call
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. WHAT IS PROEVERON REALTY */}
      <section ref={ref1} className="section-pad bg-[#0B1C3D]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">What is PROEVERON Realty?</h2>
            <p className="text-white/60 text-lg font-poppins">Building premium developments across global markets</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 text-center hover:border-yellow-500/40 transition-all"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-poppins font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 font-poppins">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS */}
      <section ref={ref2} className="section-pad bg-[#070f22]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-white/60 text-lg font-poppins">Handpicked developments ready for investment</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass rounded-xl p-8 border border-yellow-500/20 hover:border-yellow-500/40 transition-all"
              >
                <h3 className="text-xl font-poppins font-bold text-white mb-2">{project.name}</h3>
                <p className="text-yellow-400 text-sm font-poppins mb-4 flex items-center gap-2">
                  <MapPin size={14} /> {project.location}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60 font-poppins">Type</span>
                    <span className="text-yellow-400 font-bold font-poppins">{project.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60 font-poppins">Units</span>
                    <span className="text-white font-bold font-poppins">{project.units}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60 font-poppins">Price Range</span>
                    <span className="text-green-400 font-bold font-poppins">{project.price}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-white/50 font-poppins">Progress</span>
                    <span className="text-yellow-400 font-bold font-poppins">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <Link
                  to="/projects"
                  className="w-full py-3 border border-yellow-500 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-500/10 transition-all text-center text-sm font-poppins"
                >
                  View Details →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section ref={ref3} className="section-pad bg-[#0B1C3D]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">How It Works</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView3 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative text-center"
                >
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center">
                      <Icon size={32} className="text-yellow-400" />
                    </div>
                  </div>
                  <h3 className="text-lg font-poppins font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm font-poppins">Step {step.num}</p>

                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 -right-4 text-yellow-400 text-2xl">→</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section ref={ref4} className="section-pad bg-[#070f22]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">Why Choose PROEVERON Realty?</h2>
            <p className="text-yellow-400 text-lg font-poppins">30+ years of real estate excellence</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: '30+ Years', desc: 'Proven track record in real estate' },
              { title: 'Prime Locations', desc: 'High-growth markets globally' },
              { title: 'Transparent Execution', desc: 'Clear timelines & deliverables' },
              { title: 'Investor-First', desc: 'Your interests always come first' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView4 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/40 transition-all"
              >
                <h3 className="text-lg font-poppins font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm font-poppins">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MARKET PRESENCE */}
      <section ref={ref5} className="section-pad bg-[#0B1C3D]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView5 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-12 text-center"
          >
            {[
              { num: '50+', label: 'Projects Completed' },
              { num: '10000+', label: 'Happy Residents' },
              { num: '500+ Acres', label: 'Land Under Development' },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-5xl font-poppins font-bold text-yellow-400 mb-2">{item.num}</div>
                <p className="text-white/60 font-poppins">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. INVESTMENT MODELS */}
      <section ref={ref6} className="section-pad bg-[#070f22]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView6 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">Investment Models</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Direct Ownership', desc: 'Own premium properties outright', icon: '🏠' },
              { title: 'Fractional Ownership', desc: 'Invest with lower entry points', icon: '📊' },
              { title: 'Development Rights', desc: 'Partner in project development', icon: '🏗️' },
            ].map((model, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView6 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 text-center hover:border-yellow-500/40 transition-all"
              >
                <div className="text-5xl mb-4">{model.icon}</div>
                <h3 className="text-xl font-poppins font-bold text-white mb-3">{model.title}</h3>
                <p className="text-white/60 font-poppins">{model.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. GLOBAL PRESENCE */}
      <section ref={ref7} className="section-pad bg-[#0B1C3D]">
        <div className="container-max max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView7 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white">
              Global Real Estate Opportunities
            </h2>
            <p className="text-lg text-white/70 font-poppins">
              From India to UAE to USA, PROEVERON Realty brings institutional-grade developments to investors worldwide.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-12">
              {[
                { country: 'India', projects: '30+', icon: '🇮🇳' },
                { country: 'UAE', projects: '15+', icon: '🇦🇪' },
                { country: 'USA', projects: '10+', icon: '🇺🇸' },
              ].map((region, i) => (
                <div key={i} className="bg-white/5 border border-yellow-500/20 rounded-xl p-6">
                  <div className="text-4xl mb-3">{region.icon}</div>
                  <h3 className="text-lg font-poppins font-bold text-white mb-2">{region.country}</h3>
                  <p className="text-yellow-400 font-bold font-poppins">{region.projects} Projects</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section ref={ref8} className="section-pad bg-[#070f22]">
        <div className="container-max max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView8 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white">
              Start Your Real Estate Journey with PROEVERON
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/projects"
                className="px-8 py-4 bg-yellow-500 text-[#0B1C3D] font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-300 flex items-center justify-center gap-2 text-base"
              >
                Explore Opportunities <ArrowRight size={20} />
              </Link>
              <button
                onClick={() => openWhatsApp('Hi PROEVERON, I want to explore PROEVERON Realty projects')}
                className="px-8 py-4 border border-yellow-500 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-base"
              >
                <MessageCircle size={20} /> Talk to Advisor
              </button>
            </div>

            {/* WhatsApp Quick Button */}
            <button
              onClick={() => openWhatsApp('Hi PROEVERON, I want to know more about PROEVERON Realty')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 border border-green-500/40 text-green-400 rounded-lg hover:bg-green-500/30 transition-all font-poppins text-sm"
            >
              <MessageCircle size={16} /> Quick WhatsApp Chat
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
