import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
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

const isPreviewMode = () => {
  if (typeof window === 'undefined') return false;
  return window.location.search.includes('__lovable_token=') || window.location.hostname.includes('id-preview');
};

const hasSeenSplash = () => {
  try {
    return sessionStorage.getItem('bodify_splash_seen') === '1';
  } catch {
    return true;
  }
};

const MobileApp = () => {
  const { user, loading } = useAuth();
  const [showSplash, setShowSplash] = useState(() => !isPreviewMode() && !hasSeenSplash());
  const [bootGuardDone, setBootGuardDone] = useState(() => isPreviewMode() || hasSeenSplash());
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
      try {
        sessionStorage.setItem('bodify_splash_seen', '1');
      } catch {
        // ignore storage restrictions in embedded previews
      }
      setShowSplash(false);
      setBootGuardDone(true);
    }, 450);

    return () => clearTimeout(timer);
  }, [showSplash]);

  useEffect(() => {
    if (showSplash || !loading) return;

    const timeout = setTimeout(() => {
      setBootGuardDone(true);
    }, 1200);

    return () => clearTimeout(timeout);
  }, [showSplash, loading]);

  const TabLoading = () => (
    <div className="px-5 pb-32 pt-3">
      <div className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur p-5 space-y-3 animate-pulse">
        <div className="h-4 w-24 rounded bg-muted/60" />
        <div className="h-8 w-2/3 rounded bg-muted/60" />
        <div className="h-28 w-full rounded-2xl bg-muted/50" />
      </div>
    </div>
  );

  const StartupLoading = () => (
    <div className="relative min-h-screen min-h-[100dvh] overflow-hidden bg-background px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 right-[-15%] h-64 w-64 rounded-full bg-accent/12 blur-3xl" />
        <div className="absolute bottom-0 left-[-10%] h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/8 to-transparent" />
      </div>

      <div className="relative flex min-h-screen min-h-[100dvh] items-center justify-center">
        <div className="w-full max-w-sm rounded-[28px] border border-border/50 bg-card/75 p-6 text-center shadow-2xl backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] border border-accent/20 bg-gradient-to-br from-accent/15 via-primary/10 to-secondary/15">
            <img src="/lovable-uploads/1ea08858-4d09-483d-bbca-c23dca759081.png" alt="Bodify logo" className="h-10 w-10 object-contain" />
          </div>
          <p className="mt-5 text-base font-semibold text-foreground">Loading your app</p>
          <p className="mt-1 text-sm text-muted-foreground">Getting your dashboard and coach ready.</p>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted/70">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent via-primary to-secondary"
              animate={{ x: ['-35%', '100%'] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '45%' }}
            />
          </div>
        </div>
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

  const onboardingComplete = user ? hasCompletedOnboarding() : false;

  if (showSplash && !bootGuardDone) {
    return <SplashScreen show={true} subtitle={loading ? 'Securing your session' : 'Loading Bodify'} />;
  }

  if (loading && !user) {
    return <StartupLoading />;
  }

  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }

  if (!loading && user && !onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
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
