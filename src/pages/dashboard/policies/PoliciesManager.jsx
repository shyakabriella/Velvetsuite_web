import { useEffect, useState } from "react";
import { Check, AlertCircle, ChevronRight, X, Shield, FileText } from "lucide-react";

// Import section components as they are created
import PoliciesHero from "./sections/PoliciesHero";
import PoliciesSectionOne from "./sections/PoliciesSectionOne";

const sections = [
  { 
    id: "hero", 
    label: "Policies Hero", 
    icon: Shield, 
    description: "Policies page hero with title, background color and background image", 
    badge: "Hero", 
    component: PoliciesHero
  },
  { 
    id: "section-one", 
    label: "Section 1", 
    icon: FileText, 
    description: "Policy details with multiple policy categories", 
    badge: "1", 
    component: PoliciesSectionOne // ✅ PoliciesSectionOne is now assigned
  },
];

const API_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");
const getToken = () => sessionStorage.getItem("token") || localStorage.getItem("token") || localStorage.getItem("auth_token");

export default function PoliciesManager() {
  const [content, setContent] = useState({});
  const [selectedSection, setSelectedSection] = useState(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchAllSections(); }, []);

  const fetchAllSections = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const headers = { Accept: "application/json", ...(token && { Authorization: `Bearer ${token}` }) };
      const [heroRes, s1Res] = await Promise.all([
        fetch(`${API_URL}/policies/hero`, { headers }),
        fetch(`${API_URL}/policies/section-one`, { headers }),
      ]);
      const [hero, s1] = await Promise.all([heroRes.json(), s1Res.json()]);
      setContent({
        hero: hero.success && hero.data?.length > 0 ? hero.data[0] : null,
        "section-one": s1.success && s1.data?.length > 0 ? s1.data[0] : null,
      });
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleSaveSection = (sectionId, updatedData) => {
    setContent(prev => ({ ...prev, [sectionId]: updatedData }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const openSection = (id) => setSelectedSection(id);
  const closeSection = () => setSelectedSection(null);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" /></div>;

  if (selectedSection) {
    const section = sections.find(s => s.id === selectedSection);
    const SectionComponent = section.component;

    // If component is not yet imported, show placeholder
    if (!SectionComponent) {
      return (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <button onClick={closeSection} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X size={20} /></button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Edit {section.label}</h1>
                <p className="mt-1 text-sm text-slate-500">{section.description}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm text-center py-12">
            <p className="text-slate-500">{section.label} editor coming soon...</p>
            <p className="text-xs text-slate-400 mt-2">Import the section component when ready</p>
          </div>
        </div>
      );
    }

    // Render the actual section component
    const sectionData = content[selectedSection];
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={closeSection} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X size={20} /></button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Edit {section.label}</h1>
              <p className="mt-1 text-sm text-slate-500">{section.description}</p>
            </div>
          </div>
        </div>
        <SectionComponent 
          data={sectionData} 
          onSave={(data) => handleSaveSection(selectedSection, data)} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {saved && <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-600 flex items-center gap-2"><Check size={16} /> Saved!</div>}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">VELVET SUITES - Policies Sections</h1>
        <p className="mt-1 text-sm text-slate-500">Click on any section card to edit its content</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sections.map(section => {
          const Icon = section.icon;
          const data = content[section.id];

          return (
            <button 
              key={section.id} 
              onClick={() => openSection(section.id)} 
              className="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                  <Icon size={22} />
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-600">
                  {section.badge}
                </span>
              </div>
              <h3 className="text-[15px] font-bold text-slate-900">{section.label}</h3>
              <p className="mt-2 min-h-[38px] text-sm leading-6 text-slate-500">{section.description}</p>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-400 truncate">
                  {data?.title ? <>Title: {data.title}</> : <span className="italic">No content</span>}
                </p>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-500">
                Manage <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}