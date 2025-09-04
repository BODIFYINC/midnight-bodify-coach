import { motion } from 'framer-motion';
import BodifyLogo from '@/components/BodifyLogo';

export default function TrendsShowcase() {
  return (
    <section aria-label="Brand Identity" className="py-24 bg-gradient-to-b from-bodify-dark to-bodify-darker">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="relative flex flex-col items-center text-center">
          <div aria-hidden className="absolute -top-10 h-64 w-64 md:h-80 md:w-80 rounded-full bg-bodify-gradient blur-3xl opacity-20 animate-pulse" />

          {/* Beautiful Brand Element */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
            className="relative z-10"
          >
            <motion.div
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                scale: [1, 1.02, 1]
              }}
              transition={{
                backgroundPosition: { duration: 8, repeat: Infinity },
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%_100%] mb-4"
            >
              FITNESS REDEFINED
            </motion.div>
            
            {/* Glowing underline */}
            <motion.div
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scaleX: [0.8, 1, 0.8]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full blur-sm"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35 }}
            viewport={{ once: true }}
            className="mt-6 text-white/80 text-lg md:text-xl max-w-2xl"
          >
            Your body, your plan — powered by AI.
          </motion.p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['AI Coach','Nutrition','Training','Recovery','Progress'].map((t) => (
              <span key={t} className="px-4 py-2 rounded-full bg-bodify-gradient text-black/90 font-semibold shadow hover-scale">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
