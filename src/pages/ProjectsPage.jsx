import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, TrendingUp, Filter, X } from 'lucide-react';
import { PageHeader, SectionContainer, GridContainer, Card } from '../components/layout/PageLayout';

// Sample projects data
const SAMPLE_PROJECTS = [
  {
    id: 'p1',
    title: 'Azure Heights',
    location: 'Jubilee Hills, Hyderabad',
    price: 12000000,
    roi: 22,
    type: 'villa',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80',
    description: 'Luxury residential complex with premium amenities',
    status: 'Active',
  },
  {
    id: 'p2',
    title: 'Palm Residences',
    location: 'Downtown Dubai, UAE',
    price: 28000000,
    roi: 28,
    type: 'villa',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    description: 'Ultra-luxury beachfront properties',
    status: 'Active',
  },
  {
    id: 'p3',
    title: 'Greenfield Villas',
    location: 'Gachibowli, Hyderabad',
    price: 9500000,
    roi: 18,
    type: 'villa',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    description: 'Spacious villa community with green spaces',
    status: 'Active',
  },
  {
    id: 'p4',
    title: 'Manhattan Commercial',
    location: 'New York, USA',
    price: 45000000,
    roi: 24,
    type: 'commercial',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    description: 'Prime commercial real estate in Manhattan',
    status: 'Active',
  },
  {
    id: 'p5',
    title: 'Skyline Towers',
    location: 'Banjara Hills, Hyderabad',
    price: 18000000,
    roi: 20,
    type: 'residential',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    description: 'Modern residential towers with city views',
    status: 'Active',
  },
  {
    id: 'p6',
    title: 'Axel Wellness Hub',
    location: 'Kokapet, Hyderabad',
    price: 7500000,
    roi: 25,
    type: 'resort',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80',
    description: 'Wellness resort with spa and fitness facilities',
    status: 'Active',
  },
  {
    id: 'p7',
    title: 'Tech Park Valley',
    location: 'Bangalore, India',
    price: 15000000,
    roi: 21,
    type: 'commercial',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    description: 'IT park with modern infrastructure',
    status: 'Active',
  },
  {
    id: 'p8',
    title: 'Coastal Land Plot',
    location: 'Goa, India',
    price: 5000000,
    roi: 19,
    type: 'land',
    image: 'https://images.unsplash.com/photo-1500382017468-7049fae79eef?w=600&q=80',
    description: 'Premium beachfront land for development',
    status: 'Active',
  },
  {
    id: 'p9',
    title: 'Desert Oasis Resort',
    location: 'Dubai, UAE',
    price: 35000000,
    roi: 26,
    type: 'resort',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    description: 'Luxury resort in prime desert location',
    status: 'Active',
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(SAMPLE_PROJECTS);
  const [filteredProjects, setFilteredProjects] = useState(SAMPLE_PROJECTS);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    location: '',
    priceRange: [0, 50000000],
    type: '',
    roiRange: [0, 30],
  });

  // Fetch projects from Firebase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const [{ db }, { collection, getDocs, query, where }] = await Promise.all([
          import('../firebase/config'),
          import('firebase/firestore'),
        ]);
        const snap = await getDocs(query(collection(db, 'projects'), where('status', '==', 'Active')));
        if (!snap.empty) {
          setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
      } catch (err) {
        console.warn('Using sample projects:', err.message);
      }
    };
    fetchProjects();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = projects;

    if (filters.location) {
      result = result.filter((p) =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    if (filters.type) {
      result = result.filter((p) => p.type === filters.type);
    }

    result = result.filter(
      (p) => p.roi >= filters.roiRange[0] && p.roi <= filters.roiRange[1]
    );

    setFilteredProjects(result);
  }, [filters, projects]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      priceRange: [0, 50000000],
      type: '',
      roiRange: [0, 30],
    });
  };

  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)}Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
    return `₹${price.toLocaleString()}`;
  };

  const locations = [...new Set(projects.map((p) => p.location))];
  const types = [...new Set(projects.map((p) => p.type))];

  return (
    <div className="min-h-screen bg-[#070f22]">
      <SectionContainer className="pt-24">
        {/* Header */}
        <PageHeader
          badge="INVESTMENT OPPORTUNITIES"
          title="Explore Our Projects"
          description="Browse premium real estate investment opportunities across India, UAE, and USA."
        />

        <div className="grid lg:grid-cols-4 gap-8 mt-16">
        {/* Filters Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}
        >
          <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 sticky top-32">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-cinzel font-bold text-lg text-white flex items-center gap-2">
                  <Filter size={18} /> Filters
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-white/50 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

            {/* Location Filter */}
            <div className="mb-6">
              <label className="text-white/70 text-sm font-medium mb-3 block">Location</label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-yellow-500/20 text-white text-sm focus:border-yellow-500/60 focus:outline-none"
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="mb-6">
              <label className="text-white/70 text-sm font-medium mb-3 block">Investment Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-yellow-500/20 text-white text-sm focus:border-yellow-500/60 focus:outline-none"
              >
                <option value="">All Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <label className="text-white/70 text-sm font-medium mb-3 block">
                Price Range: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
              </label>
              <input
                type="range"
                min="0"
                max="50000000"
                step="1000000"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])
                }
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #FBBF24 ${
                    (filters.priceRange[1] / 50000000) * 100
                  }%, rgba(255,255,255,0.1) 0%)`,
                }}
              />
            </div>

            {/* ROI Range Filter */}
            <div className="mb-6">
              <label className="text-white/70 text-sm font-medium mb-3 block">
                ROI Range: {filters.roiRange[0]}% - {filters.roiRange[1]}%
              </label>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={filters.roiRange[1]}
                onChange={(e) =>
                  handleFilterChange('roiRange', [filters.roiRange[0], Number(e.target.value)])
                }
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #FBBF24 ${
                    (filters.roiRange[1] / 30) * 100
                  }%, rgba(255,255,255,0.1) 0%)`,
                }}
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className="w-full px-4 py-2 bg-white/10 border border-yellow-500/20 text-white/70 hover:text-white rounded-lg transition-all text-sm font-medium"
            >
              Reset Filters
            </button>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-3"
        >
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden mb-6 w-full px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-[#0B1C3D] font-bold rounded-lg flex items-center justify-center gap-2"
          >
            <Filter size={18} /> Show Filters
          </button>

          {/* Results Count */}
          <div className="mb-6 text-white/60">
            Showing <span className="text-yellow-400 font-bold">{filteredProjects.length}</span> of{' '}
            <span className="text-yellow-400 font-bold">{projects.length}</span> projects
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group bg-white/5 border border-yellow-500/20 rounded-xl overflow-hidden hover:border-yellow-500/60 hover:bg-white/10 transition-all duration-300 h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070f22] to-transparent" />
                    <span className="absolute top-4 right-4 bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full">
                      {project.type.toUpperCase()}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-cinzel font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {project.title}
                    </h3>

                    <div className="flex items-center gap-1 text-white/50 text-sm mb-4">
                      <MapPin size={14} /> {project.location}
                    </div>

                    <p className="text-white/60 text-sm mb-4 line-clamp-2 flex-grow">{project.description}</p>

                    {/* Price & ROI */}
                    <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/10">
                      <div>
                        <div className="text-white/50 text-xs mb-1">Starting From</div>
                        <div className="font-cinzel font-bold text-lg text-white">
                          {formatPrice(project.price)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white/50 text-xs mb-1">Annual ROI</div>
                        <div className="flex items-center gap-1 text-green-400 font-bold text-lg">
                          <TrendingUp size={16} /> {project.roi}%
                        </div>
                      </div>
                    </div>

                    {/* View Details Button */}
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
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-cinzel font-bold text-white mb-2">No Projects Found</h3>
              <p className="text-white/60 mb-6">Try adjusting your filters to find more projects.</p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-[#0B1C3D] font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </SectionContainer>
    </div>
  );
}
