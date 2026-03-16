import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Utensils, Dumbbell, Camera, Droplets, Moon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LogSheetProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

const logOptions = [
  { id: 'food', icon: Utensils, label: 'Log Food', color: 'from-primary to-accent', action: 'meals' },
  { id: 'workout', icon: Dumbbell, label: 'Log Workout', color: 'from-secondary to-purple-400', action: 'creative' },
  { id: 'photo', icon: Camera, label: 'Progress Photo', color: 'from-amber-500 to-orange-500', action: 'progress' },
  { id: 'water', icon: Droplets, label: 'Log Water', color: 'from-sky-400 to-blue-500', action: 'water' },
  { id: 'sleep', icon: Moon, label: 'Log Sleep', color: 'from-indigo-400 to-purple-500', action: 'sleep' },
];

const LogSheet = ({ open, onClose, onNavigate }: LogSheetProps) => {
  const handleAction = (option: typeof logOptions[0]) => {
    if (option.action === 'water') {
      const waterData = JSON.parse(localStorage.getItem('waterIntake') || '{"glasses":0}');
      waterData.glasses = (waterData.glasses || 0) + 1;
      waterData.date = new Date().toDateString();
      localStorage.setItem('waterIntake', JSON.stringify(waterData));
      toast({ title: '💧 Water Logged!', description: `${waterData.glasses} glasses today` });
      onClose();
    } else if (option.action === 'sleep') {
      toast({ title: '😴 Sleep Tracking', description: 'Coming soon!' });
      onClose();
    } else {
      onNavigate(option.action);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className="fixed bottom-0 left-0 right-0 z-[70] bg-card rounded-t-3xl safe-bottom"
            style={{ borderTop: '1px solid hsla(0,0%,100%,0.08)' }}
          >
            <div className="p-6">
              {/* Handle */}
              <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-6" />
              
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Quick Log</h2>
                <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted/50">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {logOptions.map((option, i) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAction(option)}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center`}>
                      <option.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-medium text-foreground">{option.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LogSheet;
