import { motion } from 'framer-motion';

export function PageHeader({ badge, title, subtitle, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      {badge && (
        <span className="text-yellow-400 text-sm font-bold tracking-widest">{badge}</span>
      )}
      {title && (
        <h1 className="text-h2 font-cinzel font-bold text-white mt-4 mb-4">
          {title}
        </h1>
      )}
      {subtitle && (
        <p className="text-xl md:text-2xl text-white/80 font-playfair italic mb-4">
          {subtitle}
        </p>
      )}
      {description && (
        <p className="text-white/60 max-w-2xl mx-auto text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}

export function SectionContainer({ children, className = '' }) {
  return (
    <div className={`section-pad ${className}`}>
      <div className="container-max">
        {children}
      </div>
    </div>
  );
}

export function GridContainer({ children, cols = 3, gap = 6 }) {
  const gridClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[cols] || 'md:grid-cols-2 lg:grid-cols-3';

  const gapClass = {
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  }[gap] || 'gap-6';

  return (
    <div className={`grid ${gridClass} ${gapClass}`}>
      {children}
    </div>
  );
}

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white/5 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/60 hover:bg-white/10 transition-all duration-300 h-full flex flex-col ${className}`}>
      {children}
    </div>
  );
}
