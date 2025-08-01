import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Phone, GraduationCap, Calendar } from 'lucide-react';
import { Navigate, Link } from 'react-router-dom';

export default function Profile() {
  const { t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Profile
          </h1>
          <p className="text-muted-foreground mt-2">Manage your account information</p>
        </div>

        <Card className="gradient-card border-0 shadow-elegant">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription>Student Profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <GraduationCap className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Grade</p>
                  <p className="font-medium">{user.grade}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Link to="/dashboard" className="flex-1">
                <Button className="w-full">
                  Back to Dashboard
                </Button>
              </Link>
              <Button variant="outline" onClick={logout} className="flex-1">
                {t('nav.logout')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}