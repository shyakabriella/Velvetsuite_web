// src/components/admin/FooterManager.jsx
import { useEffect, useState } from "react";
import { 
  Check, 
  AlertCircle, 
  Save, 
  RotateCcw, 
  X, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Link,
  Upload,
  Image as ImageIcon,
  Trash2,
  Globe,
  Plus
} from "lucide-react";

const API_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");
const APP_URL = API_URL.replace(/\/api$/, "");

const getToken = () => {
  return sessionStorage.getItem("token") || localStorage.getItem("token") || localStorage.getItem("auth_token");
};

const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/storage/")) return `${APP_URL}${path}`;
  if (path.startsWith("storage/")) return `${APP_URL}/${path}`;
  return `${APP_URL}/storage/${path}`;
};

// Custom Social Icon Component
const SocialIcon = ({ platform, size = 20 }) => {
  const icons = {
    facebook: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    website: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  };
  
  return icons[platform] || <Globe size={size} />;
};

// Social media platform options
const SOCIAL_PLATFORMS = [
  { value: "facebook", label: "Facebook", color: "#1877f2" },
  { value: "twitter", label: "Twitter", color: "#000000" },
  { value: "instagram", label: "Instagram", color: "#e4405f" },
  { value: "youtube", label: "YouTube", color: "#ff0000" },
  { value: "linkedin", label: "LinkedIn", color: "#0a66c2" },
  { value: "website", label: "Website", color: "#6c63ff" },
];

export default function FooterManager() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => { 
    fetchFooter(); 
  }, []);

  const fetchFooter = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const headers = { 
        Accept: "application/json", 
        ...(token && { Authorization: `Bearer ${token}` }) 
      };
      const res = await fetch(`${API_URL}/footer`, { headers });
      const result = await res.json();
      
      if (result.success && result.data) {
        setData(result.data);
        if (result.data.footer_logo) {
          setLogoPreview(getImageUrl(result.data.footer_logo));
        }
      }
    } catch (err) { 
      console.error(err); 
    } finally { 
      setLoading(false); 
    }
  };

  const updateField = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
    setSaved(false);
    setError(null);
  };

  const updateContactField = (field, value) => {
    setData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
    setHasChanges(true);
    setSaved(false);
    setError(null);
  };

  const updateQuickLink = (index, field, value) => {
    const newLinks = [...(data.quick_links?.links || [])];
    newLinks[index] = { ...newLinks[index], [field]: value };
    updateField('quick_links', { ...data.quick_links, links: newLinks });
  };

  const addQuickLink = () => {
    const currentLinks = data.quick_links?.links || [];
    updateField('quick_links', {
      ...data.quick_links,
      links: [...currentLinks, { label: '', url: '' }]
    });
  };

  const removeQuickLink = (index) => {
    const currentLinks = data.quick_links?.links || [];
    const newLinks = currentLinks.filter((_, i) => i !== index);
    updateField('quick_links', { ...data.quick_links, links: newLinks });
  };

  const updateSocialLink = (index, field, value) => {
    const newSocial = [...(data.social_links || [])];
    newSocial[index] = { ...newSocial[index], [field]: value };
    updateField('social_links', newSocial);
  };

  const addSocialLink = () => {
    const currentSocial = data.social_links || [];
    updateField('social_links', [...currentSocial, { platform: '', url: '', icon: '' }]);
  };

  const removeSocialLink = (index) => {
    const currentSocial = data.social_links || [];
    const newSocial = currentSocial.filter((_, i) => i !== index);
    updateField('social_links', newSocial);
  };

  const handleLogoUpload = (file) => {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/svg+xml", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please select a valid image (JPEG, PNG, SVG, WebP)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    setUploading(true);
    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
    setLogoFile(file);
    setHasChanges(true);
    setUploading(false);
  };

  const removeLogo = () => {
    if (logoPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(logoPreview);
    }
    setLogoPreview(null);
    setLogoFile(null);
    updateField('footer_logo', null);
  };

  const saveToBackend = async () => {
    setSaving(true);
    setError(null);

    try {
      const token = getToken();
      if (!token) throw new Error("Please login first");

      // Build the payload matching backend expectations
      const payload = {
        brand_name: data.brand_name || '',
        brand_description: data.brand_description || '',
        contact_title: data.contact?.title || '',
        contact_email: data.contact?.email || '',
        contact_phone: data.contact?.phone || '',
        contact_address: data.contact?.address || '',
        map_link: data.contact?.map_link || '',
        quick_links_title: data.quick_links?.title || '',
        quick_links: data.quick_links?.links || [],
        social_links: data.social_links || [],
        copyright_text: data.copyright_text || '',
        is_active: data.is_active ?? true,
      };

      let url, method;
      if (data.id) {
        url = `${API_URL}/footer/${data.id}`;
        method = 'PUT';
      } else {
        url = `${API_URL}/footer`;
        method = 'POST';
      }

      let response;
      if (logoFile) {
        // Use FormData for file upload
        const formData = new FormData();
        Object.keys(payload).forEach(key => {
          if (key === 'quick_links' || key === 'social_links') {
            formData.append(key, JSON.stringify(payload[key]));
          } else {
            formData.append(key, payload[key]);
          }
        });
        formData.append('footer_logo', logoFile);
        if (data.id) {
          formData.append('_method', 'PUT');
        }

        response = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
          body: formData,
        });
      } else {
        // Use JSON for regular data
        response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }

      const result = await response.json();

      if (result.success) {
        setHasChanges(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        if (result.data) {
          setData(result.data);
          if (result.data.footer_logo) {
            setLogoPreview(getImageUrl(result.data.footer_logo));
          }
          setLogoFile(null);
        }
        // Refetch to get updated data
        await fetchFooter();
      } else {
        // Handle validation errors
        if (result.errors) {
          const errorMessages = Object.values(result.errors).flat().join(', ');
          setError(errorMessages);
        } else {
          setError(result.message || "Error saving footer");
        }
      }
    } catch (err) {
      console.error('Save error:', err);
      setError(err.message || "Failed to save footer");
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    fetchFooter();
    setHasChanges(false);
    setError(null);
    setLogoFile(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <Globe size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-slate-500 mb-4">No footer data found</p>
          <button
            onClick={() => {
              setData({
                brand_name: 'VELVET SUITES',
                contact: { title: 'Reach Out', email: '', phone: '', address: '' },
                quick_links: { title: 'Quick Links', links: [] },
                social_links: [],
                copyright_text: '',
                is_active: true,
              });
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-sm font-semibold text-white hover:from-amber-600 hover:to-amber-700"
          >
            <Plus size={16} /> Create Footer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Footer Settings</h2>
            <p className="text-sm text-gray-500">Edit footer content displayed across all pages</p>
          </div>
          <div className="flex gap-3">
            {saved && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-amber-600">
                <Check size={16} /> Saved
              </span>
            )}
            <button
              onClick={resetForm}
              className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
            >
              <RotateCcw size={15} /> Reset
            </button>
            <button
              onClick={saveToBackend}
              disabled={!hasChanges || saving}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all ${
                hasChanges && !saving
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                  : "cursor-not-allowed bg-gray-300"
              }`}
            >
              {saving ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Save size={15} />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 flex items-center gap-2">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Information */}
        <div className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold flex items-center gap-2 text-gray-900">
            <Award size={16} /> Brand Information
          </h3>
          
          <div>
            <label className="mb-1 block text-sm font-medium">Brand Name</label>
            <input
              type="text"
              value={data.brand_name || ''}
              onChange={(e) => updateField('brand_name', e.target.value)}
              className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              placeholder="e.g., VELVET SUITES"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium">Brand Description</label>
            <textarea
              value={data.brand_description || ''}
              onChange={(e) => updateField('brand_description', e.target.value)}
              rows={3}
              className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 resize-y"
              placeholder="Describe your brand..."
            />
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium">Footer Logo</label>
            <div className="rounded-xl border bg-gray-50 p-4">
              <div className="flex items-center gap-4">
                {logoPreview ? (
                  <div className="relative">
                    <img
                      src={logoPreview}
                      alt="Footer Logo"
                      className="h-16 w-auto rounded-lg object-contain"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/200x80?text=Logo";
                      }}
                    />
                    <button
                      onClick={removeLogo}
                      className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="flex h-16 w-32 items-center justify-center rounded-lg bg-gray-200">
                    <ImageIcon size={32} className="text-gray-400" />
                  </div>
                )}
                <label className="cursor-pointer">
                  <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-sm font-medium text-white hover:from-amber-600 hover:to-amber-700 transition">
                    {uploading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <Upload size={14} />
                    )}
                    {uploading ? "Uploading..." : logoPreview ? "Change Logo" : "Upload Logo"}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoUpload(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="mt-2 text-xs text-gray-500">Recommended: 200x80px. Max 5MB. PNG, SVG, JPG</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold flex items-center gap-2 text-gray-900">
            <Mail size={16} /> Contact Information
          </h3>
          
          <div>
            <label className="mb-1 block text-sm font-medium">Contact Title</label>
            <input
              type="text"
              value={data.contact?.title || ''}
              onChange={(e) => updateContactField('title', e.target.value)}
              className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              placeholder="e.g., Reach Out"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={data.contact?.email || ''}
              onChange={(e) => updateContactField('email', e.target.value)}
              className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              placeholder="info@velvetsuites.com"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium">Phone</label>
            <input
              type="text"
              value={data.contact?.phone || ''}
              onChange={(e) => updateContactField('phone', e.target.value)}
              className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              placeholder="+250 788 123 456"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium">Address</label>
            <input
              type="text"
              value={data.contact?.address || ''}
              onChange={(e) => updateContactField('address', e.target.value)}
              className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              placeholder="Kigali, Rwanda"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium">Google Maps Link</label>
            <input
              type="text"
              value={data.contact?.map_link || ''}
              onChange={(e) => updateContactField('map_link', e.target.value)}
              className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              placeholder="https://maps.google.com/..."
            />
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2 text-gray-900">
            <Link size={16} /> Quick Links
          </h3>
          <button
            onClick={addQuickLink}
            className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-600 hover:bg-amber-100 transition"
          >
            <Plus size={14} /> Add Link
          </button>
        </div>
        
        <div>
          <label className="mb-1 block text-sm font-medium">Quick Links Title</label>
          <input
            type="text"
            value={data.quick_links?.title || ''}
            onChange={(e) => updateField('quick_links', { ...data.quick_links, title: e.target.value })}
            className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 mb-4"
            placeholder="e.g., Quick Links"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.quick_links?.links?.map((link, idx) => (
            <div key={idx} className="relative rounded-lg border p-4 bg-gray-50">
              <button
                onClick={() => removeQuickLink(idx)}
                className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition"
              >
                <X size={12} />
              </button>
              <div className="space-y-2">
                <input
                  type="text"
                  value={link.label || ''}
                  onChange={(e) => updateQuickLink(idx, 'label', e.target.value)}
                  className="w-full rounded border px-3 py-2 text-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  placeholder="Link Label"
                />
                <input
                  type="text"
                  value={link.url || ''}
                  onChange={(e) => updateQuickLink(idx, 'url', e.target.value)}
                  className="w-full rounded border px-3 py-2 text-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          ))}
        </div>
        
        {(!data.quick_links?.links || data.quick_links.links.length === 0) && (
          <div className="text-center py-8 text-gray-400">
            <Link size={32} className="mx-auto mb-2" />
            <p className="text-sm">No quick links added yet</p>
            <p className="text-xs">Click "Add Link" to create one</p>
          </div>
        )}
      </div>

      {/* Social Links */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2 text-gray-900">
            <Globe size={16} /> Social Links
          </h3>
          <button
            onClick={addSocialLink}
            className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-600 hover:bg-amber-100 transition"
          >
            <Plus size={14} /> Add Social Link
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.social_links?.map((social, idx) => {
            const platform = SOCIAL_PLATFORMS.find(p => p.value === social.platform);
            
            return (
              <div key={idx} className="relative rounded-lg border p-4 bg-gray-50">
                <button
                  onClick={() => removeSocialLink(idx)}
                  className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition"
                >
                  <X size={12} />
                </button>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <SocialIcon platform={social.platform} size={16} />
                    </div>
                    <select
                      value={social.platform || ''}
                      onChange={(e) => updateSocialLink(idx, 'platform', e.target.value)}
                      className="flex-1 rounded border px-3 py-2 text-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                    >
                      <option value="">Select Platform</option>
                      {SOCIAL_PLATFORMS.map(p => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="text"
                    value={social.url || ''}
                    onChange={(e) => updateSocialLink(idx, 'url', e.target.value)}
                    className="w-full rounded border px-3 py-2 text-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                    placeholder="https://..."
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        {(!data.social_links || data.social_links.length === 0) && (
          <div className="text-center py-8 text-gray-400">
            <Globe size={32} className="mx-auto mb-2" />
            <p className="text-sm">No social links added yet</p>
            <p className="text-xs">Click "Add Social Link" to create one</p>
          </div>
        )}
      </div>

      {/* Copyright */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-medium">Copyright Text</label>
          <input
            type="text"
            value={data.copyright_text || ''}
            onChange={(e) => updateField('copyright_text', e.target.value)}
            className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
            placeholder="© 2024 VELVET SUITES. All rights reserved."
          />
        </div>
      </div>

      {/* Status Toggle */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Active</label>
          <button
            onClick={() => updateField('is_active', !data.is_active)}
            className={`relative h-6 w-12 rounded-full transition-colors ${
              data.is_active ? "bg-amber-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                data.is_active ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-sm text-gray-500">
            {data.is_active ? "Footer is visible on website" : "Footer is hidden"}
          </span>
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertCircle size={16} className="text-amber-600" />
          <div>
            <p className="text-sm font-medium text-amber-800">Tips</p>
            <ul className="mt-1 space-y-1 text-xs text-amber-600">
              <li>• The footer appears on all pages of the website</li>
              <li>• Add your brand logo, contact information, and social links</li>
              <li>• Quick links help users navigate to important pages</li>
              <li>• Toggle "Active" to show/hide the footer</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}