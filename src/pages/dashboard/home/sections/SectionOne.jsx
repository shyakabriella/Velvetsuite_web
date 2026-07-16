import { useState, useEffect } from "react";
import {
  Save,
  RotateCcw,
  Check,
  AlertCircle,
  Plus,
  Trash2,
  GripVertical,
} from "lucide-react";

const API_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");
const APP_URL = API_URL.replace(/\/api$/, "");

// Default data for "Why Choose Velvet Suites"
const DEFAULT_DATA = {
  title: "Why Choose Velvet Suites",
  items: [
    "Just 5 minutes from the airport – quick access with stress-free shuttle service",
    "Family House – unparalleled space and comfort for groups",
    "Rooftop dining with city skyline views – a Kigali highlight",
    "Modern amenities with the warmth of Rwandan hospitality",
    "Ideal for business travelers, families, and short layovers"
  ],
  is_active: true,
  order: 1,
};

const getToken = () => {
  return sessionStorage.getItem("token") || localStorage.getItem("token") || localStorage.getItem("auth_token");
};

export default function SectionOne({ data, onSave }) {
  const [sectionData, setSectionData] = useState({
    id: null,
    title: DEFAULT_DATA.title,
    items: [...DEFAULT_DATA.items],
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
      // If we have real data from API
      setSectionData({
        id: data.id || null,
        title: data.title || DEFAULT_DATA.title,
        items: data.items && Array.isArray(data.items) ? data.items : [...DEFAULT_DATA.items],
        is_active: data.is_active !== undefined ? data.is_active : true,
        order: data.order || 0,
      });
    } else {
      // No data, use default
      setSectionData({
        id: null,
        title: DEFAULT_DATA.title,
        items: [...DEFAULT_DATA.items],
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

  const updateItem = (index, value) => {
    const newItems = [...sectionData.items];
    newItems[index] = value;
    setSectionData((prev) => ({ ...prev, items: newItems }));
    setHasChanges(true);
    setSaved(false);
    setError(null);
  };

  const addItem = () => {
    setSectionData((prev) => ({
      ...prev,
      items: [...prev.items, "New item"],
    }));
    setHasChanges(true);
  };

  const removeItem = (index) => {
    if (sectionData.items.length <= 1) {
      setError("You need at least one item");
      return;
    }
    const newItems = sectionData.items.filter((_, i) => i !== index);
    setSectionData((prev) => ({ ...prev, items: newItems }));
    setHasChanges(true);
    setError(null);
  };

  const moveItemUp = (index) => {
    if (index === 0) return;
    const newItems = [...sectionData.items];
    [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    setSectionData((prev) => ({ ...prev, items: newItems }));
    setHasChanges(true);
  };

  const moveItemDown = (index) => {
    if (index === sectionData.items.length - 1) return;
    const newItems = [...sectionData.items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setSectionData((prev) => ({ ...prev, items: newItems }));
    setHasChanges(true);
  };

  const saveToBackend = async () => {
    if (!sectionData.title) {
      setError("Title is required");
      return;
    }

    if (!sectionData.items || sectionData.items.length === 0) {
      setError("At least one item is required");
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
        items: sectionData.items,
        is_active: sectionData.is_active,
        order: sectionData.order || 0,
      };

      let url, method;
      if (sectionData.id) {
        url = `${API_URL}/homepage/section-one/${sectionData.id}`;
        method = "PUT";
      } else {
        url = `${API_URL}/homepage/section-one`;
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
            items: result.data.items || prev.items,
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
        items: data.items && Array.isArray(data.items) ? data.items : [...DEFAULT_DATA.items],
        is_active: data.is_active !== undefined ? data.is_active : true,
        order: data.order || 0,
      });
    } else {
      setSectionData({
        id: null,
        title: DEFAULT_DATA.title,
        items: [...DEFAULT_DATA.items],
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
            <h2 className="text-xl font-bold text-gray-900">Section 1 - Why Choose Velvet Suites</h2>
            <p className="text-sm text-gray-500">
              {sectionData.id ? "Edit the section content" : "Create a new section"}
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
            <label className="mb-1 block text-sm font-medium">Section Title *</label>
            <input
              type="text"
              value={sectionData.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              placeholder="Enter section title..."
            />
          </div>

          {/* Items List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium">Items *</label>
              <button
                onClick={addItem}
                className="flex items-center gap-1 text-sm font-medium text-amber-500 hover:text-amber-600 transition"
              >
                <Plus size={16} /> Add Item
              </button>
            </div>

            <div className="space-y-2">
              {sectionData.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 group"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-amber-500 font-bold text-sm w-6">✓</span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateItem(index, e.target.value)}
                      className="flex-1 rounded-lg border px-3 py-2 text-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                      placeholder={`Item ${index + 1}`}
                    />
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => moveItemUp(index)}
                      disabled={index === 0}
                      className={`p-1 rounded hover:bg-gray-100 ${index === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveItemDown(index)}
                      disabled={index === sectionData.items.length - 1}
                      className={`p-1 rounded hover:bg-gray-100 ${index === sectionData.items.length - 1 ? "opacity-30 cursor-not-allowed" : ""}`}
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeItem(index)}
                      className="p-1 rounded text-red-400 hover:text-red-600 hover:bg-red-50 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{sectionData.title}</h2>
          <ul className="space-y-2">
            {sectionData.items.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <span className="text-amber-500 font-bold mt-0.5">✓</span>
                <span>{item || "Empty item"}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertCircle size={16} className="text-amber-600" />
          <div>
            <p className="text-sm font-medium text-amber-800">Tips</p>
            <ul className="mt-1 space-y-1 text-xs text-amber-600">
              <li>• Each item represents a benefit of choosing Velvet Suites</li>
              <li>• You can reorder items using the up/down arrows</li>
              <li>• Click "Add Item" to add more benefits</li>
              <li>• Toggle "Active" to show/hide this section on the website</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}