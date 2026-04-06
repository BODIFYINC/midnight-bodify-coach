import { motion } from 'framer-motion';
import { Home, Utensils, Plus, MessageSquare, User } from 'lucide-react';
import { haptics } from '@/services/haptics';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'welcome', icon: Home, label: 'Home' },
  { id: 'meals', icon: Utensils, label: 'Meals' },
  { id: 'log', icon: Plus, label: 'Log', isCenter: true },
  { id: 'chat', icon: MessageSquare, label: 'Coach' },
  { id: 'profile', icon: User, label: 'Profile' },
];

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const handleTap = (id: string) => {
    haptics.navigate();
    onTabChange(id);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="mx-4 mb-3">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 320, damping: 28 }}
          className="rounded-[24px] px-2 py-2.5 flex items-center justify-around"
          style={{
            background: 'linear-gradient(180deg, hsla(222, 40%, 7%, 0.92), hsla(222, 47%, 3%, 0.97))',
            backdropFilter: 'blur(32px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(32px) saturate(1.4)',
            boxShadow: '0 -2px 40px hsla(222, 47%, 2%, 0.7), 0 0 0 0.5px hsla(0, 0%, 100%, 0.06), inset 0 0.5px 0 hsla(0, 0%, 100%, 0.05)',
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id ||
              (tab.id === 'profile' && ['settings', 'progress'].includes(activeTab));
            const Icon = tab.icon;

            if (tab.isCenter) {
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => { haptics.heavy(); onTabChange(tab.id); }}
                  whileTap={{ scale: 0.82, rotate: -5 }}
                  className="relative -mt-7 flex items-center justify-center w-[56px] h-[56px] rounded-[20px] bg-gradient-to-br from-accent via-primary to-accent animate-gradient"
                  style={{
                    boxShadow: '0 10px 28px -8px hsl(var(--accent) / 0.5), 0 0 0 2.5px hsl(var(--background))',
                    backgroundSize: '200% 200%',
                  }}
                >
                  <Icon className="w-[22px] h-[22px] text-secondary-foreground" strokeWidth={2.5} />
                </motion.button>
              );
            }

            return (
              <motion.button
                key={tab.id}
                onClick={() => handleTap(tab.id)}
                whileTap={{ scale: 0.82 }}
                className="relative flex flex-col items-center gap-0.5 py-1 px-4 min-w-[52px]"
              >
                <div className="relative">
                  <Icon
                    className={`w-[20px] h-[20px] transition-all duration-300 ${
                      isActive ? 'text-accent drop-shadow-[0_0_8px_hsl(var(--accent)/0.5)]' : 'text-muted-foreground/55'
                    }`}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    fill={isActive ? 'hsl(var(--accent) / 0.12)' : 'none'}
                  />
                </div>
                <span className={`text-[10px] font-medium transition-all duration-300 ${
                  isActive ? 'text-accent' : 'text-muted-foreground/55'
                }`}>
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavDot"
                    className="absolute -top-0.5 w-5 h-[3px] rounded-full bg-accent"
                    style={{ boxShadow: '0 0 10px hsl(var(--accent) / 0.6)' }}
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default BottomNav;
