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
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'w-full rounded-2xl border text-left transition-all duration-200',
        compact ? 'p-3.5' : 'p-4',
        selected
          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
          : 'border-border/60 bg-card/60 hover:border-primary/40'
      )}
    >
      <div className="flex items-start gap-3">
        {icon ? <span className="text-xl leading-none mt-0.5">{icon}</span> : null}
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {description ? <p className="text-xs text-muted-foreground mt-1">{description}</p> : null}
        </div>
      </div>
    </motion.button>
  );
};
