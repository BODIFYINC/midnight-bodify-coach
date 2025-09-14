import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Scene3D } from '@/components/3D/Scene3D';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { 
  BookOpen, Users, Globe, TrendingUp, Brain, 
  Zap, Target, Award, Phone, Mail, ArrowRight, 
  MessageCircle, Sparkles, Layers, CheckCircle
} from 'lucide-react';

export default function Index() {
  // SEO
  useEffect(() => {
    document.title = 'The Future of English Learning in Libya — Libya-Can';
    const meta = document.querySelector('meta[name="description"]');
    const content = 'Experience the future of English learning in Libya. Modern lessons, interactive quizzes, real-time progress tracking. Affordable for everyone.';
    if (meta) meta.setAttribute('content', content);
    else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  // Advanced scroll mechanics
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [mount3D, setMount3D] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Cinematic parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  const backgroundY1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const backgroundY3 = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);

  // Smooth spring animations
  const springConfig = { stiffness: 50, damping: 20 };
  const x = useSpring(mousePosition.x, springConfig);
  const y = useSpring(mousePosition.y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setMount3D(true);
      });
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Cinematic background with depth
  const CinematicBackground = () => (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* Base futuristic gradient */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
      
      {/* Moving depth layers */}
      <motion.div 
        className="absolute inset-0 opacity-40"
        style={{ 
          background: 'var(--gradient-neon)',
          y: backgroundY1
        }}
      />
      
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ 
          background: 'var(--gradient-flow)',
          y: backgroundY2
        }}
      />
      
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ 
          background: 'var(--gradient-immersive)',
          y: backgroundY3
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>
    </div>
  );

  const whyLearnFeatures = [
    {
      icon: Globe,
      title: 'Global Opportunities',
      description: 'Open doors to international careers, higher education, and global connections.',
      gradient: '--gradient-neon'
    },
    {
      icon: Brain,
      title: 'Cognitive Growth',
      description: 'Enhance your brain power and critical thinking through bilingual development.',
      gradient: '--gradient-flow'
    },
    {
      icon: TrendingUp,
      title: 'Career Advancement',
      description: 'Increase your earning potential and professional opportunities in Libya and beyond.',
      gradient: '--gradient-future'
    }
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Modern Lessons',
      description: 'Interactive, multimedia-rich lessons designed specifically for Libyan learners.',
      color: 'from-primary to-neon-cyan',
      gradient: '--gradient-neon'
    },
    {
      icon: Target,
      title: 'Interactive Quizzes',
      description: 'Engaging assessments that adapt to your learning style and track your progress.',
      color: 'from-neon-cyan to-accent',
      gradient: '--gradient-flow'
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Progress Tracking',
      description: 'Monitor your improvement with detailed analytics and personalized insights.',
      color: 'from-accent to-neon-purple',
      gradient: '--gradient-future'
    },
    {
      icon: Users,
      title: 'Affordable for Everyone',
      description: 'Quality English education accessible to all Libyan students and professionals.',
      color: 'from-neon-purple to-primary',
      gradient: '--gradient-immersive'
    }
  ];

  const showcaseItems = [
    {
      title: 'Conversation Practice',
      description: 'Real-world scenarios designed for Libyan culture and business needs',
      visual: '💬',
      glow: 'from-primary to-neon-cyan'
    },
    {
      title: 'Grammar Mastery',
      description: 'Visual grammar lessons that make complex rules simple and memorable',
      visual: '📚',
      glow: 'from-neon-cyan to-accent'
    },
    {
      title: 'Pronunciation Coach',
      description: 'AI-powered feedback to perfect your accent and speaking confidence',
      visual: '🎤',
      glow: 'from-accent to-neon-purple'
    },
    {
      title: 'Cultural Bridge',
      description: 'Learn English while celebrating Libyan heritage and traditions',
      visual: '🌍',
      glow: 'from-neon-purple to-primary'
    },
    {
      title: 'Business English',
      description: 'Professional communication skills for the modern Libyan workplace',
      visual: '💼',
      glow: 'from-primary to-accent'
    }
  ];

  const stats = [
    { number: '5000+', label: 'Libyan Students', icon: Users, color: 'primary' },
    { number: '95%', label: 'Success Rate', icon: Target, color: 'accent' },
    { number: '24/7', label: 'Online Access', icon: Globe, color: 'neon-cyan' },
    { number: '100%', label: 'Satisfaction', icon: Award, color: 'neon-purple' }
  ];

  return (
    <>
      <CinematicBackground />
      
      <main className="relative">
        {/* Hero Section */}
        <section ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden">
          <motion.div 
            className="absolute inset-0"
            style={{ 
              background: 'var(--gradient-future)',
              opacity: heroOpacity,
              scale: heroScale
            }}
          />
          
          <div className="container relative z-10 grid lg:grid-cols-2 gap-20 items-center py-20">
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="space-y-12"
              style={{ x, y }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="inline-flex items-center px-8 py-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 text-sm font-medium"
                style={{ boxShadow: 'var(--shadow-neon)' }}
              >
                <Sparkles className="w-5 h-5 mr-3 text-primary animate-pulse" />
                🇱🇾 Made for Libya
                <motion.div 
                  className="ml-3 w-2 h-2 bg-primary rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tight">
                <motion.span 
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-neon-cyan to-accent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  The Future
                </motion.span>
                <motion.span 
                  className="block text-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  of English
                </motion.span>
                <motion.span 
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-neon-purple to-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  Learning
                </motion.span>
                <motion.span 
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-neon-cyan"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                >
                  in Libya
                </motion.span>
              </h1>

              <motion.p 
                className="text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                Transform your future with immersive English education designed specifically for Libyan learners. 
                Professional, interactive, and affordable.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="group px-12 py-6 text-xl rounded-3xl bg-gradient-to-r from-primary to-accent hover:shadow-neon transition-all duration-700 transform hover:scale-105 relative overflow-hidden"
                >
                  <Link to="/register">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    Get Started
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 100, rotateY: -20 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="relative h-[700px] lg:h-[800px] w-full"
            >
              <div className="absolute inset-0 rounded-[3rem] overflow-hidden" style={{ boxShadow: 'var(--shadow-immersive)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl rounded-[3rem] border border-white/20" />
                {mount3D && <Scene3D className="w-full h-full rounded-[3rem]" />}
                
                {/* Floating UI Elements */}
                <motion.div 
                  className="absolute top-8 right-8 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30"
                  animate={{ 
                    y: [0, -15, 0],
                    rotateY: [0, 5, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ boxShadow: 'var(--shadow-neon)' }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-3 h-3 bg-primary rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-lg font-bold">Learning Active</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute bottom-8 left-8 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30"
                  animate={{ 
                    y: [0, 15, 0],
                    rotateY: [0, -5, 0]
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  style={{ boxShadow: 'var(--shadow-neon)' }}
                >
                  <div className="flex items-center space-x-3">
                    <Brain className="w-5 h-5 text-accent" />
                    <span className="text-lg font-bold">Progress: 87%</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute top-1/2 left-8 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/30"
                  animate={{ 
                    x: [0, 10, 0],
                    rotateX: [0, 10, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-neon-cyan" />
                    <span className="text-sm font-medium">Libya Ready</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About / Why Learn Section */}
        <section className="relative py-32">
          <motion.div 
            className="absolute inset-0 opacity-20"
            style={{ background: 'var(--gradient-neon)' }}
          />
          
          <div className="container relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Why Learn English?
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                Unlock limitless opportunities in Libya and beyond with the global language of success
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12 mb-20">
              {whyLearnFeatures.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 60, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ 
                    y: -10, 
                    rotateX: 5, 
                    scale: 1.02
                  }}
                  className="group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 text-center"
                  style={{ boxShadow: 'var(--shadow-elegant)' }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-3xl"
                    style={{ background: `var(${feature.gradient})` }}
                  />
                  
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-primary to-accent mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-32">
          <motion.div 
            className="absolute inset-0 opacity-30"
            style={{ background: 'var(--gradient-future)' }}
          />
          
          <div className="container relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Our Features
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                Modern technology meets proven teaching methods for maximum learning efficiency
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 60, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  whileHover={{ 
                    y: -10, 
                    rotateX: 5, 
                    scale: 1.02
                  }}
                  className="group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 relative overflow-hidden"
                  style={{ 
                    boxShadow: 'var(--shadow-neon)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-3xl"
                    style={{ background: `var(${feature.gradient})` }}
                  />
                  
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 relative z-10`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 relative z-10">{feature.title}</h3>
                  <p className="text-foreground/70 leading-relaxed relative z-10">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* Stats Section - Floating Numbers */}
        <section className="relative py-32">
          <div className="container relative z-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotateY: 10,
                    rotateX: 10
                  }}
                  className="text-center p-12 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/20 group"
                  style={{ 
                    boxShadow: 'var(--shadow-neon)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <motion.div
                    animate={{ rotateZ: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <stat.icon className={`w-16 h-16 mx-auto mb-6 text-${stat.color}`} />
                  </motion.div>
                  <div className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-${stat.color} to-accent mb-4`}>
                    {stat.number}
                  </div>
                  <div className="text-foreground/70 font-bold text-lg">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section - Futuristic Form */}
        <section className="relative py-40">
          <motion.div 
            className="absolute inset-0 opacity-40"
            style={{ background: 'var(--gradient-flow)' }}
          />
          
          <div className="container relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2 }}
              className="text-center mb-32"
            >
              <h2 className="text-6xl md:text-7xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Ready to Transform?
              </h2>
              <p className="text-2xl text-foreground/70 max-w-3xl mx-auto">
                Join the future of English learning today
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1 }}
              className="max-w-2xl mx-auto"
            >
              <div className="p-12 rounded-[3rem] bg-white/5 backdrop-blur-xl border border-white/20" style={{ boxShadow: 'var(--shadow-immersive)' }}>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="w-full p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 text-lg placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    />
                    <textarea 
                      placeholder="Tell us about your learning goals..." 
                      rows={4}
                      className="w-full p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 text-lg placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                    />
                  </div>
                  
                  <Button 
                    className="w-full py-8 text-2xl rounded-2xl bg-gradient-to-r from-primary to-accent hover:shadow-neon transition-all duration-700 group"
                  >
                    <MessageCircle className="mr-4 h-8 w-8" />
                    Start Your Journey
                    <motion.div
                      className="ml-4"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="h-6 w-6" />
                    </motion.div>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer - Seamless End */}
        <footer className="relative py-20 border-t border-white/10">
          <div className="container">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-8"
              >
                <BookOpen className="w-16 h-16 text-primary" />
              </motion.div>
              <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Libya-Can
              </h3>
              <p className="text-foreground/60 text-lg">
                The future of English learning, today.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}