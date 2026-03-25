// src/components/layout/WhatsAppButton.jsx
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { openWhatsApp } from '../../utils/whatsapp';

export default function WhatsAppButton() {
  const { content } = useContent();

  return (
    <motion.button
      onClick={() => openWhatsApp('Hi PROEVERON, I\'m interested in investing. Please share more details.')}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl pulse-btn"
      title="Chat on WhatsApp"
    >
      <MessageCircle size={26} className="text-white" fill="white" />
    </motion.button>
  );
}
