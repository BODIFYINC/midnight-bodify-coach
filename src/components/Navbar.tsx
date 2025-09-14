import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { LogOut, User, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-sticky glass border-b border-border/50 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container-modern h-16 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-bold text-gradient-primary hover-lift transition-all duration-300"
        >
          EduPlatform
        </Link>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {isAdmin ? (
                <Link to="/admin">
                  <Button variant="ghost" size="sm" className="btn-ghost-modern flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('nav.dashboard')}</span>
                  </Button>
                </Link>
              ) : (
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="btn-ghost-modern flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Profile</span>
                  </Button>
                </Link>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout} 
                className="btn-ghost-modern flex items-center gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">{t('nav.logout')}</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="btn-ghost-modern">
                  {t('nav.login')}
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="btn-primary">
                  {t('nav.register')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}