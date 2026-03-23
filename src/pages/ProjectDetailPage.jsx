import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Calendar, ArrowLeft, Share2, Heart } from 'lucide-react';
import { SectionContainer } from '../components/layout/PageLayout';

// Sample project details
const PROJECT_DETAILS = {
  p1: {
    id: 'p1',
    title: 'Azure Heights',
    location: 'Jubilee Hills, Hyderabad',
    price: 12000000,
    roi: 22,
    type: 'villa',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    ],
    description: 'Luxury residential complex with premium amenities in the heart of Hyderabad.',
    fullDescription: 'Azure Heights is a premium residential development offering world-class living spaces with state-of-the-art amenities. Located in the prestigious Jubilee Hills area, this project combines luxury with sustainability.',
    highlights: [
      '3 BHK & 4 BHK Apartments',
      'Swimming Pool & Gym',
      'Landscaped Gardens',
      '24/7 Security',
      'Smart Home Features',
      'EV Charging Stations',
    ],
    amenities: [
      { icon: '🏊', name: 'Swimming Pool' },
      { icon: '🏋️', name: 'Fitness Center' },
      { icon: '🌳', name: 'Gardens' },
      { icon: '🚗', name: 'Parking' },
      { icon: '🎾', name: 'Sports Court' },
      { icon: '🏪', name: 'Shopping' },
    ],
    timeline: [
      { phase: 'Phase 1', status: 'Completed', date: 'Q1 2023' },
      { phase: 'Phase 2', status: 'Ongoing', date: 'Q2 2024' },
      { phase: 'Phase 3', status: 'Planned', date: 'Q4 2024' },
    ],
    investmentBreakdown: [
      { label: 'Land Cost', value: 40 },
      { label: 'Construction', value: 35 },
      { label: 'Amenities', value: 15 },
      { label: 'Contingency', value: 10 },
    ],
    status: 'Active',
    launchDate: 'January 2023',
    completionDate: 'December 2025',
    totalUnits: 120,
    soldUnits: 45,
  },
};

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Try to fetch from Firebase first
    const fetchProject = async () => {
      try {
        const [{ db }, { doc, getDoc }] = await Promise.all([
          import('../firebase/config'),
          import('firebase/firestore'),
        ]);
        const snap = await getDoc(doc(db, 'projects', id));
        if (snap.exists()) {
          setProject({ id: snap.id, ...snap.data() });
        } else {
          setProject(PROJECT_DETAILS[id] || PROJECT_DETAILS.p1);
        }
      } catch (err) {
        console.warn('Using sample project:', err.message);
        setProject(PROJECT_DETAILS[id] || PROJECT_DETAILS.p1);
      }
    };
    fetchProject();
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#070f22] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">⏳</div>
          <p className="text-white/60">Loading project details...</p>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)}Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
    return `₹${price.toLocaleString()}`;
  };

  const occupancyRate = ((project.soldUnits || 0) / (project.totalUnits || 1)) * 100;

  return (
    <div className="min-h-screen bg-[#070f22]">
      <SectionContainer className="pt-24">
        {/* Back Button */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors mb-8"
        >
          <ArrowLeft size={18} /> Back to Projects
        </Link>

        <div className="container-max">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden mb-8 h-96 md:h-[500px]"
          >
            <img
              src={project.gallery?.[selectedImage] || project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070f22] to-transparent" />

            {/* Image Gallery Thumbnails */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto">
              {(project.gallery || [project.image]).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-yellow-400' : 'border-white/20'
                  }`}
                >
                  <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  liked
                    ? 'bg-red-500/20 border border-red-500/60 text-red-400'
                    : 'bg-white/10 border border-white/20 text-white/60 hover:text-white'
                }`}
              >
                <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
              </button>
              <button className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white/60 hover:text-white transition-all flex items-center justify-center">
                <Share2 size={20} />
              </button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Header */}
              <div>
                <span className="text-yellow-400 text-sm font-bold tracking-widest">{project.type.toUpperCase()}</span>
                <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-white mt-2 mb-3">
                  {project.title}
                </h1>
                <div className="flex items-center gap-2 text-white/60 text-lg">
                  <MapPin size={20} /> {project.location}
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-cinzel font-bold text-white mb-4">About This Project</h2>
                <p className="text-white/70 leading-relaxed text-lg">
                  {project.fullDescription || project.description}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="text-2xl font-cinzel font-bold text-white mb-4">Key Highlights</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {(project.highlights || []).map((highlight, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 border border-yellow-500/20 rounded-lg p-4">
                      <span className="text-yellow-400 text-xl">✓</span>
                      <span className="text-white/70">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-cinzel font-bold text-white mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(project.amenities || []).map((amenity, i) => (
                    <div key={i} className="text-center bg-white/5 border border-yellow-500/20 rounded-lg p-4">
                      <div className="text-3xl mb-2">{amenity.icon}</div>
                      <div className="text-white/70 text-sm">{amenity.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h2 className="text-2xl font-cinzel font-bold text-white mb-4">Project Timeline</h2>
                <div className="space-y-3">
                  {(project.timeline || []).map((item, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/5 border border-yellow-500/20 rounded-lg p-4">
                      <div className="w-12 h-12 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center">
                        <Calendar size={20} className="text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-white">{item.phase}</div>
                        <div className="text-white/50 text-sm">{item.date}</div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === 'Completed'
                            ? 'bg-green-500/20 text-green-400'
                            : item.status === 'Ongoing'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              {/* Investment Card */}
              <div className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl p-6 sticky top-32 space-y-6">
                {/* Price & ROI */}
                <div>
                  <div className="text-white/50 text-sm mb-2">Starting Price</div>
                  <div className="text-4xl font-cinzel font-bold text-yellow-400 mb-4">
                    {formatPrice(project.price)}
                  </div>
                  <div className="flex items-center gap-2 text-green-400 text-lg font-bold">
                    <TrendingUp size={20} /> {project.roi}% Annual ROI
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3 pt-6 border-t border-yellow-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">Total Units</span>
                    <span className="font-bold text-white">{project.totalUnits || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">Sold Units</span>
                    <span className="font-bold text-white">{project.soldUnits || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">Occupancy</span>
                    <span className="font-bold text-green-400">{occupancyRate.toFixed(0)}%</span>
                  </div>
                </div>

                {/* Occupancy Bar */}
                <div className="pt-2">
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 transition-all duration-500"
                      style={{ width: `${occupancyRate}%` }}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="space-y-2 pt-6 border-t border-yellow-500/20 text-sm">
                  <div>
                    <div className="text-white/50 mb-1">Launch Date</div>
                    <div className="text-white font-medium">{project.launchDate || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-1">Expected Completion</div>
                    <div className="text-white font-medium">{project.completionDate || 'N/A'}</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 pt-6 border-t border-yellow-500/20">
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-[#0B1C3D] font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all">
                    Invest Now
                  </button>
                  <button className="w-full px-6 py-3 border-2 border-yellow-500 text-yellow-400 font-bold rounded-lg hover:bg-yellow-500/10 transition-all">
                    Schedule Tour
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
