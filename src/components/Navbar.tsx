import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: t('home') },
    { path: '/dashboard', label: t('dashboard') },
    { path: '/profile', label: t('profile') },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glass-strong backdrop-blur-xl border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group hover-scale"
          >
            <div className="relative">
              <BookOpen className="w-8 h-8 text-electric-blue group-hover:text-neon-purple transition-colors" />
              <div className="absolute inset-0 bg-electric-blue/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold text-gradient tracking-tight">
              EduPlatform
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-all duration-300 hover:text-electric-blue ${
                  isActive(link.path) 
                    ? 'text-electric-blue' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-primary rounded-full animate-scale-in" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <LanguageToggle />
            
            {user ? (
              <div className="flex items-center gap-3">
                <Link 
                  to="/profile"
                  className="btn btn-ghost text-sm"
                >
                  {user.email}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="btn btn-secondary text-sm"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login"
                  className="btn btn-ghost text-sm"
                >
                  {t('login')}
                </Link>
                <Link 
                  to="/register"
                  className="btn btn-primary text-sm"
                >
                  {t('register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-strong border-t border-white/10 animate-slide-down">
            <div className="container py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 text-base font-medium transition-colors ${
                    isActive(link.path) 
                      ? 'text-electric-blue' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <ThemeToggle />
                <LanguageToggle />
              </div>

              {user ? (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <Link 
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-gray-300 hover:text-white"
                  >
                    {user.email}
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="btn btn-secondary w-full"
                  >
                    {t('logout')}
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <Link 
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn btn-ghost w-full"
                  >
                    {t('login')}
                  </Link>
                  <Link 
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn btn-primary w-full"
                  >
                    {t('register')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;