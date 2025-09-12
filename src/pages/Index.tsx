import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Scene3D } from '@/components/3D/Scene3D';
import { 
  ArrowRight, BookOpen, Users, Globe, Star, Check, MessageCircle, 
  Zap, Sparkles, Target, Award, TrendingUp, Lightbulb, Cpu, 
  Layers, Shield, Rocket, Brain, Eye, Waves, Sun, Moon, ChevronRight,
  Play, Pause, Volume2, Settings, Database, Network, Atom, Orbit
} from 'lucide-react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const Index = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const experienceRef = useRef(null);
  const testimonialRef = useRef(null);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.1 });
  const experienceInView = useInView(experienceRef, { once: true, amount: 0.2 });
  const testimonialInView = useInView(testimonialRef, { once: true, amount: 0.3 });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'Neural Learning Engine',
      description: 'Advanced AI that adapts to your unique learning patterns and cognitive preferences for maximum retention',
      gradient: 'from-violet-500 via-purple-500 to-indigo-600',
      delay: 0.1
    },
    {
      icon: Atom,
      title: 'Quantum 3D Environments',
      description: 'Immersive molecular-level simulations that transform abstract concepts into tangible experiences',
      gradient: 'from-amber-400 via-orange-500 to-red-500',
      delay: 0.2
    },
    {
      icon: Network,
      title: 'Distributed Knowledge Graph',
      description: 'Interconnected learning pathways that create synaptic connections between complex topics',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      delay: 0.3
    },
    {
      icon: Orbit,
      title: 'Gravitational Progress Tracking',
      description: 'Revolutionary orbit-based progress visualization that shows your learning trajectory in real-time',
      gradient: 'from-pink-400 via-rose-500 to-red-500',
      delay: 0.4
    },
    {
      icon: Database,
      title: 'Crystallized Memory Palace',
      description: 'Advanced memory techniques combined with 3D spatial reasoning for permanent knowledge retention',
      gradient: 'from-blue-400 via-indigo-500 to-purple-600',
      delay: 0.5
    },
    {
      icon: Shield,
      title: 'Fortress-Grade Security',
      description: 'Military-grade encryption protecting your intellectual journey with quantum-resistant algorithms',
      gradient: 'from-green-400 via-emerald-500 to-teal-600',
      delay: 0.6
    }
  ];

  const stats = [
    { number: '25,847', label: 'Neural Pathways Created', icon: Brain, color: 'text-violet-400' },
    { number: '99.94%', label: 'Synaptic Success Rate', icon: Target, color: 'text-amber-400' },
    { number: '∞', label: 'AI Processing Power', icon: Cpu, color: 'text-emerald-400' },
    { number: '247+', label: 'Dimensional Courses', icon: BookOpen, color: 'text-pink-400' }
  ];

  const testimonials = [
    {
      name: "Dr. Elena Vasquez",
      role: "Quantum Physics Researcher",
      content: "This platform didn't just teach me—it rewired how I think about learning itself. The 3D molecular simulations made quantum mechanics intuitive.",
      avatar: "EV",
      rating: 5
    },
    {
      name: "Marcus Chen",
      role: "AI Engineering Student", 
      content: "I've never experienced learning like this. The neural pathways visualization literally shows you how knowledge connects in your brain.",
      avatar: "MC",
      rating: 5
    },
    {
      name: "Sarah Al-Rashid",
      role: "Neuroscience Graduate",
      content: "The cognitive load management is revolutionary. I can learn complex concepts 5x faster without mental fatigue.",
      avatar: "SA",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Cosmic Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0" style={{ background: 'var(--gradient-cosmic)' }}></div>
        <div className="absolute inset-0 opacity-30" style={{ background: 'var(--gradient-mesh)' }}></div>
        
        {/* Floating Neural Particles */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              background: i % 4 === 0 ? 'var(--gradient-aurora)' : 
                         i % 4 === 1 ? 'hsl(262 83% 58%)' : 
                         i % 4 === 2 ? 'hsl(47 96% 53%)' : 
                         'hsl(322 85% 60%)'
            }}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Hero Section - Neural Architecture */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center hero-padding"
        style={{ y, opacity, scale, rotate }}
      >
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            {/* Revolutionary Content */}
            <motion.div 
              className="text-center lg:text-left space-y-12"
              initial={{ opacity: 0, x: -120 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -120 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.8 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="inline-flex items-center px-10 py-5 glass-morphism rounded-full text-base font-semibold text-primary neural-pulse border border-primary/20"
              >
                <Atom className="w-6 h-6 mr-4 neural-pulse" />
                Neural Architecture Platform
                <Sparkles className="w-5 h-5 ml-4 holographic-shimmer" />
              </motion.div>

              <motion.h1 
                className="text-8xl lg:text-9xl font-black leading-[0.9]"
                initial={{ opacity: 0, y: 80 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
                transition={{ duration: 1.4, delay: 0.5 }}
              >
                <span className="text-neural block mb-4">
                  TRANSCEND
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-accent">
                  REALITY
                </span>
              </motion.h1>

              <motion.p 
                className="text-3xl lg:text-4xl text-foreground/85 leading-relaxed max-w-3xl font-light tracking-wide"
                initial={{ opacity: 0, y: 60 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ duration: 1.2, delay: 0.8 }}
              >
                Enter a dimension where knowledge crystallizes into neural pathways, 
                <span className="text-gradient font-medium"> transforming consciousness </span>
                through quantum-engineered learning experiences.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-10 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 80 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
                transition={{ duration: 1.2, delay: 1.1 }}
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-primary via-accent to-primary text-2xl px-16 py-10 rounded-3xl font-bold shadow-aurora transition-all duration-700 hover:shadow-glow hover:scale-110 magnetic-hover"
                >
                  <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                    <span className="relative z-10 flex items-center">
                      <Rocket className="mr-4 h-7 w-7" />
                      INITIATE NEURAL LINK
                      <ChevronRight className="ml-4 h-7 w-7 group-hover:translate-x-3 transition-transform duration-500" />
                    </span>
                    <div className="absolute inset-0 holographic-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="glass-morphism border-primary/40 hover:bg-primary/15 text-2xl px-16 py-10 rounded-3xl font-bold transition-all duration-700 hover:border-primary/70 hover:shadow-glow hover:scale-105 interactive-glow"
                >
                  <Play className="mr-4 h-6 w-6" />
                  EXPERIENCE PREVIEW
                </Button>
              </motion.div>
            </motion.div>

            {/* Quantum 3D Scene */}
            <motion.div 
              className="relative h-[800px] w-full"
              initial={{ opacity: 0, x: 120, rotateY: 45 }}
              animate={heroInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 120, rotateY: 45 }}
              transition={{ duration: 1.6, delay: 0.6 }}
            >
              <div className="absolute inset-0 neural-card rounded-3xl backdrop-blur-sm border border-primary/30 shadow-neural overflow-hidden">
                <Scene3D className="w-full h-full rounded-3xl" />
                
                {/* Quantum UI Overlays */}
                <motion.div 
                  className="absolute -top-8 -right-8 neural-card rounded-3xl p-8 shadow-aurora border border-accent/30"
                  animate={{ 
                    y: [0, -20, 0],
                    rotateZ: [0, 2, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-5 h-5 bg-emerald-400 rounded-full neural-pulse shadow-glow"></div>
                    <span className="text-xl font-bold text-foreground/95">QUANTUM CORE ACTIVE</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute -bottom-8 -left-8 neural-card rounded-3xl p-8 shadow-aurora border border-primary/30"
                  animate={{ 
                    y: [0, 20, 0],
                    rotateZ: [0, -2, 0]
                  }}
                  transition={{ 
                    duration: 7, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <TrendingUp className="w-6 h-6 text-accent neural-pulse" />
                    <span className="text-xl font-bold text-foreground/95">NEURAL EFFICIENCY: 99.94%</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute top-1/2 -right-12 neural-card rounded-3xl p-6 shadow-glow border border-purple-400/30"
                  animate={{ 
                    x: [0, -15, 0],
                    rotateY: [0, 10, 0]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <Brain className="w-8 h-8 text-purple-400 neural-pulse" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Quantum Statistics Section */}
      <motion.section 
        ref={statsRef}
        className="section-padding relative z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-card/30 to-background/50"></div>
        <div className="container mx-auto relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-6xl font-black text-neural mb-6">
              QUANTUM METRICS
            </h2>
            <p className="text-2xl text-foreground/70 max-w-3xl mx-auto">
              Real-time neural performance indicators from our quantum learning matrix
            </p>
          </motion.div>
          
          <div className="bento-grid max-w-7xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="group relative"
                initial={{ opacity: 0, y: 150, rotateX: 90, scale: 0.5 }}
                animate={statsInView ? { 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  scale: 1
                } : { 
                  opacity: 0, 
                  y: 150, 
                  rotateX: 90,
                  scale: 0.5
                }}
                transition={{ 
                  duration: 1.2, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -20, 
                  scale: 1.08,
                  rotateY: 5
                }}
              >
                <div className="neural-card rounded-3xl p-12 text-center shadow-aurora border border-primary/30 overflow-hidden relative">
                  <div className="absolute inset-0 holographic-shimmer opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
                  
                  <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={statsInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 180 }}
                    transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                    className="mb-8 relative z-10"
                  >
                    <stat.icon className={`h-20 w-20 mx-auto ${stat.color} drop-shadow-lg neural-pulse`} />
                  </motion.div>
                  
                  <motion.div 
                    className="text-6xl font-black text-neural mb-6 relative z-10"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    transition={{ duration: 1.2, delay: index * 0.2 + 0.8 }}
                  >
                    {stat.number}
                  </motion.div>
                  
                  <div className="text-foreground/80 font-bold text-xl relative z-10">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Revolutionary Features Section */}
      <motion.section 
        ref={featuresRef}
        className="section-padding relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/60 to-card/40">
          <div className="absolute inset-0 opacity-20 neural-pulse" 
               style={{ background: 'var(--gradient-holographic)' }}></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            className="text-center mb-28 space-y-10"
            initial={{ opacity: 0, y: 80 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{ duration: 1.2 }}
          >
            <h2 className="text-7xl lg:text-8xl font-black text-neural leading-tight">
              NEURAL ARCHITECTURE
            </h2>
            <p className="text-3xl text-foreground/80 max-w-5xl mx-auto leading-relaxed font-light">
              Breakthrough technologies that reconstruct the fundamental nature of human learning 
              through quantum-engineered cognitive enhancement
            </p>
          </motion.div>
          
          <div className="bento-grid max-w-8xl mx-auto">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="group relative"
                initial={{ 
                  opacity: 0, 
                  y: 200, 
                  rotateY: 60,
                  scale: 0.6
                }}
                animate={featuresInView ? { 
                  opacity: 1, 
                  y: 0, 
                  rotateY: 0,
                  scale: 1
                } : { 
                  opacity: 0, 
                  y: 200, 
                  rotateY: 60,
                  scale: 0.6
                }}
                transition={{ 
                  duration: 1.4, 
                  delay: feature.delay,
                  type: "spring",
                  stiffness: 80
                }}
                whileHover={{ 
                  y: -25, 
                  rotateY: 8, 
                  scale: 1.06,
                  rotateX: 5
                }}
              >
                <div className="neural-card rounded-3xl p-12 h-full shadow-aurora border border-primary/30 overflow-hidden relative group-hover:border-accent/50 transition-all duration-700">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-700 rounded-3xl`}></div>
                  
                  <motion.div 
                    className="relative z-10"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={featuresInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 180 }}
                    transition={{ duration: 1, delay: feature.delay + 0.4 }}
                  >
                    <div className={`h-28 w-28 rounded-3xl bg-gradient-to-br ${feature.gradient} p-8 mb-10 shadow-glow group-hover:scale-125 transition-transform duration-500 neural-pulse relative overflow-hidden`}>
                      <feature.icon className="h-12 w-12 text-white drop-shadow-lg relative z-10" />
                      <div className="absolute inset-0 holographic-shimmer opacity-50"></div>
                    </div>
                  </motion.div>
                  
                  <h3 className="text-3xl font-black mb-8 text-foreground group-hover:text-neural transition-all duration-500 relative z-10">
                    {feature.title}
                  </h3>
                  
                  <p className="text-foreground/75 leading-relaxed text-lg group-hover:text-foreground/90 transition-colors duration-500 relative z-10">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Immersive Experience Section */}
      <motion.section 
        ref={experienceRef}
        className="section-padding relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/70 to-card/50">
          <div className="absolute inset-0 opacity-30 cosmic-drift" 
               style={{ background: 'var(--gradient-neural)' }}></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 items-center">
            <motion.div 
              className="space-y-12"
              initial={{ opacity: 0, x: -150 }}
              animate={experienceInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -150 }}
              transition={{ duration: 1.4 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="inline-flex items-center px-10 py-5 glass-morphism rounded-full text-lg font-bold text-accent border border-accent/20 neural-pulse"
              >
                <Eye className="w-6 h-6 mr-4" />
                CONSCIOUSNESS EXPANSION PROTOCOL
                <Atom className="w-5 h-5 ml-4 floating-orb" />
              </motion.div>

              <h2 className="text-6xl lg:text-7xl font-black text-foreground leading-tight">
                DIVE INTO THE
                <br />
                <span className="text-neural">
                  NEURAL MATRIX
                </span>
              </h2>
              
              <p className="text-3xl text-foreground/85 leading-relaxed font-light">
                Our quantum-engineered learning environment doesn't just teach—it fundamentally rewires 
                how your consciousness processes and retains information, creating permanent neural pathways 
                through dimensional knowledge architecture.
              </p>

              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary via-accent to-primary text-2xl px-16 py-10 rounded-3xl font-bold shadow-aurora transition-all duration-700 hover:shadow-glow hover:scale-110 magnetic-hover"
              >
                <Brain className="mr-4 h-7 w-7" />
                INITIATE NEURAL INTERFACE
                <ArrowRight className="ml-4 h-7 w-7" />
              </Button>
            </motion.div>

            <motion.div 
              className="relative h-[700px] rounded-3xl overflow-hidden"
              initial={{ opacity: 0, x: 150, scale: 0.8 }}
              animate={experienceInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 150, scale: 0.8 }}
              transition={{ duration: 1.6, delay: 0.4 }}
            >
              <div className="absolute inset-0 neural-card rounded-3xl border border-primary/30 shadow-neural overflow-hidden">
                <div className="w-full h-full rounded-3xl neural-card flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 holographic-shimmer opacity-20"></div>
                  
                  <div className="text-center space-y-8 relative z-10">
                    <motion.div 
                      className="relative"
                      animate={{ 
                        rotateY: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 12, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                    >
                      <div className="w-40 h-40 bg-gradient-to-br from-primary via-accent to-purple-600 rounded-full mx-auto neural-pulse shadow-aurora"></div>
                      <motion.div 
                        className="absolute inset-0 w-40 h-40 border-4 border-primary/40 rounded-full mx-auto"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div 
                        className="absolute inset-4 border-2 border-accent/60 rounded-full mx-auto"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                    
                    <h3 className="text-4xl font-black text-neural">
                      NEURAL PREVIEW MATRIX
                    </h3>
                    
                    <p className="text-foreground/80 text-xl">
                      Experience consciousness expansion in real-time
                    </p>
                    
                    <Button 
                      variant="outline" 
                      className="glass-morphism border-primary/40 hover:bg-primary/15 text-lg px-12 py-6 rounded-3xl font-bold"
                    >
                      <Play className="mr-3 h-5 w-5" />
                      ACTIVATE PREVIEW
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonial Section */}
      <motion.section 
        ref={testimonialRef}
        className="section-padding relative"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-card/40 to-background">
          <div className="absolute inset-0 opacity-20" 
               style={{ background: 'var(--gradient-aurora)' }}></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            animate={testimonialInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-6xl font-black text-neural mb-8">
              NEURAL TESTIMONIALS
            </h2>
            <p className="text-2xl text-foreground/70 max-w-4xl mx-auto">
              Consciousness expansion testimonials from our neural pioneers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="neural-card rounded-3xl p-10 shadow-aurora border border-primary/30 relative overflow-hidden"
                initial={{ opacity: 0, y: 100, rotateY: 45 }}
                animate={testimonialInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 100, rotateY: 45 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="absolute inset-0 holographic-shimmer opacity-0 hover:opacity-10 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-foreground">{testimonial.name}</h4>
                      <p className="text-primary font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-accent fill-current" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-card/60 to-background">
          <div className="absolute inset-0 opacity-40 aurora-dance" 
               style={{ background: 'var(--gradient-neural)' }}></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            className="text-center space-y-16"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-7xl lg:text-8xl font-black text-neural leading-tight">
              READY TO TRANSCEND
              <br />
              <span className="text-gradient">
                HUMAN LIMITATIONS?
              </span>
            </h2>
            
            <p className="text-3xl text-foreground/85 max-w-5xl mx-auto leading-relaxed font-light">
              Join the neural revolution. Experience consciousness expansion. 
              Transform your reality through quantum-engineered learning architecture.
            </p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-12 justify-center"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button 
                asChild 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-primary via-accent to-primary text-3xl px-20 py-12 rounded-3xl font-black shadow-aurora transition-all duration-700 hover:shadow-glow hover:scale-115 magnetic-hover"
              >
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  <span className="relative z-10 flex items-center">
                    <Rocket className="mr-6 h-8 w-8" />
                    INITIATE CONSCIOUSNESS EXPANSION
                    <Atom className="ml-6 h-8 w-8 group-hover:rotate-180 transition-transform duration-700" />
                  </span>
                  <div className="absolute inset-0 holographic-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="glass-morphism border-primary/50 hover:bg-primary/20 text-3xl px-20 py-12 rounded-3xl font-black transition-all duration-700 hover:border-primary/70 hover:shadow-glow hover:scale-105"
              >
                <MessageCircle className="mr-6 h-7 w-7" />
                CONTACT NEURAL ARCHITECTS
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;