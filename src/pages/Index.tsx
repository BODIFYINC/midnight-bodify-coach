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
  CheckCircle,
  Star,
  Globe,
  Zap,
  Shield,
  Target,
  TrendingUp,
  MessageSquare,
  UserCheck,
  Lightbulb,
  Code,
  Database,
  Smartphone,
  BarChart3,
  Clock,
  Heart,
  CheckCircle2,
  ArrowUpRight,
  Quote,
  Calendar,
  FileText,
  Download,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';

// Sophisticated 3D Book Component
const ModernBook = ({ position, rotation, scale = 1, color = "#a855f7" }: any) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.15 + position[0]) * 0.05;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.6, 2.0, 0.25]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.05} 
          roughness={0.15}
          envMapIntensity={0.6}
        />
      </mesh>
      {/* Book spine */}
      <mesh position={[0.8, 0, 0]}>
        <boxGeometry args={[0.05, 2.0, 0.25]} />
        <meshStandardMaterial color="#18181b" metalness={0.1} roughness={0.2} />
      </mesh>
      {/* Book pages */}
      <mesh position={[-0.05, 0, 0]}>
        <boxGeometry args={[1.5, 1.9, 0.22]} />
        <meshStandardMaterial color="#fafafa" metalness={0.0} roughness={0.9} />
      </mesh>
    </group>
  );
};

// 3D Scene Component
const ThreeDScene = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[3, 1, 3]} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
        
        {/* Sophisticated Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[6, 6, 4]} intensity={0.6} castShadow />
        <pointLight position={[-4, 4, 4]} color="#a855f7" intensity={0.15} />
        <pointLight position={[4, -4, -4]} color="#6366f1" intensity={0.1} />
        
        {/* Environment */}
        <Environment preset="studio" />
        
        {/* Sophisticated 3D Books */}
        <ModernBook position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1.0} color="#a855f7" />
        <ModernBook position={[-1.8, -0.2, -0.6]} rotation={[0, 0.15, 0]} scale={0.8} color="#6366f1" />
        <ModernBook position={[1.5, 0.1, -0.5]} rotation={[0, -0.2, 0]} scale={0.9} color="#f59e0b" />
        <ModernBook position={[-0.6, 0.8, 0.6]} rotation={[0, 0.4, 0]} scale={0.7} color="#a855f7" />
        <ModernBook position={[1.0, -0.6, 0.8]} rotation={[0, -0.3, 0]} scale={0.75} color="#6366f1" />
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background-tertiary">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <ThreeDScene />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Content */}
      <div className="container relative z-10 text-center px-6">
        <div className="scroll-reveal opacity-0">
          <h1 className="text-7xl md:text-9xl font-black mb-8 leading-tight tracking-tight">
            Master
            <br />
            <span className="bg-gradient-to-r from-violet to-accent bg-clip-text text-transparent">
              Tomorrow
            </span>
          </h1>
        </div>
        
        <div className="scroll-reveal opacity-0">
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-foreground-muted">
            Unlock your potential with our revolutionary learning platform. Experience personalized education 
            that adapts to your pace, connects you with industry experts, and transforms knowledge into real-world success.
          </p>
        </div>
        
        <div className="scroll-reveal opacity-0 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group bg-gradient-to-r from-violet to-primary hover:from-primary-hover hover:to-violet text-primary-foreground px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-glow-primary flex items-center gap-3">
            Start Your Journey
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="w-8 h-8 text-violet animate-bounce" />
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
      title: "Adaptive Learning",
      description: "AI-powered curriculum that evolves with your progress and learning preferences."
    },
    {
      icon: Users,
      title: "Expert Community", 
      description: "Connect with industry leaders and peers in your field for collaborative growth."
    },
    {
      icon: Award,
      title: "Industry Certifications",
      description: "Earn prestigious certifications recognized by top companies worldwide."
    },
    {
      icon: Zap,
      title: "Real-time Analytics",
      description: "Track your progress with detailed insights and performance metrics."
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Learn from anywhere with our cloud-based platform and mobile apps."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Your data is protected with military-grade encryption and privacy controls."
    }
  ];

  return (
    <section className="py-40 relative">
      <div className="container px-6">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-7xl font-black mb-8 scroll-reveal opacity-0">
            Why Leaders Choose 
            <span className="bg-gradient-to-r from-violet to-accent bg-clip-text text-transparent ml-4">
              Our Platform
            </span>
          </h2>
          <p className="text-2xl text-foreground-muted max-w-3xl mx-auto scroll-reveal opacity-0">
            Join over 100,000 professionals who have accelerated their careers with our cutting-edge learning ecosystem.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-gradient-to-br from-card to-card-hover p-10 rounded-3xl border border-border hover:border-violet/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-xl scroll-reveal opacity-0"
            >
              <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet to-primary mb-8 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-6">{feature.title}</h3>
              <p className="text-foreground-muted leading-relaxed text-lg">{feature.description}</p>
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
    { number: "100K+", label: "Active Learners Worldwide" },
    { number: "2,500+", label: "Expert-Led Courses" },
    { number: "99.5%", label: "Student Satisfaction Rate" },
    { number: "50+", label: "Countries & Languages" }
  ];

  return (
    <section className="py-40 bg-gradient-to-br from-background-secondary to-background-tertiary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-128 h-128 bg-accent rounded-full blur-3xl" />
      </div>
      
      <div className="container relative z-10 px-6">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-7xl font-black mb-8 scroll-reveal opacity-0">
            Trusted by 
            <span className="bg-gradient-to-r from-violet to-accent bg-clip-text text-transparent">
              Millions
            </span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center scroll-reveal opacity-0">
              <div className="text-5xl md:text-7xl font-black bg-gradient-to-r from-violet to-accent bg-clip-text text-transparent mb-4">
                {stat.number}
              </div>
              <div className="text-lg md:text-xl text-foreground-muted tracking-wide font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Learning Paths Section
const LearningPathsSection = () => {
  const paths = [
    {
      icon: Code,
      title: "Software Development",
      duration: "6-12 months",
      level: "Beginner to Expert",
      students: "45,000+",
      description: "Master full-stack development with modern frameworks and best practices.",
      skills: ["React", "Node.js", "Python", "Cloud Computing"]
    },
    {
      icon: BarChart3,
      title: "Data Science & AI",
      duration: "8-14 months",
      level: "Intermediate to Expert",
      students: "32,000+",
      description: "Become an AI expert with machine learning, deep learning, and data analysis.",
      skills: ["Python", "TensorFlow", "SQL", "Statistics"]
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      duration: "4-8 months",
      level: "Beginner to Advanced",
      students: "28,000+",
      description: "Build native and cross-platform mobile applications for iOS and Android.",
      skills: ["React Native", "Flutter", "Swift", "Kotlin"]
    },
    {
      icon: Database,
      title: "Cloud Architecture",
      duration: "5-10 months",
      level: "Intermediate to Expert",
      students: "25,000+",
      description: "Design and implement scalable cloud solutions with modern DevOps practices.",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"]
    }
  ];

  return (
    <section className="py-40">
      <div className="container px-6">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-7xl font-black mb-8 scroll-reveal opacity-0">
            Learning
            <span className="bg-gradient-to-r from-violet to-accent bg-clip-text text-transparent ml-4">
              Pathways
            </span>
          </h2>
          <p className="text-2xl text-foreground-muted max-w-3xl mx-auto scroll-reveal opacity-0">
            Choose from our expertly crafted learning paths designed to take you from beginner to industry professional.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {paths.map((path, index) => (
            <div 
              key={index} 
              className="group bg-gradient-to-br from-card to-card-hover p-10 rounded-3xl border border-border hover:border-violet/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl scroll-reveal opacity-0"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-violet to-primary">
                  <path.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-sm text-foreground-muted mb-1">{path.students} students</div>
                  <div className="text-sm text-accent font-semibold">{path.level}</div>
                </div>
              </div>
              
              <h3 className="text-3xl font-bold mb-4">{path.title}</h3>
              <p className="text-foreground-muted leading-relaxed text-lg mb-6">{path.description}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-violet" />
                  <span className="text-foreground-muted">{path.duration}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {path.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="px-3 py-1 bg-violet/10 text-violet rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <button className="w-full bg-gradient-to-r from-violet to-primary hover:from-primary-hover hover:to-violet text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                Explore Path
                <ArrowUpRight className="w-5 h-5" />
              </button>
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
      name: "Alexandra Chen",
      role: "Senior Software Engineer",
      company: "Google",
      image: "/api/placeholder/80/80",
      content: "This platform didn't just teach me to code—it taught me to think like a problem solver. The personalized learning path helped me transition from marketing to tech in just 8 months.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Data Science Director",
      company: "Netflix",
      image: "/api/placeholder/80/80", 
      content: "The AI and machine learning curriculum is world-class. I was able to implement what I learned immediately at work, leading to a promotion within 6 months of completing the program.",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Mobile App Developer",
      company: "Spotify",
      image: "/api/placeholder/80/80",
      content: "The hands-on projects and mentorship program were game-changers. I built three apps during the course that now have over 100K downloads combined.",
      rating: 5
    },
    {
      name: "David Kim",
      role: "Cloud Solutions Architect",
      company: "Microsoft",
      image: "/api/placeholder/80/80",
      content: "The depth of content and real-world scenarios prepared me for complex enterprise challenges. I'm now leading cloud migrations for Fortune 500 companies.",
      rating: 5
    }
  ];

  return (
    <section className="py-40 bg-gradient-to-br from-background-secondary to-background-tertiary">
      <div className="container px-6">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-7xl font-black mb-8 scroll-reveal opacity-0">
            Success
            <span className="bg-gradient-to-r from-violet to-accent bg-clip-text text-transparent ml-4">
              Stories
            </span>
          </h2>
          <p className="text-2xl text-foreground-muted max-w-3xl mx-auto scroll-reveal opacity-0">
            Hear from professionals who transformed their careers and achieved their dreams through our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-card to-card-hover p-10 rounded-3xl border border-border hover:border-violet/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl scroll-reveal opacity-0"
            >
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-violet to-accent rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-xl">{testimonial.name}</div>
                  <div className="text-foreground-muted">{testimonial.role}</div>
                  <div className="text-accent font-semibold">{testimonial.company}</div>
                </div>
              </div>
              
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-current" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-violet mb-4" />
              <p className="text-foreground-muted leading-relaxed text-lg italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const PricingSection = () => {
  const plans = [
    {
      name: "Explorer",
      price: "Free",
      period: "Forever",
      description: "Perfect for getting started with basic courses and community access.",
      features: [
        "Access to 50+ free courses",
        "Community forum access",
        "Basic progress tracking",
        "Mobile app access",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$29",
      period: "per month",
      description: "Ideal for serious learners who want comprehensive access and mentorship.",
      features: [
        "Unlimited course access",
        "1-on-1 mentor sessions",
        "Industry certifications",
        "Priority support",
        "Advanced analytics",
        "Career guidance",
        "Networking events"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Contact us",
      description: "Tailored solutions for teams and organizations with advanced needs.",
      features: [
        "Custom learning paths",
        "Team management dashboard",
        "Advanced reporting",
        "SSO integration",
        "Dedicated success manager",
        "Custom integrations",
        "White-label options"
      ],
      popular: false
    }
  ];

  return (
    <section className="py-40">
      <div className="container px-6">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-7xl font-black mb-8 scroll-reveal opacity-0">
            Choose Your
            <span className="bg-gradient-to-r from-violet to-accent bg-clip-text text-transparent ml-4">
              Plan
            </span>
          </h2>
          <p className="text-2xl text-foreground-muted max-w-3xl mx-auto scroll-reveal opacity-0">
            Start free and upgrade as you grow. All plans include our core learning platform and community access.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative bg-gradient-to-br from-card to-card-hover p-10 rounded-3xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-xl scroll-reveal opacity-0 ${
                plan.popular 
                  ? 'border-violet/50 shadow-glow-primary' 
                  : 'border-border hover:border-violet/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-violet to-accent text-white px-6 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-5xl font-black">{plan.price}</span>
                  {plan.period !== "Contact us" && (
                    <span className="text-foreground-muted ml-2">/{plan.period}</span>
                  )}
                </div>
                <p className="text-foreground-muted">{plan.description}</p>
              </div>
              
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-violet mr-3 flex-shrink-0" />
                    <span className="text-foreground-muted">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? 'bg-gradient-to-r from-violet to-primary hover:from-primary-hover hover:to-violet text-white'
                  : 'border-2 border-violet text-violet hover:bg-violet hover:text-white'
              }`}>
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection = () => {
  const faqs = [
    {
      question: "How does the AI-powered learning work?",
      answer: "Our AI analyzes your learning patterns, strengths, and goals to create a personalized curriculum. It adapts in real-time based on your progress and performance."
    },
    {
      question: "Are the certifications industry-recognized?",
      answer: "Yes, our certifications are recognized by over 500 companies including Google, Microsoft, Amazon, and other industry leaders. They carry significant weight in the job market."
    },
    {
      question: "Can I access courses on mobile devices?",
      answer: "Absolutely! Our platform is fully responsive and we have dedicated mobile apps for iOS and Android with offline learning capabilities."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer 24/7 email support for all users, live chat for Professional plans, and dedicated success managers for Enterprise customers. Plus access to our vibrant community forum."
    },
    {
      question: "How does the mentorship program work?",
      answer: "Professional plan members get monthly 1-on-1 sessions with industry experts. Mentors are matched based on your goals and background, providing personalized guidance and career advice."
    },
    {
      question: "Can I switch plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes are prorated and take effect immediately. No long-term contracts required."
    }
  ];

  return (
    <section className="py-40 bg-gradient-to-br from-background-secondary to-background-tertiary">
      <div className="container px-6">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-7xl font-black mb-8 scroll-reveal opacity-0">
            Common
            <span className="bg-gradient-to-r from-violet to-accent bg-clip-text text-transparent ml-4">
              Questions
            </span>
          </h2>
          <p className="text-2xl text-foreground-muted max-w-3xl mx-auto scroll-reveal opacity-0">
            Everything you need to know about our platform and learning experience.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-card to-card-hover p-8 rounded-2xl border border-border hover:border-violet/30 transition-all duration-300 mb-6 scroll-reveal opacity-0"
            >
              <h3 className="text-2xl font-bold mb-4">{faq.question}</h3>
              <p className="text-foreground-muted leading-relaxed text-lg">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Newsletter Section
const NewsletterSection = () => {
  return (
    <section className="py-40">
      <div className="container px-6">
        <div className="bg-gradient-to-br from-card to-card-hover p-16 rounded-3xl border border-border text-center max-w-4xl mx-auto hover:border-violet/30 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-5xl md:text-6xl font-black mb-8 scroll-reveal opacity-0">
            Stay
            <span className="bg-gradient-to-r from-violet to-accent bg-clip-text text-transparent ml-4">
              Updated
            </span>
          </h2>
          <p className="text-xl mb-12 text-foreground-muted max-w-2xl mx-auto scroll-reveal opacity-0">
            Get the latest insights on technology trends, career advice, and new course releases delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto scroll-reveal opacity-0">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 bg-background-secondary border border-border rounded-xl px-6 py-4 text-foreground placeholder-foreground-muted focus:border-violet outline-none transition-all duration-300"
            />
            <button className="bg-gradient-to-r from-violet to-primary hover:from-primary-hover hover:to-violet text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTASection = () => {
  return (
    <section className="py-40 bg-gradient-to-br from-background-secondary to-background-tertiary">
      <div className="container px-6">
        <div className="text-center max-w-5xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-black mb-8 scroll-reveal opacity-0">
            Your Future
            <br />
            <span className="bg-gradient-to-r from-violet to-accent bg-clip-text text-transparent">
              Starts Today
            </span>
          </h2>
          <p className="text-2xl mb-16 text-foreground-muted max-w-3xl mx-auto scroll-reveal opacity-0">
            Join over 100,000 professionals who have transformed their careers with our platform. 
            Start your journey to success today with our risk-free trial.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center scroll-reveal opacity-0">
            <button className="group bg-gradient-to-r from-violet to-primary hover:from-primary-hover hover:to-violet text-primary-foreground px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-glow-primary flex items-center gap-4">
              Start Free Trial
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="border-2 border-violet text-violet hover:bg-violet hover:text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 flex items-center gap-4">
              <MessageSquare className="w-6 h-6" />
              Talk to Expert
            </button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="scroll-reveal opacity-0">
              <CheckCircle className="w-8 h-8 text-violet mx-auto mb-4" />
              <div className="font-semibold text-lg">14-Day Free Trial</div>
              <div className="text-foreground-muted">No credit card required</div>
            </div>
            <div className="scroll-reveal opacity-0">
              <Heart className="w-8 h-8 text-violet mx-auto mb-4" />
              <div className="font-semibold text-lg">Money-Back Guarantee</div>
              <div className="text-foreground-muted">100% satisfaction guaranteed</div>
            </div>
            <div className="scroll-reveal opacity-0">
              <Clock className="w-8 h-8 text-violet mx-auto mb-4" />
              <div className="font-semibold text-lg">Instant Access</div>
              <div className="text-foreground-muted">Start learning immediately</div>
            </div>
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
      <LearningPathsSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <NewsletterSection />
      <FinalCTASection />
    </div>
  );
};

export default Index;