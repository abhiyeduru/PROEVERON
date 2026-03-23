import { useState } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { SectionContainer } from '../layout/PageLayout';

export default function VideoSection() {
  const { content } = useContent();
  const videoSection = content?.videoSection || {};
  const [showModal, setShowModal] = useState(false);

  const videoUrl = videoSection.videoUrl || '/promo-video.mp4';

  return (
    <>
      <SectionContainer>
        <div className="container-max">
          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative cursor-pointer group"
            onClick={() => setShowModal(true)}
          >
            {/* Video Thumbnail */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-yellow-500/20 group-hover:border-yellow-500/40 transition-all duration-300">
              <div className="aspect-video relative bg-black">
                <video
                  src={videoUrl}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />

                {/* Play Button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <svg className="w-8 h-8 text-[#0B1C3D] fill-current ml-1" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionContainer>

      {/* Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl"
          >
            <div className="relative w-full rounded-2xl overflow-hidden">
              <div className="aspect-video">
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
