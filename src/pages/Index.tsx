import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Scene3D } from '@/components/3D/Scene3D';
import { 
  ArrowRight, BookOpen, Users, Globe, Star, Check, MessageCircle, 
  Zap, Sparkles, Target, Award, TrendingUp, Lightbulb, Cpu, 
  Layers, Shield, Rocket, Brain, Eye
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
      description: 'Adaptive AI technology that personalizes your learning journey in real-time',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Eye,
      title: '3D Immersive Experience',
      description: 'Step into virtual learning environments that make education come alive',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Progress',
      description: 'Accelerated learning paths designed to maximize retention and understanding',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Enterprise-grade security ensuring your learning data stays protected',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Layers,
      title: 'Modular Content',
      description: 'Bite-sized lessons that build upon each other for comprehensive mastery',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Rocket,
      title: 'Future-Ready Skills',
      description: 'Learn skills that prepare you for the next generation of opportunities',
      gradient: 'from-red-500 to-pink-500'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Learners', icon: Users, color: 'text-purple-400' },
    { number: '99.2%', label: 'Success Rate', icon: Target, color: 'text-cyan-400' },
    { number: '24/7', label: 'AI Support', icon: Cpu, color: 'text-pink-400' },
    { number: '50+', label: 'Learning Paths', icon: BookOpen, color: 'text-green-400' }
  ];

  const immersiveFeatures = [
    {
      title: 'Virtual Reality Classrooms',
      description: 'Experience learning in photorealistic 3D environments',
      icon: Globe,
      color: 'from-purple-400 to-pink-400'
    },
    {
      title: 'Holographic Tutors',
      description: 'AI-powered mentors that guide you through complex concepts',
      icon: Brain,
      color: 'from-blue-400 to-cyan-400'
    },
    {
      title: 'Interactive Simulations',
      description: 'Practice real-world scenarios in safe, virtual spaces',
      icon: Layers,
      color: 'from-green-400 to-emerald-400'
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section - Futuristic 3D Design */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center"
        style={{ y, opacity, scale }}
      >
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-secondary">
          <div className="absolute inset-0 opacity-30" 
               style={{ background: 'var(--gradient-mesh)' }}></div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight 
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[90vh]">
            {/* Content */}
            <motion.div 
              className="text-center lg:text-left space-y-8"
              initial={{ opacity: 0, x: -100 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center px-6 py-3 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full text-sm font-medium text-primary"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Next-Generation Learning Platform
              </motion.div>

              <motion.h1 
                className="text-6xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-300% animate-gradient">
                  Learn Beyond
                </span>
                <br />
                <span className="text-foreground/90">
                  Reality
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl lg:text-2xl text-foreground/70 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 50 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Immerse yourself in the future of education with AI-powered 3D learning experiences that adapt to your pace and style.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 50 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-lg px-8 py-6 rounded-2xl font-semibold shadow-cyber transition-all duration-300 hover:shadow-neon hover:scale-105"
                >
                  <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                    <span className="relative z-10 flex items-center">
                      Start Your Journey 
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="backdrop-blur-sm bg-card/50 border-primary/30 hover:bg-primary/10 text-lg px-8 py-6 rounded-2xl font-semibold transition-all duration-300 hover:border-primary/50 hover:shadow-glass"
                >
                  Explore Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* 3D Scene */}
            <motion.div 
              className="relative h-[600px] w-full"
              initial={{ opacity: 0, x: 100 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-3xl backdrop-blur-sm border border-primary/20 shadow-cyber">
                <Scene3D className="w-full h-full rounded-3xl" />
              </div>
              
              {/* Floating UI Elements */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 shadow-glass"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground/80">AI Active</span>
                </div>
              </motion.div>

              <motion.div 
                className="absolute -bottom-4 -left-4 bg-card/80 backdrop-blur-sm border border-accent/20 rounded-2xl p-4 shadow-glass"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-foreground/80">98% Success</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Statistics Section - Floating Cards */}
      <motion.section 
        ref={statsRef}
        className="py-24 relative"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="relative group"
                initial={{ opacity: 0, y: 100, rotateX: 90 }}
                animate={statsInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 100, rotateX: 90 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-3xl p-8 text-center shadow-glass group-hover:shadow-cyber transition-all duration-300">
                  <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={statsInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 180 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    className="mb-4"
                  >
                    <stat.icon className={`h-12 w-12 mx-auto ${stat.color}`} />
                  </motion.div>
                  <motion.div 
                    className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2"
                    initial={{ opacity: 0 }}
                    animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-foreground/70 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section - Interactive 3D Cards */}
      <motion.section 
        ref={featuresRef}
        className="py-24 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-20 space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-300% animate-gradient">
              Revolutionary Features
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Experience the next evolution of learning with cutting-edge technology that adapts to you
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="group relative"
                initial={{ opacity: 0, y: 100, rotateY: 45 }}
                animate={featuresInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 100, rotateY: 45 }}
                transition={{ duration: 1, delay: index * 0.15 }}
                whileHover={{ y: -15, rotateY: 5, scale: 1.02 }}
              >
                <div className="relative overflow-hidden bg-card/40 backdrop-blur-sm border border-primary/20 rounded-3xl p-8 h-full shadow-glass group-hover:shadow-cyber transition-all duration-500 group-hover:border-primary/40">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                  
                  <motion.div 
                    className="relative z-10"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={featuresInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 180 }}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                  >
                    <div className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${feature.gradient} p-5 mb-6 shadow-neon group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-10 w-10 text-white" />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
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
        className="py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/50 to-card"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -100 }}
              animate={experienceInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center px-6 py-3 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full text-sm font-medium text-accent"
              >
                <Eye className="w-4 h-4 mr-2" />
                Immersive Learning
              </motion.div>

              <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Step Into The
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                  Future of Education
                </span>
              </h2>
              
              <p className="text-xl text-foreground/70 leading-relaxed">
                Our revolutionary 3D learning environment transforms abstract concepts into tangible experiences, 
                making complex subjects intuitive and engaging.
              </p>

              <div className="space-y-6">
                {immersiveFeatures.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-4 group"
                    initial={{ opacity: 0, x: -50 }}
                    animate={experienceInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} p-3 shadow-neon group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-foreground/70 group-hover:text-foreground/80 transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 100 }}
              animate={experienceInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-6">
                {/* Interactive Cards */}
                <motion.div 
                  className="space-y-6"
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="bg-card/60 backdrop-blur-sm border border-primary/20 rounded-3xl p-6 shadow-glass hover:shadow-cyber transition-all duration-300">
                    <div className="h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 flex items-center justify-center shadow-neon">
                      <Brain className="w-12 h-12 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Neural Learning</h4>
                    <p className="text-sm text-foreground/70">AI adapts to your learning patterns</p>
                  </div>
                  
                  <div className="bg-card/60 backdrop-blur-sm border border-accent/20 rounded-3xl p-6 shadow-glass hover:shadow-cyber transition-all duration-300">
                    <div className="h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-4 flex items-center justify-center shadow-neon">
                      <Target className="w-12 h-12 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Precision Learning</h4>
                    <p className="text-sm text-foreground/70">Targeted skill development</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="space-y-6 pt-12"
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="bg-card/60 backdrop-blur-sm border border-cyan/20 rounded-3xl p-6 shadow-glass hover:shadow-cyber transition-all duration-300">
                    <div className="h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4 flex items-center justify-center shadow-neon">
                      <Layers className="w-12 h-12 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">3D Environments</h4>
                    <p className="text-sm text-foreground/70">Immersive virtual classrooms</p>
                  </div>
                  
                  <div className="bg-card/60 backdrop-blur-sm border border-yellow/20 rounded-3xl p-6 shadow-glass hover:shadow-cyber transition-all duration-300">
                    <div className="h-32 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl mb-4 flex items-center justify-center shadow-neon">
                      <Zap className="w-12 h-12 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Lightning Speed</h4>
                    <p className="text-sm text-foreground/70">Accelerated comprehension</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action - Holographic Style */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
        <div className="absolute inset-0" style={{ background: 'var(--gradient-hologram)', backgroundSize: '400% 400%', animation: 'gradient-shift 8s ease infinite' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center space-y-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-300% animate-gradient">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Join thousands of learners who are already experiencing the future of education
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-xl px-12 py-8 rounded-2xl font-bold shadow-cyber transition-all duration-300 hover:shadow-neon"
              >
                <Link to="/register">
                  <span className="relative z-10 flex items-center">
                    Start Your Journey Now
                    <Rocket className="ml-3 h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;