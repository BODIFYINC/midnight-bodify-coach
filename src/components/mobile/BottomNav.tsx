import { motion } from 'framer-motion';
import { Home, Utensils, Plus, MessageSquare, User } from 'lucide-react';

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
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="mx-4 mb-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 30 }}
          className="rounded-2xl px-1 py-2 flex items-center justify-around"
          style={{
            background: 'linear-gradient(180deg, hsl(var(--card) / 0.92), hsl(var(--background) / 0.94))',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 -2px 32px hsl(var(--background) / 0.72), 0 0 0 1px hsl(var(--border) / 0.9), 0 12px 30px -18px hsl(var(--accent) / 0.45)',
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
                  onClick={() => onTabChange(tab.id)}
                  whileTap={{ scale: 0.88 }}
                  className="relative -mt-6 flex items-center justify-center w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-accent via-primary to-secondary"
                  style={{ boxShadow: '0 10px 28px -10px hsl(var(--accent) / 0.65)' }}
                >
                  <Icon className="w-[22px] h-[22px] text-secondary-foreground" strokeWidth={2.5} />
                </motion.button>
              );
            }

            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                whileTap={{ scale: 0.88 }}
                className="relative flex flex-col items-center gap-1 py-1.5 px-4 min-w-[52px]"
              >
                <div className="relative">
                  <Icon
                    className={`w-[20px] h-[20px] transition-colors duration-200 ${
                      isActive ? 'text-accent' : 'text-muted-foreground/70'
                    }`}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                </div>
                <span className={`text-[10px] font-medium transition-colors duration-200 ${
                  isActive ? 'text-accent' : 'text-muted-foreground/70'
                }`}>
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavDot"
                    className="absolute -top-0.5 w-1 h-1 rounded-full bg-accent"
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
