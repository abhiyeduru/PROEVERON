import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import { SectionContainer, PageHeader } from '../components/layout/PageLayout';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Phone size={32} className="text-yellow-400" />,
      title: 'Phone',
      details: ['+91 90632 72652', '+91 9490462652'],
      link: 'tel:+919063272652',
    },
    {
      icon: <Mail size={32} className="text-yellow-400" />,
      title: 'Email',
      details: ['proeveron@gmail.com'],
      link: 'mailto:proeveron@gmail.com',
    },
    {
      icon: <MapPin size={32} className="text-yellow-400" />,
      title: 'Address',
      details: ['9825 Jake Lane, Apt 125', 'San Diego, California 92126', 'USA'],
      link: 'https://maps.google.com',
    },
    {
      icon: <MessageCircle size={32} className="text-yellow-400" />,
      title: 'WhatsApp',
      details: ['+91 90632 72652'],
      link: 'https://wa.me/919063272652',
    },
  ];

  return (
    <div className="min-h-screen bg-[#070f22]">
      {/* Hero Section */}
      <SectionContainer className="pt-24 pb-0">
        <PageHeader
          badge="GET IN TOUCH"
          title="Contact PROEVERON"
          description="Have questions about our investment opportunities? We're here to help. Reach out to our team and let's discuss your investment goals."
        />
      </SectionContainer>

      {/* Contact Info Cards */}
      <SectionContainer>
        <div className="container-max">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.link}
                target={info.link.startsWith('http') ? '_blank' : '_self'}
                rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/60 hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform">{info.icon}</div>
                <h3 className="text-xl font-cinzel font-bold text-white mb-3">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, j) => (
                    <p key={j} className="text-white/60 text-sm hover:text-yellow-400 transition-colors">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Contact Form & Map */}
      <SectionContainer>
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-cinzel font-bold text-white mb-8">Send us a Message</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/20 border border-green-500/40 rounded-xl p-8 text-center"
                >
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="text-2xl font-cinzel font-bold text-green-400 mb-2">Message Sent!</h3>
                  <p className="text-white/60">Thank you for reaching out. We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-yellow-500/20 text-white placeholder-white/30 focus:border-yellow-500/60 focus:outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-yellow-500/20 text-white placeholder-white/30 focus:border-yellow-500/60 focus:outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-yellow-500/20 text-white placeholder-white/30 focus:border-yellow-500/60 focus:outline-none transition-all"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-yellow-500/20 text-white placeholder-white/30 focus:border-yellow-500/60 focus:outline-none transition-all"
                      placeholder="How can we help?"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-yellow-500/20 text-white placeholder-white/30 focus:border-yellow-500/60 focus:outline-none transition-all resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-[#0B1C3D] font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all flex items-center justify-center gap-2 group"
                  >
                    <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Business Hours */}
              <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
                <h3 className="text-2xl font-cinzel font-bold text-white mb-6">Business Hours</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-white/60">Monday - Friday</span>
                    <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-white/60">Saturday</span>
                    <span className="text-white font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Sunday</span>
                    <span className="text-white font-medium">Closed</span>
                  </div>
                </div>
              </div>

              {/* Quick Response */}
              <div className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl p-8">
                <h3 className="text-2xl font-cinzel font-bold text-white mb-4">Quick Response</h3>
                <p className="text-white/60 mb-6">
                  We typically respond to inquiries within 24 hours. For urgent matters, please call us directly.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-400">✓</span>
                    <span className="text-white/70">Expert consultation available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-400">✓</span>
                    <span className="text-white/70">Personalized investment guidance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-400">✓</span>
                    <span className="text-white/70">24/7 WhatsApp support</span>
                  </div>
                </div>
              </div>

              {/* Office Location */}
              <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
                <h3 className="text-2xl font-cinzel font-bold text-white mb-4">Visit Us</h3>
                <p className="text-white/60 mb-4">
                  Our office is located in San Diego, California. Schedule a visit to discuss your investment opportunities in person.
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 border border-yellow-500 text-yellow-400 font-bold rounded-lg hover:bg-yellow-500/10 transition-all"
                >
                  Get Directions
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionContainer>

      {/* FAQ Section */}
      <SectionContainer>
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-cinzel font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Find answers to common questions about our services and investment process.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: 'What is the minimum investment amount?',
                a: 'Our minimum investment starts from ₹5 lakhs. We offer flexible investment options to suit different budgets.',
              },
              {
                q: 'How long does the investment process take?',
                a: 'Typically 7-10 business days from application to fund deployment. We ensure a smooth and transparent process.',
              },
              {
                q: 'What are the expected returns?',
                a: 'Our projects offer ROI ranging from 18% to 28% annually, depending on the project and investment type.',
              },
              {
                q: 'Is my investment secure?',
                a: 'Yes, all investments are backed by real estate assets and managed by our experienced team with proven track record.',
              },
              {
                q: 'Can I withdraw my investment early?',
                a: 'Early withdrawal options are available with specific terms. Contact our team to discuss your requirements.',
              },
              {
                q: 'Do you offer international investments?',
                a: 'Yes, we have projects in India, UAE, and USA. We assist with all documentation and compliance requirements.',
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/60 hover:bg-white/10 transition-all"
              >
                <h3 className="text-lg font-cinzel font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
