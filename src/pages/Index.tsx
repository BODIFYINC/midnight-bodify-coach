import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, BookOpen, Users, Globe, Star, Check, MessageCircle, GamepadIcon, BookMarked, Languages, PenTool, NotebookPen, Zap, Sparkles, Target, Award, TrendingUp, Lightbulb } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

const Index = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.1 });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
    <div className="min-h-screen bg-background">
      {/* Hero Section with 3D Animated Design */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center gradient-animated overflow-hidden"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/20 to-background/40"></div>
        <motion.div 
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 100 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[90vh]">
            <motion.div 
              className="text-center lg:text-left space-y-10"
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            >
              <div className="space-y-6">
                <motion.h1 
                  className="text-6xl lg:text-8xl font-bold"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <span className="block text-transparent bg-clip-text gradient-animated-button glow-effect">
                    {t('home.title')}
                  </span>
                  <motion.span 
                    className="block text-4xl lg:text-6xl mt-4 text-primary/80 float-3d"
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    {t('brand.tagline')}
                  </motion.span>
                </motion.h1>
                <motion.p 
                  className="text-xl lg:text-2xl text-foreground/80 leading-relaxed card-3d"
                  initial={{ opacity: 0, y: 30 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  {t('home.heroDesc')}
                </motion.p>
              </div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 50 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="gradient-animated-button text-lg px-8 py-6 hover-lift glow-effect"
                >
                  <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                    {t('home.getStarted')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="glass-3d text-lg px-8 py-6 hover-tilt border-primary/30 bg-primary/10"
                >
                  {t('home.learnMore')}
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            >
              <div className="card-3d clay-card p-8 h-[500px] flex items-center justify-center">
                <motion.div 
                  className="w-80 h-80 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full animate-morph glow-effect"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section 
        ref={statsRef}
        className="py-24 gradient-clay"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center card-3d hover-lift"
                initial={{ opacity: 0, y: 50 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="glass-3d p-8 rounded-3xl">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={statsInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  >
                    <stat.icon className="h-12 w-12 text-primary mx-auto mb-4 glow-effect" />
                  </motion.div>
                  <motion.div 
                    className="text-4xl font-bold text-primary gradient-animated mb-2"
                    initial={{ opacity: 0 }}
                    animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-foreground/70">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        ref={featuresRef}
        className="py-24 bg-background"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16 space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-transparent bg-clip-text gradient-primary">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Experience cutting-edge educational technology designed for the future of learning
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="bento-card hover-tilt group"
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden">
                  <motion.div 
                    className={`h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent p-4 mb-6 card-3d group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 10 }}
                  >
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{feature.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Immersive Learning Experience */}
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                {t('immersive.badge')}
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {t('immersive.title')}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('immersive.description')}
              </p>
              <ul className="space-y-4">
                {[
                  t('immersive.feature1'),
                  t('immersive.feature2'),
                  t('immersive.feature3')
                ].map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bento-card bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-200/20">
                    <div className="h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg mb-4 flex items-center justify-center">
                      <Languages className="w-12 h-12 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{t('immersive.card1Title')}</h4>
                    <p className="text-sm text-muted-foreground">{t('immersive.card1Desc')}</p>
                  </div>
                  <div className="bento-card bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200/20 bento-tall">
                    <div className="h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-4 flex items-center justify-center">
                      <GamepadIcon className="w-12 h-12 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{t('immersive.card2Title')}</h4>
                    <p className="text-sm text-muted-foreground">{t('immersive.card2Desc')}</p>
                  </div>
                </div>
                <div className="space-y-6 pt-12">
                  <div className="bento-card bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-200/20 bento-tall">
                    <div className="h-32 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg mb-4 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{t('immersive.card3Title')}</h4>
                    <p className="text-sm text-muted-foreground">{t('immersive.card3Desc')}</p>
                  </div>
                  <div className="bento-card bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-200/20">
                    <div className="h-32 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg mb-4 flex items-center justify-center">
                      <Target className="w-12 h-12 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{t('immersive.card4Title')}</h4>
                    <p className="text-sm text-muted-foreground">{t('immersive.card4Desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Award className="w-4 h-4 mr-2" />
              {t('pricing.badge')}
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              {t('pricing.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <Card className="bento-card hover-lift relative overflow-hidden border-2 border-primary/20">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">
                {t('pricing.popular')}
              </div>
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-3xl font-bold text-foreground">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-5xl font-bold text-primary">{plan.price}</div>
                  <CardDescription className="text-muted-foreground">
                    {t('pricing.perMonth')}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  asChild 
                  size="lg" 
                  className="w-full text-lg py-6 bg-primary hover:bg-primary/90"
                >
                  <Link to="/register">
                    {t('pricing.cta')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Star className="w-4 h-4 mr-2" />
              {t('testimonials.badge')}
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              {t('testimonials.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bento-card hover-lift">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-muted-foreground leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{t('testimonials.studentLabel')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Lightbulb className="w-4 h-4 mr-2" />
              {t('cta.badge')}
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/register">
                  {t('cta.primary')}
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                {t('cta.secondary')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              {t('contact.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bento-card text-center hover-lift">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t('contact.support')}</h3>
                <p className="text-muted-foreground">{t('contact.supportDesc')}</p>
                <Button variant="outline" size="sm">
                  {t('contact.contactSupport')}
                </Button>
              </CardContent>
            </Card>

            <Card className="bento-card text-center hover-lift">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t('contact.community')}</h3>
                <p className="text-muted-foreground">{t('contact.communityDesc')}</p>
                <Button variant="outline" size="sm">
                  {t('contact.joinCommunity')}
                </Button>
              </CardContent>
            </Card>

            <Card className="bento-card text-center hover-lift">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t('contact.social')}</h3>
                <p className="text-muted-foreground">{t('contact.socialDesc')}</p>
                <Button variant="outline" size="sm">
                  {t('contact.followUs')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
