import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, User, Sparkles, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const bodifyLogo = '/lovable-uploads/1ea08858-4d09-483d-bbca-c23dca759081.png';

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: 'Missing info', description: 'Enter both email and password', variant: 'destructive' });
      return;
    }
    if (isSignUp && !name) {
      toast({ title: 'Missing name', description: 'Please enter your full name', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, name);
        if (error) {
          toast({ title: 'Sign up failed', description: error.message, variant: 'destructive' });
        } else {
          toast({ title: 'Account created! 🎉', description: "Let's set up your profile." });
          navigate('/onboarding');
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast({ title: 'Login failed', description: error.message, variant: 'destructive' });
        } else {
          toast({ title: 'Welcome back! 💪', description: 'Ready to crush your goals.' });
          navigate('/');
        }
      }
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'Something went wrong', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full h-13 pl-12 pr-4 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all duration-200";

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/6 blur-3xl" />
      </div>

      <AnimatePresence mode="wait">
        {!isSignUp ? (
          /* =================== SIGN IN =================== */
          <motion.div
            key="signin"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col justify-between px-6 pt-16 pb-8 relative z-10"
          >
            {/* Top section */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex justify-center mb-10"
              >
                <div className="w-20 h-20 rounded-3xl bg-card/80 backdrop-blur border border-border/30 flex items-center justify-center shadow-xl shadow-primary/5">
                  <img src={bodifyLogo} alt="Bodify" className="w-12 h-12 object-contain" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h1 className="text-3xl font-bold text-foreground text-center tracking-tight">
                  Welcome back
                </h1>
                <p className="text-muted-foreground text-center mt-2 text-sm">
                  Sign in to continue your fitness journey
                </p>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                className="mt-10 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground/50" />
                  <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground/50" />
                  <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className={`${inputClass} pr-12`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50">
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-13 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-primary/20 mt-6"
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
              </motion.form>
            </div>

            {/* Bottom section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center pt-6"
            >
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button
                  onClick={() => { setIsSignUp(true); setEmail(''); setPassword(''); }}
                  className="text-primary font-semibold hover:underline"
                >
                  Get Started
                </button>
              </p>
            </motion.div>
          </motion.div>
        ) : (
          /* =================== SIGN UP =================== */
          <motion.div
            key="signup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col justify-between px-6 pt-12 pb-8 relative z-10"
          >
            {/* Top section */}
            <div>
              {/* Gradient hero badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-xl shadow-accent/20">
                    <Sparkles className="w-9 h-9 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl bg-accent flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">+</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h1 className="text-3xl font-bold text-foreground text-center tracking-tight">
                  Start your journey
                </h1>
                <p className="text-muted-foreground text-center mt-2 text-sm">
                  AI-powered fitness, just for you
                </p>
              </motion.div>

              {/* Feature pills */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center gap-2 mt-5 mb-8"
              >
                {[
                  { label: 'AI Coach', color: 'bg-primary/10 text-primary border-primary/20' },
                  { label: 'Meal Plans', color: 'bg-accent/10 text-accent border-accent/20' },
                  { label: 'Workouts', color: 'bg-accent/10 text-accent border-accent/20' },
                ].map(pill => (
                  <span key={pill.label} className={`text-xs font-medium px-3.5 py-1.5 rounded-full border ${pill.color}`}>
                    {pill.label}
                  </span>
                ))}
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-3.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground/50" />
                  <input type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} className={inputClass} />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground/50" />
                  <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground/50" />
                  <input type={showPassword ? 'text' : 'password'} placeholder="Create password" value={password} onChange={e => setPassword(e.target.value)} className={`${inputClass} pr-12`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50">
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-13 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-accent/20 mt-5"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Create Free Account
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-muted-foreground/60 text-center mt-3">
                  By signing up you agree to our Terms & Privacy Policy
                </p>
              </motion.form>
            </div>

            {/* Bottom section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center pt-4"
            >
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <button
                  onClick={() => { setIsSignUp(false); setEmail(''); setPassword(''); setName(''); }}
                  className="text-accent font-semibold hover:underline"
                >
                  Sign In
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
