import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, BookOpen, Users, Award, Star, Globe, ArrowRight, Play, Check, Clock, Target, Shield, Sparkles, Zap, Brain } from "lucide-react";
import Scene3D from "@/components/3D/Scene3D";
import { ScrollAnimation, StaggerContainer, StaggerChild } from "@/components/ScrollAnimations";
import { useSmoothScroll, scrollToSection } from "@/components/SmoothScroll";

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['hero', 'features', 'courses', 'testimonials'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        
        {/* 3D Background */}
        <div className="absolute inset-0 opacity-30">
          <Scene3D />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-6xl mx-auto space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 hover:bg-primary/20 transition-all duration-300 px-6 py-2 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Premium Arabic Learning Experience
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight"
            >
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Master Arabic
              </span>
              <br />
              <span className="text-gradient-animated bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                with Elegance
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              Embark on an extraordinary journey through the beautiful Arabic language with our 
              premium, culturally-rich learning platform designed for discerning learners.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary-hover text-primary-foreground px-10 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                onClick={() => scrollToSection('courses')}
              >
                Begin Your Journey
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground px-10 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                onClick={() => scrollToSection('features')}
              >
                <Play className="mr-2 w-5 h-5" />
                Discover Features
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">25K+</div>
                <div className="text-sm text-muted-foreground">Elite Learners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.9★</div>
                <div className="text-sm text-muted-foreground">Premium Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Master Instructors</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="cursor-pointer"
            onClick={() => scrollToSection('features')}
          >
            <ChevronDown className="w-8 h-8 text-primary" />
          </motion.div>
        </motion.div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-32 bg-background-secondary relative">
        <div className="container mx-auto px-6">
          <ScrollAnimation direction="up" className="text-center mb-20">
            <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 mb-6 px-6 py-2 backdrop-blur-sm">
              <Zap className="w-4 h-4 mr-2" />
              Excellence Redefined
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Experience <span className="text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Premium Learning</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our platform represents the pinnacle of Arabic language education, combining 
              cutting-edge technology with authentic cultural immersion.
            </p>
          </ScrollAnimation>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Immersive Curriculum",
                description: "Expertly crafted lessons that adapt to your unique learning style and pace."
              },
              {
                icon: Brain,
                title: "AI-Powered Learning",
                description: "Intelligent system that personalizes your journey for maximum efficiency."
              },
              {
                icon: Award,
                title: "Prestigious Certification",
                description: "Earn internationally recognized certificates that open doors worldwide."
              },
              {
                icon: Globe,
                title: "Cultural Mastery",
                description: "Immerse yourself in the rich tapestry of Arabic culture and traditions."
              },
              {
                icon: Target,
                title: "Personalized Paths",
                description: "Custom learning tracks designed specifically for your goals."
              },
              {
                icon: Shield,
                title: "Premium Support",
                description: "24/7 expert support for an unmatched learning experience."
              }
            ].map((feature, index) => (
              <StaggerChild key={index}>
                <Card className="group h-full bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 rounded-2xl backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 p-3 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </StaggerChild>
            ))}
          </StaggerContainer>
        </div>
      </section>
      
      {/* Courses Section */}
      <section id="courses" className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <ScrollAnimation direction="up" className="text-center mb-20">
            <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 mb-6 px-6 py-2 backdrop-blur-sm">
              Premium Learning Paths
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Choose Your <span className="text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From ambitious beginners to advanced scholars, discover the perfect course 
              designed to elevate your Arabic mastery to extraordinary heights.
            </p>
          </ScrollAnimation>
          
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                level: "Foundation",
                title: "Arabic Elegance",
                duration: "4 months",
                lessons: "60 premium lessons",
                description: "Begin your Arabic odyssey with sophisticated fundamentals, alphabet mastery, and essential vocabulary.",
                price: "$399",
                features: ["Arabic Alphabet Mastery", "Essential Vocabulary (800+ words)", "Grammar Foundations", "Pronunciation Excellence", "Cultural Context"],
                highlight: false
              },
              {
                level: "Mastery",
                title: "Conversational Artistry",
                duration: "8 months", 
                lessons: "120 expert lessons",
                description: "Achieve fluency through refined conversations, expanded vocabulary, and sophisticated grammar concepts.",
                price: "$799",
                features: ["Advanced Conversations", "Professional Vocabulary (3000+ words)", "Grammar Mastery", "Cultural Fluency", "Business Arabic", "Literary Analysis"],
                highlight: true
              },
              {
                level: "Elite",
                title: "Arabic Virtuosity",
                duration: "12 months",
                lessons: "180 masterclass lessons", 
                description: "Attain the highest levels of Arabic sophistication for professional, academic, and cultural excellence.",
                price: "$1299",
                features: ["Executive Arabic", "Academic Excellence", "Literary Mastery", "Media Comprehension", "Cultural Leadership", "Certification Portfolio"],
                highlight: false
              }
            ].map((course, index) => (
              <StaggerChild key={index}>
                <Card className={`relative h-full bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 rounded-2xl backdrop-blur-sm ${course.highlight ? 'ring-2 ring-primary shadow-lg scale-105' : ''}`}>
                  {course.highlight && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold rounded-full">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="pb-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10">
                        {course.level}
                      </Badge>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary">{course.price}</div>
                        <div className="text-xs text-muted-foreground">lifetime access</div>
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold mb-2">
                      {course.title}
                    </CardTitle>
                    <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                      <span>{course.lessons}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <CardDescription className="leading-relaxed">
                      {course.description}
                    </CardDescription>
                    
                    <div className="space-y-3">
                      {course.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className={`w-full ${course.highlight ? 'bg-primary hover:bg-primary-hover' : 'bg-secondary hover:bg-secondary-hover'} font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105`}
                    >
                      Begin This Journey
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </StaggerChild>
            ))}
          </StaggerContainer>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 bg-background-secondary">
        <div className="container mx-auto px-6">
          <ScrollAnimation direction="up" className="text-center mb-20">
            <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 mb-6 px-6 py-2 backdrop-blur-sm">
              Success Stories  
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              What Our <span className="text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Learners Say</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join thousands of distinguished learners who have transformed their lives 
              through the mastery of Arabic language and culture.
            </p>
          </ScrollAnimation>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Al-Mahmoud",
                role: "International Business Executive",
                company: "Fortune 500 Company",
                image: "👩‍💼",
                rating: 5,
                testimonial: "This platform elevated my Arabic to executive levels. The cultural depth and linguistic precision gave me the confidence to lead multinational teams across the Middle East."
              },
              {
                name: "Professor Ahmed Hassan", 
                role: "University Research Director",
                company: "Harvard University",
                image: "👨‍🎓",
                rating: 5,
                testimonial: "Returning to my heritage language through this exceptional platform was transformative. The balance of tradition and innovation created an experience that surpassed my expectations."
              },
              {
                name: "Ambassador Maria Rodriguez",
                role: "Cultural Diplomat", 
                company: "United Nations",
                image: "👩‍🏫",
                rating: 5,
                testimonial: "The sophistication of this curriculum is unmatched. Within months, I was conducting high-level diplomatic negotiations in Arabic with confidence and cultural sensitivity."
              }
            ].map((testimonial, index) => (
              <StaggerChild key={index}>
                <Card className="h-full bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 rounded-2xl backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                        {testimonial.image}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        <div className="text-xs text-primary">{testimonial.company}</div>
                      </div>
                    </div>
                  
                    <div className="flex mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-primary fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed italic">
                      "{testimonial.testimonial}"
                    </p>
                  </CardContent>
                </Card>
              </StaggerChild>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6">
          <ScrollAnimation direction="up" className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Begin Your <span className="text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Arabic Journey</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join our exclusive community of distinguished learners and discover the profound beauty 
              of the Arabic language. Start your premium experience today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary-hover text-primary-foreground px-12 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 group"
                onClick={() => scrollToSection('courses')}
              >
                Start Premium Trial
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground px-12 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                Schedule Consultation
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground pt-4">
              Premium access • 14-day trial • Expert support included
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
};

export default Index;