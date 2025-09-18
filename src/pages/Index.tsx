import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, BookOpen, Users, Award, Star, Globe, ArrowRight, Play, Check, Menu, X, Trophy, Clock, Target, Shield } from "lucide-react";
import Scene3D from "@/components/3D/Scene3D";

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['hero', 'features', 'courses', 'testimonials', 'pricing'];
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        
        {/* 3D Background */}
        <div className="absolute inset-0 opacity-40">
          <Scene3D />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
            <Badge variant="outline" className="border-rich-cream text-rich-cream bg-rich-cream/10 hover:bg-rich-cream/20 transition-all duration-300 px-6 py-2">
              <Star className="w-4 h-4 mr-2" />
              Premium Arabic Learning Experience
            </Badge>
            
            <h1 className="text-7xl md:text-9xl font-black text-gradient leading-none tracking-tight">
              Master Arabic
              <span className="block bg-gradient-to-r from-rich-cream via-warm-gold to-rich-cream bg-clip-text text-transparent">
                with Elegance
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground-muted max-w-4xl mx-auto leading-relaxed font-medium">
              Embark on an extraordinary journey through the beautiful Arabic language with our 
              premium, culturally-rich learning platform designed for discerning learners.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow-primary text-white px-12 py-6 text-xl font-bold rounded-full transition-all duration-500 hover:scale-105 group"
                onClick={() => scrollToSection('courses')}
              >
                Begin Your Journey
                <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-rich-cream text-rich-cream hover:bg-rich-cream hover:text-background px-12 py-6 text-xl font-bold rounded-full transition-all duration-500 hover:scale-105"
                onClick={() => scrollToSection('features')}
              >
                <Play className="mr-3 w-6 h-6" />
                Discover Features
              </Button>
            </div>
            
            <div className="flex justify-center items-center space-x-12 pt-16 text-foreground-muted">
              <div className="text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-rich-cream to-warm-gold bg-clip-text text-transparent">25K+</div>
                <div className="text-lg font-medium">Elite Learners</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-rich-cream to-warm-gold bg-clip-text text-transparent">4.9★</div>
                <div className="text-lg font-medium">Premium Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-rich-cream to-warm-gold bg-clip-text text-transparent">100+</div>
                <div className="text-lg font-medium">Master Instructors</div>
              </div>
            </div>
          </div>
        </div>
        
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-rich-cream" />
          </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-40 bg-background-secondary relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <Badge variant="outline" className="border-gold text-gold bg-gold/10 mb-8 px-6 py-2 text-lg">
              Excellence Redefined
            </Badge>
            <h2 className="text-6xl md:text-8xl font-black text-foreground mb-8 leading-tight">
              Experience <span className="bg-gradient-to-r from-gold via-champagne to-bronze bg-clip-text text-transparent">Luxury Learning</span>
            </h2>
            <p className="text-2xl text-foreground-muted max-w-4xl mx-auto leading-relaxed">
              Our platform represents the pinnacle of Arabic language education, combining 
              cutting-edge technology with authentic cultural immersion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: BookOpen,
                title: "Immersive Curriculum",
                description: "Expertly crafted lessons that adapt to your unique learning style and pace.",
                gradient: "from-gold via-gold-light to-champagne"
              },
              {
                icon: Users,
                title: "Master Instructors",
                description: "Learn from elite native speakers and certified Arabic language masters.",
                gradient: "from-champagne via-bronze to-gold"
              },
              {
                icon: Award,
                title: "Prestigious Certification",
                description: "Earn internationally recognized certificates that open doors worldwide.",
                gradient: "from-bronze via-copper to-gold"
              },
              {
                icon: Globe,
                title: "Cultural Mastery",
                description: "Immerse yourself in the rich tapestry of Arabic culture and traditions.",
                gradient: "from-gold via-champagne to-gold-light"
              },
              {
                icon: Target,
                title: "Personalized Excellence",
                description: "AI-powered learning paths tailored to your ambitious goals.",
                gradient: "from-gold-light via-gold to-champagne"
              },
              {
                icon: Shield,
                title: "Premium Support",
                description: "24/7 concierge-level support for an unmatched learning experience.",
                gradient: "from-champagne via-gold to-bronze"
              }
            ].map((feature, index) => (
              <Card key={index} className="group bg-gradient-to-br from-card to-card-hover border-border hover:border-gold/50 transition-all duration-700 hover:shadow-golden hover:-translate-y-4 rounded-3xl overflow-hidden">
                <CardHeader className="pb-6 px-8 pt-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground group-hover:text-gold transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <CardDescription className="text-foreground-muted text-lg leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Courses Section */}
      <section id="courses" className="py-40 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <Badge variant="outline" className="border-gold text-gold bg-gold/10 mb-8 px-6 py-2 text-lg">
              Premium Learning Paths
            </Badge>
            <h2 className="text-6xl md:text-8xl font-black text-foreground mb-8 leading-tight">
              Choose Your <span className="bg-gradient-to-r from-gold via-champagne to-bronze bg-clip-text text-transparent">Destiny</span>
            </h2>
            <p className="text-2xl text-foreground-muted max-w-4xl mx-auto leading-relaxed">
              From ambitious beginners to advanced scholars, discover the perfect course 
              designed to elevate your Arabic mastery to extraordinary heights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
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
              <Card key={index} className={`relative bg-gradient-to-br from-card to-card-hover border-border hover:border-gold/50 transition-all duration-700 hover:shadow-golden hover:-translate-y-4 rounded-3xl overflow-hidden ${course.highlight ? 'ring-2 ring-gold shadow-golden scale-105' : ''}`}>
                {course.highlight && (
                  <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white px-6 py-2 text-lg font-bold">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="pb-8 px-8 pt-10">
                  <div className="flex justify-between items-start mb-6">
                    <Badge variant="outline" className="border-gold text-gold bg-gold/10 px-4 py-2 text-base font-medium">
                      {course.level}
                    </Badge>
                    <div className="text-right">
                      <div className="text-4xl font-black bg-gradient-to-r from-gold to-champagne bg-clip-text text-transparent">{course.price}</div>
                      <div className="text-sm text-foreground-muted font-medium">lifetime access</div>
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-black text-foreground mb-4">
                    {course.title}
                  </CardTitle>
                  <div className="flex gap-6 text-base text-foreground-muted mb-6">
                    <span className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gold" />
                      {course.duration}
                    </span>
                    <span>{course.lessons}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8 px-8 pb-8">
                  <CardDescription className="text-lg leading-relaxed text-foreground-muted">
                    {course.description}
                  </CardDescription>
                  
                  <div className="space-y-4">
                    {course.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <Check className="w-6 h-6 text-gold flex-shrink-0" />
                        <span className="text-foreground-muted text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full ${course.highlight ? 'bg-gradient-primary hover:shadow-glow-primary scale-105' : 'bg-gradient-luxury hover:bg-gold hover:text-black'} text-white font-bold py-4 text-lg rounded-full transition-all duration-500 hover:scale-105`}
                  >
                    Begin This Journey
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-40 bg-background-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <Badge variant="outline" className="border-gold text-gold bg-gold/10 mb-8 px-6 py-2 text-lg">
              Elite Success Stories  
            </Badge>
            <h2 className="text-6xl md:text-8xl font-black text-foreground mb-8 leading-tight">
              What Our <span className="bg-gradient-to-r from-gold via-champagne to-bronze bg-clip-text text-transparent">Elite Say</span>
            </h2>
            <p className="text-2xl text-foreground-muted max-w-4xl mx-auto leading-relaxed">
              Join thousands of distinguished learners who have transformed their lives 
              through the mastery of Arabic language and culture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                name: "Dr. Sarah Al-Mahmoud",
                role: "International Business Executive",
                company: "Fortune 500 Company",
                image: "👩‍💼",
                rating: 5,
                testimonial: "This platform elevated my Arabic to executive levels. The cultural depth and linguistic precision gave me the confidence to lead multinational teams across the Middle East with authentic expertise."
              },
              {
                name: "Professor Ahmed Hassan", 
                role: "University Research Director",
                company: "Harvard University",
                image: "👨‍🎓",
                rating: 5,
                testimonial: "Returning to my heritage language through this exceptional platform was transformative. The balance of tradition and innovation created a learning experience that surpassed my highest expectations."
              },
              {
                name: "Ambassador Maria Rodriguez",
                role: "Cultural Diplomat", 
                company: "United Nations",
                image: "👩‍🏫",
                rating: 5,
                testimonial: "The sophistication of this curriculum is unmatched. Within months, I was conducting high-level diplomatic negotiations in Arabic with confidence and cultural sensitivity that impressed even native speakers."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-card to-card-hover border-border hover:border-gold/50 transition-all duration-700 hover:shadow-golden hover:-translate-y-2 rounded-3xl">
                <CardContent className="p-10">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-3xl shadow-lg">
                      {testimonial.image}
                    </div>
                    <div>
                      <div className="font-black text-xl text-foreground">{testimonial.name}</div>
                      <div className="text-base text-foreground-muted font-medium">{testimonial.role}</div>
                      <div className="text-sm text-gold font-medium">{testimonial.company}</div>
                    </div>
                  </div>
                  
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-gold fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-foreground-muted leading-relaxed text-lg italic">
                    "{testimonial.testimonial}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-40 bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-128 h-128 bg-champagne/8 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-8xl font-black text-foreground mb-8">
              Excellence in <span className="bg-gradient-to-r from-gold via-champagne to-bronze bg-clip-text text-transparent">Numbers</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { number: "25K+", label: "Distinguished Learners" },
              { number: "95%", label: "Success Rate" },
              { number: "4.9★", label: "Premium Rating" },
              { number: "50+", label: "Countries Served" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl md:text-8xl font-black bg-gradient-to-r from-gold via-champagne to-bronze bg-clip-text text-transparent mb-4">
                  {stat.number}
                </div>
                <div className="text-xl md:text-2xl text-foreground-muted font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-40 bg-background-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-luxury opacity-60"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <h2 className="text-6xl md:text-8xl font-black text-foreground leading-tight">
              Begin Your <span className="bg-gradient-to-r from-gold via-champagne to-bronze bg-clip-text text-transparent">Arabic Legacy</span>
            </h2>
            <p className="text-2xl text-foreground-muted leading-relaxed font-medium">
              Join our exclusive community of distinguished learners and discover the profound beauty 
              of the Arabic language. Start with our premium trial and experience excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-12">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow-primary text-white px-16 py-6 text-xl font-bold rounded-full transition-all duration-500 hover:scale-105 group"
              >
                Start Premium Trial
                <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-gold text-gold hover:bg-gold hover:text-black px-16 py-6 text-xl font-bold rounded-full transition-all duration-500 hover:scale-105"
              >
                Schedule Consultation
              </Button>
            </div>
            
            <div className="text-lg text-foreground-subtle pt-6 font-medium">
              Premium access • 14-day luxury trial • VIP support included
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;