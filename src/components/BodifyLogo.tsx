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
      className={`${className} transition-all duration-300 saturate-110`}
      initial={{ scale: 1, y: 0 }}
      animate={{
        scale: [1, 1.05, 1],
        y: [0, -8, 0],
        rotateZ: [0, 2, -2, 0],
        filter: [
          "drop-shadow(0 10px 30px hsl(var(--primary)/0.3))",
          "drop-shadow(0 15px 40px hsl(var(--primary)/0.5))",
          "drop-shadow(0 10px 30px hsl(var(--primary)/0.3))"
        ]
      }}
      transition={{ 
        scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        rotateZ: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        filter: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
      }}
      whileHover={{ 
        scale: 1.1, 
        rotateZ: 5,
        filter: "drop-shadow(0 20px 50px hsl(var(--primary)/0.6))"
      }}
    />
  );
};

export default BodifyLogo;