import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export default function TestimonialsSection() {
  const { content } = useContent();
  const testimonials = content?.testimonials || [];
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [current, setCurrent] = useState(0);

  const defaultTestimonials = [
    { name: 'Rajesh Sharma', role: 'Entrepreneur, Hyderabad', quote: 'PROEVERON transformed my investment strategy. My ₹50L grew to ₹78L in 2 years. The transparency and ROI are unmatched.', avatar: 'RS', rating: 5 },
    { name: 'Priya Menon', role: 'NRI Investor, Dubai', quote: 'As an NRI, I was looking for a trustworthy partner for India investments. PROEVERON exceeded every expectation with professional service.', avatar: 'PM', rating: 5 },
    { name: 'Vikram Nair', role: 'IT Professional, Bangalore', quote: 'Fractional ownership through RealQuity allowed me to invest in luxury properties I thought were beyond my reach. Game changer!', avatar: 'VN', rating: 5 },
  ];

  const items = testimonials.length > 0 ? testimonials : defaultTestimonials;
  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  const avatarColors = ['from-yellow-500 to-yellow-700', 'from-blue-500 to-blue-700', 'from-purple-500 to-purple-700'];

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
          <span className="text-yellow-400 text-sm font-bold tracking-widest">TESTIMONIALS</span>
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-white mt-4 mb-6 leading-tight">
            Investor <span className="text-yellow-400">Success Stories</span>
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white/5 border border-yellow-500/20 rounded-xl p-8 md:p-12"
            >
              {/* Quote Icon */}
              <Quote className="text-yellow-500/20 mb-6" size={40} />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(items[current]?.rating || 5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl text-white/80 font-playfair italic leading-relaxed mb-8">
                "{items[current]?.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarColors[current % avatarColors.length]} flex items-center justify-center font-bold text-white text-sm`}>
                  {items[current]?.avatar}
                </div>
                <div>
                  <div className="font-bold text-white">{items[current]?.name}</div>
                  <div className="text-sm text-yellow-400">{items[current]?.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-yellow-500/40 text-white/60 hover:text-yellow-400 hover:border-yellow-500 transition-all flex items-center justify-center"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? 'w-8 bg-yellow-400' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-yellow-500/40 text-white/60 hover:text-yellow-400 hover:border-yellow-500 transition-all flex items-center justify-center"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
