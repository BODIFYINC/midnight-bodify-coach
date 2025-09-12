import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, BookOpen, Users, Globe, Star, Check, MessageCircle, GamepadIcon, BookMarked, Languages, PenTool, NotebookPen, Zap, Sparkles, Target, Award, TrendingUp, Lightbulb } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: t('features.interactive'),
      description: t('features.interactiveDesc'),
      color: 'from-orange-400 to-red-400'
    },
    {
      icon: Users,
      title: t('features.personalized'),
      description: t('features.personalizedDesc'),
      color: 'from-blue-400 to-cyan-400'
    },
    {
      icon: GamepadIcon,
      title: t('features.gamified'),
      description: t('features.gamifiedDesc'),
      color: 'from-purple-400 to-pink-400'
    },
    {
      icon: Languages,
      title: t('features.translation'),
      description: t('features.translationDesc'),
      color: 'from-green-400 to-emerald-400'
    },
    {
      icon: PenTool,
      title: t('features.grammar'),
      description: t('features.grammarDesc'),
      color: 'from-yellow-400 to-orange-400'
    },
    {
      icon: NotebookPen,
      title: t('features.notebook'),
      description: t('features.notebookDesc'),
      color: 'from-indigo-400 to-purple-400'
    }
  ];

  const testimonials = [
    {
      text: t('testimonials.student1'),
      name: t('testimonials.student1Name'),
      avatar: '👨‍🎓',
      rating: 5
    },
    {
      text: t('testimonials.student2'),
      name: t('testimonials.student2Name'),
      avatar: '👩‍🎓',
      rating: 5
    },
    {
      text: t('testimonials.student3'),
      name: t('testimonials.student3Name'),
      avatar: '👨‍💻',
      rating: 5
    }
  ];

  const stats = [
    { number: '1000+', label: 'Active Students', icon: Users },
    { number: '98%', label: 'Success Rate', icon: Target },
    { number: '24/7', label: 'Support', icon: MessageCircle },
    { number: '8+', label: 'Units Available', icon: BookOpen }
  ];

  const plan = {
    name: t('pricing.monthly'),
    price: t('pricing.price'),
    features: [
      t('pricing.feature1'),
      t('pricing.feature2'), 
      t('pricing.feature3'),
      t('pricing.feature4'),
      t('pricing.feature5'),
      t('pricing.feature6')
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with 3D Animated Design */}
      <section className="relative min-h-screen flex items-center gradient-animated overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/20 to-background/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[90vh]">
            <div className="text-center lg:text-left space-y-10">
              <div className="space-y-6">
                <h1 className="text-6xl md:text-8xl font-bold text-foreground tracking-tight kinetic-text">
                  {t('home.title')}
                </h1>
                <div className="clay-card p-6 inline-block">
                  <p className="text-2xl text-primary font-bold">
                    {t('brand.tagline')}
                  </p>
                </div>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                {t('home.heroDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                {!isAuthenticated ? (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="gradient-animated-button text-lg px-8 py-6 hover-lift shadow-none border-0 card-3d glow-effect">
                        {t('home.getStarted')}
                        <ArrowRight className="ml-2 h-6 w-6" />
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" size="lg" className="glass-3d text-lg px-8 py-6 hover-glow card-3d">
                        {t('home.learnMore')}
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link to="/dashboard">
                    <Button size="lg" className="gradient-animated-button text-lg px-8 py-6 hover-lift card-3d glow-effect">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            
            {/* Enhanced 3D Book Animation */}
            <div className="h-96 lg:h-[600px] flex items-center justify-center relative">
              <div className="relative">
                {/* Animated gradient background */}
                <div className="absolute inset-0 gradient-animated-card rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
                
                {/* 3D Book Container */}
                <div className="clay-card card-3d p-8 relative glass-3d">
                  <div className="float-3d relative z-10">
                    <BookOpen className="w-32 h-32 text-primary glow-effect" />
                    
                    {/* Floating particles */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 gradient-animated-button rounded-full animate-bounce-subtle clay-card"></div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 gradient-animated-card rounded-full animate-bounce-subtle delay-150 clay-card"></div>
                    <div className="absolute -left-6 top-1/2 w-4 h-4 gradient-animated rounded-full animate-bounce-subtle delay-300 clay-card"></div>
                    
                    {/* Orbiting elements */}
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full animate-spin" style={{animationDuration: '3s'}}></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent rounded-full animate-spin" style={{animationDuration: '4s', animationDirection: 'reverse'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Micro-interactions */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="bento-container">
            {stats.map((stat, index) => (
              <div key={index} className="bento-card card-3d text-center hover-tilt group glass-3d gradient-animated-card">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 gradient-animated-button rounded-full group-hover:scale-110 transition-transform duration-300 glow-effect">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-primary kinetic-text">{stat.number}</div>
                  <p className="text-lg text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Bento Grid */}
      <section className="py-32 ambient-bg relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience cutting-edge educational technology designed for the future of learning
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`bento-card card-3d group hover-lift relative overflow-hidden glass-3d gradient-animated-card ${index === 0 ? 'lg:col-span-2' : ''} ${index === 3 ? 'lg:row-span-2' : ''}`}
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="absolute inset-0 gradient-animated opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10 pb-4">
                  <div className={`mx-auto mb-6 w-16 h-16 gradient-animated-button rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 clay-card glow-effect float-3d`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl kinetic-text">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Immersive Learning Section */}
      <section className="py-32 bg-gradient-to-br from-muted/20 to-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Immersive Learning Experience
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Step into the future of education with our AI-powered platform that adapts to your learning style and provides personalized feedback in real-time.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="clay-card p-6 hover-glow">
                  <Zap className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">AI-Powered</h3>
                  <p className="text-sm text-muted-foreground">Smart algorithms that understand your learning patterns</p>
                </div>
                <div className="clay-card p-6 hover-glow">
                  <Sparkles className="w-8 h-8 text-secondary mb-4" />
                  <h3 className="font-semibold mb-2">Interactive</h3>
                  <p className="text-sm text-muted-foreground">Engaging exercises that make learning fun</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="clay-card p-8 animate-float">
                <div className="grid grid-cols-2 gap-4">
                  <div className="clay-card p-4 hover-tilt">
                    <Award className="w-8 h-8 text-primary mb-2" />
                    <p className="text-sm font-medium">Achievement System</p>
                  </div>
                  <div className="clay-card p-4 hover-tilt delay-75">
                    <TrendingUp className="w-8 h-8 text-secondary mb-2" />
                    <p className="text-sm font-medium">Progress Tracking</p>
                  </div>
                  <div className="clay-card p-4 hover-tilt delay-150">
                    <Lightbulb className="w-8 h-8 text-accent mb-2" />
                    <p className="text-sm font-medium">Smart Hints</p>
                  </div>
                  <div className="clay-card p-4 hover-tilt delay-200">
                    <Target className="w-8 h-8 text-primary mb-2" />
                    <p className="text-sm font-medium">Goal Setting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section with Enhanced Clay Design */}
      <section className="py-32 ambient-bg relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('pricing.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan for your learning journey
            </p>
          </div>
          <div className="max-w-lg mx-auto">
            <div className="bento-card relative overflow-hidden hover-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
              <CardHeader className="text-center relative z-10 pt-10 pb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl mb-4 mx-auto animate-pulse-soft">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold">{plan.name}</CardTitle>
                <div className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {plan.price}
                  <span className="text-lg text-muted-foreground font-normal">{t('pricing.perMonth')}</span>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 px-8 pb-10">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register">
                  <Button className="w-full clay-button text-lg py-6 hover-lift shadow-none border-0">
                    {t('pricing.selectPlan')}
                  </Button>
                </Link>
              </CardContent>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials with Enhanced Design */}
      <section className="py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('testimonials.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real feedback from real students transforming their English skills
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bento-card hover-lift group">
                <CardContent className="pt-8 pb-6">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">{testimonial.avatar}</div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-lg italic mb-6 leading-relaxed text-muted-foreground">
                    "{testimonial.text}"
                  </blockquote>
                  <cite className="font-semibold text-primary">— {testimonial.name}</cite>
                </CardContent>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6 text-white kinetic-text">
            {t('contact.ready') || 'Ready to Transform Your Learning?'}
          </h2>
          <p className="text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
            {t('contact.joinMessage') || 'Join thousands of learners already advancing their education with our platform'}
          </p>
          {!isAuthenticated && (
            <Link to="/register">
              <Button size="lg" className="clay-button text-xl px-10 py-6 hover-lift shadow-none border-0 bg-white text-primary hover:bg-white/90">
                {t('contact.startToday') || 'Start Your Journey Today'}
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="bento-card max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-primary">{t('contact.title')}</h3>
            <div className="space-y-4">
              <p className="text-lg">
                <strong>Phone:</strong> {t('contact.phone')}
              </p>
              <p className="text-lg">
                <strong>Email:</strong> {t('contact.email')}
              </p>
              <p className="text-muted-foreground">{t('contact.support')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;