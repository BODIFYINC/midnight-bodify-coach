import { AuthContext } from '@/contexts/AuthContext';
import Dashboard from './Dashboard';

const guestUser = {
  id: 'guest',
  email: 'guest@bodify.com',
  name: 'Guest',
  phone: '',
  grade: '10',
  password: '',
  status: 'approved' as const,
  createdAt: new Date().toISOString()
};

const guestAuthValue = {
  user: guestUser,
  isAdmin: false,
  isAuthenticated: true,
  login: async () => false,
  logout: () => {},
  registerUser: async () => false,
  users: [],
  updateUserStatus: () => {},
  deleteUser: () => {},
};

export default function GuestDashboard() {
  return (
    <AuthContext.Provider value={guestAuthValue}>
      <Dashboard />
    </AuthContext.Provider>
  );
}
