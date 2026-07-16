import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, AlertCircle, Star, Hotel, Sparkles } from 'lucide-react';
import heroImg from '../Assets/p1.jpg';
import nightImg from '../Assets/night view.avif';

const SLIDES = [heroImg, nightImg];

const COLORS = {
  primary: '#8B6B4D',
  secondary: '#C4A882',
  accent: '#D4AF37',
  dark: '#1A0F0A',
  gradientStart: '#2C1810',
  gradientEnd: '#4A2C1A',
};

const API_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@velvetsuites.com');
  const [password, setPassword] = useState('password123');
  const [showPass, setShowPass] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if already logged in - redirect immediately
  useEffect(() => {
    setMounted(true);
    const token = sessionStorage.getItem('token') || sessionStorage.getItem('auth_token');
    const user = sessionStorage.getItem('user');
    console.log('Login page - token:', !!token, 'user:', !!user);
    if (token && user) {
      console.log('Already logged in, redirecting to dashboard');
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const t = setInterval(() => setSlideIdx((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login to:', `${API_URL}/login`);

      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (data.success) {
        // Store everything in sessionStorage
        sessionStorage.setItem('token', data.data.token);
        sessionStorage.setItem('auth_token', data.data.token);
        sessionStorage.setItem('user', JSON.stringify(data.data.user));
        
        console.log('Login successful, redirecting to dashboard');
        // Force navigation
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  // ... rest of your Login component (the JSX)
  return (
    <div
      className={`flex min-h-screen transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      style={{ background: `linear-gradient(135deg, ${COLORS.gradientStart} 0%, ${COLORS.gradientEnd} 50%, ${COLORS.dark} 100%)` }}
    >
      {/* ── LEFT: Hero image panel ── */}
      <div className="relative hidden lg:flex lg:w-[55%] xl:w-[60%] flex-col overflow-hidden">
        {/* Sliding images */}
        {SLIDES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
            style={{ opacity: i === slideIdx ? 1 : 0 }}
          />
        ))}

        {/* Dark gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(26,15,10,0.8) 0%, rgba(74,44,26,0.4) 50%, rgba(26,15,10,0.85) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-72"
          style={{
            background: 'linear-gradient(to top, rgba(26,15,10,0.95) 0%, transparent 100%)',
          }}
        />

        {/* Gold decorative line */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.secondary}, ${COLORS.accent})` }} />

        {/* Logo top-left */}
        <div className="relative z-10 flex items-center gap-3 p-10">
          <div 
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 backdrop-blur-sm"
            style={{ background: 'rgba(139,107,77,0.3)' }}
          >
            <Hotel className="h-6 w-6" style={{ color: COLORS.accent }} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-base font-semibold text-white">VELVET SUITES</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 mt-0.5">Kigali · Rwanda</span>
          </div>
        </div>

        {/* Bottom text */}
        <div className="relative z-10 mt-auto p-10">
          {/* Star rating */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4" style={{ fill: COLORS.accent, color: COLORS.accent }} />
            ))}
            <span className="ml-2 text-sm font-medium text-white/70">Luxury Boutique Hotel</span>
          </div>

          <h2 className="font-display text-3xl xl:text-4xl font-semibold text-white leading-tight">
            Welcome to
            <br />
            <span style={{ color: COLORS.accent }}>Velvet Suites</span>
          </h2>
          <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-sm">
            Experience unparalleled comfort and elegance at Velvet Suites,
            your premier destination for luxury hospitality in the heart of Kigali.
          </p>

          {/* Slide dots */}
          <div className="flex items-center gap-2 mt-6">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIdx(i)}
                aria-label={`Slide ${i + 1}`}
                className="transition-all duration-300"
                style={{
                  width: i === slideIdx ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === slideIdx ? COLORS.accent : 'rgba(255,255,255,0.3)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Login form panel ── */}
      <div
        className="relative flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-10 lg:px-12 xl:px-16"
        style={{ background: COLORS.dark }}
      >
        {/* Subtle radial glow */}
        <div
          className="pointer-events-none absolute top-0 right-0 h-80 w-80 opacity-20"
          style={{
            background: `radial-gradient(circle, ${COLORS.primary} 0%, transparent 70%)`,
          }}
        />

        {/* Gold decorative line - top */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.secondary}, ${COLORS.accent})` }} />

        {/* Mobile logo */}
        <div className="lg:hidden mb-8 flex flex-col items-center gap-3">
          <div 
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: 'rgba(139,107,77,0.3)', border: `1px solid ${COLORS.primary}40` }}
          >
            <Hotel className="h-7 w-7" style={{ color: COLORS.accent }} />
          </div>
          <p className="font-display text-lg font-semibold text-white">VELVET SUITES</p>
        </div>

        {/* Card */}
        <div className="relative z-10 w-full max-w-sm">
          {/* Header */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: COLORS.accent }}>
              Admin Portal
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-white">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-white/50">
              Sign in to manage your Velvet Suites dashboard.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div 
              className="mb-5 flex items-start gap-2.5 rounded-xl px-4 py-3"
              style={{ 
                background: 'rgba(220,38,38,0.15)', 
                border: '1px solid rgba(220,38,38,0.3)'
              }}
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#ef4444' }} />
              <p className="text-sm text-red-400 leading-snug">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50"
              >
                Email address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/30 transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: 'rgba(255,255,255,0.1)',
                  }}
                  onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="login-password"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-12 text-sm text-white placeholder-white/30 transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: 'rgba(255,255,255,0.1)',
                  }}
                  onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="relative mt-1 w-full overflow-hidden rounded-xl py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 disabled:opacity-60 hover:opacity-90"
              style={{
                background: loading
                  ? 'rgba(139,107,77,0.6)'
                  : `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 60%, ${COLORS.primary} 100%)`,
                boxShadow: loading ? 'none' : `0 6px 24px ${COLORS.primary}60`,
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    />
                  </svg>
                  Signing in…
                </span>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 flex items-center gap-3">
            <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <Sparkles className="h-3.5 w-3.5" style={{ color: COLORS.accent }} />
            <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Footer links */}
          <p className="mt-6 text-center text-xs text-white/30">
            © {new Date().getFullYear()} Velvet Suites ·{' '}
            <a href="/" className="transition-colors" style={{ color: COLORS.accent }}>
              View website
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}