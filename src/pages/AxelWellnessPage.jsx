// src/pages/AxelWellnessPage.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Zap, Home, Users, TrendingUp, MessageCircle, MapPin, Calendar } from 'lucide-react';

export default function AxelWellnessPage() {
  const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref3, inView: inView3 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref4, inView: inView4 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref5, inView: inView5 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref6, inView: inView6 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref7, inView: inView7 } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ref8, inView: inView8 } = useInView({ triggerOnce: true, threshold: 0.2 });

  const experiences = [
    { icon: '🧘', title: 'Morning Yoga Decks', desc: 'Sunrise sessions overlooking nature' },
    { icon: '🕉️', title: 'Meditation Zones', desc: 'Peaceful spaces for inner calm' },
    { icon: '🌿', title: 'Herbal Gardens', desc: 'Organic wellness at your doorstep' },
    { icon: '🚶', title: 'Walking Trails', desc: 'Nature immersion paths' },
    { icon: '🪑', title: 'Open-Air Seating', desc: 'Connect with nature daily' },
    { icon: '👥', title: 'Community Spaces', desc: 'Wellness-minded people gathering' },
  ];

  const targetAudience = [
    { emoji: '💼', title: 'Professionals', desc: 'Seeking weekend retreat from city stress' },
    { emoji: '🌍', title: 'NRIs', desc: 'Wanting peaceful investment in India' },
    { emoji: '👨‍👩‍👧‍👦', title: 'Families', desc: 'Looking for a second home sanctuary' },
    { emoji: '👴', title: 'Seniors', desc: 'Desiring calm, healthy living' },
  ];

  const steps = [
    { num: 1, title: 'Choose Your Space', icon: Home },
    { num: 2, title: 'Secure Investment', icon: Zap },
    { num: 3, title: 'Enjoy or Rent', icon: Users },
    { num: 4, title: 'Grow Value', icon: TrendingUp },
  ];

  const whyAxel = [
    { title: 'Thoughtfully Planned', desc: 'Every detail designed for wellness' },
    { title: 'Low-Density Living', desc: 'Space, peace, and privacy' },
    { title: 'Nature-First Design', desc: 'Built with sustainability in mind' },
    { title: 'Backed by PROEVERON', desc: 'Trust and expertise you can rely on' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-b from-green-50 via-white to-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container-max w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h1 className="text-6xl md:text-7xl font-poppins font-bold text-gray-900 leading-tight">
              Axel Wellness
            </h1>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-green-700">
              Where Living Meets Wellbeing
            </h2>
            <p className="text-xl text-gray-600 font-poppins max-w-2xl mx-auto leading-relaxed">
              A curated wellness ecosystem designed for relaxation, health, and long-term value.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/axel-wellness/explore"
                className="px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 text-base shadow-lg hover:shadow-xl"
              >
                Explore Wellness Living <ArrowRight size={20} />
              </Link>
              <a
                href="https://wa.me/919876543210?text=I%20want%20to%20book%20a%20visit%20for%20Axel%20Wellness"
                className="px-8 py-4 border-2 border-green-600 text-green-600 font-semibold rounded-full hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2 text-base"
              >
                <Calendar size={20} /> Book a Visit
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE IDEA */}
      <section ref={ref1} className="section-pad bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
              Not Just a Property. A Lifestyle.
            </h2>
            <p className="text-gray-600 text-lg font-poppins">
              Designed for those who value health, time, and balance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🌿', title: 'Nature-Integrated Living', desc: 'Surrounded by greenery and natural beauty' },
              { icon: '🧘', title: 'Wellness-Focused Spaces', desc: 'Every corner designed for your wellbeing' },
              { icon: '🏡', title: 'Peaceful Investment', desc: 'Value that grows with time and demand' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-green-50 rounded-3xl p-8 text-center hover:shadow-lg transition-all"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-poppins font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 font-poppins">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCE SECTION */}
      <section ref={ref2} className="section-pad bg-gradient-to-b from-green-50 to-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
              Your Daily Wellness Experience
            </h2>
            <p className="text-gray-600 text-lg font-poppins">
              Every moment designed for peace and rejuvenation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-green-100 hover:border-green-300 hover:shadow-lg transition-all text-center"
              >
                <div className="text-5xl mb-4">{exp.icon}</div>
                <h3 className="text-lg font-poppins font-bold text-gray-900 mb-2">{exp.title}</h3>
                <p className="text-gray-600 text-sm font-poppins">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHO IS THIS FOR */}
      <section ref={ref3} className="section-pad bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
              Who is Axel Wellness For?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudience.map((audience, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-green-50 rounded-2xl p-6 text-center hover:bg-green-100 transition-all"
              >
                <div className="text-4xl mb-3">{audience.emoji}</div>
                <h3 className="text-lg font-poppins font-bold text-gray-900 mb-2">{audience.title}</h3>
                <p className="text-gray-600 text-sm font-poppins">{audience.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INVESTMENT ANGLE */}
      <section ref={ref4} className="section-pad bg-gradient-to-b from-green-50 to-white">
        <div className="container-max max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-8">
              Wellness + Returns
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { title: 'Vacation Rental', value: 'Earn when away', icon: '🏖️' },
                { title: 'Land Appreciation', value: 'Growing demand', icon: '📈' },
                { title: 'Wellness Living', value: 'Premium market', icon: '💚' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView4 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-green-100"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-gray-600 text-sm font-poppins mb-2">{item.title}</h3>
                  <div className="text-2xl font-poppins font-bold text-green-600">{item.value}</div>
                </motion.div>
              ))}
            </div>

            <p className="text-lg text-gray-700 font-poppins italic">
              Own a wellness home that earns when you're not using it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section ref={ref5} className="section-pad bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView5 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView5 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative text-center"
                >
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-green-100 border-2 border-green-600 flex items-center justify-center">
                      <Icon size={32} className="text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-poppins font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm font-poppins">Step {step.num}</p>

                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 -right-4 text-green-600 text-2xl">→</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. WHY AXEL */}
      <section ref={ref6} className="section-pad bg-green-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView6 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
              Why Choose Axel Wellness?
            </h2>
            <p className="text-gray-600 text-lg font-poppins">
              Built with long-term sustainability in mind
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyAxel.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView6 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-green-200 hover:border-green-400 transition-all"
              >
                <h3 className="text-lg font-poppins font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm font-poppins">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. VISUAL STORY SECTION */}
      <section ref={ref7} className="section-pad bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView7 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
              A Day at Axel Wellness
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { time: 'Morning', desc: 'Sunrise yoga overlooking nature', emoji: '🌅' },
              { time: 'Afternoon', desc: 'Meditation and herbal tea in gardens', emoji: '☕' },
              { time: 'Evening', desc: 'Walking trails and community gathering', emoji: '🌅' },
            ].map((moment, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView7 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-gradient-to-b from-green-50 to-white rounded-2xl p-8 text-center border border-green-100"
              >
                <div className="text-6xl mb-4">{moment.emoji}</div>
                <h3 className="text-xl font-poppins font-bold text-gray-900 mb-2">{moment.time}</h3>
                <p className="text-gray-600 font-poppins">{moment.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TRUST + BRAND */}
      <section ref={ref8} className="section-pad bg-green-50">
        <div className="container-max max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView8 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900">
              Backed by PROEVERON
            </h2>
            <p className="text-lg text-gray-600 font-poppins">
              Decades of real estate expertise combined with wellness vision
            </p>

            <div className="grid md:grid-cols-3 gap-8 my-12">
              {[
                { num: '30+', label: 'Years Experience' },
                { num: '100+', label: 'Wellness Projects' },
                { num: '1000+', label: 'Happy Residents' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl font-poppins font-bold text-green-600 mb-2">{stat.num}</div>
                  <p className="text-gray-600 font-poppins">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="section-pad bg-white">
        <div className="container-max max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900">
              Invest in Wellness. Live Better.
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/axel-wellness/explore"
                className="px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 text-base shadow-lg"
              >
                Book a Site Visit <ArrowRight size={20} />
              </Link>
              <a
                href="https://wa.me/919876543210?text=Hi%20PROEVERON%2C%20I%20want%20to%20know%20more%20about%20Axel%20Wellness"
                className="px-8 py-4 border-2 border-green-600 text-green-600 font-semibold rounded-full hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2 text-base"
              >
                <MessageCircle size={20} /> Talk to Advisor
              </a>
            </div>

            {/* WhatsApp Quick Button */}
            <a
              href="https://wa.me/919876543210?text=I%20want%20to%20learn%20more%20about%20Axel%20Wellness"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 border border-green-300 text-green-700 rounded-full hover:bg-green-200 transition-all font-poppins text-sm"
            >
              <MessageCircle size={16} /> Quick WhatsApp Chat
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
