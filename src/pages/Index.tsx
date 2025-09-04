import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Zap, Target, Users, Trophy, Sparkles, Star, ChevronDown, Shield, Heart, Activity } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BodifyLogo from '@/components/BodifyLogo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FinalCTA from '@/sections/home/FinalCTA';

const Index = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'AI Personal Trainer',
      description: 'Get personalized workouts powered by advanced AI that adapts to your fitness level and goals.',
      gradient: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Nutrition Intelligence',
      description: "Smart meal planning with nutritional insights tailored to your body's needs and preferences.",
      gradient: 'from-green-500/20 to-emerald-500/20',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Progress Analytics',
      description: 'Track your transformation with detailed analytics and real-time progress monitoring.',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Health Monitoring',
      description: 'Comprehensive health tracking with wearable integration and vital sign monitoring.',
      gradient: 'from-orange-500/20 to-red-500/20',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  const HeroCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="card-premium p-6 text-center backdrop-blur-xl"
    >
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* SEO */}
      <div className="sr-only">
        <h1>Bodify - AI-Powered Fitness & Nutrition Platform</h1>
        <p>Transform your body with personalized AI fitness coaching, smart nutrition plans, and comprehensive health tracking.</p>
      </div>

      <Navbar />

      {/* Beautiful Clean Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Clean Gradient Background */}
        <div className="absolute inset-0">
          {/* Smooth gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
          
          {/* Subtle animated orbs for depth - much cleaner */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-bl from-secondary/6 to-transparent rounded-full blur-3xl animate-float" />
          
          {/* Clean accent glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-primary/3 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          {/* Clean Professional Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-8 px-8 py-3 text-base font-bold bg-card/80 backdrop-blur-md border border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 shadow-lg">
              <Sparkles className="w-5 h-5 mr-3 text-primary" /> 
              AI-Powered Fitness Platform
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-[0.9]"
          >
            <span className="block text-foreground drop-shadow-lg tracking-tight">BODIFY YOUR</span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-lg tracking-tight">
              BODY
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-10"
          >
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-sm tracking-wide">
              Your Ultimate AI Fitness Companion
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-5xl mx-auto leading-relaxed font-medium"
          >
            Revolutionary AI-powered fitness coaching that adapts to your unique body, goals, and lifestyle. 
            Experience personalized workouts, nutrition plans, and real-time guidance that evolves with you.
          </motion.p>

          {/* Interactive Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto"
          >
            {[
              { 
                 icon: <Activity className="w-10 h-10" />, 
                 title: 'AI Personal Trainer', 
                 desc: 'Smart coaching that learns and adapts to your progress',
                 gradient: 'from-primary/25 to-primary/15'
               },
               { 
                 icon: <Heart className="w-10 h-10" />, 
                 title: 'Custom Nutrition', 
                 desc: 'Personalized meal plans tailored to your goals and preferences',
                 gradient: 'from-secondary/25 to-secondary/15'
               },
               { 
                 icon: <Target className="w-10 h-10" />, 
                 title: 'Progress Analytics', 
                 desc: 'Real-time insights and comprehensive fitness tracking',
                 gradient: 'from-accent/25 to-accent/15'
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                 className={`bg-card/60 backdrop-blur-xl rounded-3xl p-10 border border-primary/15 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:-translate-y-3 cursor-pointer group shadow-xl hover:shadow-primary/20 hover:bg-card/80`}
                 whileHover={{ scale: 1.05, y: -12 }}
                 whileTap={{ scale: 0.95 }}
               >
                 <div className="text-primary text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                   {feature.icon}
                 </div>
                 <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                   {feature.title}
                 </h3>
                 <p className="text-muted-foreground leading-relaxed text-lg group-hover:text-foreground transition-colors">
                   {feature.desc}
                 </p>
              </motion.div>
            ))}
          </motion.div>

           {/* Enhanced CTA Section */}
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.8 }}
             className="flex flex-col items-center gap-12 mt-16"
           >
             {/* Main CTA Button with enhanced effects */}
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-500 opacity-50 group-hover:opacity-70" />
                <button className="relative px-16 py-5 rounded-full text-xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl border border-primary/20 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white backdrop-blur-sm">
                  <Link to="/get-started" className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6" />
                    <span>Start Your AI Fitness Journey</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </button>
              </motion.div>
             
              {/* Enhanced Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-muted-foreground">
                {[
                  { icon: <Users className="w-6 h-6" />, text: '50K+ Users Transformed', subtext: 'Join the community' },
                  { icon: <Trophy className="w-6 h-6" />, text: '98% Goal Achievement', subtext: 'Proven results' },
                  { icon: <Zap className="w-6 h-6" />, text: '24/7 AI Support', subtext: 'Always available' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex flex-col items-center gap-3 p-6 bg-card/50 backdrop-blur-sm rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer group border border-primary/10 hover:border-primary/20 hover:bg-card/70"
                  >
                    <div className="text-primary group-hover:scale-110 transition-transform">{stat.icon}</div>
                    <div className="text-center">
                      <span className="font-bold text-lg block text-foreground">{stat.text}</span>
                      <span className="text-sm text-muted-foreground">{stat.subtext}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="text-muted-foreground">
                <ChevronDown className="w-8 h-8" />
              </motion.div>
            </motion.div>
          </div>
        </section>

      {/* Interactive Features Section */}
      <section ref={featuresRef} className="py-28 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Bodify?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Cutting-edge technology meets personalized fitness to deliver unprecedented results.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Feature Cards */}
            <div className="space-y-5">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveFeature(index)}
                  className={`card-premium p-6 cursor-pointer transition-all duration-500 ${
                    activeFeature === index ? 'border-primary/50 bg-gradient-to-r ' + feature.gradient : 'hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className={`p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-primary transition-all duration-500 ${
                        activeFeature === index ? 'scale-110' : ''
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Visual Display */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-[520px] glassmorphism rounded-3xl p-8 flex items-center justify-center"
            >
              <motion.div key={activeFeature} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center">
                <motion.div
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="w-40 h-40 mx-auto mb-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-5xl text-white shadow-glow"
                >
                  {features[activeFeature].icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">{features[activeFeature].title}</h3>
                <p className="text-muted-foreground">{features[activeFeature].description}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Transform?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Join thousands who have already achieved their fitness goals with our AI-powered platform.
            </p>
            <Button asChild size="lg" className="btn-primary px-14 py-7 text-xl font-bold group">
              <Link to="/get-started">
                Get Premium
                <motion.div className="ml-3" animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="h-7 w-7" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Success Stories with{' '}
              <span className="text-gradient">BODIFY YOUR BODY</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Real transformations from people who chose to bodify their bodies with our AI-powered platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {[
              {
                name: "Sarah M.",
                achievement: "Lost 30 lbs in 3 months",
                quote: "Bodify's AI coach understood my busy schedule and created perfect workouts. I finally bodified my body!",
                stats: "15% body fat reduction"
              },
              {
                name: "Mike R.",
                achievement: "Gained 20 lbs muscle",
                quote: "The nutrition AI was a game-changer. My transformation exceeded all expectations with Bodify.",
                stats: "25% strength increase"
              },
              {
                name: "Jessica L.",
                achievement: "Marathon ready in 6 months",
                quote: "From couch to marathon - Bodify's personalized training made the impossible possible.",
                stats: "5x endurance improvement"
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium text-center p-8 hover:scale-105 transition-all duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold text-white">
                  {story.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold mb-2">{story.name}</h3>
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  {story.achievement}
                </Badge>
                <p className="text-muted-foreground italic mb-4">"{story.quote}"</p>
                <div className="text-sm font-semibold text-secondary">{story.stats}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Showcase */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              AI Technology That{' '}
              <span className="text-gradient">Bodifies</span> Results
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experience the future of fitness with cutting-edge AI that learns, adapts, and evolves with your body.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {[
                {
                  icon: <Activity className="w-8 h-8" />,
                  title: "Adaptive Workout Intelligence",
                  description: "AI analyzes your performance in real-time, adjusting difficulty and form to maximize results while preventing injury."
                },
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: "Nutritional DNA Analysis",
                  description: "Personalized meal plans based on your metabolic profile, dietary preferences, and fitness goals."
                },
                {
                  icon: <Target className="w-8 h-8" />,
                  title: "Predictive Progress Modeling",
                  description: "See your future transformation with AI-powered predictions and milestone tracking."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-6 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glassmorphism rounded-3xl p-8 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-40 h-40 mx-auto mb-6 bg-gradient-to-r from-primary via-secondary to-accent rounded-full flex items-center justify-center"
                >
                  <Zap className="w-16 h-16 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">AI-Powered Coaching</h3>
                <p className="text-muted-foreground">
                  24/7 intelligent guidance that understands your body better than you do.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-muted/20" id="pricing">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Start Your{' '}
              <span className="text-gradient">BODIFY YOUR BODY</span> Journey
            </h2>
            <p className="text-lg text-muted-foreground">Transform your body with AI-powered precision • Cancel anytime • 30-day guarantee</p>
          </div>

          <Card className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="p-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-bold mb-4">
                BODIFY PREMIUM <span className="opacity-90">•</span> 50% OFF
              </div>

              <h3 className="text-3xl font-bold mb-4">Premium Access</h3>

              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-muted-foreground text-2xl line-through">$40.00</span>
                <span className="bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1 rounded-full">50% OFF</span>
              </div>

              <div className="flex items-center justify-center gap-3 mb-6">
                <span className={billingCycle === 'monthly' ? 'text-foreground text-sm' : 'text-muted-foreground text-sm'}>Monthly</span>
                <Switch checked={billingCycle === 'yearly'} onCheckedChange={(v) => setBillingCycle(v ? 'yearly' : 'monthly')} aria-label="Toggle yearly billing" />
                <span className={billingCycle === 'yearly' ? 'text-foreground text-sm' : 'text-muted-foreground text-sm'}>
                  Yearly <span className="ml-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-[10px] font-bold">2 months free</span>
                </span>
              </div>

              <motion.div key={billingCycle} initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.25 }} className="flex items-center justify-center mb-6">
                <span className="text-4xl font-semibold">$</span>
                <span className="text-7xl font-bold">{billingCycle === 'yearly' ? '200' : '20'}</span>
                <div className="flex flex-col items-start ml-2">
                  <span className="text-2xl">.00</span>
                  <span className="text-muted-foreground text-lg">{billingCycle === 'yearly' ? 'per year' : 'per month'}</span>
                </div>
              </motion.div>

              <ul className="space-y-3 mb-8 text-left max-w-md mx-auto">
                {[
                  '24/7 AI Fitness Coach',
                  'Unlimited Personalized Workouts',
                  'Custom Meal Plans & Recipes',
                  'Progress Tracking & Analytics',
                  'Video Exercise Library',
                  'Premium Community Access',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="sr-only">check</span>
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button asChild className="w-full text-lg py-6" size="lg">
                <Link to="/get-started">
                  Get Premium
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA />

      <Footer />

      {/* Demo Dialog */}
      <Dialog open={isDemoOpen} onOpenChange={setIsDemoOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Product Demo</DialogTitle>
          </DialogHeader>
          <div className="rounded-xl overflow-hidden">
            <video controls playsInline preload="metadata" className="w-full h-auto">
              <source src="https://cdn.pixabay.com/video/2017/09/06/12766-232470626_large.mp4" type="video/mp4" />
            </video>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
