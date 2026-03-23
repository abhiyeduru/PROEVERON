import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Users, TrendingUp, Award } from 'lucide-react';
import { SectionContainer, PageHeader } from '../components/layout/PageLayout';

export default function AboutPage() {
  const stats = [
    { icon: '💰', label: 'Assets Under Management', value: '₹500Cr+' },
    { icon: '👥', label: 'Active Investors', value: '2000+' },
    { icon: '🏢', label: 'Projects Delivered', value: '45+' },
    { icon: '🌍', label: 'Global Presence', value: '3 Countries' },
  ];

  const values = [
    {
      icon: <Globe size={32} className="text-yellow-400" />,
      title: 'Global Vision',
      description: 'We connect investors worldwide with premium real estate opportunities across India, UAE, and USA.',
    },
    {
      icon: <Users size={32} className="text-yellow-400" />,
      title: 'Investor First',
      description: 'Your success is our priority. We provide transparent, secure, and profitable investment solutions.',
    },
    {
      icon: <TrendingUp size={32} className="text-yellow-400" />,
      title: 'Consistent Returns',
      description: 'Our portfolio delivers consistent ROI with professional management and proven track record.',
    },
    {
      icon: <Award size={32} className="text-yellow-400" />,
      title: 'Excellence',
      description: 'We maintain highest standards in project execution, transparency, and investor relations.',
    },
  ];

  const timeline = [
    { year: '2018', event: 'PROEVERON Founded', description: 'Started with vision to revolutionize real estate investment' },
    { year: '2019', event: 'First Project Launch', description: 'Launched flagship project in Hyderabad' },
    { year: '2021', event: 'Global Expansion', description: 'Expanded to UAE and USA markets' },
    { year: '2024', event: 'Market Leader', description: 'Became trusted name in premium real estate investment' },
  ];

  return (
    <div className="min-h-screen bg-[#070f22]">
      {/* Hero Section */}
      <SectionContainer className="pt-24 pb-0">
        <PageHeader
          badge="ABOUT PROEVERON"
          title="Transforming Real Estate Investment"
          description="PROEVERON is a global real estate investment platform connecting visionary investors with premium opportunities across India, UAE, and USA."
        />
      </SectionContainer>

      {/* Stats Section */}
      <SectionContainer>
        <div className="container-max">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 text-center hover:border-yellow-500/60 hover:bg-white/10 transition-all"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-cinzel font-bold text-yellow-400 mb-2">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Mission & Vision */}
      <SectionContainer>
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl p-8"
            >
              <h2 className="text-3xl font-cinzel font-bold text-white mb-4">Our Mission</h2>
              <p className="text-white/70 leading-relaxed text-lg">
                To democratize premium real estate investment by providing transparent, secure, and profitable opportunities to investors worldwide. We believe everyone deserves access to world-class investment opportunities with consistent returns and professional management.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl p-8"
            >
              <h2 className="text-3xl font-cinzel font-bold text-white mb-4">Our Vision</h2>
              <p className="text-white/70 leading-relaxed text-lg">
                To become the world's most trusted real estate investment platform, known for transparency, innovation, and exceptional returns. We envision a future where quality real estate investment is accessible to everyone, everywhere.
              </p>
            </motion.div>
          </div>
        </div>
      </SectionContainer>

      {/* Core Values */}
      <SectionContainer>
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-cinzel font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              These principles guide everything we do and define our commitment to our investors.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/60 hover:bg-white/10 transition-all"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-cinzel font-bold text-white mb-3">{value.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Timeline */}
      <SectionContainer>
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-cinzel font-bold text-white mb-4">Our Journey</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              From a vision to a global real estate investment leader.
            </p>
          </motion.div>

          <div className="space-y-6">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                    <span className="text-white font-cinzel font-bold text-lg">{item.year}</span>
                  </div>
                </div>
                <div className="flex-grow bg-white/5 border border-yellow-500/20 rounded-xl p-6">
                  <h3 className="text-xl font-cinzel font-bold text-white mb-2">{item.event}</h3>
                  <p className="text-white/60">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* CTA Section */}
      <SectionContainer>
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl p-12 text-center"
          >
            <h2 className="text-4xl font-cinzel font-bold text-white mb-4">Ready to Invest?</h2>
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of investors who trust PROEVERON for premium real estate opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/projects"
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-[#0B1C3D] font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
              >
                Explore Projects
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 border-2 border-yellow-500 text-yellow-400 font-bold rounded-lg hover:bg-yellow-500/10 transition-all"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </SectionContainer>
    </div>
  );
}
