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
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <CardTitle className="text-xl">{t('waiting.title')}</CardTitle>
          <CardDescription>
            {t('waiting.message')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              {t('waiting.contact')}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>admin@eduplatform.ly</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+218 91 234 5678</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            {t('waiting.checkBack')}
          </p>
          
          <div className="flex gap-2">
            <Link to="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
            <Button variant="outline" onClick={logout} className="flex-1">
              {t('nav.logout')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}