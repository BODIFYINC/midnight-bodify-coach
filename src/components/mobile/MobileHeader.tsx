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
        background: 'hsla(222, 47%, 3%, 0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid hsla(0, 0%, 100%, 0.05)',
      }}
    >
      <div className="flex items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-card/60 border border-border/30 flex items-center justify-center">
            <img src={bodifyLogo} alt="Bodify" className="w-6 h-6 object-contain" />
          </div>
          {title && (
            <h1 className="text-[17px] font-semibold text-foreground tracking-tight">{title}</h1>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="relative w-10 h-10 rounded-xl bg-muted/40 flex items-center justify-center active:bg-muted/60 transition-colors"
        >
          <Bell className="w-[18px] h-[18px] text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary ring-2 ring-background" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MobileHeader;
