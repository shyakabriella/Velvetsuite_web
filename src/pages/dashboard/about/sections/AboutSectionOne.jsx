import { useState, useEffect } from "react";
import {
  Save,
  RotateCcw,
  Check,
  AlertCircle,
} from "lucide-react";

const API_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");
const APP_URL = API_URL.replace(/\/api$/, "");

// Default data for About Section One
const DEFAULT_DATA = {
  title: "ABOUT US",
  description: "At Velvet suites, we redefine the essence of elegance, comfort, and hospitality. Nestled in a prime location, our five-star luxury establishment is a sanctuary for travellers who seek a perfect blend of contemporary style, world-class service, and unforgettable experiences. Whether you're staying for business or leisure, Velvet suites promises more than just accommodation – we deliver moments of excellence.",
  is_active: true,
  order: 1,
};

const getToken = () => {
  return sessionStorage.getItem("token") || localStorage.getItem("token") || localStorage.getItem("auth_token");
};

export default function AboutSectionOne({ data, onSave }) {
  const [sectionData, setSectionData] = useState({
    id: null,
    title: DEFAULT_DATA.title,
    description: DEFAULT_DATA.description,
    is_active: true,
    order: 0,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize with data or default
  useEffect(() => {
    if (data && data.id) {
      setSectionData({
        id: data.id || null,
        title: data.title || DEFAULT_DATA.title,
        description: data.description || DEFAULT_DATA.description,
        is_active: data.is_active !== undefined ? data.is_active : true,
        order: data.order || 0,
      });
    } else {
      setSectionData({
        id: null,
        title: DEFAULT_DATA.title,
        description: DEFAULT_DATA.description,
        is_active: true,
        order: 0,
      });
    }
  }, [data]);

  const updateField = (field, value) => {
    setSectionData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
    setSaved(false);
    setError(null);
  };

  const saveToBackend = async () => {
    if (!sectionData.title) {
      setError("Title is required");
      return;
    }

    if (!sectionData.description) {
      setError("Description is required");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const token = getToken();
      if (!token) {
        throw new Error("Please login first");
      }

      const payload = {
        title: sectionData.title,
        description: sectionData.description,
        is_active: sectionData.is_active,
        order: sectionData.order || 0,
      };

      let url, method;
      if (sectionData.id) {
        url = `${API_URL}/about/section-one/${sectionData.id}`;
        method = "PUT";
      } else {
        url = `${API_URL}/about/section-one`;
        method = "POST";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setHasChanges(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        
        if (result.data) {
          setSectionData((prev) => ({
            ...prev,
            id: result.data.id,
            title: result.data.title || prev.title,
            description: result.data.description || prev.description,
            is_active: result.data.is_active !== undefined ? result.data.is_active : prev.is_active,
            order: result.data.order || prev.order,
          }));
        }
        
        if (onSave) {
          onSave(result.data);
        }
      } else {
        setError(result.message || "Error saving section");
      }
    } catch (err) {
      console.error("Save error:", err);
      setError(err.message || "Failed to save section");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (data && data.id) {
      setSectionData({
        id: data.id || null,
        title: data.title || DEFAULT_DATA.title,
        description: data.description || DEFAULT_DATA.description,
        is_active: data.is_active !== undefined ? data.is_active : true,
        order: data.order || 0,
      });
    } else {
      setSectionData({
        id: null,
        title: DEFAULT_DATA.title,
        description: DEFAULT_DATA.description,
        is_active: true,
        order: 0,
      });
    }
    setHasChanges(false);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">About Section 1</h2>
            <p className="text-sm text-gray-500">
              {sectionData.id ? "Edit the about content" : "Create a new about section"}
            </p>
          </div>
          <div className="flex gap-3">
            {saved && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-amber-600">
                <Check size={16} /> Saved
              </span>
            )}
            <button
              onClick={handleReset}
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

      {/* Form */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="mb-1 block text-sm font-medium">Title *</label>
            <input
              type="text"
              value={sectionData.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              placeholder="Enter section title..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-sm font-medium">Description *</label>
            <textarea
              value={sectionData.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={8}
              className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 resize-y"
              placeholder="Enter about description..."
            />
          </div>

          {/* Active Toggle */}
          <div className="flex items-center gap-3 pt-4 border-t">
            <label className="text-sm font-medium">Active</label>
            <button
              onClick={() => updateField("is_active", !sectionData.is_active)}
              className={`relative h-6 w-12 rounded-full transition-colors ${
                sectionData.is_active ? "bg-amber-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                  sectionData.is_active ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Live Preview</h3>
        <div className="bg-amber-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{sectionData.title}</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {sectionData.description || "Enter your about description..."}
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertCircle size={16} className="text-amber-600" />
          <div>
            <p className="text-sm font-medium text-amber-800">Tips</p>
            <ul className="mt-1 space-y-1 text-xs text-amber-600">
              <li>• Write a compelling story about your hotel's history and values</li>
              <li>• Highlight what makes your hotel unique and special</li>
              <li>• Use language that reflects your brand voice</li>
              <li>• Toggle "Active" to show/hide this section on the website</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}