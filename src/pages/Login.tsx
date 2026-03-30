import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, User, Sparkles, Dumbbell } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const bodifyLogo = '/lovable-uploads/1ea08858-4d09-483d-bbca-c23dca759081.png';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push({ email, password, name });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify({ email, name }));
        toast({ title: 'Account created! 🎉', description: 'Let\'s set up your profile.' });
        navigate('/onboarding');
      } else {
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
    <div className="min-h-screen min-h-[100dvh] bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-[0.07]"
          style={{ background: isSignUp 
            ? 'radial-gradient(circle, hsl(var(--accent)), transparent 70%)' 
            : 'radial-gradient(circle, hsl(var(--primary)), transparent 70%)'
          }}
        />
        <div 
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-[0.05]"
          style={{ background: isSignUp 
            ? 'radial-gradient(circle, hsl(var(--primary)), transparent 70%)' 
            : 'radial-gradient(circle, hsl(var(--accent)), transparent 70%)'
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!isSignUp ? (
          /* =================== SIGN IN =================== */
          <motion.div
            key="signin"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full max-w-sm relative z-10"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex justify-center"
            >
              <img src={bodifyLogo} alt="Bodify" className="w-16 h-16 object-contain" />
            </motion.div>

            <h2 className="text-2xl font-bold text-foreground text-center mb-1">
              Welcome Back
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-8">
              Sign in to continue your journey
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 transition-all mt-2"
                style={{ boxShadow: '0 4px 20px hsla(var(--primary) / 0.3)' }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-2">Don't have an account?</p>
              <button
                onClick={() => { setIsSignUp(true); setEmail(''); setPassword(''); }}
                className="text-sm font-semibold text-primary hover:underline transition-colors"
              >
                Create Account
              </button>
            </div>
          </motion.div>
        ) : (
          /* =================== SIGN UP =================== */
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full max-w-sm relative z-10"
          >
            {/* Icon badge instead of logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex justify-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <h2 className="text-2xl font-bold text-foreground text-center mb-1">
              Join Bodify
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-2">
              Start your transformation today
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {['AI Coach', 'Custom Plans', 'Track Progress'].map(tag => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                  {tag}
                </span>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Create Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-accent to-primary text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 transition-all mt-2"
                style={{ boxShadow: '0 4px 20px hsla(var(--accent) / 0.3)' }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Get Started Free
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Already have an account?</p>
              <button
                onClick={() => { setIsSignUp(false); setEmail(''); setPassword(''); setName(''); }}
                className="text-sm font-semibold text-accent hover:underline transition-colors"
              >
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
