import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Scene3D } from '@/components/3D/Scene3D';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function Index() {
  // SEO
  useEffect(() => {
    document.title = 'Libya-Can — Immersive English Learning';
    const meta = document.querySelector('meta[name="description"]');
    const content = 'Immersive, professional English learning with a seamless single-page experience and subtle 3D.';
    if (meta) meta.setAttribute('content', content);
    else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  // Lazy mount 3D when in view for performance
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [mount3D, setMount3D] = useState(false);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setMount3D(true);
      });
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Organic snake-like background path
  const PathBG = () => (
    <svg className="pointer-events-none absolute inset-0 -z-10" width="100%" height="200%" viewBox="0 0 1440 2000" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="flow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
          <stop offset="50%" stopColor="hsl(200 92% 54%)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <path d="M 0 200 C 300 120 480 260 720 220 C 980 180 1060 80 1440 140 L 1440 0 L 0 0 Z" fill="url(#flow)" />
      <path d="M 0 700 C 260 640 420 760 720 700 C 980 645 1160 520 1440 580 L 1440 2000 L 0 2000 Z" fill="url(#flow)" />
    </svg>
  );

  return (
    <main>
      {/* Seamless continuous background */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'var(--gradient-depth)' }} />
        <div className="absolute inset-0 opacity-60" style={{ background: 'var(--gradient-mesh)' }} />
        <PathBG />

        <div className="container relative z-10 grid lg:grid-cols-2 gap-10 items-center py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
            <span className="inline-flex text-sm px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-foreground/90">Professional English Learning</span>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05]">
              Master English with an elegant, seamless experience
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-prose">
              A beautifully crafted, single-page journey. Smooth, fluid, and distraction-free—with subtle 3D that enhances, never overwhelms.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-xl bg-gradient-to-r from-primary via-[hsl(200_92%_54%)] to-accent text-primary-foreground shadow-glow">
                <Link to="/register">Get started</Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl">
                <Link to="/login">I already have an account</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }} className="relative h-[420px] md:h-[520px] lg:h-[560px] w-full">
            <div className="absolute inset-0 rounded-3xl glass-3d border border-white/10 shadow-aurora overflow-hidden">
              {mount3D && <Scene3D className="w-full h-full" />}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features – blend into the same canvas background without hard borders */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 opacity-20" style={{ background: 'var(--gradient-aurora)' }} />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: 'Adaptive lessons', d: 'Personalized paths that fit your pace and goals.' },
              { t: 'Live practice', d: 'Real-world conversations and instant feedback.' },
              { t: 'Mobile first', d: 'Fast, accessible and elegant on every device.' },
              { t: 'Cultural context', d: 'Learn English through meaningful, modern topics.' },
              { t: 'Progress insights', d: 'Clear visual milestones without clutter.' },
              { t: 'Privacy-first', d: 'Your learning data stays secure.' },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: i * 0.05 }} className="p-6 rounded-2xl glass-3d hover-lift">
                <h3 className="text-xl font-semibold mb-2">{f.t}</h3>
                <p className="text-foreground/70">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About – single flowing section */}
      <section className="relative py-28 md:py-36">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Designed for clarity and focus</h2>
              <p className="text-foreground/70 leading-relaxed max-w-prose">
                Every detail is intentional: thoughtful color, typography, and motion. Sections blend naturally—no hard edges, no borders, no slide feeling. Just one elegant page.
              </p>
            </motion.div>
            <motion.ul initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="grid gap-4">
              {[
                'Seamless single-page flow',
                'Subtle, tasteful 3D',
                'High contrast and accessibility',
                'Responsive and fast on mobile',
              ].map((i, k) => (
                <li key={k} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  {i}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* CTA – connected visually with gradient continuity */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0" style={{ background: 'var(--gradient-primary)' }} />
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Ready to start?</h2>
          <p className="text-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of learners enjoying a beautifully simple English journey.
          </p>
          <Button asChild size="lg" className="rounded-xl bg-foreground text-background hover:opacity-90">
            <Link to="/register">Create your account</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
