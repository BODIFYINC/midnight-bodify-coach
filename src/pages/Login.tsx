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
          toast({ title: 'Account created! 🎉', description: "Check your email to verify, then sign in." });
          setIsSignUp(false);
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

  const inputClass = "w-full h-[52px] pl-12 pr-4 rounded-2xl bg-muted/50 border border-border/40 text-foreground placeholder:text-muted-foreground/50 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all duration-200";

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[350px] h-[350px] rounded-full bg-accent/4 blur-[120px]" />
      </div>

      <AnimatePresence mode="wait">
        {!isSignUp ? (
          /* =================== SIGN IN =================== */
          <motion.div
            key="signin"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col justify-between px-6 pt-20 pb-10 relative z-10"
          >
            <div>
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="flex justify-center mb-12"
              >
                <div className="w-[88px] h-[88px] rounded-[24px] bg-card/70 backdrop-blur border border-border/30 flex items-center justify-center shadow-2xl shadow-primary/8">
                  <img src={bodifyLogo} alt="Bodify" className="w-14 h-14 object-contain" />
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h1 className="text-[28px] font-bold text-foreground text-center tracking-tight">
                  Welcome back
                </h1>
                <p className="text-muted-foreground text-center mt-2 text-[14px]">
                  Sign in to continue your fitness journey
                </p>
              </motion.div>

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                className="mt-10 space-y-3.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground/40" />
                  <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground/40" />
                  <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className={`${inputClass} pr-12`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 active:text-muted-foreground transition-colors">
                    {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                  </button>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-[52px] rounded-2xl bg-primary text-primary-foreground font-semibold text-[14px] flex items-center justify-center gap-2 disabled:opacity-50 transition-all duration-200 mt-6"
                  style={{ boxShadow: '0 8px 32px -4px hsla(217, 91%, 60%, 0.3)' }}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>Sign In <ArrowRight className="w-4 h-4" /></>
                  )}
                </motion.button>
              </motion.form>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center pt-6"
            >
              <p className="text-[13px] text-muted-foreground">
                Don't have an account?{' '}
                <button
                  onClick={() => { setIsSignUp(true); setEmail(''); setPassword(''); }}
                  className="text-primary font-semibold"
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col justify-between px-6 pt-14 pb-10 relative z-10"
          >
            <div>
              {/* Hero badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="flex justify-center mb-8"
              >
                <div className="relative">
                  <div className="w-[80px] h-[80px] rounded-[24px] bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-2xl"
                    style={{ boxShadow: '0 12px 40px -8px hsla(160, 84%, 39%, 0.3)' }}>
                    <Sparkles className="w-9 h-9 text-white" />
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-xl bg-accent flex items-center justify-center shadow-lg border-2 border-background">
                    <span className="text-white text-xs font-bold">+</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h1 className="text-[28px] font-bold text-foreground text-center tracking-tight">
                  Start your journey
                </h1>
                <p className="text-muted-foreground text-center mt-2 text-[14px]">
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
                  { label: 'AI Coach', color: 'bg-primary/10 text-primary border-primary/15' },
                  { label: 'Meal Plans', color: 'bg-accent/10 text-accent border-accent/15' },
                  { label: 'Workouts', color: 'bg-secondary/10 text-secondary border-secondary/15' },
                ].map(pill => (
                  <span key={pill.label} className={`text-[11px] font-semibold px-3.5 py-1.5 rounded-full border ${pill.color}`}>
                    {pill.label}
                  </span>
                ))}
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground/40" />
                  <input type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} className={inputClass} />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground/40" />
                  <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground/40" />
                  <input type={showPassword ? 'text' : 'password'} placeholder="Create password" value={password} onChange={e => setPassword(e.target.value)} className={`${inputClass} pr-12`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 active:text-muted-foreground transition-colors">
                    {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                  </button>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-[52px] rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-[14px] flex items-center justify-center gap-2 disabled:opacity-50 transition-all duration-200 mt-5"
                  style={{ boxShadow: '0 8px 32px -4px hsla(160, 84%, 39%, 0.25)' }}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><Sparkles className="w-4 h-4" /> Create Free Account</>
                  )}
                </motion.button>

                <p className="text-[11px] text-muted-foreground/50 text-center mt-3">
                  By signing up you agree to our Terms & Privacy Policy
                </p>
              </motion.form>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center pt-4"
            >
              <p className="text-[13px] text-muted-foreground">
                Already have an account?{' '}
                <button
                  onClick={() => { setIsSignUp(false); setEmail(''); setPassword(''); setName(''); }}
                  className="text-accent font-semibold"
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
