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
    haptics.tap();
    onTabChange(id);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="mx-4 mb-3">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 30 }}
          className="rounded-[22px] px-1.5 py-2.5 flex items-center justify-around"
          style={{
            background: 'linear-gradient(180deg, hsla(222, 40%, 7%, 0.95), hsla(222, 47%, 4%, 0.98))',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            boxShadow: '0 -4px 40px hsla(222, 47%, 3%, 0.8), 0 0 0 0.5px hsla(0, 0%, 100%, 0.08), inset 0 0.5px 0 hsla(0, 0%, 100%, 0.06)',
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
                  whileTap={{ scale: 0.85 }}
                  className="relative -mt-7 flex items-center justify-center w-[54px] h-[54px] rounded-[18px] bg-gradient-to-br from-accent via-primary to-accent"
                  style={{ boxShadow: '0 8px 24px -8px hsl(var(--accent) / 0.6), 0 0 0 2px hsl(var(--background))' }}
                >
                  <Icon className="w-[22px] h-[22px] text-secondary-foreground" strokeWidth={2.5} />
                </motion.button>
              );
            }

            return (
              <motion.button
                key={tab.id}
                onClick={() => handleTap(tab.id)}
                whileTap={{ scale: 0.85 }}
                className="relative flex flex-col items-center gap-0.5 py-1 px-4 min-w-[52px]"
              >
                <div className="relative">
                  <Icon
                    className={`w-[20px] h-[20px] transition-all duration-250 ${
                      isActive ? 'text-accent drop-shadow-[0_0_6px_hsl(var(--accent)/0.5)]' : 'text-muted-foreground/60'
                    }`}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                </div>
                <span className={`text-[10px] font-medium transition-all duration-250 ${
                  isActive ? 'text-accent' : 'text-muted-foreground/60'
                }`}>
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -top-0.5 w-5 h-[3px] rounded-full bg-accent"
                    style={{ boxShadow: '0 0 8px hsl(var(--accent) / 0.6)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
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
