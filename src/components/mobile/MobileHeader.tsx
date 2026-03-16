import { Bell } from 'lucide-react';

const bodifyLogo = '/lovable-uploads/1ea08858-4d09-483d-bbca-c23dca759081.png';

interface MobileHeaderProps {
  title?: string;
}

const MobileHeader = ({ title }: MobileHeaderProps) => {
  return (
    <div className="sticky top-0 z-40 glass safe-top">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <img src={bodifyLogo} alt="Bodify" className="w-8 h-8 object-contain" />
          {title && (
            <h1 className="text-lg font-bold text-foreground">{title}</h1>
          )}
        </div>
        <button className="relative p-2 rounded-xl hover:bg-muted/50 transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
        </button>
      </div>
    </div>
  );
};

export default MobileHeader;
