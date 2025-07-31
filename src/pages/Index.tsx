import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Scene3D } from '@/components/3D/Scene3D';
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
      <section className="relative py-24 gradient-hero overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
                {t('home.title')}
              </h1>
              <p className="text-xl text-white/90 mb-4 font-medium">
                {t('brand.tagline')}
              </p>
              <p className="text-lg text-white/80 mb-8 max-w-2xl">
                {t('home.heroDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {!isAuthenticated ? (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-libya">
                        {t('home.getStarted')}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                        {t('home.learnMore')}
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link to="/dashboard">
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            
            <div className="h-96 lg:h-[500px]">
              <Suspense fallback={<div className="w-full h-full bg-white/10 rounded-lg animate-pulse" />}>
                <Scene3D className="w-full h-full" />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience cutting-edge educational technology designed for the future of learning
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('pricing.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your learning journey
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <Card className="border-primary shadow-libya">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-primary">
                  {plan.price}
                  <span className="text-sm text-muted-foreground">{t('pricing.perMonth')}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register">
                  <Button className="w-full gradient-libya text-white">
                    {t('pricing.selectPlan')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of learners already advancing their education with our platform
          </p>
          {!isAuthenticated && (
            <Link to="/register">
              <Button size="lg" variant="secondary" className="flex items-center gap-2 mx-auto">
                Start Your Journey Today
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
