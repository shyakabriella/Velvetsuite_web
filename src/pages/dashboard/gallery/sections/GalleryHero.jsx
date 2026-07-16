import { useState, useEffect } from "react";
import {
  Save,
  RotateCcw,
  Check,
  AlertCircle,
  Upload,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

const API_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");
const APP_URL = API_URL.replace(/\/api$/, "");

// Default data for Gallery Hero
const DEFAULT_DATA = {
  title: "Gallery",
  background_image: null,
  is_active: true,
  order: 1,
};

const getImageUrl = (path) => {
  if (!path) return null;
  
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  
  if (path.startsWith("/storage/")) {
    return `${APP_URL}${path}`;
  }
  
  if (path.startsWith("storage/")) {
    return `${APP_URL}/${path}`;
  }
  
  return `${APP_URL}/storage/${path}`;
};

const getToken = () => {
  return sessionStorage.getItem("token") || localStorage.getItem("token") || localStorage.getItem("auth_token");
};

export default function GalleryHero({ data, onSave }) {
  const [sectionData, setSectionData] = useState({
    id: null,
    title: DEFAULT_DATA.title,
    background_image: null,
    background_image_preview: null,
    background_image_file: null,
    is_active: true,
    order: 0,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Initialize with data or default
  useEffect(() => {
    if (data && data.id) {
      const imageUrl = getImageUrl(data.background_image);
      setSectionData({
        id: data.id || null,
        title: data.title || DEFAULT_DATA.title,
        background_image: data.background_image || null,
        background_image_preview: imageUrl,
        background_image_file: null,
        is_active: data.is_active !== undefined ? data.is_active : true,
        order: data.order || 0,
      });
    } else {
      setSectionData({
        id: null,
        title: DEFAULT_DATA.title,
        background_image: null,
        background_image_preview: null,
        background_image_file: null,
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

  const handleImageUpload = (file) => {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please select a valid image (JPEG, PNG, WebP)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    setUploading(true);
    const previewUrl = URL.createObjectURL(file);
    setSectionData((prev) => ({
      ...prev,
      background_image_preview: previewUrl,
      background_image_file: file,
    }));
    setHasChanges(true);
    setUploading(false);
  };

  const removeImage = () => {
    if (sectionData.background_image_preview?.startsWith("blob:")) {
      URL.revokeObjectURL(sectionData.background_image_preview);
    }
    setSectionData((prev) => ({
      ...prev,
      background_image: null,
      background_image_preview: null,
      background_image_file: null,
    }));
    setHasChanges(true);
  };

  const saveToBackend = async () => {
    if (!sectionData.title) {
      setError("Title is required");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const token = getToken();
      if (!token) {
        throw new Error("Please login first");
      }

      const formData = new FormData();
      formData.append("title", sectionData.title);
      formData.append("is_active", sectionData.is_active ? "1" : "0");
      formData.append("order", String(sectionData.order || 0));

      if (sectionData.background_image_file) {
        formData.append("background_image", sectionData.background_image_file);
      }

      let url, method;
      if (sectionData.id) {
        url = `${API_URL}/gallery/hero/${sectionData.id}`;
        method = "POST";
        formData.append("_method", "PUT");
      } else {
        url = `${API_URL}/gallery/hero`;
        method = "POST";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setHasChanges(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        
        if (result.data) {
          const imageUrl = getImageUrl(result.data.background_image);
          setSectionData((prev) => ({
            ...prev,
            id: result.data.id,
            title: result.data.title || prev.title,
            background_image: result.data.background_image || null,
            background_image_preview: imageUrl,
            background_image_file: null,
            is_active: result.data.is_active !== undefined ? result.data.is_active : prev.is_active,
            order: result.data.order || prev.order,
          }));
        }
        
        if (onSave) {
          onSave(result.data);
        }
      } else {
        setError(result.message || "Error saving gallery hero");
      }
    } catch (err) {
      console.error("Save error:", err);
      setError(err.message || "Failed to save gallery hero");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (data && data.id) {
      const imageUrl = getImageUrl(data.background_image);
      setSectionData({
        id: data.id || null,
        title: data.title || DEFAULT_DATA.title,
        background_image: data.background_image || null,
        background_image_preview: imageUrl,
        background_image_file: null,
        is_active: data.is_active !== undefined ? data.is_active : true,
        order: data.order || 0,
      });
    } else {
      setSectionData({
        id: null,
        title: DEFAULT_DATA.title,
        background_image: null,
        background_image_preview: null,
        background_image_file: null,
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
            <h2 className="text-xl font-bold text-gray-900">Gallery Hero Section</h2>
            <p className="text-sm text-gray-500">
              {sectionData.id ? "Edit the gallery hero content" : "Create a new gallery hero"}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
          {/* Title */}
          <div>
            <label className="mb-1 block text-sm font-medium">Title</label>
            <input
              type="text"
              value={sectionData.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              placeholder="Enter title..."
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

        {/* Image Upload */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <label className="mb-3 block text-sm font-medium">Background Image</label>
          <div className="rounded-xl border bg-gray-50 p-4">
            {sectionData.background_image_preview ? (
              <div className="relative">
                <img
                  src={sectionData.background_image_preview}
                  alt="Preview"
                  className="h-48 w-full rounded-lg object-cover"
                  onError={(e) => {
                    console.error("Image failed to load:", sectionData.background_image_preview);
                    e.target.src = "https://placehold.co/800x400?text=Image+Not+Found";
                  }}
                />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 rounded-full bg-red-500 p-1.5 text-white hover:bg-red-600 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ) : (
              <div className="flex h-48 w-full items-center justify-center rounded-lg bg-gray-100">
                <ImageIcon size={48} className="text-gray-300" />
              </div>
            )}
            <label className="mt-3 block cursor-pointer">
              <div className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-sm font-medium text-white hover:from-amber-600 hover:to-amber-700 transition">
                {uploading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Upload size={14} />
                )}
                {uploading
                  ? "Uploading..."
                  : sectionData.background_image_preview
                  ? "Change Image"
                  : "Upload Image"}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files[0])}
                className="hidden"
              />
            </label>
            <p className="mt-3 text-xs text-gray-500">Recommended: 1920x800px. Max 5MB.</p>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Live Preview</h3>
        <div 
          className="relative h-48 overflow-hidden rounded-xl flex flex-col items-center justify-center text-center p-6"
          style={{
            backgroundImage: sectionData.background_image_preview ? `url(${sectionData.background_image_preview})` : 'linear-gradient(135deg, #1a1a2e, #16213e)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: sectionData.background_image_preview ? 'rgba(0,0,0,0.5)' : 'none'
            }}
          />
          <h2 className="text-3xl font-bold text-white relative z-10">
            {sectionData.title || "Gallery"}
          </h2>
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertCircle size={16} className="text-amber-600" />
          <div>
            <p className="text-sm font-medium text-amber-800">Tips</p>
            <ul className="mt-1 space-y-1 text-xs text-amber-600">
              <li>• Upload a high-quality background image for the gallery hero</li>
              <li>• The title should clearly identify the gallery page</li>
              <li>• Toggle "Active" to show/hide this section on the website</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}