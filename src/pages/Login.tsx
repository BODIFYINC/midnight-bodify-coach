import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const bodifyLogo = '/lovable-uploads/1ea08858-4d09-483d-bbca-c23dca759081.png';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock user database
  const mockUsers = [
    { email: "test@example.com", password: "password123" },
    { email: "user@bodify.com", password: "fitness2025" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: 'Missing info', description: 'Enter both email and password', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      if (isSignUp) {
        // Create account - zero friction
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify({ email }));
        toast({ title: 'Account created! 🎉', description: 'Let\'s set up your profile.' });
        navigate('/onboarding');
      } else {
        // Login
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const user = [...storedUsers, ...mockUsers].find(
          (u: any) => u.email === email && u.password === password
        );
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify({ email: user.email }));
          toast({ title: 'Welcome back! 💪', description: 'Ready to crush your goals.' });
          navigate('/app');
        } else {
          toast({ title: 'Login failed', description: 'Invalid email or password.', variant: 'destructive' });
        }
      }
    }, 600);
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-background flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <img src={bodifyLogo} alt="Bodify" className="w-20 h-20 mx-auto object-contain" />
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-foreground text-center mb-1">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-8">
          {isSignUp ? 'Start your fitness journey' : 'Sign in to continue'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full h-12 px-4 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 transition-opacity"
            style={{ boxShadow: '0 4px 20px hsla(217, 91%, 60%, 0.3)' }}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {isSignUp ? 'Create Account' : 'Sign In'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full mt-6 text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
