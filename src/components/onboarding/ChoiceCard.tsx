import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ChoiceCardProps {
  title: string;
  description?: string;
  icon?: string;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
}

export const ChoiceCard = ({
  title,
  description,
  icon,
  selected,
  onClick,
  compact = false,
}: ChoiceCardProps) => {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      whileHover={{ y: -1 }}
      onClick={onClick}
      className={cn(
        'w-full rounded-2xl border text-left transition-all duration-200 relative overflow-hidden',
        compact ? 'p-3.5 min-h-[72px]' : 'p-4 min-h-[84px]',
        selected
          ? 'border-primary/70 bg-primary/10 shadow-lg shadow-primary/10'
          : 'border-border/60 bg-card/60 hover:border-primary/40 hover:bg-card/80'
      )}
      aria-pressed={selected}
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 to-accent/5" />

      <div className="flex items-start gap-3 relative z-10">
        {icon ? <span className="text-xl leading-none mt-0.5">{icon}</span> : null}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {description ? <p className="text-xs text-muted-foreground mt-1">{description}</p> : null}
        </div>

        <div
          className={cn(
            'mt-0.5 h-5 w-5 rounded-full border transition-all duration-200 flex items-center justify-center',
            selected ? 'border-primary bg-primary/20' : 'border-border/70 bg-background/40'
          )}
        >
          <span
            className={cn(
              'h-2.5 w-2.5 rounded-full transition-all duration-200',
              selected ? 'bg-primary scale-100' : 'bg-transparent scale-50'
            )}
          />
        </div>
      </div>
    </motion.button>
  );
};
