import { useState, useEffect } from "react";
import {
  Save,
  RotateCcw,
  Check,
  AlertCircle,
  Upload,
  Trash2,
  Video,
  Play,
} from "lucide-react";

const API_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");
const APP_URL = API_URL.replace(/\/api$/, "");

// Default data for "Velvet Highlights"
const DEFAULT_DATA = {
  title: "VELVET HIGHLIGHTS",
  subtitle: "Take a Sneak Peek at What We Offer",
  button_text: "Discover More",
  background_video: null,
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

export default function SectionTwo({ data, onSave }) {
  const [sectionData, setSectionData] = useState({
    id: null,
    title: DEFAULT_DATA.title,
    subtitle: DEFAULT_DATA.subtitle,
    button_text: DEFAULT_DATA.button_text,
    background_video: null,
    background_video_preview: null,
    background_video_file: null,
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
      const videoUrl = getImageUrl(data.background_video);
      setSectionData({
        id: data.id || null,
        title: data.title || DEFAULT_DATA.title,
        subtitle: data.subtitle || DEFAULT_DATA.subtitle,
        button_text: data.button_text || DEFAULT_DATA.button_text,
        background_video: data.background_video || null,
        background_video_preview: videoUrl,
        background_video_file: null,
        is_active: data.is_active !== undefined ? data.is_active : true,
        order: data.order || 0,
      });
    } else {
      setSectionData({
        id: null,
        title: DEFAULT_DATA.title,
        subtitle: DEFAULT_DATA.subtitle,
        button_text: DEFAULT_DATA.button_text,
        background_video: null,
        background_video_preview: null,
        background_video_file: null,
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

  const handleVideoUpload = (file) => {
    if (!file) return;

    const validTypes = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"];
    if (!validTypes.includes(file.type)) {
      setError("Please select a valid video file (MP4, WebM, OGG, MOV)");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError("Video size must be less than 50MB");
      return;
    }

    setUploading(true);
    const previewUrl = URL.createObjectURL(file);
    setSectionData((prev) => ({
      ...prev,
      background_video_preview: previewUrl,
      background_video_file: file,
    }));
    setHasChanges(true);
    setUploading(false);
  };

  const removeVideo = () => {
    if (sectionData.background_video_preview?.startsWith("blob:")) {
      URL.revokeObjectURL(sectionData.background_video_preview);
    }
    setSectionData((prev) => ({
      ...prev,
      background_video: null,
      background_video_preview: null,
      background_video_file: null,
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
      formData.append("subtitle", sectionData.subtitle || "");
      formData.append("button_text", sectionData.button_text || "");
      formData.append("is_active", sectionData.is_active ? "1" : "0");
      formData.append("order", sectionData.order || "0");

      if (sectionData.background_video_file) {
        formData.append("background_video", sectionData.background_video_file);
      }

      let url, method;
      if (sectionData.id) {
        url = `${API_URL}/homepage/section-two/${sectionData.id}`;
        method = "POST";
        formData.append("_method", "PUT");
      } else {
        url = `${API_URL}/homepage/section-two`;
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
          const videoUrl = getImageUrl(result.data.background_video);
          setSectionData((prev) => ({
            ...prev,
            id: result.data.id,
            title: result.data.title || prev.title,
            subtitle: result.data.subtitle || prev.subtitle,
            button_text: result.data.button_text || prev.button_text,
            background_video: result.data.background_video || null,
            background_video_preview: videoUrl,
            background_video_file: null,
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
      const videoUrl = getImageUrl(data.background_video);
      setSectionData({
        id: data.id || null,
        title: data.title || DEFAULT_DATA.title,
        subtitle: data.subtitle || DEFAULT_DATA.subtitle,
        button_text: data.button_text || DEFAULT_DATA.button_text,
        background_video: data.background_video || null,
        background_video_preview: videoUrl,
        background_video_file: null,
        is_active: data.is_active !== undefined ? data.is_active : true,
        order: data.order || 0,
      });
    } else {
      setSectionData({
        id: null,
        title: DEFAULT_DATA.title,
        subtitle: DEFAULT_DATA.subtitle,
        button_text: DEFAULT_DATA.button_text,
        background_video: null,
        background_video_preview: null,
        background_video_file: null,
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
            <h2 className="text-xl font-bold text-gray-900">Section 2 - Velvet Highlights</h2>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
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

          {/* Subtitle */}
          <div>
            <label className="mb-1 block text-sm font-medium">Subtitle</label>
            <input
              type="text"
              value={sectionData.subtitle}
              onChange={(e) => updateField("subtitle", e.target.value)}
              className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              placeholder="Enter subtitle..."
            />
          </div>

          {/* Button Text */}
          <div>
            <label className="mb-1 block text-sm font-medium">Button Text</label>
            <input
              type="text"
              value={sectionData.button_text}
              onChange={(e) => updateField("button_text", e.target.value)}
              className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              placeholder="e.g., Discover More"
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

        {/* Video Upload */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <label className="mb-3 block text-sm font-medium">Background Video</label>
          <div className="rounded-xl border bg-gray-50 p-4">
            {sectionData.background_video_preview ? (
              <div className="relative">
                <video
                  src={sectionData.background_video_preview}
                  className="w-full rounded-lg object-cover"
                  style={{ maxHeight: "200px" }}
                  controls
                  muted
                  autoPlay
                  loop
                  playsInline
                />
                <button
                  onClick={removeVideo}
                  className="absolute top-2 right-2 rounded-full bg-red-500 p-1.5 text-white hover:bg-red-600 transition"
                >
                  <Trash2 size={14} />
                </button>
                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  <Play size={12} />
                  <span>Video Preview</span>
                </div>
              </div>
            ) : (
              <div className="flex h-48 w-full flex-col items-center justify-center rounded-lg bg-gray-100">
                <Video size={48} className="text-gray-300" />
                <p className="mt-2 text-sm text-gray-400">No video uploaded</p>
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
                  : sectionData.background_video_preview
                  ? "Change Video"
                  : "Upload Video"}
              </div>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleVideoUpload(e.target.files[0])}
                className="hidden"
              />
            </label>
            <p className="mt-3 text-xs text-gray-500">
              Supported formats: MP4, WebM, OGG, MOV. Max 50MB.
            </p>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Live Preview</h3>
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 p-8 min-h-[250px] flex flex-col items-center justify-center text-center">
          {/* Video Background */}
          {sectionData.background_video_preview && (
            <div className="absolute inset-0">
              <video
                src={sectionData.background_video_preview}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
          )}
          
          {!sectionData.background_video_preview && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-600" />
          )}
          
          {/* Content */}
          <div className="relative z-10 text-white">
            <h2 className="text-3xl font-bold mb-2">{sectionData.title || "VELVET HIGHLIGHTS"}</h2>
            <p className="text-lg mb-4 text-white/80">{sectionData.subtitle || "Take a Sneak Peek at What We Offer"}</p>
            {sectionData.button_text && (
              <button className="px-6 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors">
                {sectionData.button_text}
              </button>
            )}
            {sectionData.background_video_preview && (
              <div className="mt-4 flex items-center justify-center gap-2 text-white/60 text-sm">
                <Video size={16} />
                <span>Video Background</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertCircle size={16} className="text-amber-600" />
          <div>
            <p className="text-sm font-medium text-amber-800">Tips</p>
            <ul className="mt-1 space-y-1 text-xs text-amber-600">
              <li>• Upload a high-quality video for the background (MP4 recommended)</li>
              <li>• Keep video file size under 50MB for faster loading</li>
              <li>• The video will autoplay and loop on the website</li>
              <li>• Toggle "Active" to show/hide this section on the website</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}