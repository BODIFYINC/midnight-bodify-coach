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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 400 }}
            className="fixed bottom-0 left-0 right-0 z-[70] rounded-t-3xl safe-bottom"
            style={{
              background: 'hsl(222, 40%, 5%)',
              borderTop: '1px solid hsla(0,0%,100%,0.08)',
            }}
          >
            <div className="px-6 pt-4 pb-6">
              {/* Handle */}
              <div className="w-10 h-1 bg-muted-foreground/20 rounded-full mx-auto mb-5" />

              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[18px] font-bold text-foreground tracking-tight">Quick Log</h2>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl bg-muted/40 flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {logOptions.map((option, i) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => handleAction(option)}
                    className="flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-border/30 active:bg-muted/30 transition-colors"
                    style={{ background: 'hsla(222, 40%, 8%, 0.6)' }}
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center shadow-lg`}>
                      <option.icon className="w-[22px] h-[22px] text-white" strokeWidth={2} />
                    </div>
                    <span className="text-[11px] font-medium text-foreground">{option.label}</span>
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
