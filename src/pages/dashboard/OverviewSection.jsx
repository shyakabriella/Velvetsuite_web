import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Eye,
  ArrowRight,
  Settings,
  Info,
  BedDouble,
  Star,
  Image as GalleryIcon,
  MessageSquare,
  CheckCircle,
  Clock,
  Award,
  Sparkles,
  Hotel,
  Utensils,
  Shield,
  Menu as MenuIcon,
} from "lucide-react";

// Velvet Suites Brand Colors
const COLORS = {
  primary: '#8B6B4D',
  primaryLight: '#C4A882',
  accent: '#D4AF37',
  accentLight: '#E8C84A',
  dark: '#1A0F0A',
  background: '#F5F0EB',
  white: '#FFFFFF',
  text: '#1A0F0A',
  textLight: '#6B5B4F',
  border: '#E8DFD8',
  success: '#2D7D46',
};

const API_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");
const getToken = () => sessionStorage.getItem("token") || localStorage.getItem("token") || localStorage.getItem("auth_token");

export default function OverviewSection() {
  const [dashboardData, setDashboardData] = useState({
    loading: true,
    error: null,
    homepageHero: 0,
    homepageSectionOne: 0,
    homepageSectionTwo: 0,
    homepageSectionThree: 0,
    aboutHero: 0,
    aboutSectionOne: 0,
    aboutSectionTwo: 0,
    aboutSectionThree: 0,
    policiesHero: 0,
    policiesSectionOne: 0,
    galleryHero: 0,
    gallerySectionOne: 0,
    menuHero: 0,
    menuCategories: 0,
    menuItems: 0,
    footer: null,
    totalSections: 0,
    totalMenuItems: 0,
    totalCategories: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = getToken();
      const headers = {
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const [
        homepageHeroRes,
        homepageSectionOneRes,
        homepageSectionTwoRes,
        homepageSectionThreeRes,
        aboutHeroRes,
        aboutSectionOneRes,
        aboutSectionTwoRes,
        aboutSectionThreeRes,
        policiesHeroRes,
        policiesSectionOneRes,
        galleryHeroRes,
        gallerySectionOneRes,
        menuHeroRes,
        menuCategoriesRes,
        menuItemsRes,
        footerRes,
      ] = await Promise.all([
        fetch(`${API_URL}/homepage/hero`, { headers }).catch(() => ({ json: () => ({ success: false, data: [] }) })),
        fetch(`${API_URL}/homepage/section-one`, { headers }).catch(() => ({ json: () => ({ success: false, data: [] }) })),
        fetch(`${API_URL}/homepage/section-two`, { headers }).catch(() => ({ json: () => ({ success: false, data: [] }) })),
        fetch(`${API_URL}/homepage/section-three`, { headers }).catch(() => ({ json: () => ({ success: false, data: [] }) })),
        fetch(`${API_URL}/about/hero`, { headers }).catch(() => ({ json: () => ({ success: false, data: [] }) })),
        fetch(`${API_URL}/about/section-one`, { headers }).catch(() => ({ json: () => ({ success: false, data: [] }) })),
        fetch(`${API_URL}/about/section-two`, { headers }).catch(() => ({ json: () => ({ success: false, data: [] }) })),
        fetch(`${API_URL}/about/section-three`, { headers }).catch(() => ({ json: () => ({ success: false, data: [] }) })),
        fetch(`${API_URL}/policies/hero`, { headers }).catch(() => ({ json: () => ({ success: false, data: [] }) })),
        fetch(`${API_URL}/policies/section-one`, { headers }).catch(() => ({ json: () => ({ success: false, data: [] }) })),
        fetch(`${API_URL}/gallery/hero`, { headers }).catch(() => ({ json: () => ({ success: false, data: [] }) })),
        fetch(`${API_URL}/gallery/section-one`, { headers }).catch(() => ({ json: () => ({ success: false, data: [] }) })),
        fetch(`${API_URL}/menu/hero`, { headers }).catch(() => ({ json: () => ({ success: false, data: [] }) })),
        fetch(`${API_URL}/menu/categories`, { headers }).catch(() => ({ json: () => ({ success: false, data: [] }) })),
        fetch(`${API_URL}/menu/items`, { headers }).catch(() => ({ json: () => ({ success: false, data: [] }) })),
        fetch(`${API_URL}/footer`, { headers }).catch(() => ({ json: () => ({ success: false, data: null }) })),
      ]);

      const data = await Promise.all([
        homepageHeroRes.json(),
        homepageSectionOneRes.json(),
        homepageSectionTwoRes.json(),
        homepageSectionThreeRes.json(),
        aboutHeroRes.json(),
        aboutSectionOneRes.json(),
        aboutSectionTwoRes.json(),
        aboutSectionThreeRes.json(),
        policiesHeroRes.json(),
        policiesSectionOneRes.json(),
        galleryHeroRes.json(),
        gallerySectionOneRes.json(),
        menuHeroRes.json(),
        menuCategoriesRes.json(),
        menuItemsRes.json(),
        footerRes.json(),
      ]);

      const [
        homepageHero,
        homepageSectionOne,
        homepageSectionTwo,
        homepageSectionThree,
        aboutHero,
        aboutSectionOne,
        aboutSectionTwo,
        aboutSectionThree,
        policiesHero,
        policiesSectionOne,
        galleryHero,
        gallerySectionOne,
        menuHero,
        menuCategories,
        menuItems,
        footer,
      ] = data;

      const homepageHeroCount = homepageHero.success ? homepageHero.data?.length || 0 : 0;
      const homepageSectionOneCount = homepageSectionOne.success ? homepageSectionOne.data?.length || 0 : 0;
      const homepageSectionTwoCount = homepageSectionTwo.success ? homepageSectionTwo.data?.length || 0 : 0;
      const homepageSectionThreeCount = homepageSectionThree.success ? homepageSectionThree.data?.length || 0 : 0;
      const aboutHeroCount = aboutHero.success ? aboutHero.data?.length || 0 : 0;
      const aboutSectionOneCount = aboutSectionOne.success ? aboutSectionOne.data?.length || 0 : 0;
      const aboutSectionTwoCount = aboutSectionTwo.success ? aboutSectionTwo.data?.length || 0 : 0;
      const aboutSectionThreeCount = aboutSectionThree.success ? aboutSectionThree.data?.length || 0 : 0;
      const policiesHeroCount = policiesHero.success ? policiesHero.data?.length || 0 : 0;
      const policiesSectionOneCount = policiesSectionOne.success ? policiesSectionOne.data?.length || 0 : 0;
      const galleryHeroCount = galleryHero.success ? galleryHero.data?.length || 0 : 0;
      const gallerySectionOneCount = gallerySectionOne.success ? gallerySectionOne.data?.length || 0 : 0;
      const menuHeroCount = menuHero.success ? menuHero.data?.length || 0 : 0;
      const menuCategoriesCount = menuCategories.success ? menuCategories.data?.length || 0 : 0;
      const menuItemsCount = menuItems.success ? menuItems.data?.length || 0 : 0;
      const footerData = footer.success ? footer.data : null;

      const totalSections = 
        homepageHeroCount + homepageSectionOneCount + homepageSectionTwoCount + homepageSectionThreeCount +
        aboutHeroCount + aboutSectionOneCount + aboutSectionTwoCount + aboutSectionThreeCount +
        policiesHeroCount + policiesSectionOneCount +
        galleryHeroCount + gallerySectionOneCount +
        menuHeroCount;

      setDashboardData({
        loading: false,
        error: null,
        homepageHero: homepageHeroCount,
        homepageSectionOne: homepageSectionOneCount,
        homepageSectionTwo: homepageSectionTwoCount,
        homepageSectionThree: homepageSectionThreeCount,
        aboutHero: aboutHeroCount,
        aboutSectionOne: aboutSectionOneCount,
        aboutSectionTwo: aboutSectionTwoCount,
        aboutSectionThree: aboutSectionThreeCount,
        policiesHero: policiesHeroCount,
        policiesSectionOne: policiesSectionOneCount,
        galleryHero: galleryHeroCount,
        gallerySectionOne: gallerySectionOneCount,
        menuHero: menuHeroCount,
        menuCategories: menuCategoriesCount,
        menuItems: menuItemsCount,
        footer: footerData,
        totalSections: totalSections,
        totalMenuItems: menuItemsCount,
        totalCategories: menuCategoriesCount,
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setDashboardData(prev => ({
        ...prev,
        loading: false,
        error: "Failed to load dashboard data",
      }));
    }
  };

  const mainStats = [
    { label: "Total Sections", value: dashboardData.totalSections.toString(), icon: Settings, link: "/admin/home", description: "All content sections" },
    { label: "Homepage", value: (dashboardData.homepageHero + dashboardData.homepageSectionOne + dashboardData.homepageSectionTwo + dashboardData.homepageSectionThree).toString(), icon: Home, link: "/admin/home", description: "Hero + 3 sections" },
    { label: "About Us", value: (dashboardData.aboutHero + dashboardData.aboutSectionOne + dashboardData.aboutSectionTwo + dashboardData.aboutSectionThree).toString(), icon: Info, link: "/admin/about", description: "Hero + 3 sections" },
    { label: "Menu Items", value: dashboardData.totalMenuItems.toString(), icon: Utensils, link: "/admin/menu", description: `${dashboardData.totalMenuItems} items available` },
    { label: "Categories", value: dashboardData.totalCategories.toString(), icon: MenuIcon, link: "/admin/menu", description: `${dashboardData.totalCategories} menu categories` },
    { label: "Policies", value: (dashboardData.policiesHero + dashboardData.policiesSectionOne).toString(), icon: Shield, link: "/admin/policies", description: "Hero + 1 section" },
  ];

  const quickLinks = [
    { label: "Homepage", icon: Home, link: "/admin/home" },
    { label: "About Us", icon: Info, link: "/admin/about" },
    { label: "Policies", icon: Shield, link: "/admin/policies" },
    { label: "Gallery", icon: GalleryIcon, link: "/admin/gallery" },
    { label: "Menu", icon: Utensils, link: "/admin/menu" },
    { label: "Footer", icon: Award, link: "/admin/footer" },
  ];

  if (dashboardData.loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" style={{ borderColor: COLORS.primary, borderTopColor: 'transparent' }} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div 
        className="rounded-2xl p-6 text-white shadow-lg"
        style={{ 
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome to Velvet Suites</h1>
            <p className="mt-1" style={{ color: 'rgba(255,255,255,0.85)' }}>Manage your hotel content from one central dashboard.</p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
            <Hotel size={20} className="text-white/80" />
            <span className="text-sm font-medium">Kigali, Rwanda</span>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {mainStats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.link}
            className="group rounded-xl border bg-white p-5 transition-all hover:shadow-md"
            style={{ 
              borderColor: COLORS.border,
              hover: { borderColor: COLORS.accent }
            }}
          >
            <div className="flex items-start justify-between">
              <div className="rounded-lg p-2.5" style={{ background: `${COLORS.primary}15` }}>
                <stat.icon size={20} style={{ color: COLORS.primary }} />
              </div>
              <ArrowRight size={16} className="text-slate-300 transition-colors group-hover:text-amber-500" />
            </div>
            <p className="mt-4 text-3xl font-bold" style={{ color: COLORS.text }}>{stat.value}</p>
            <p className="mt-1 text-sm" style={{ color: COLORS.textLight }}>{stat.label}</p>
            {stat.description && <p className="mt-1 text-xs" style={{ color: COLORS.textLight }}>{stat.description}</p>}
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm" style={{ borderColor: COLORS.border }}>
          <h3 className="text-lg font-semibold mb-5" style={{ color: COLORS.text }}>Quick Links</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                to={link.link}
                className="flex items-center gap-2 rounded-lg border p-3 text-sm transition-colors"
                style={{ 
                  borderColor: COLORS.border,
                  color: COLORS.textLight,
                }}
              >
                <link.icon size={16} style={{ color: COLORS.primary }} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm" style={{ borderColor: COLORS.border }}>
          <h3 className="text-lg font-semibold mb-5" style={{ color: COLORS.text }}>Content Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle size={16} style={{ color: COLORS.accent }} />
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: COLORS.text }}>Total Sections</p>
                <p className="text-xs" style={{ color: COLORS.textLight }}>{dashboardData.totalSections} sections configured</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle size={16} style={{ color: COLORS.accent }} />
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: COLORS.text }}>Menu Items</p>
                <p className="text-xs" style={{ color: COLORS.textLight }}>{dashboardData.totalMenuItems} items available</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle size={16} style={{ color: COLORS.accent }} />
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: COLORS.text }}>Menu Categories</p>
                <p className="text-xs" style={{ color: COLORS.textLight }}>{dashboardData.totalCategories} categories</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle size={16} style={{ color: COLORS.accent }} />
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: COLORS.text }}>Footer</p>
                <p className="text-xs" style={{ color: COLORS.textLight }}>{dashboardData.footer ? "Configured" : "Not configured"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Site Preview */}
      <div 
        className="rounded-xl border p-6"
        style={{ 
          borderColor: `${COLORS.accent}40`,
          background: `linear-gradient(135deg, ${COLORS.primary}10, ${COLORS.accent}10)`,
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
              <Eye size={20} style={{ color: COLORS.primary }} />
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: COLORS.text }}>Preview Your Site</h3>
              <p className="text-sm" style={{ color: COLORS.textLight }}>See how your changes look on the live website</p>
            </div>
          </div>
          <a 
            href="/" 
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors"
            style={{ 
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
            }}
          >
            Visit Live Site
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}