import { motion, AnimatePresence } from 'framer-motion';

const bodifyLogo = '/lovable-uploads/1ea08858-4d09-483d-bbca-c23dca759081.png';

interface SplashScreenProps {
  show: boolean;
}

const SplashScreen = ({ show }: SplashScreenProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.img
              src={bodifyLogo}
              alt="Bodify"
              className="w-24 h-24 object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="w-8 h-1 rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
