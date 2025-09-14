import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Scene3D } from '@/components/3D/Scene3D';
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  Brain,
  Globe,
  Target,
  Zap,
  Users,
  Award,
  CheckCircle,
  Play,
  Star
} from 'lucide-react';

// SEO Meta Tags
const SEOHead = () => {
  useEffect(() => {
    document.title = 'Libya-Can: Future of English Learning in Libya';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Transform your English skills with Libya\'s most advanced learning platform. Interactive 3D lessons, AI-powered progress tracking, and culturally relevant content designed for Libyan students.';
    
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Libya-Can",
      "description": description,
      "url": window.location.origin,
      "sameAs": [],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "LY"
      }
    };

    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.textContent = JSON.stringify(structuredData);
    document.head.appendChild(scriptTag);

    return () => {
      document.head.removeChild(scriptTag);
    };
  }, []);

  return null;
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8 }
  }
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6 }
  }
};

export default function Index() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 0.3], ['0%', '30%']);

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 100,
        y: (e.clientY - window.innerHeight / 2) / 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Floating background elements
  const FloatingElements = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-primary rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.3, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  const features = [
    {
      icon: BookOpen,
      title: "Interactive 3D Lessons",
      description: "Immersive learning experiences with cutting-edge 3D visualization and interactive content designed for Libyan culture.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      title: "AI-Powered Progress",
      description: "Advanced artificial intelligence tracks your learning journey and adapts to your personal style and pace.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Globe,
      title: "Cultural Integration",
      description: "Learn English while celebrating Libyan heritage with culturally relevant scenarios and examples.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Target,
      title: "Precision Learning",
      description: "Targeted skill development with real-time feedback and personalized learning pathways.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Students", icon: Users },
    { number: "98%", label: "Success Rate", icon: Award },
    { number: "24/7", label: "Learning Access", icon: Zap },
    { number: "50+", label: "Interactive Modules", icon: BookOpen }
  ];

  const testimonials = [
    {
      name: "Ahmed Al-Mansouri",
      role: "Engineering Student, University of Tripoli",
      content: "Libya-Can transformed my English skills completely. The 3D interactive lessons made complex grammar concepts so easy to understand!",
      rating: 5
    },
    {
      name: "Fatima Benali",
      role: "Business Professional, Benghazi",
      content: "Finally, an English learning platform that understands our culture. The business English modules are perfectly tailored for the Libyan market.",
      rating: 5
    },
    {
      name: "Omar Khalil",
      role: "Medical Student, Zawiya",
      content: "The AI-powered progress tracking helped me identify and improve my weak areas. I passed my IELTS exam with flying colors!",
      rating: 5
    }
  ];

  return (
    <>
      <SEOHead />
      <FloatingElements />
      
      <main className="min-h-screen bg-gradient-hero">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-neon"
            style={{ y: backgroundY }}
          />
          
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Hero Content */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="space-y-8"
                style={{ 
                  transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)` 
                }}
              >
                {/* Badge */}
                <motion.div variants={scaleIn} className="inline-block">
                  <div className="glass px-6 py-3 rounded-full flex items-center gap-3 text-sm font-medium">
                    <div className="w-2 h-2 bg-gradient-primary rounded-full animate-pulse" />
                    🇱🇾 Made for Libya
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                </motion.div>

                {/* Main Headline */}
                <motion.h1 variants={fadeInUp} className="space-y-2">
                  <div className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
                    <div className="text-gradient">Future of</div>
                    <div className="text-foreground">English</div>
                    <div className="text-gradient-cosmic">Learning</div>
                  </div>
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                  variants={fadeInUp}
                  className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl"
                >
                  Transform your English skills with Libya's most advanced learning platform. 
                  Interactive 3D lessons, AI-powered progress tracking, and culturally relevant content.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="btn-primary px-8 py-6 text-lg rounded-2xl group">
                    <Link to="/register">
                      <Play className="w-5 h-5 mr-2" />
                      Start Learning Now
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  
                  <Button asChild variant="ghost" size="lg" className="px-8 py-6 text-lg rounded-2xl glass">
                    <Link to="/demo">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Watch Demo
                    </Link>
                  </Button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div variants={fadeInUp} className="flex items-center gap-6 pt-8">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-primary border-2 border-background" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">Join 10,000+ students</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">4.9/5 rating</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* 3D Scene */}
              <motion.div
                initial={{ opacity: 0, x: 100, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="relative h-[600px] lg:h-[700px]"
              >
                <div className="glass rounded-3xl h-full overflow-hidden glow-neon">
                  <Scene3D className="w-full h-full" />
                </div>
                
                {/* Floating UI Cards */}
                <motion.div
                  className="absolute top-8 -left-8 glass p-4 rounded-2xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-medium">Live Progress</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-8 -right-8 glass p-4 rounded-2xl"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-medium">AI Powered</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding-sm">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className="text-center space-y-4"
                >
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-primary/10 glow-primary">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-gradient">{stat.number}</div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient">
                Revolutionary Learning Experience
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover why thousands of Libyan students choose our platform for mastering English
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="grid md:grid-cols-2 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="modern-card group cursor-pointer"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-gradient transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-padding bg-gradient-flow">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-gradient">
                Success Stories from Libya
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real students, real results, real transformations
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="grid md:grid-cols-3 gap-8"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className="glass-strong p-8 rounded-3xl space-y-6 hover-lift"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <blockquote className="text-foreground/90 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <footer className="border-t border-glass-border pt-4">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </footer>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="glass-strong rounded-3xl p-16 text-center glow-cosmic"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-8 text-gradient-cosmic">
                Ready to Transform Your English?
              </h2>
              
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Join thousands of Libyan students who are already mastering English with our revolutionary platform
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button asChild size="lg" className="btn-primary px-12 py-6 text-xl rounded-2xl">
                  <Link to="/register">
                    Start Your Journey
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </Link>
                </Button>
                
                <Button asChild variant="ghost" size="lg" className="px-12 py-6 text-xl rounded-2xl glass">
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}