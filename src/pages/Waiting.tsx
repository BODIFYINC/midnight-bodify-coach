import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Clock, Mail, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Waiting() {
  const { t } = useLanguage();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-lg gradient-card border-0 shadow-elegant">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-glow">
            <Clock className="h-8 w-8 text-white animate-pulse" />
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t('waiting.title')}</CardTitle>
          <CardDescription>
            {t('waiting.message')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="glass-card p-4 rounded-lg border border-primary/20">
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
              <MessageCircle className="h-5 w-5" />
              {t('waiting.contact')}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>admin@eduplatform.ly</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+218926845740</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            {t('waiting.checkBack')}
          </p>
          
          <div className="flex gap-3 pt-2">
            <Link to="/" className="flex-1">
              <Button variant="outline" className="w-full hover-scale">
                Back to Home
              </Button>
            </Link>
            <Button variant="outline" onClick={logout} className="flex-1 hover-scale">
              {t('nav.logout')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}