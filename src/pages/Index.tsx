import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, BookOpen, Users, Globe, Star, Check, MessageCircle, GamepadIcon, BookMarked, Languages, PenTool, NotebookPen } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: t('features.interactive'),
      description: t('features.interactiveDesc')
    },
    {
      icon: Users,
      title: t('features.personalized'),
      description: t('features.personalizedDesc')
    },
    {
      icon: GamepadIcon,
      title: t('features.gamified'),
      description: t('features.gamifiedDesc')
    },
    {
      icon: Languages,
      title: t('features.translation'),
      description: t('features.translationDesc')
    },
    {
      icon: PenTool,
      title: t('features.grammar'),
      description: t('features.grammarDesc')
    },
    {
      icon: NotebookPen,
      title: t('features.notebook'),
      description: t('features.notebookDesc')
    }
  ];

  const testimonials = [
    {
      text: t('testimonials.student1'),
      name: t('testimonials.student1Name')
    },
    {
      text: t('testimonials.student2'),
      name: t('testimonials.student2Name')
    },
    {
      text: t('testimonials.student3'),
      name: t('testimonials.student3Name')
    }
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-2xl tracking-tight">
                  {t('home.title')}
                </h1>
                <p className="text-2xl text-white/90 mb-4 font-semibold">
                  {t('brand.tagline')}
                </p>
              </div>
              <p className="text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
                {t('home.heroDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                {!isAuthenticated ? (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-elegant text-lg px-8 py-4 hover-lift">
                        {t('home.getStarted')}
                        <ArrowRight className="ml-2 h-6 w-6" />
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 glass-effect text-lg px-8 py-4">
                        {t('home.learnMore')}
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link to="/dashboard">
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 hover-lift">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            
            <div className="h-96 lg:h-[600px] flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-3xl glass-effect"></div>
              <div className="animate-float relative z-10">
                <div className="relative">
                  <BookOpen className="w-40 h-40 text-white/90 drop-shadow-2xl" />
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-accent rounded-full animate-pulse delay-75"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-background to-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience cutting-edge educational technology designed for the future of learning
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover-lift gradient-card border-0 shadow-subtle group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="relative z-10 pt-8">
                  <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 pb-8">
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('pricing.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan for your learning journey
            </p>
          </div>
          <div className="max-w-lg mx-auto">
            <Card className="border-0 shadow-elegant hover-lift gradient-card relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
              <CardHeader className="text-center relative z-10 pt-10 pb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl mb-4 mx-auto">
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
                  <Button className="w-full gradient-primary text-white text-lg py-4 hover-lift shadow-subtle">
                    {t('pricing.selectPlan')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              What Our Students Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real feedback from real students transforming their English skills
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="gradient-card border-0 shadow-subtle hover-lift">
                <CardContent className="pt-8 pb-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-lg italic mb-4 leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  <cite className="font-semibold text-primary">— {testimonial.name}</cite>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6 text-white">Ready to Transform Your Learning?</h2>
          <p className="text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of learners already advancing their education with our platform
          </p>
          {!isAuthenticated && (
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-xl px-10 py-6 hover-lift shadow-elegant">
                Start Your Journey Today
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
