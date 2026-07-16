import { useState, useEffect } from 'react';
import { useNavigate, NavLink, Routes, Route } from 'react-router-dom';
import {
  LayoutDashboard, BedDouble, UtensilsCrossed, Star, HelpCircle,
  Settings, LogOut, Bell, Menu, X, FileText, Wand2, Hotel,
  Home, Info, Shield, Image as GalleryIcon, Menu as MenuIcon,
  Award, ChevronRight, Sparkles, Users, Utensils, Image
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// CMS sections - Import from dashboard folder
import OverviewSection from './dashboard/OverviewSection';
import SiteSettingsSection from './dashboard/SiteSettingsSection';
import HomepageManager from './dashboard/home/HomepageManager';
import AboutManager from './dashboard/about/AboutManager';
import PoliciesManager from './dashboard/policies/PoliciesManager';
import GalleryManager from './dashboard/gallery/GalleryManager';
import MenuManager from './dashboard/menu/MenuManager';
import FooterManager from './dashboard/FooterManager';

// ─── Velvet Suites Nav Structure ────────────────────────────────────────────
const navGroups = [
  {
    label: 'Dashboard',
    items: [
      { label: 'Overview', icon: LayoutDashboard, to: '/admin' },
    ],
  },
  {
    label: 'Homepage',
    items: [
      { label: 'Homepage Manager', icon: Home, to: '/admin/home' },
    ],
  },
  {
    label: 'About Us',
    items: [
      { label: 'About Manager', icon: Info, to: '/admin/about' },
    ],
  },
  {
    label: 'Policies',
    items: [
      { label: 'Policies Manager', icon: Shield, to: '/admin/policies' },
    ],
  },
  {
    label: 'Gallery',
    items: [
      { label: 'Gallery Manager', icon: GalleryIcon, to: '/admin/gallery' },
    ],
  },
  {
    label: 'Menu',
    items: [
      { label: 'Menu Manager', icon: Utensils, to: '/admin/menu' },
    ],
  },
  {
    label: 'Footer',
    items: [
      { label: 'Footer Manager', icon: Award, to: '/admin/footer' },
    ],
  },
];

// ─── Velvet Suites Brand Colors ──────────────────────────────────────────────
const COLORS = {
  primary: '#8B6B4D',
  primaryLight: '#C4A882',
  accent: '#D4AF37',
  accentLight: '#E8C84A',
  dark: '#1A0F0A',
  darkLight: '#2C1810',
  background: '#F5F0EB',
  white: '#FFFFFF',
  text: '#1A0F0A',
  textLight: '#6B5B4F',
  border: '#E8DFD8',
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ open, onClose, onLogout, user }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ 
          background: `linear-gradient(180deg, ${COLORS.dark} 0%, ${COLORS.darkLight} 100%)`,
          boxShadow: '4px 0 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Scrollbar styling */}
        <style>
          {`
            .sidebar-scroll::-webkit-scrollbar {
              width: 4px;
            }
            .sidebar-scroll::-webkit-scrollbar-track {
              background: rgba(255,255,255,0.05);
            }
            .sidebar-scroll::-webkit-scrollbar-thumb {
              background: ${COLORS.accent};
              border-radius: 2px;
            }
            .sidebar-scroll::-webkit-scrollbar-thumb:hover {
              background: ${COLORS.accentLight};
            }
          `}
        </style>

        {/* Logo */}
        <div className="flex h-20 shrink-0 items-center gap-3 border-b px-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div 
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: 'rgba(212,175,55,0.15)', border: `1px solid ${COLORS.accent}40` }}
          >
            <Hotel className="h-6 w-6" style={{ color: COLORS.accent }} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-sm font-semibold" style={{ color: COLORS.white }}>VELVET SUITES</span>
            <span className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Admin Portal</span>
          </div>
          <button onClick={onClose} className="ml-auto text-white/40 hover:text-white/70 lg:hidden" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6 sidebar-scroll">
          {navGroups.map(group => (
            <div key={group.label}>
              <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map(item => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/admin'}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'text-white'
                            : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                        }`
                      }
                      style={({ isActive }) => ({
                        background: isActive ? `linear-gradient(135deg, ${COLORS.primary}40, ${COLORS.accent}20)` : 'transparent',
                        border: isActive ? `1px solid ${COLORS.accent}40` : '1px solid transparent',
                      })}
                    >
                      <item.icon 
                        className="shrink-0 opacity-80" 
                        style={{ width: 18, height: 18, color: 'inherit' }} 
                      />
                      {item.label}
                      {item.label === 'Overview' && (
                        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${COLORS.accent}30`, color: COLORS.accent }}>
                          Home
                        </span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* External link */}
          <div className="border-t pt-5" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/50 hover:bg-white/5 hover:text-white/80 transition-all"
            >
              <span className="shrink-0 opacity-80 text-white/50">🌐</span>
              View Website
            </a>
          </div>
        </nav>

        {/* User footer */}
        <div className="shrink-0 border-t p-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <div 
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold uppercase"
              style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})` }}
            >
              {user?.name?.[0] ?? 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name || 'Admin'}</p>
              <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>{user?.email || 'admin@velvetsuites.com'}</p>
            </div>
            <button
              onClick={onLogout}
              aria-label="Logout"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/40 hover:bg-red-500/15 hover:text-red-400 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── Dashboard shell ──────────────────────────────────────────────────────────
export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const token = sessionStorage.getItem('token') || sessionStorage.getItem('auth_token');
    const storedUser = sessionStorage.getItem('user');
    
    if (!loading && !user && !token) {
      navigate('/login', { replace: true });
      return;
    }
    
    if (!loading && token && storedUser && !user) {
      try {
        JSON.parse(storedUser);
        window.location.reload();
      } catch (e) {
        navigate('/login', { replace: true });
      }
    }
    
    setChecked(true);
  }, [user, navigate, loading]);

  const handleLogout = () => { 
    logout(); 
    navigate('/login', { replace: true }); 
  };

  if (loading || !checked) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: COLORS.background }}>
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: `${COLORS.primary}`, borderTopColor: 'transparent' }} />
          <p className="text-sm font-medium" style={{ color: COLORS.textLight }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate('/login', { replace: true });
    return null;
  }

  return (
    <div
      className={`flex min-h-screen transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      style={{ background: COLORS.background }}
    >
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        user={user}
      />

      {/* Main area */}
      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 sm:px-6 shadow-sm" style={{ borderColor: COLORS.border }}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border lg:hidden transition-colors"
            style={{ borderColor: COLORS.border, color: COLORS.text }}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium" style={{ color: COLORS.text }}>
              {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border transition-colors"
              style={{ borderColor: COLORS.border, color: COLORS.text }}
            >
              <Bell style={{ width: 18, height: 18 }} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full ring-2 ring-white" style={{ background: COLORS.accent }} />
            </button>
            <div 
              className="flex h-9 w-9 items-center justify-center rounded-full text-white text-sm font-bold uppercase"
              style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})` }}
            >
              {user?.name?.[0] ?? 'A'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            {/* Dashboard Overview */}
            <Route index element={<OverviewSection />} />
            
            {/* Site Settings */}
            <Route path="site-settings" element={<SiteSettingsSection />} />
            
            {/* Homepage Manager */}
            <Route path="home/*" element={<HomepageManager />} />
            
            {/* About Manager */}
            <Route path="about/*" element={<AboutManager />} />
            
            {/* Policies Manager */}
            <Route path="policies/*" element={<PoliciesManager />} />
            
            {/* Gallery Manager */}
            <Route path="gallery/*" element={<GalleryManager />} />
            
            {/* Menu Manager */}
            <Route path="menu/*" element={<MenuManager />} />
            
            {/* Footer Manager */}
            <Route path="footer" element={<FooterManager />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}