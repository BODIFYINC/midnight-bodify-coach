import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface StepHeaderProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  onBack?: () => void;
}

export const StepHeader = ({ step, totalSteps, title, subtitle, onBack }: StepHeaderProps) => {
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="h-9 w-9 rounded-xl border border-border/60 bg-card/60 flex items-center justify-center active:scale-95 transition-transform"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
        ) : (
          <div className="h-9 w-9" />
        )}

        <div className="flex-1 h-2 rounded-full bg-muted/70 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          />
        </div>

        <span className="text-xs font-semibold text-muted-foreground min-w-[46px] text-right">
          {step + 1}/{totalSteps}
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
};
