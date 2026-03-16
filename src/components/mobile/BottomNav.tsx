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
      <div className="mx-3 mb-3">
        <div className="glass rounded-2xl px-2 py-1.5 flex items-center justify-around"
          style={{ 
            boxShadow: '0 -4px 24px hsla(222, 47%, 3%, 0.6), 0 0 0 1px hsla(0,0%,100%,0.06)',
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
                  whileTap={{ scale: 0.9 }}
                  className="relative -mt-5 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg"
                  style={{ boxShadow: '0 4px 20px hsla(217, 91%, 60%, 0.4)' }}
                >
                  <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                </motion.button>
              );
            }

            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                whileTap={{ scale: 0.9 }}
                className="relative flex flex-col items-center gap-0.5 py-2 px-3 min-w-[56px]"
              >
                <Icon
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                <span className={`text-[10px] font-medium transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -top-0.5 w-5 h-0.5 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
