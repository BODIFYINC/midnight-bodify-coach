import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Mesh } from 'three';
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Award, 
  ChevronDown, 
  Play,
  CheckCircle,
  Star,
  Globe,
  Zap,
  Shield,
  Target,
  TrendingUp,
  MessageSquare,
  UserCheck,
  Lightbulb
} from 'lucide-react';

// Professional 3D Book Component
const ProfessionalBook = ({ position, rotation, scale = 1, color = "#0ea5e9" }: any) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.2 + position[0]) * 0.08;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.4, 1.8, 0.2]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.1} 
          roughness={0.2}
          envMapIntensity={0.8}
        />
      </mesh>
      {/* Book spine */}
      <mesh position={[0.7, 0, 0]}>
        <boxGeometry args={[0.05, 1.8, 0.2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.2} roughness={0.3} />
      </mesh>
      {/* Book pages */}
      <mesh position={[-0.05, 0, 0]}>
        <boxGeometry args={[1.3, 1.7, 0.18]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.0} roughness={1.0} />
      </mesh>
    </group>
  );
};

// 3D Scene Component
const ThreeDScene = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[4, 1, 4]} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
        
        {/* Professional Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[8, 8, 5]} intensity={0.8} castShadow />
        <pointLight position={[-5, 5, 5]} color="#0ea5e9" intensity={0.2} />
        <pointLight position={[5, -5, -5]} color="#14b8a6" intensity={0.15} />
        
        {/* Environment */}
        <Environment preset="studio" />
        
        {/* Professional 3D Books */}
        <ProfessionalBook position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1.0} color="#0ea5e9" />
        <ProfessionalBook position={[-2, -0.3, -0.8]} rotation={[0, 0.2, 0]} scale={0.8} color="#14b8a6" />
        <ProfessionalBook position={[1.8, 0.1, -0.6]} rotation={[0, -0.3, 0]} scale={0.9} color="#22c55e" />
        <ProfessionalBook position={[-0.8, 1, 0.8]} rotation={[0, 0.6, 0]} scale={0.7} color="#0ea5e9" />
        <ProfessionalBook position={[1.2, -0.8, 1]} rotation={[0, -0.4, 0]} scale={0.75} color="#14b8a6" />
      </Canvas>
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <ThreeDScene />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20" />
      
      {/* Content */}
      <div className="container relative z-10 text-center px-6">
        <div className="scroll-reveal opacity-0">
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight">
            Transform
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Learning
            </span>
          </h1>
        </div>
        
        <div className="scroll-reveal opacity-0">
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-foreground-muted">
            Experience the future of education with our cutting-edge platform that combines 
            interactive learning, advanced analytics, and personalized content delivery.
          </p>
        </div>
        
        <div className="scroll-reveal opacity-0 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-glow-primary flex items-center gap-3">
            Get Started Today
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="group border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-3">
            <Play className="w-5 h-5" />
            Watch Demo
          </button>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "Engage with dynamic content that adapts to your learning style and pace."
    },
    {
      icon: Users,
      title: "Collaborative Environment", 
      description: "Connect with peers and mentors in our vibrant learning community."
    },
    {
      icon: Award,
      title: "Certified Progress",
      description: "Earn recognized certificates and track your educational achievements."
    },
    {
      icon: Zap,
      title: "AI-Powered Insights",
      description: "Get personalized recommendations based on your learning patterns."
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Access your learning materials anywhere, anytime, on any device."
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data and progress are protected with enterprise-grade security."
    }
  ];

  return (
    <section className="py-32 relative">
      <div className="container px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6 scroll-reveal opacity-0">
            Why Choose 
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ml-4">
              Our Platform?
            </span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto scroll-reveal opacity-0">
            Discover the features that make learning more engaging, effective, and enjoyable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-gradient-to-br from-card to-card-hover p-8 rounded-2xl border border-border hover:border-primary/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl scroll-reveal opacity-0"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-foreground-muted leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Stats Section
const StatsSection = () => {
  const stats = [
    { number: "50K+", label: "Active Learners" },
    { number: "1000+", label: "Courses Available" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-background-secondary to-surface relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>
      
      <div className="container relative z-10 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center scroll-reveal opacity-0">
              <div className="text-4xl md:text-6xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-foreground-muted tracking-wide uppercase font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Data Scientist",
      company: "TechCorp",
      image: "/api/placeholder/64/64",
      content: "This platform completely transformed how I approach learning. The personalized recommendations helped me focus on exactly what I needed to advance my career."
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "StartupX",
      image: "/api/placeholder/64/64", 
      content: "The collaborative features are amazing. I've connected with mentors and peers who have been instrumental in my professional growth."
    },
    {
      name: "Emily Davis",
      role: "UX Designer",
      company: "DesignStudio",
      image: "/api/placeholder/64/64",
      content: "The quality of content and the interactive learning experience is unmatched. I've completed 5 certifications already this year!"
    }
  ];

  return (
    <section className="py-32">
      <div className="container px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6 scroll-reveal opacity-0">
            What Our 
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ml-4">
              Learners Say
            </span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto scroll-reveal opacity-0">
            Join thousands of professionals who have transformed their careers with our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-card to-card-hover p-8 rounded-2xl border border-border hover:border-primary/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl scroll-reveal opacity-0"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-foreground-muted">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-foreground-muted leading-relaxed">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Process Section
const ProcessSection = () => {
  const steps = [
    {
      icon: UserCheck,
      title: "Sign Up",
      description: "Create your account and set your learning goals"
    },
    {
      icon: Target,
      title: "Choose Path",
      description: "Select from our curated learning paths or create your own"
    },
    {
      icon: Lightbulb,
      title: "Learn & Practice",
      description: "Engage with interactive content and hands-on projects"
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your advancement and earn certifications"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-background-secondary to-surface">
      <div className="container px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6 scroll-reveal opacity-0">
            How It 
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ml-4">
              Works
            </span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto scroll-reveal opacity-0">
            Get started on your learning journey in just four simple steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="text-center scroll-reveal opacity-0"
            >
              <div className="relative mb-8">
                <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-foreground-muted leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="py-32">
      <div className="container px-6">
        <div className="bg-gradient-to-br from-card to-card-hover p-12 md:p-16 rounded-3xl border border-border text-center max-w-4xl mx-auto hover:border-primary/20 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-4xl md:text-6xl font-black mb-6 scroll-reveal opacity-0">
            Ready to Start Your
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Learning Journey?
            </span>
          </h2>
          <p className="text-xl mb-12 text-foreground-muted max-w-2xl mx-auto scroll-reveal opacity-0">
            Join thousands of learners who are already transforming their careers 
            and unlocking their potential with our innovative platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center scroll-reveal opacity-0">
            <button className="group bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-glow-primary flex items-center gap-3">
              Start Free Trial
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-3">
              <MessageSquare className="w-5 h-5" />
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Index Component
const Index = () => {
  useEffect(() => {
    // Initialize scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    scrollRevealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <ProcessSection />
      <CTASection />
    </div>
  );
};

export default Index;