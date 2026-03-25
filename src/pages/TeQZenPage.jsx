// src/pages/TeQZenPage.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Brain, Zap, Users, TrendingUp, MessageCircle, Cpu, Lightbulb } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export default function TeQZenPage() {
  const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref3, inView: inView3 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref4, inView: inView4 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref5, inView: inView5 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref6, inView: inView6 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref7, inView: inView7 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref8, inView: inView8 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref9, inView: inView9 } = useInView({ triggerOnce: true, threshold: 0.2 });

  const services = [
    {
      icon: '💻',
      title: 'AI & Software Development',
      items: ['Web & mobile apps', 'AI tools & automation', 'Custom dashboards', 'Platform development'],
    },
    {
      icon: '🧠',
      title: 'AI Training Programs',
      items: ['Foundations of AI', 'Machine learning basics', 'No-code AI tools', 'Real-world projects'],
    },
    {
      icon: '🚀',
      title: 'Product Development Support',
      items: ['Idea to MVP', 'Startup tech support', 'Scalable architecture', 'Go-to-market strategy'],
    },
  ];

  const programs = [
    {
      title: 'AI Fundamentals',
      level: 'Beginner',
      duration: '8 weeks',
      format: 'Online + Live sessions',
      outcome: 'AI basics certification',
    },
    {
      title: 'AI for Business & Startups',
      level: 'Intermediate',
      duration: '12 weeks',
      format: 'Hybrid learning',
      outcome: 'Build AI product',
    },
    {
      title: 'Advanced AI Applications',
      level: 'Advanced',
      duration: '16 weeks',
      format: 'Project-based',
      outcome: 'Industry certification',
    },
  ];

  const studentSteps = [
    { num: 1, title: 'Enroll', icon: Users },
    { num: 2, title: 'Learn', icon: Brain },
    { num: 3, title: 'Build Projects', icon: Code2 },
    { num: 4, title: 'Get Certified', icon: Zap },
  ];

  const businessSteps = [
    { num: 1, title: 'Discuss Requirement', icon: MessageCircle },
    { num: 2, title: 'Design Solution', icon: Lightbulb },
    { num: 3, title: 'Develop System', icon: Code2 },
    { num: 4, title: 'Deploy & Scale', icon: TrendingUp },
  ];

  const whyTeQZen = [
    { title: 'Practical Learning', desc: 'Not just theory. Real-world applications.' },
    { title: 'Industry-Focused', desc: 'Curriculum designed by tech leaders.' },
    { title: 'Scalable Solutions', desc: 'Build systems that grow with you.' },
    { title: 'Expert Support', desc: 'Learn from experienced practitioners.' },
  ];

  const aiCapabilities = [
    { emoji: '⚙️', title: 'Automate Business', desc: 'Streamline workflows and processes' },
    { emoji: '📱', title: 'Build Apps', desc: 'Create intelligent applications' },
    { emoji: '📊', title: 'Analyze Data', desc: 'Extract insights from data' },
    { emoji: '🎯', title: 'Create Products', desc: 'Launch AI-powered solutions' },
  ];

  return (
    <div className="bg-[#0a0e27] min-h-screen text-white">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container-max w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h1 className="text-6xl md:text-7xl font-poppins font-bold text-white leading-tight">
              TeQZen
            </h1>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Build. Learn. Scale with AI.
            </h2>
            <p className="text-xl text-gray-300 font-poppins max-w-2xl mx-auto leading-relaxed">
              Software development and AI education platform empowering individuals, startups, and industries.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/projects"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 text-base shadow-lg"
              >
                Explore Programs <ArrowRight size={20} />
              </Link>
              <button
                onClick={() => openWhatsApp('Hi TeQZen, I want to build with TeQZen')}
                className="px-8 py-4 border border-blue-500 text-blue-400 font-semibold rounded-lg hover:bg-blue-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-base"
              >
                <Cpu size={20} /> Build With Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. WHAT IS TEQZEN */}
      <section ref={ref1} className="section-pad bg-[#0f1535]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
              Technology Meets Learning
            </h2>
            <p className="text-gray-400 text-lg font-poppins">From building systems to building skills.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                icon: '💻',
                title: 'Software Development',
                items: ['Custom platforms', 'SaaS products', 'Automation tools', 'AI integration'],
              },
              {
                icon: '🧠',
                title: 'AI Education',
                items: ['Beginner to advanced', 'Hands-on learning', 'Industry curriculum', 'Certification & projects'],
              },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-xl p-8"
              >
                <div className="text-5xl mb-4">{pillar.icon}</div>
                <h3 className="text-2xl font-poppins font-bold text-white mb-6">{pillar.title}</h3>
                <ul className="space-y-3">
                  {pillar.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-300 font-poppins">
                      <span className="w-2 h-2 bg-blue-400 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHO IT IS FOR */}
      <section ref={ref2} className="section-pad bg-[#0a0e27]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
              Who is TeQZen For?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: '👨‍🎓', title: 'Students', desc: 'Learn AI & tech skills' },
              { emoji: '🚀', title: 'Entrepreneurs', desc: 'Build AI-powered products' },
              { emoji: '🏢', title: 'Businesses', desc: 'Automate & scale operations' },
              { emoji: '🎓', title: 'Institutions', desc: 'Partner for training programs' },
            ].map((audience, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-xl p-6 text-center hover:border-blue-500/40 transition-all"
              >
                <div className="text-4xl mb-3">{audience.emoji}</div>
                <h3 className="text-lg font-poppins font-bold text-white mb-2">{audience.title}</h3>
                <p className="text-gray-400 text-sm font-poppins">{audience.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CORE SERVICES */}
      <section ref={ref3} className="section-pad bg-[#0f1535]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
              Core Services
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-xl p-8 hover:border-blue-500/40 transition-all"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-poppins font-bold text-white mb-6">{service.title}</h3>
                <ul className="space-y-3">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-300 font-poppins text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROGRAMS / COURSES */}
      <section ref={ref4} className="section-pad bg-[#0a0e27]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
              Featured Programs
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView4 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-xl p-8 hover:border-blue-500/40 transition-all"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-poppins font-bold text-white mb-2">{program.title}</h3>
                  <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-poppins rounded-full">
                    {program.level}
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-poppins">Duration</span>
                    <span className="text-blue-400 font-poppins">{program.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-poppins">Format</span>
                    <span className="text-blue-400 font-poppins">{program.format}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-poppins">Outcome</span>
                    <span className="text-blue-400 font-poppins">{program.outcome}</span>
                  </div>
                </div>

                <button className="w-full py-2 border border-blue-500 text-blue-400 font-semibold rounded-lg hover:bg-blue-500/10 transition-all text-sm font-poppins">
                  Learn More →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section ref={ref5} className="section-pad bg-[#0f1535]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView5 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
              How It Works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Students */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView5 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-poppins font-bold text-white mb-8 text-center">For Students</h3>
              <div className="space-y-6">
                {studentSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                          <Icon size={24} className="text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-poppins font-bold text-white">{step.title}</h4>
                        <p className="text-gray-400 text-sm font-poppins mt-1">Step {step.num}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Businesses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView5 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-2xl font-poppins font-bold text-white mb-8 text-center">For Businesses</h3>
              <div className="space-y-6">
                {businessSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                          <Icon size={24} className="text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-poppins font-bold text-white">{step.title}</h4>
                        <p className="text-gray-400 text-sm font-poppins mt-1">Step {step.num}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. WHY TEQZEN */}
      <section ref={ref6} className="section-pad bg-[#0a0e27]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView6 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
              Why Choose TeQZen?
            </h2>
            <p className="text-gray-400 text-lg font-poppins">
              We don't just teach AI. We help you use it.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyTeQZen.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView6 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all"
              >
                <h3 className="text-lg font-poppins font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm font-poppins">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CONNECTION TO PROEVERON */}
      <section ref={ref7} className="section-pad bg-[#0f1535]">
        <div className="container-max max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView7 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-8">
              Technology Powering Real-World Solutions
            </h2>

            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-xl p-8 mb-8">
              <p className="text-gray-300 font-poppins mb-6">
                TeQZen builds the technology. PROEVERON builds the opportunities.
              </p>
              <ul className="space-y-3 text-left">
                {[
                  'TeQZen supports PROEVERON platforms',
                  'AI + real estate integration',
                  'Digital infrastructure for ecosystem',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 font-poppins">
                    <span className="w-2 h-2 bg-blue-400 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-gray-400 font-poppins italic">
              This is ecosystem strength. Technology + Real Estate + Wellness + Education.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 9. WHAT YOU CAN DO WITH AI */}
      <section ref={ref8} className="section-pad bg-[#0a0e27]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView8 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
              What You Can Do with AI
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiCapabilities.map((capability, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView8 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-xl p-6 text-center hover:border-blue-500/40 transition-all"
              >
                <div className="text-4xl mb-3">{capability.emoji}</div>
                <h3 className="text-lg font-poppins font-bold text-white mb-2">{capability.title}</h3>
                <p className="text-gray-400 text-sm font-poppins">{capability.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section ref={ref9} className="section-pad bg-[#0f1535]">
        <div className="container-max max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView9 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white">
              Start Building with TeQZen
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/projects"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 text-base shadow-lg"
              >
                Join a Program <ArrowRight size={20} />
              </Link>
              <button
                onClick={() => openWhatsApp('Hi TeQZen, I want to build my product with TeQZen')}
                className="px-8 py-4 border border-blue-500 text-blue-400 font-semibold rounded-lg hover:bg-blue-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-base"
              >
                <Code2 size={20} /> Build Your Product
              </button>
            </div>

            <button
              onClick={() => openWhatsApp('Hi TeQZen, I want to partner with TeQZen')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/20 border border-blue-500/40 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all font-poppins text-sm"
            >
              <MessageCircle size={16} /> Partner With Us
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
