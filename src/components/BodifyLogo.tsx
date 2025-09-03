import React from 'react';
import { motion } from 'framer-motion';
const bodifyLogoUrl = '/lovable-uploads/daf4bc26-57ab-44c5-a111-adbfb48895d4.png';

interface LogoProps {
  className?: string;
  alt?: string;
  variant?: 'full' | 'circle' | 'wordmark';
}

const BodifyLogo: React.FC<LogoProps> = ({ 
  className = "h-8 w-auto", 
  alt = "Bodify - AI Fitness Platform",
  variant = 'full'
}) => {
  return (
    <motion.img
      src={bodifyLogoUrl}
      alt={alt}
      className={`${className} transition-all duration-500 filter drop-shadow-[0_10px_30px_hsl(var(--primary)/0.35)] saturate-125`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateY: [0, 5, -5, 0]
      }}
      transition={{ 
        opacity: { duration: 0.8 },
        scale: { duration: 0.8 },
        rotateY: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
      }}
      whileHover={{ scale: 1.06 }}
    />
  );
};

export default BodifyLogo;