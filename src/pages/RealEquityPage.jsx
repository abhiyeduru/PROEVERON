// src/pages/RealEquityPage.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, TrendingUp, Lock, Users, Zap, MapPin, DollarSign, Clock, MessageCircle } from 'lucide-react';

export default function RealEquityPage() {
  const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref3, inView: inView3 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref4, inView: inView4 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref5, inView: inView5 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref6, inView: inView6 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref7, inView: inView7 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref8, inView: inView8 } = useInView({ triggerOnce: true, threshold: 0.2 });

  const opportunities = [
    {
      name: 'Urban Village Villas',
      location: 'Shankarpally, Hyderabad',
      minInvestment: '₹8L',
      return: '12–18%',
      period: '12–24 Months',
      progress: 65,
    },
    {
      name: 'Premium Residences',
      location: 'Gachibowli, Hyderabad',
      minInvestment: '₹10L',
      return: '15–20%',
      period: '18–30 Months',
      progress: 45,
    },
    {
      name: 'Luxury Apartments',
      location: 'Downtown Dubai',
      minInvestment: '₹15L',
      return: '18–24%',
      period: '24–36 Months',
      progress: 30,
    },
  ];

  const steps = [
    { num: 1, title: 'Select Opportunity', icon: CheckCircle },
    { num: 2, title: 'Invest Securely', icon: Lock },
    { num: 3, title: 'Earn Returns', icon: TrendingUp },
    { num: 4, title: 'Exit / Reinvest', icon: ArrowRight },
  ];

  const whyProeveron = [
    { title: '30+ Years Experience', desc: 'Proven track record in real estate execution' },
    { title: 'Land-Backed Investments', desc: 'Every project backed by tangible assets' },
    { title: 'Structured Exit Models', desc: 'Clear buyback and exit strategies' },
    { title: 'Investor-First Approach', desc: 'Your interests come first, always' },
  ];

  const faqs = [
    { q: 'Is this safe?', a: 'Yes. All investments are RERA registered, legally documented, and backed by physical assets.' },
    { q: 'What is minimum investment?', a: 'Minimum entry is ₹8 Lakhs. We offer flexible payment plans.' },
    { q: 'How do I exit?', a: 'Defined exit strategy with buyback guarantee or secondary market options.' },
    { q: 'Is it legally registered?', a: 'All projects are RERA approved with transparent documentation.' },
    { q: 'Can NRIs invest?', a: 'Yes. NRIs can invest with simplified KYC process.' },
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
              RealEquity
            </h1>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-yellow-400">
              Own Real Estate. Earn Real Returns.
            </h2>
            <p className="text-xl text-white/70 font-poppins max-w-2xl mx-auto">
              Curated real estate opportunities with clear entry, steady income, and defined exit strategy.
            </p>

            {/* Trust line */}
            <div className="flex items-center justify-center gap-6 text-sm text-white/60 font-poppins py-6 border-y border-white/10">
              <span className="flex items-center gap-2"><Lock size={14} /> Asset-backed</span>
              <span className="flex items-center gap-2"><CheckCircle size={14} /> Transparent</span>
              <span className="flex items-center gap-2"><Users size={14} /> Professionally Managed</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/realequity/opportunities"
                className="px-8 py-4 bg-yellow-500 text-[#0B1C3D] font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-300 flex items-center justify-center gap-2 text-base"
              >
                Explore Opportunities <ArrowRight size={20} />
              </Link>
              <a
                href="https://wa.me/919876543210?text=I%20want%20to%20book%20a%20call%20for%20RealEquity"
                className="px-8 py-4 border border-yellow-500 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-base"
              >
                <MessageCircle size={20} /> Book a Call
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. WHAT IS REALEQUITY */}
      <section ref={ref1} className="section-pad bg-[#0B1C3D]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">What is RealEquity?</h2>
            <p className="text-white/60 text-lg font-poppins">Designed for investors who want clarity, not confusion.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🏢', title: 'Access Premium Projects', desc: 'Curated real estate opportunities in high-growth markets' },
              { icon: '📊', title: 'Invest with Structured Returns', desc: 'Clear ROI targets and transparent return mechanisms' },
              { icon: '🔁', title: 'Exit with Defined Strategy', desc: 'Buyback guarantees and secondary market options' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 text-center hover:border-yellow-500/40 transition-all"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-poppins font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/60 font-poppins">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LIVE OPPORTUNITIES */}
      <section ref={ref2} className="section-pad bg-[#070f22]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">Live Opportunities</h2>
            <p className="text-white/60 text-lg font-poppins">Handpicked projects ready for investment</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {opportunities.map((opp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass rounded-xl p-8 border border-yellow-500/20 hover:border-yellow-500/40 transition-all"
              >
                <h3 className="text-xl font-poppins font-bold text-white mb-2">{opp.name}</h3>
                <p className="text-yellow-400 text-sm font-poppins mb-6 flex items-center gap-2">
                  <MapPin size={14} /> {opp.location}
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60 font-poppins">Min. Investment</span>
                    <span className="text-yellow-400 font-bold font-poppins">{opp.minInvestment}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60 font-poppins">Expected Return</span>
                    <span className="text-green-400 font-bold font-poppins">{opp.return}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60 font-poppins">Hold Period</span>
                    <span className="text-white font-bold font-poppins">{opp.period}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-white/50 font-poppins">Project Progress</span>
                    <span className="text-yellow-400 font-bold font-poppins">{opp.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-500"
                      style={{ width: `${opp.progress}%` }}
                    />
                  </div>
                </div>

                <Link
                  to="/realequity/opportunities"
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

      {/* 5. WHY PROEVERON */}
      <section ref={ref4} className="section-pad bg-[#070f22]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">Why Invest with PROEVERON?</h2>
            <p className="text-yellow-400 text-lg font-poppins">We don't just sell property. We structure investments.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyProeveron.map((item, i) => (
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

      {/* 6. RETURNS + TRANSPARENCY */}
      <section ref={ref5} className="section-pad bg-[#0B1C3D]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView5 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-12 text-center">Returns + Transparency</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { title: 'Sample Investment Growth', value: '₹20L → ₹26L', period: 'in 15 months' },
                { title: 'Rental Yield Example', value: '8–12%', period: 'annual returns' },
                { title: 'Buyback Clarity', value: 'Guaranteed', period: 'exit option' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView5 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="glass rounded-xl p-8 text-center border border-yellow-500/20"
                >
                  <h3 className="text-white/60 text-sm font-poppins mb-3">{item.title}</h3>
                  <div className="text-3xl font-poppins font-bold text-yellow-400 mb-2">{item.value}</div>
                  <p className="text-white/50 text-sm font-poppins">{item.period}</p>
                </motion.div>
              ))}
            </div>

            <p className="text-xs text-white/40 text-center font-poppins bg-white/5 border border-white/10 rounded-lg p-4">
              ⚠️ Disclaimer: These are illustrative examples. Actual returns may vary based on market conditions and project performance. Past performance is not indicative of future results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 7. TRUST + SOCIAL PROOF */}
      <section ref={ref6} className="section-pad bg-[#070f22]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView6 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-12 text-center"
          >
            {[
              { num: '100+', label: 'Active Investors' },
              { num: '50+', label: 'Acres Managed' },
              { num: '15+', label: 'Active Projects' },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-5xl font-poppins font-bold text-yellow-400 mb-2">{item.num}</div>
                <p className="text-white/60 font-poppins">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section ref={ref7} className="section-pad bg-[#0B1C3D]">
        <div className="container-max max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView7 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView7 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/40 transition-all"
              >
                <h3 className="text-lg font-poppins font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-white/60 font-poppins">{faq.a}</p>
              </motion.div>
            ))}
          </div>
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
              Start Your Real Estate Investment Journey Today
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/realequity/opportunities"
                className="px-8 py-4 bg-yellow-500 text-[#0B1C3D] font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-300 flex items-center justify-center gap-2 text-base"
              >
                Explore Opportunities <ArrowRight size={20} />
              </Link>
              <a
                href="https://wa.me/919876543210?text=I%20want%20to%20talk%20to%20an%20advisor%20about%20RealEquity"
                className="px-8 py-4 border border-yellow-500 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-base"
              >
                <MessageCircle size={20} /> Talk to Advisor
              </a>
            </div>

            {/* WhatsApp Quick Button */}
            <a
              href="https://wa.me/919876543210?text=Hi%20PROEVERON%2C%20I%20want%20to%20know%20more%20about%20RealEquity"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 border border-green-500/40 text-green-400 rounded-lg hover:bg-green-500/30 transition-all font-poppins text-sm"
            >
              <MessageCircle size={16} /> Quick WhatsApp Chat
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
