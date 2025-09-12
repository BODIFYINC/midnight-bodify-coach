import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Scene3D } from '@/components/3D/Scene3D';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { 
  BookOpen, Users, Globe, Star, Check, MessageCircle, 
  Zap, Sparkles, Target, Award, TrendingUp, Lightbulb,
  Brain, Eye, Heart, Shield, Rocket, ChevronDown
} from 'lucide-react';

export default function Index() {
  // SEO
  useEffect(() => {
    document.title = 'Libya-Can — Immersive English Learning Experience';
    const meta = document.querySelector('meta[name="description"]');
    const content = 'Transform your English learning journey with an immersive, seamless experience. Beautiful design meets powerful education.';
    if (meta) meta.setAttribute('content', content);
    else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  // Smooth scroll parallax
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [mount3D, setMount3D] = useState(false);

  // Parallax transforms for seamless flow
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.6], [1, 0.5]);

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

  // Flowing background without borders
  const FlowingBackground = () => (
    <div className="fixed inset-0 -z-20">
      {/* Base ocean gradient */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-ocean-flow)' }} />
      
      {/* Flowing currents */}
      <motion.div 
        className="absolute inset-0 opacity-40"
        style={{ 
          background: 'var(--gradient-surface-shimmer)',
          y: y1
        }}
      />
      
      {/* Deep currents */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ 
          background: 'var(--gradient-tide)',
          y: y2
        }}
      />
      
      {/* Underwater ambience */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ 
          background: 'var(--gradient-underwater)',
          y: y3
        }}
      />
    </div>
  );

  const features = [
    {
      icon: Brain,
      title: 'Adaptive Intelligence',
      description: 'AI that learns your style and adapts lessons to your unique learning patterns for maximum retention.',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      icon: Globe,
      title: 'Real-World Context',
      description: 'Learn through authentic scenarios and cultural contexts that make English natural and meaningful.',
      color: 'from-teal-400 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Instant Feedback',
      description: 'Get immediate corrections and suggestions that accelerate your learning progress.',
      color: 'from-orange-400 to-red-500'
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Connect with learners worldwide and practice together in supportive peer groups.',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: Target,
      title: 'Goal-Oriented Paths',
      description: 'Structured learning paths tailored to your specific goals and timeline.',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Achievement System',
      description: 'Celebrate milestones with meaningful achievements that mark your progress.',
      color: 'from-yellow-400 to-orange-500'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Active Learners', icon: Users },
    { number: '98.7%', label: 'Success Rate', icon: TrendingUp },
    { number: '24/7', label: 'Available Support', icon: Heart },
    { number: '120+', label: 'Countries Reached', icon: Globe }
  ];

  const testimonials = [
    {
      name: 'Sarah Al-Mansouri',
      role: 'Medical Student',
      content: 'The seamless experience made learning feel natural. Within 6 months, my English improved dramatically for my medical studies.',
      avatar: 'SA',
      rating: 5
    },
    {
      name: 'Ahmed Hassan',
      role: 'Software Engineer',
      content: 'Perfect for busy professionals. The adaptive system learned my schedule and delivered lessons exactly when I needed them.',
      avatar: 'AH',
      rating: 5
    },
    {
      name: 'Fatima Al-Zahra',
      role: 'Business Owner',
      content: 'Transformed my confidence in English business communication. The real-world scenarios were incredibly practical.',
      avatar: 'FZ',
      rating: 5
    }
  ];

  return (
    <>
      <FlowingBackground />
      
      <main className="relative">
        {/* Hero Section - Flowing into the page */}
        <section ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden">
          <motion.div 
            className="absolute inset-0 opacity-20"
            style={{ 
              background: 'var(--gradient-coral-wave)',
              opacity: opacity1
            }}
          />
          
          <div className="container relative z-10 grid lg:grid-cols-2 gap-16 items-center py-32">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="space-y-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sm font-medium"
              >
                <Sparkles className="w-4 h-4 mr-2 text-accent" />
                Immersive English Learning Experience
              </motion.div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-accent">
                  Master
                </span>
                <span className="block text-foreground">
                  English
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-300 to-primary">
                  Naturally
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl">
                Dive into a beautifully crafted learning experience that flows like a conversation. 
                No borders, no interruptions—just seamless progress toward fluency.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  asChild 
                  size="lg" 
                  className="group px-12 py-6 text-xl rounded-2xl bg-gradient-to-r from-primary to-accent hover:shadow-coral transition-all duration-700 transform hover:scale-105"
                >
                  <Link to="/register">
                    <Rocket className="mr-3 h-6 w-6" />
                    Begin Your Journey
                    <ChevronDown className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-12 py-6 text-xl rounded-2xl bg-white/5 backdrop-blur-md border-white/20 hover:bg-white/10 transition-all duration-500"
                >
                  <Link to="/login">Explore Preview</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 60, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="relative h-[600px] lg:h-[700px] w-full"
            >
              <div className="absolute inset-0 rounded-3xl overflow-hidden" style={{ boxShadow: 'var(--shadow-immersive)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-3xl border border-white/10" />
                {mount3D && <Scene3D className="w-full h-full rounded-3xl" />}
                
                {/* Floating UI Elements */}
                <motion.div 
                  className="absolute top-8 right-8 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Live Learning</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute bottom-8 left-8 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">Progress: 94%</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section - Flowing seamlessly */}
        <section className="relative py-32 md:py-40">
          <motion.div 
            className="absolute inset-0"
            style={{ 
              background: 'var(--gradient-coral-wave)',
              opacity: opacity2
            }}
          />
          
          <div className="container relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Features That Flow
              </h2>
              <p className="text-xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
                Every element designed to create a seamless learning experience that adapts to you
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-700 transform hover:scale-105"
                  style={{ boxShadow: 'var(--shadow-float)' }}
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section - Continuing the flow */}
        <section className="relative py-32">
          <motion.div 
            className="absolute inset-0"
            style={{ 
              background: 'var(--gradient-deep-current)',
              opacity: 0.6
            }}
          />
          
          <div className="container relative z-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10"
                  style={{ boxShadow: 'var(--shadow-depth)' }}
                >
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-foreground/70 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section - Flowing design */}
        <section className="relative py-32 md:py-40">
          <div className="container relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                Success Stories
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                Real experiences from learners who transformed their English journey
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10"
                  style={{ boxShadow: 'var(--shadow-float)' }}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold">{testimonial.name}</div>
                      <div className="text-foreground/60 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-foreground/80 leading-relaxed mb-4">"{testimonial.content}"</p>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent fill-current" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section - No borders, flowing content */}
        <section className="relative py-32 md:py-40">
          <motion.div 
            className="absolute inset-0 opacity-30"
            style={{ background: 'var(--gradient-coral-wave)' }}
          />
          
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-5xl md:text-6xl font-black mb-8">
                  Designed for
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    Immersion
                  </span>
                </h2>
                <p className="text-xl text-foreground/70 leading-relaxed mb-8">
                  Every pixel, every interaction, every moment is crafted to create a seamless learning experience. 
                  No jarring transitions, no overwhelming interfaces—just pure focus on your English journey.
                </p>
                <div className="space-y-4">
                  {[
                    'Seamless single-page flow',
                    'Immersive 3D interactions',
                    'Accessibility-first design',
                    'Mobile-optimized experience'
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center"
                    >
                      <Check className="w-6 h-6 text-accent mr-3" />
                      <span className="text-lg">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  { icon: Eye, title: 'Visual Learning', desc: 'Rich visual content that enhances understanding' },
                  { icon: Brain, title: 'Cognitive Flow', desc: 'Designed to match natural learning patterns' },
                  { icon: Heart, title: 'Emotional Connect', desc: 'Building confidence through positive experiences' },
                  { icon: Shield, title: 'Safe Space', desc: 'Judgment-free environment for practice' }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10"
                  >
                    <item.icon className="w-8 h-8 text-primary mb-3" />
                    <h4 className="font-bold mb-2">{item.title}</h4>
                    <p className="text-sm text-foreground/60">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA - Flowing conclusion */}
        <section className="relative py-32 md:py-40">
          <motion.div 
            className="absolute inset-0"
            style={{ 
              background: 'var(--gradient-deep-current)',
              opacity: 0.8
            }}
          />
          
          <div className="container relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-5xl md:text-6xl font-black mb-8">
                Ready to Dive In?
              </h2>
              <p className="text-xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join thousands of learners who have transformed their English journey. 
                Start your immersive experience today.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="px-16 py-6 text-xl rounded-2xl bg-gradient-to-r from-primary to-accent hover:shadow-coral transition-all duration-700 transform hover:scale-105"
                >
                  <Link to="/register">Start Learning Now</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-16 py-6 text-xl rounded-2xl bg-white/5 backdrop-blur-md border-white/20 hover:bg-white/10"
                >
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}