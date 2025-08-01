import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/waiting" replace />;
  }

  // If user is authenticated but pending (not admin), redirect to waiting page
  if (!isAdmin && user?.status === 'pending') {
    return <Navigate to="/waiting" replace />;
  }

  return <>{children}</>;
}