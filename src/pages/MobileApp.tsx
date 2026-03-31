import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import SplashScreen from '@/components/mobile/SplashScreen';
import BottomNav from '@/components/mobile/BottomNav';
import MobileHeader from '@/components/mobile/MobileHeader';
import LogSheet from '@/components/mobile/LogSheet';
import HomeTab from '@/components/mobile/HomeTab';
import ProfileTab from '@/components/mobile/ProfileTab';

import { AIChatTab } from '@/components/dashboard/AIChatTab';
import { MealsTab } from '@/components/dashboard/MealsTab';
import { ProgressTab } from '@/components/dashboard/ProgressTab';
import { RecipesTab } from '@/components/dashboard/RecipesTab';
import { CreativeTab } from '@/components/dashboard/CreativeTab';
import { SettingsTab } from '@/components/dashboard/SettingsTab';

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
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('welcome');
  const [logOpen, setLogOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showSplash && !loading && !user) {
      navigate('/login', { replace: true });
    }
  }, [showSplash, loading, user, navigate]);

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

  if (showSplash || loading) {
    return <SplashScreen show={true} />;
  }

  if (!user) return null;

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
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      <LogSheet open={logOpen} onClose={() => setLogOpen(false)} onNavigate={handleTabChange} />
    </div>
  );
};

export default MobileApp;
