import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  grade: string;
  password: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  registerUser: (userData: Omit<User, 'id' | 'status' | 'createdAt'>) => Promise<boolean>;
  users: User[];
  updateUserStatus: (userId: string, status: 'approved' | 'rejected') => void;
  deleteUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = "abdullah@admin.com";
const ADMIN_PASSWORD = "Abdullah2008$hackerAA07";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load persisted auth state
    const savedAuth = localStorage.getItem('auth');
    const savedUsers = localStorage.getItem('users');
    
    if (savedAuth) {
      const { user: savedUser, isAdmin: savedIsAdmin } = JSON.parse(savedAuth);
      setUser(savedUser);
      setIsAdmin(savedIsAdmin);
    }
    
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('Login attempt:', { email, password, users });
    
    // Admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      console.log('Admin login successful');
      const adminUser: User = {
        id: 'admin',
        email: ADMIN_EMAIL,
        name: 'Administrator',
        phone: '',
        grade: '',
        password: '',
        status: 'approved',
        createdAt: new Date().toISOString()
      };
      
      setUser(adminUser);
      setIsAdmin(true);
      localStorage.setItem('auth', JSON.stringify({ user: adminUser, isAdmin: true }));
      return true;
    }

    // Regular user login - check password and status
    const existingUser = users.find(u => u.email === email);
    console.log('Found user:', existingUser);
    
    if (existingUser) {
      console.log('Password comparison:', { 
        provided: password, 
        stored: existingUser.password, 
        match: existingUser.password === password,
        status: existingUser.status 
      });
      
      if (existingUser.password === password && existingUser.status === 'approved') {
        console.log('User login successful');
        setUser(existingUser);
        setIsAdmin(false);
        localStorage.setItem('auth', JSON.stringify({ user: existingUser, isAdmin: false }));
        return true;
      }
    }

    console.log('Login failed');
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('auth');
  };

  const registerUser = async (userData: Omit<User, 'id' | 'status' | 'createdAt'>): Promise<boolean> => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    return true;
  };

  const updateUserStatus = (userId: string, status: 'approved' | 'rejected') => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const deleteUser = (userId: string) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const value: AuthContextType = {
    user,
    isAdmin,
    isAuthenticated: !!user,
    login,
    logout,
    registerUser,
    users,
    updateUserStatus,
    deleteUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}