import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Mesh } from 'three';
import { ArrowRight, BookOpen, Users, Award, ChevronDown } from 'lucide-react';

// Modern 3D Book Component
const ModernBook = ({ position, rotation, scale = 1 }: any) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.1;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.2, 1.6, 0.15]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          metalness={0.3} 
          roughness={0.4}
          envMapIntensity={1}
        />
      </mesh>
      {/* Book spine */}
      <mesh position={[0.6, 0, 0]}>
        <boxGeometry args={[0.05, 1.6, 0.15]} />
        <meshStandardMaterial color="#1e40af" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Book pages */}
      <mesh position={[-0.05, 0, 0]}>
        <boxGeometry args={[1.1, 1.5, 0.12]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.1} roughness={0.8} />
      </mesh>
    </group>
  );
};

// 3D Scene Component
const ThreeDScene = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 2, 5]} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
        
        {/* Lighting Setup */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={0.3} />
        <pointLight position={[10, 10, 10]} color="#8b5cf6" intensity={0.2} />
        
        {/* Environment */}
        <Environment preset="studio" />
        
        {/* 3D Books */}
        <ModernBook position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1.2} />
        <ModernBook position={[-2.5, -0.5, -1]} rotation={[0, 0.3, 0]} scale={0.9} />
        <ModernBook position={[2.2, 0.2, -0.8]} rotation={[0, -0.4, 0]} scale={1.0} />
        <ModernBook position={[-1, 1.2, 1]} rotation={[0, 0.8, 0]} scale={0.8} />
        <ModernBook position={[1.5, -1, 1.2]} rotation={[0, -0.6, 0]} scale={0.85} />
      </Canvas>
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-40">
        <ThreeDScene />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />
      
      {/* Content */}
      <div className="container relative z-10 text-center">
        <div className="scroll-reveal opacity-0">
          <h1 className="text-gradient-animated mb-8 leading-tight tracking-tight">
            Transform Learning
            <br />
            <span className="text-gradient">Through Innovation</span>
          </h1>
        </div>
        
        <div className="scroll-reveal opacity-0" style={{animationDelay: '0.2s'}}>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the future of education with our cutting-edge platform that combines 
            interactive learning, advanced analytics, and personalized content delivery.
          </p>
        </div>
        
        <div className="scroll-reveal opacity-0 flex flex-col sm:flex-row gap-6 justify-center items-center" style={{animationDelay: '0.4s'}}>
          <button className="btn btn-primary group">
            Get Started Today
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="btn btn-secondary">
            Watch Demo
          </button>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-pulse-glow">
          <ChevronDown className="w-8 h-8 text-electric-blue animate-bounce" />
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
    }
  ];

  return (
    <section className="section-padding-lg relative">
      <div className="container">
        <div className="text-center mb-20">
          <h2 className="text-gradient mb-6 scroll-reveal opacity-0">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto scroll-reveal opacity-0" style={{animationDelay: '0.1s'}}>
            Discover the features that make learning more engaging, effective, and enjoyable.
          </p>
        </div>
        
        <div className="grid-responsive">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="modern-card hover-lift scroll-reveal opacity-0"
              style={{animationDelay: `${0.2 + index * 0.1}s`}}
            >
              <div className="flex-center w-16 h-16 rounded-2xl bg-gradient-primary mb-6 glow-primary">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
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
    <section className="section-padding bg-gradient-cosmic relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-electric-blue rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple rounded-full blur-3xl animate-pulse-glow" style={{animationDelay: '1s'}} />
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center scroll-reveal opacity-0" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="text-4xl md:text-5xl font-black text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-300 tracking-wide uppercase">
                {stat.label}
              </div>
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
    <section className="section-padding-lg">
      <div className="container">
        <div className="modern-card text-center max-w-4xl mx-auto glow-cosmic">
          <h2 className="text-4xl md:text-5xl font-black mb-6 scroll-reveal opacity-0">
            Ready to Start Your
            <br />
            <span className="text-gradient">Learning Journey?</span>
          </h2>
          <p className="text-xl mb-12 text-muted-foreground max-w-2xl mx-auto scroll-reveal opacity-0" style={{animationDelay: '0.1s'}}>
            Join thousands of learners who are already transforming their careers 
            and unlocking their potential with our innovative platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center scroll-reveal opacity-0" style={{animationDelay: '0.2s'}}>
            <button className="btn btn-primary">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="btn btn-ghost">
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
            entry.target.classList.add('animate-fade-in');
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
      <CTASection />
    </div>
  );
};

export default Index;