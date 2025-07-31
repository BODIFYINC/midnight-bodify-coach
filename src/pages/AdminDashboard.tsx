import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { Users, UserCheck, UserX, Trash2, Check, X } from 'lucide-react';

export default function AdminDashboard() {
  const { users, updateUserStatus, deleteUser } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const pendingUsers = users.filter(user => user.status === 'pending');
  const approvedUsers = users.filter(user => user.status === 'approved');
  const rejectedUsers = users.filter(user => user.status === 'rejected');

  const handleApprove = (userId: string) => {
    updateUserStatus(userId, 'approved');
    toast({
      title: t('common.success'),
      description: 'User approved successfully'
    });
  };

  const handleReject = (userId: string) => {
    updateUserStatus(userId, 'rejected');
    toast({
      title: t('common.success'),
      description: 'User rejected'
    });
  };

  const handleDelete = (userId: string) => {
    deleteUser(userId);
    toast({
      title: t('common.success'),
      description: 'User deleted successfully'
    });
    setSelectedUser(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">{t('users.pending')}</Badge>;
      case 'approved':
        return <Badge variant="default">{t('users.approved')}</Badge>;
      case 'rejected':
        return <Badge variant="destructive">{t('users.rejected')}</Badge>;
      default:
        return null;
    }
  };

  const UserCard = ({ user }: { user: any }) => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{user.name}</CardTitle>
          {getStatusBadge(user.status)}
        </div>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div><strong>Phone:</strong> {user.phone}</div>
          <div><strong>Grade:</strong> {user.grade}</div>
          <div><strong>Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</div>
        </div>
        
        <div className="flex gap-2 mt-4">
          {user.status === 'pending' && (
            <>
              <Button
                size="sm"
                onClick={() => handleApprove(user.id)}
                className="flex items-center gap-1"
              >
                <Check className="h-4 w-4" />
                {t('users.approve')}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleReject(user.id)}
                className="flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                {t('users.reject')}
              </Button>
            </>
          )}
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="destructive"
                className="flex items-center gap-1"
              >
                <Trash2 className="h-4 w-4" />
                {t('users.delete')}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete User</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {user.name}? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(user.id)}>
                  {t('users.delete')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground">{t('dashboard.userManagement')}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.totalUsers')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.pendingApprovals')}</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingUsers.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.approvedUsers')}</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedUsers.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* User Management Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingUsers.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedUsers.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedUsers.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          {pendingUsers.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No pending users</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingUsers.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="approved" className="space-y-4">
          {approvedUsers.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No approved users</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {approvedUsers.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="rejected" className="space-y-4">
          {rejectedUsers.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No rejected users</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rejectedUsers.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}