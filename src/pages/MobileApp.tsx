import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import SplashScreen from '@/components/mobile/SplashScreen';
import BottomNav from '@/components/mobile/BottomNav';
import MobileHeader from '@/components/mobile/MobileHeader';
import LogSheet from '@/components/mobile/LogSheet';

const HomeTab = lazy(() => import('@/components/mobile/HomeTab'));
const ProfileTab = lazy(() => import('@/components/mobile/ProfileTab'));
const AIChatTab = lazy(() => import('@/components/dashboard/AIChatTab').then((m) => ({ default: m.AIChatTab })));
const MealsTab = lazy(() => import('@/components/dashboard/MealsTab').then((m) => ({ default: m.MealsTab })));
const ProgressTab = lazy(() => import('@/components/dashboard/ProgressTab').then((m) => ({ default: m.ProgressTab })));
const RecipesTab = lazy(() => import('@/components/dashboard/RecipesTab').then((m) => ({ default: m.RecipesTab })));
const CreativeTab = lazy(() => import('@/components/dashboard/CreativeTab').then((m) => ({ default: m.CreativeTab })));
const SettingsTab = lazy(() => import('@/components/dashboard/SettingsTab').then((m) => ({ default: m.SettingsTab })));

const tabTitles: Record<string, string> = {
  welcome: 'Bodify',
  meals: 'Meal Plan',
  chat: 'AI Coach',
  progress: 'Progress',
  recipes: 'Recipes',
  creative: 'Workouts',
  settings: 'Settings',
  wellness: 'Wellness',
  profile: 'Profile',
};

const MobileApp = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('bodify_splash_seen'));
  const [bootGuardDone, setBootGuardDone] = useState(false);
  const [activeTab, setActiveTab] = useState('welcome');
  const [logOpen, setLogOpen] = useState(false);

  const hasCompletedOnboarding = () => {
    try {
      const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
      return Boolean(
        settings?.name &&
        settings?.age &&
        settings?.height &&
        settings?.weight &&
        settings?.activityLevel &&
        settings?.goal &&
        settings?.daysPerWeek
      );
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (!showSplash) {
      setBootGuardDone(true);
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem('bodify_splash_seen', '1');
      setShowSplash(false);
      setBootGuardDone(true);
    }, 900);

    return () => clearTimeout(timer);
  }, [showSplash]);

  useEffect(() => {
    if (!loading) return;
    const timeout = setTimeout(() => {
      setBootGuardDone(true);
    }, 2800);

    return () => clearTimeout(timeout);
  }, [loading]);

  useEffect(() => {
    if (!showSplash && !user && (!loading || bootGuardDone)) {
      navigate('/login', { replace: true });
    }
  }, [showSplash, loading, user, bootGuardDone, navigate]);

  useEffect(() => {
    if (!showSplash && !loading && user && !hasCompletedOnboarding()) {
      navigate('/onboarding', { replace: true });
    }
  }, [showSplash, loading, user, navigate]);

  const TabLoading = () => (
    <div className="px-5 pb-32 pt-3">
      <div className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur p-5 space-y-3 animate-pulse">
        <div className="h-4 w-24 rounded bg-muted/60" />
        <div className="h-8 w-2/3 rounded bg-muted/60" />
        <div className="h-28 w-full rounded-2xl bg-muted/50" />
      </div>
    </div>
  );

  const handleTabChange = (tab: string) => {
    if (tab === 'log') {
      setLogOpen(true);
      return;
    }
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'welcome':
        return <HomeTab onTabChange={handleTabChange} />;
      case 'meals':
        return <div className="px-5 pb-32"><MealsTab /></div>;
      case 'chat':
        return <div className="px-5 pb-32"><AIChatTab /></div>;
      case 'progress':
        return <div className="px-5 pb-32"><ProgressTab /></div>;
      case 'recipes':
        return <div className="px-5 pb-32"><RecipesTab /></div>;
      case 'creative':
        return <div className="px-5 pb-32"><CreativeTab /></div>;
      case 'settings':
        return <div className="px-5 pb-32"><SettingsTab /></div>;
      case 'profile':
        return <ProfileTab onTabChange={handleTabChange} />;
      default:
        return <HomeTab onTabChange={handleTabChange} />;
    }
  };

  if ((showSplash && !bootGuardDone) || (loading && !bootGuardDone)) {
    return <SplashScreen show={true} subtitle={loading ? 'Securing your session' : 'Loading Bodify'} />;
  }

  if (!user) {
    return (
      <div className="min-h-screen min-h-[100dvh] bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-xs rounded-3xl border border-border/50 bg-card/70 backdrop-blur p-6 text-center space-y-3">
          <img src="/lovable-uploads/1ea08858-4d09-483d-bbca-c23dca759081.png" alt="Bodify logo" className="w-12 h-12 mx-auto object-contain" />
          <p className="text-sm font-semibold text-foreground">Opening sign in…</p>
          <div className="h-1.5 w-full rounded-full bg-muted/60 overflow-hidden">
            <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-background">
      <MobileHeader title={tabTitles[activeTab]} />

      <main className="relative overflow-y-auto" style={{ minHeight: 'calc(100dvh - 56px - 80px)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="pt-3"
          >
            <Suspense fallback={<TabLoading />}>
              {renderContent()}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      <LogSheet open={logOpen} onClose={() => setLogOpen(false)} onNavigate={handleTabChange} />
    </div>
  );
};

export default MobileApp;
