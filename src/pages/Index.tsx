import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Scene3D } from '@/components/3D/Scene3D';
import { 
  ArrowRight, BookOpen, Users, Globe, Star, Check, MessageCircle, 
  Zap, Sparkles, Target, Award, TrendingUp, Lightbulb, Cpu, 
  Layers, Shield, Rocket, Brain, Eye, Waves, Sun, Moon
} from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const Index = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const experienceRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.1 });
  const experienceInView = useInView(experienceRef, { once: true, amount: 0.2 });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Adaptive AI technology that personalizes your learning journey based on your pace and style',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      icon: Eye,
      title: '3D Immersive Experience',
      description: 'Step into virtual learning environments that make complex concepts tangible and engaging',
      gradient: 'from-purple-500 to-pink-400'
    },
    {
      icon: Waves,
      title: 'Interactive Simulations',
      description: 'Practice real-world scenarios in safe, virtual spaces with instant feedback',
      gradient: 'from-amber-500 to-orange-400'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Enterprise-grade security ensuring your learning data stays protected and confidential',
      gradient: 'from-emerald-500 to-teal-400'
    },
    {
      icon: Layers,
      title: 'Modular Learning Paths',
      description: 'Bite-sized lessons that build upon each other for comprehensive skill mastery',
      gradient: 'from-indigo-500 to-blue-400'
    },
    {
      icon: Rocket,
      title: 'Future-Ready Skills',
      description: 'Learn cutting-edge skills that prepare you for tomorrow\'s opportunities',
      gradient: 'from-rose-500 to-pink-400'
    }
  ];

  const stats = [
    { number: '15K+', label: 'Active Learners', icon: Users, color: 'text-blue-400' },
    { number: '99.5%', label: 'Success Rate', icon: Target, color: 'text-amber-400' },
    { number: '24/7', label: 'AI Support', icon: Cpu, color: 'text-purple-400' },
    { number: '100+', label: 'Learning Paths', icon: BookOpen, color: 'text-emerald-400' }
  ];

  const immersiveFeatures = [
    {
      title: 'Virtual Reality Classrooms',
      description: 'Experience learning in photorealistic 3D environments that adapt to your needs',
      icon: Globe,
      color: 'from-blue-400 to-cyan-300'
    },
    {
      title: 'AI Learning Assistant',
      description: 'Personal AI mentors that guide you through complex concepts with patience',
      icon: Brain,
      color: 'from-purple-400 to-pink-300'
    },
    {
      title: 'Real-Time Collaboration',
      description: 'Connect with learners worldwide in shared virtual spaces and projects',
      icon: Users,
      color: 'from-emerald-400 to-teal-300'
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section - Ocean Sunset Design */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center"
        style={{ y, opacity, scale }}
      >
        {/* Dynamic Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-secondary">
            <div className="absolute inset-0 opacity-40" 
                 style={{ background: 'var(--gradient-mesh)' }}></div>
          </div>
          {/* Aurora overlay */}
          <div className="absolute inset-0 opacity-20" 
               style={{ background: 'var(--gradient-aurora)' }}></div>
        </div>
        
        {/* Floating Ocean Particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-60"
              style={{
                width: Math.random() * 8 + 4,
                height: Math.random() * 8 + 4,
                background: i % 3 === 0 ? 'var(--gradient-ocean)' : 
                           i % 3 === 1 ? 'var(--gradient-sunset)' : 
                           'var(--gradient-aurora)'
              }}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight 
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center min-h-[90vh]">
            {/* Content */}
            <motion.div 
              className="text-center lg:text-left space-y-10"
              initial={{ opacity: 0, x: -100 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center px-8 py-4 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full text-sm font-medium text-primary glow-effect"
              >
                <Sun className="w-5 h-5 mr-3 animate-pulse" />
                Next-Generation Learning Platform
                <Sparkles className="w-4 h-4 ml-3" />
              </motion.div>

              <motion.h1 
                className="text-7xl lg:text-8xl font-bold leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-300% animate-gradient">
                  Learn Beyond
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent bg-300% animate-gradient">
                  Reality
                </span>
              </motion.h1>

              <motion.p 
                className="text-2xl lg:text-3xl text-foreground/80 leading-relaxed max-w-2xl font-light"
                initial={{ opacity: 0, y: 50 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Dive into the future of education with AI-powered 3D learning experiences that flow like ocean waves and illuminate like sunset skies.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 50 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-xl px-12 py-8 rounded-3xl font-semibold shadow-cyber transition-all duration-500 hover:shadow-aurora hover:scale-105 float-3d"
                >
                  <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                    <span className="relative z-10 flex items-center">
                      Start Your Journey 
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="backdrop-blur-sm bg-card/40 border-primary/30 hover:bg-primary/10 text-xl px-12 py-8 rounded-3xl font-semibold transition-all duration-500 hover:border-primary/50 hover:shadow-glass hover:scale-105"
                >
                  <Eye className="mr-3 h-5 w-5" />
                  Explore Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced 3D Scene */}
            <motion.div 
              className="relative h-[700px] w-full"
              initial={{ opacity: 0, x: 100 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-3xl backdrop-blur-sm border border-primary/20 shadow-3d float-3d">
                <Scene3D className="w-full h-full rounded-3xl" />
              </div>
              
              {/* Enhanced Floating UI Elements */}
              <motion.div 
                className="absolute -top-6 -right-6 bg-card/90 backdrop-blur-sm border border-primary/30 rounded-3xl p-6 shadow-glass glow-effect"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse shadow-neon"></div>
                  <span className="text-lg font-semibold text-foreground/90">AI Active</span>
                </div>
              </motion.div>

              <motion.div 
                className="absolute -bottom-6 -left-6 bg-card/90 backdrop-blur-sm border border-accent/30 rounded-3xl p-6 shadow-glass"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <span className="text-lg font-semibold text-foreground/90">99.5% Success</span>
                </div>
              </motion.div>

              <motion.div 
                className="absolute top-1/2 -left-8 bg-card/80 backdrop-blur-sm border border-purple-400/30 rounded-3xl p-4 shadow-glass"
                animate={{ x: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Waves className="w-6 h-6 text-purple-400" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Statistics Section - Enhanced Floating Cards */}
      <motion.section 
        ref={statsRef}
        className="py-32 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="relative group"
                initial={{ opacity: 0, y: 120, rotateX: 90 }}
                animate={statsInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 120, rotateX: 90 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                whileHover={{ y: -15, scale: 1.08 }}
              >
                <div className="bg-card/60 backdrop-blur-sm border border-primary/30 rounded-3xl p-10 text-center shadow-glass group-hover:shadow-aurora transition-all duration-500 card-3d">
                  <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={statsInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 180 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                    className="mb-6"
                  >
                    <stat.icon className={`h-16 w-16 mx-auto ${stat.color} drop-shadow-lg`} />
                  </motion.div>
                  <motion.div 
                    className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4"
                    initial={{ opacity: 0 }}
                    animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-foreground/80 font-semibold text-lg">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section - Revolutionary 3D Cards */}
      <motion.section 
        ref={featuresRef}
        className="py-32 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/40 to-card/60">
          <div className="absolute inset-0 opacity-30" 
               style={{ background: 'var(--gradient-hologram)' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-24 space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-300% animate-gradient">
              Revolutionary Features
            </h2>
            <p className="text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed font-light">
              Experience the next evolution of learning with cutting-edge technology that flows like ocean currents and shines like sunset light
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="group relative"
                initial={{ opacity: 0, y: 120, rotateY: 45 }}
                animate={featuresInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 120, rotateY: 45 }}
                transition={{ duration: 1.2, delay: index * 0.2 }}
                whileHover={{ y: -20, rotateY: 10, scale: 1.05 }}
              >
                <div className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-primary/30 rounded-3xl p-10 h-full shadow-glass group-hover:shadow-aurora transition-all duration-700 group-hover:border-primary/50 card-3d">
                  {/* Dynamic gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-700 rounded-3xl`}></div>
                  
                  <motion.div 
                    className="relative z-10"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={featuresInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 180 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                  >
                    <div className={`h-24 w-24 rounded-3xl bg-gradient-to-br ${feature.gradient} p-6 mb-8 shadow-neon group-hover:scale-115 transition-transform duration-500 glow-effect`}>
                      <feature.icon className="h-12 w-12 text-white drop-shadow-lg" />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold mb-6 text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed text-lg group-hover:text-foreground/90 transition-colors duration-500">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Immersive Experience Section - Ocean Waves Design */}
      <motion.section 
        ref={experienceRef}
        className="py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/60 to-card/40">
          <div className="absolute inset-0 opacity-40" 
               style={{ background: 'var(--gradient-ocean)' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              className="space-y-10"
              initial={{ opacity: 0, x: -100 }}
              animate={experienceInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center px-8 py-4 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full text-sm font-medium text-accent glow-effect"
              >
                <Eye className="w-5 h-5 mr-3" />
                Immersive Learning Experience
                <Waves className="w-4 h-4 ml-3" />
              </motion.div>

              <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Dive Into The
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent bg-300% animate-gradient">
                  Ocean of Knowledge
                </span>
              </h2>
              
              <p className="text-2xl text-foreground/80 leading-relaxed font-light">
                Our revolutionary 3D learning environment transforms abstract concepts into flowing, 
                immersive experiences that ebb and flow with your natural learning rhythm.
              </p>

              <div className="space-y-8">
                {immersiveFeatures.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-6 group cursor-pointer"
                    initial={{ opacity: 0, x: -50 }}
                    animate={experienceInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                    whileHover={{ x: 10 }}
                  >
                    <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${item.color} p-4 shadow-neon group-hover:scale-110 transition-transform duration-300 glow-effect`}>
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-foreground mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all duration-300">
                        {item.title}
                      </h4>
                      <p className="text-foreground/70 leading-relaxed text-lg group-hover:text-foreground/90 transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="relative h-[600px] rounded-3xl overflow-hidden"
              initial={{ opacity: 0, x: 100 }}
              animate={experienceInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-purple-400/30 rounded-3xl backdrop-blur-sm border border-primary/30 shadow-3d">
                <div className="w-full h-full rounded-3xl bg-gradient-to-br from-card/40 to-background/60 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full mx-auto glow-effect animate-pulse"></div>
                      <motion.div 
                        className="absolute inset-0 w-32 h-32 border-4 border-primary/30 rounded-full mx-auto"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                      Interactive Preview
                    </h3>
                    <p className="text-foreground/70 text-lg">
                      Coming Soon: Live 3D Demo
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section - Sunset Finale */}
      <motion.section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-card/50 to-background">
          <div className="absolute inset-0 opacity-50" 
               style={{ background: 'var(--gradient-sunset)' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center space-y-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-300% animate-gradient leading-tight">
              Ready to Transform
              <br />
              Your Learning Journey?
            </h2>
            
            <p className="text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed font-light">
              Join thousands of learners who are already experiencing the future of education.
              Your journey into immersive learning starts with a single click.
            </p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-8 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button 
                asChild 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-2xl px-16 py-10 rounded-3xl font-bold shadow-aurora transition-all duration-500 hover:shadow-neon hover:scale-110 float-3d"
              >
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  <span className="relative z-10 flex items-center">
                    Begin Your Adventure
                    <Rocket className="ml-4 h-7 w-7 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="backdrop-blur-sm bg-card/40 border-primary/40 hover:bg-primary/15 text-2xl px-16 py-10 rounded-3xl font-bold transition-all duration-500 hover:border-primary/60 hover:shadow-glass hover:scale-105"
              >
                <MessageCircle className="mr-4 h-6 w-6" />
                Contact Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;