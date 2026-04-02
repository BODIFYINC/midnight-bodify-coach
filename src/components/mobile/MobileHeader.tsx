import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';

const bodifyLogo = '/lovable-uploads/1ea08858-4d09-483d-bbca-c23dca759081.png';

interface MobileHeaderProps {
  title?: string;
}

const MobileHeader = ({ title }: MobileHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-40 safe-top"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--background) / 0.9), hsl(var(--card) / 0.82))',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid hsl(var(--border) / 0.8)',
      }}
    >
      <div className="flex items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-accent/20 bg-gradient-to-br from-accent/10 via-primary/10 to-secondary/10">
            <img src={bodifyLogo} alt="Bodify" className="w-6 h-6 object-contain" />
          </div>
          <div>
            {title && (
              <h1 className="text-[17px] font-semibold text-foreground tracking-tight">{title}</h1>
            )}
            <p className="text-[11px] font-medium text-muted-foreground">Coach • Meals • Progress</p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="relative flex h-10 w-10 items-center justify-center rounded-[14px] border border-border/60 bg-card/70 transition-colors active:bg-muted/60"
        >
          <Bell className="w-[18px] h-[18px] text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent ring-2 ring-background" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MobileHeader;
