import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BodifyLogo from '@/components/BodifyLogo';
import CountUp from 'react-countup';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            x: [0, 10, 0],
            rotate: [0, 360, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-1/4 w-16 h-16 opacity-10"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-primary to-secondary" />
        </motion.div>
        <motion.div
          animate={{ 
            y: [20, -20, 20],
            x: [0, -10, 0],
            rotate: [0, -180, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 right-1/4 w-12 h-12 opacity-15"
        >
          <div className="w-full h-full bg-gradient-to-r from-secondary to-primary transform rotate-45" />
        </motion.div>
        <motion.div
          animate={{ 
            y: [-15, 15, -15],
            x: [10, -10, 10],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-20 w-8 h-8 opacity-20"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-primary to-secondary" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center">
          {/* Beautiful Hero Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0
            }}
            transition={{ 
              duration: 1.2, 
              ease: "easeOut"
            }}
            className="mb-8 relative"
          >
            <motion.div
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                scale: [1, 1.02, 1]
              }}
              transition={{
                backgroundPosition: { duration: 6, repeat: Infinity },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%_100%]"
              style={{
                textShadow: "0 0 60px hsl(var(--primary) / 0.3)"
              }}
            >
              BODIFY
            </motion.div>
            
            {/* Floating energy particles */}
            <motion.div
              animate={{ 
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="absolute -top-6 -right-8 w-4 h-4 bg-gradient-to-r from-primary to-secondary rounded-full blur-sm"
            />
            <motion.div
              animate={{ 
                y: [15, -15, 15],
                x: [8, -8, 8],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-6 w-3 h-3 bg-gradient-to-r from-secondary to-accent rounded-full blur-sm"
            />
            <motion.div
              animate={{ 
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
              className="absolute top-1/2 -right-12 w-2 h-2 bg-gradient-to-r from-accent to-primary rounded-full"
            />
          </motion.div>

          {/* Hero headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Transform Your Body with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              AI Precision
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto"
          >
            Revolutionary AI-powered fitness coaching that adapts to your unique body, goals, and lifestyle. 
            Experience personalized workouts, nutrition plans, and real-time guidance that evolves with you.
          </motion.p>
          
          {/* Enhanced Tagline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative mb-12"
          >
            <motion.div
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                backgroundPosition: { duration: 4, repeat: Infinity },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] relative"
              style={{
                textShadow: "0 0 30px hsl(var(--primary) / 0.4)"
              }}
            >
              BODIFY YOUR BODY
              
              {/* Floating particles around text */}
              <motion.div
                animate={{ 
                  y: [-10, 10, -10],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-4 -right-4 w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full"
              />
              <motion.div
                animate={{ 
                  y: [10, -10, 10],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-2 -left-2 w-2 h-2 bg-gradient-to-r from-secondary to-primary rounded-full"
              />
            </motion.div>
            
            {/* Enhanced glowing underline with pulse */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"
            >
              <motion.div
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-full h-full bg-gradient-to-r from-primary to-secondary rounded-full blur-sm"
              />
              
              {/* Additional glow layers */}
              <motion.div
                animate={{ 
                  opacity: [0.2, 0.8, 0.2],
                  scaleY: [1, 2, 1]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full blur-md"
              />
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <Link to="/get-started">Start Your Journey</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
              <Link to="/about">Learn More</Link>
            </Button>
          </motion.div>

          {/* Key stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { number: 10000, suffix: "K+", label: "Users Transformed" },
              { number: 95, suffix: "%", label: "Goal Achievement Rate" },
              { number: 24, suffix: "/7", label: "AI Coach Available" }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ 
                  scale: 1.08,
                  y: -5,
                  filter: "drop-shadow(0 10px 30px hsl(var(--primary) / 0.4))"
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-card/40 via-card/30 to-transparent backdrop-blur-md border border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden"
              >
                {/* Animated background glow */}
                <motion.div
                  animate={{ 
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 0.5
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl"
                />
                
                {/* Floating particles */}
                <motion.div
                  animate={{ 
                    y: [-10, 10, -10],
                    x: [-5, 5, -5],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    delay: i * 0.3
                  }}
                  className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="text-4xl md:text-5xl font-black mb-3"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.2, duration: 0.6 }}
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%_100%] animate-[gradient_3s_ease-in-out_infinite]">
                      <CountUp
                        start={0}
                        end={stat.number}
                        duration={2.5}
                        delay={1 + i * 0.3}
                        separator=","
                        useEasing={true}
                      />
                      {stat.suffix}
                    </span>
                  </motion.div>
                  
                  <motion.div 
                    className="text-muted-foreground font-medium tracking-wide"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.2, duration: 0.5 }}
                  >
                    {stat.label}
                  </motion.div>
                </div>
                
                {/* Gradient border animation */}
                <motion.div
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}