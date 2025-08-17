import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { LogOut, User, Shield } from 'lucide-react';

export function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-bold text-primary hover-scale transition-all duration-300 hover:text-secondary"
        >
          EduPlatform
        </Link>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {isAdmin ? (
                <Link to="/admin">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 hover-lift rounded-xl">
                    <Shield className="h-4 w-4" />
                    {t('nav.dashboard')}
                  </Button>
                </Link>
              ) : (
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 hover-lift rounded-xl">
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </Link>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout} 
                className="flex items-center gap-2 hover-lift rounded-xl hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="h-4 w-4" />
                {t('nav.logout')}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="hover-lift rounded-xl">
                  {t('nav.login')}
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="clay-button rounded-xl">
                  {t('nav.register')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}