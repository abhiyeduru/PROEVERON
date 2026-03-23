import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { MapPin, TrendingUp, ArrowRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 'p1',
    title: 'Azure Heights',
    location: 'Jubilee Hills, Hyderabad',
    price: '₹1.2 Cr',
    roi: '22%',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80',
    tag: 'FEATURED',
  },
  {
    id: 'p2',
    title: 'Palm Residences',
    location: 'Downtown Dubai, UAE',
    price: '₹2.8 Cr',
    roi: '28%',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    tag: 'PREMIUM',
  },
  {
    id: 'p3',
    title: 'Greenfield Villas',
    location: 'Gachibowli, Hyderabad',
    price: '₹95 Lakh',
    roi: '18%',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    tag: 'HOT DEAL',
  },
];

export default function FeaturedProjects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-pad bg-[#0B1C3D]">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16"
        >
          <div>
            <span className="text-yellow-400 text-sm font-bold tracking-widest">OUR PROJECTS</span>
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-white mt-4 leading-tight">
              Featured <span className="text-yellow-400">Investments</span>
            </h2>
          </div>
          <Link to="/projects" className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors font-medium whitespace-nowrap">
            View All <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-white/5 border border-yellow-500/20 rounded-xl overflow-hidden hover:border-yellow-500/60 transition-all duration-300 h-full flex flex-col"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C3D] to-transparent" />
                <span className="absolute top-4 right-4 bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full">
                  {project.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-cinzel font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1 text-white/50 text-sm mb-6">
                  <MapPin size={14} /> {project.location}
                </div>

                <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/10 flex-grow">
                  <div>
                    <div className="text-white/50 text-xs mb-1">Starting From</div>
                    <div className="font-cinzel font-bold text-lg text-white">{project.price}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/50 text-xs mb-1">Annual ROI</div>
                    <div className="flex items-center gap-1 text-green-400 font-bold text-lg">
                      <TrendingUp size={16} /> {project.roi}
                    </div>
                  </div>
                </div>

                <Link
                  to={`/projects/${project.id}`}
                  className="block w-full text-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-[#0B1C3D] font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
