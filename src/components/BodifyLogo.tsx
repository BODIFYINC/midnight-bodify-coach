import React from 'react';
import { motion } from 'framer-motion';
import bodifyLogo from '@/assets/bodify-logo-refined.png';

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
    <motion.div className="relative">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-full blur-xl"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.img
        src={bodifyLogo}
        alt={alt}
        className={`${className} relative z-10 transition-all duration-300 saturate-110 drop-shadow-2xl`}
        initial={{ scale: 1, y: 0 }}
        animate={{
          scale: [1, 1.03, 1],
          y: [0, -4, 0],
          rotateZ: [0, 1, -1, 0],
          filter: [
            "drop-shadow(0 8px 25px hsl(var(--primary)/0.4))",
            "drop-shadow(0 12px 35px hsl(var(--primary)/0.6))",
            "drop-shadow(0 8px 25px hsl(var(--primary)/0.4))"
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
          rotateZ: 3,
          filter: "drop-shadow(0 15px 40px hsl(var(--primary)/0.7))"
        }}
      />
    </motion.div>
  );
};

export default BodifyLogo;