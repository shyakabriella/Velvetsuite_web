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

// Default data for About Section Two
const DEFAULT_DATA = {
  card_one_title: "Our Mission",
  card_one_description: "To provide exceptional, personalized hospitality that exceeds expectations, making every guest feel genuinely valued and uniquely cared for. Our mission is to craft experiences that go beyond a typical hotel stay. We are committed to consistently delivering impeccable service, luxurious comfort, and authentic care through every detail – from our opulent rooms and gourmet dining to our warm staff and bespoke guest services. At Velvet suites, every visit is designed to be a memory worth keeping.",
  card_one_layout: "left",
  card_one_image: null,
  card_two_title: "Our Vision",
  card_two_description: "To be the most admired hotel in the hospitality industry, known for our refined elegance, innovative guest experiences, and dedication to creating a luxurious haven for global travellers. We envision Velvet suites as a destination of choice for discerning guests who value sophistication, serenity, and exceptional hospitality. Our ambition is to lead in redefining luxury by fusing timeless charm with modern excellence, all while contributing positively to our community and environment.",
  card_two_layout: "right",
  card_two_image: null,
  card_three_title: "Chairman's Message",
  card_three_description: "As the founder of Velvet Suites, I am honored to welcome you to a place where our values—excellence, authenticity, integrity, innovation, sustainability, and guest-centricity—shape every moment. Our commitment is to deliver unparalleled luxury with genuine warmth, ensuring your comfort and delight in every detail. Here, you don't just stay—you belong. Thank you for choosing Velvet Suites, where every visit feels like coming home, only better.",
  card_three_layout: "left",
  card_three_image: null,
  chairman_name: "Ally GASANA",
  chairman_title: "Chairman of the Board",
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

export default function AboutSectionTwo({ data, onSave }) {
  const [sectionData, setSectionData] = useState({
    id: null,
    card_one_title: DEFAULT_DATA.card_one_title,
    card_one_description: DEFAULT_DATA.card_one_description,
    card_one_layout: "left",
    card_one_image: null,
    card_one_image_preview: null,
    card_one_image_file: null,
    card_two_title: DEFAULT_DATA.card_two_title,
    card_two_description: DEFAULT_DATA.card_two_description,
    card_two_layout: "right",
    card_two_image: null,
    card_two_image_preview: null,
    card_two_image_file: null,
    card_three_title: DEFAULT_DATA.card_three_title,
    card_three_description: DEFAULT_DATA.card_three_description,
    card_three_layout: "left",
    card_three_image: null,
    card_three_image_preview: null,
    card_three_image_file: null,
    chairman_name: DEFAULT_DATA.chairman_name,
    chairman_title: DEFAULT_DATA.chairman_title,
    is_active: true,
    order: 1,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [uploading, setUploading] = useState({});

  // Initialize with data or default
  useEffect(() => {
    if (data && data.id) {
      // Handle both old and new data structure
      const cardOneImage = data.card_one?.image || data.card_one_image || null;
      const cardTwoImage = data.card_two?.image || data.card_two_image || null;
      const cardThreeImage = data.card_three?.image || data.card_three_image || null;
      
      const image1Url = getImageUrl(cardOneImage);
      const image2Url = getImageUrl(cardTwoImage);
      const image3Url = getImageUrl(cardThreeImage);
      
      setSectionData({
        id: data.id || null,
        card_one_title: data.card_one?.title || data.card_one_title || DEFAULT_DATA.card_one_title,
        card_one_description: data.card_one?.description || data.card_one_description || DEFAULT_DATA.card_one_description,
        card_one_layout: data.card_one?.layout || data.card_one_layout || "left",
        card_one_image: cardOneImage,
        card_one_image_preview: image1Url,
        card_one_image_file: null,
        card_two_title: data.card_two?.title || data.card_two_title || DEFAULT_DATA.card_two_title,
        card_two_description: data.card_two?.description || data.card_two_description || DEFAULT_DATA.card_two_description,
        card_two_layout: data.card_two?.layout || data.card_two_layout || "right",
        card_two_image: cardTwoImage,
        card_two_image_preview: image2Url,
        card_two_image_file: null,
        card_three_title: data.card_three?.title || data.card_three_title || DEFAULT_DATA.card_three_title,
        card_three_description: data.card_three?.description || data.card_three_description || DEFAULT_DATA.card_three_description,
        card_three_layout: data.card_three?.layout || data.card_three_layout || "left",
        card_three_image: cardThreeImage,
        card_three_image_preview: image3Url,
        card_three_image_file: null,
        chairman_name: data.chairman?.name || data.chairman_name || DEFAULT_DATA.chairman_name,
        chairman_title: data.chairman?.title || data.chairman_title || DEFAULT_DATA.chairman_title,
        is_active: data.is_active !== undefined ? data.is_active : true,
        order: data.order || 1,
      });
    } else {
      setSectionData({
        id: null,
        card_one_title: DEFAULT_DATA.card_one_title,
        card_one_description: DEFAULT_DATA.card_one_description,
        card_one_layout: "left",
        card_one_image: null,
        card_one_image_preview: null,
        card_one_image_file: null,
        card_two_title: DEFAULT_DATA.card_two_title,
        card_two_description: DEFAULT_DATA.card_two_description,
        card_two_layout: "right",
        card_two_image: null,
        card_two_image_preview: null,
        card_two_image_file: null,
        card_three_title: DEFAULT_DATA.card_three_title,
        card_three_description: DEFAULT_DATA.card_three_description,
        card_three_layout: "left",
        card_three_image: null,
        card_three_image_preview: null,
        card_three_image_file: null,
        chairman_name: DEFAULT_DATA.chairman_name,
        chairman_title: DEFAULT_DATA.chairman_title,
        is_active: true,
        order: 1,
      });
    }
  }, [data]);

  const updateField = (field, value) => {
    setSectionData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
    setSaved(false);
    setError(null);
  };

  const handleImageUpload = (cardKey, file) => {
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

    setUploading((prev) => ({ ...prev, [cardKey]: true }));
    const previewUrl = URL.createObjectURL(file);
    
    setSectionData((prev) => ({
      ...prev,
      [`${cardKey}_image_preview`]: previewUrl,
      [`${cardKey}_image_file`]: file,
    }));
    setHasChanges(true);
    setUploading((prev) => ({ ...prev, [cardKey]: false }));
  };

  const removeImage = (cardKey) => {
    const previewField = `${cardKey}_image_preview`;
    if (sectionData[previewField]?.startsWith("blob:")) {
      URL.revokeObjectURL(sectionData[previewField]);
    }
    setSectionData((prev) => ({
      ...prev,
      [`${cardKey}_image`]: null,
      [`${cardKey}_image_preview`]: null,
      [`${cardKey}_image_file`]: null,
    }));
    setHasChanges(true);
  };

  const saveToBackend = async () => {
    setSaving(true);
    setError(null);

    try {
      const token = getToken();
      if (!token) {
        throw new Error("Please login first");
      }

      const formData = new FormData();
      
      // Append all fields with proper values
      const fields = {
        'card_one_title': sectionData.card_one_title || '',
        'card_one_description': sectionData.card_one_description || '',
        'card_one_layout': sectionData.card_one_layout || 'left',
        'card_two_title': sectionData.card_two_title || '',
        'card_two_description': sectionData.card_two_description || '',
        'card_two_layout': sectionData.card_two_layout || 'right',
        'card_three_title': sectionData.card_three_title || '',
        'card_three_description': sectionData.card_three_description || '',
        'card_three_layout': sectionData.card_three_layout || 'left',
        'chairman_name': sectionData.chairman_name || '',
        'chairman_title': sectionData.chairman_title || '',
        'is_active': sectionData.is_active ? '1' : '0',
        'order': String(sectionData.order || 1),
      };
      
      Object.keys(fields).forEach(field => {
        formData.append(field, fields[field]);
      });

      // Append images only if they are files
      ['card_one', 'card_two', 'card_three'].forEach(card => {
        if (sectionData[`${card}_image_file`]) {
          formData.append(`${card}_image`, sectionData[`${card}_image_file`]);
        }
      });

      let url, method;
      if (sectionData.id) {
        url = `${API_URL}/about/section-two/${sectionData.id}`;
        method = "POST";
        formData.append("_method", "PUT");
      } else {
        url = `${API_URL}/about/section-two`;
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
          // Handle both old and new data structure
          const cardOneImage = result.data.card_one?.image || result.data.card_one_image || null;
          const cardTwoImage = result.data.card_two?.image || result.data.card_two_image || null;
          const cardThreeImage = result.data.card_three?.image || result.data.card_three_image || null;
          
          const image1Url = getImageUrl(cardOneImage);
          const image2Url = getImageUrl(cardTwoImage);
          const image3Url = getImageUrl(cardThreeImage);
          
          setSectionData((prev) => ({
            ...prev,
            id: result.data.id || prev.id,
            card_one_title: result.data.card_one?.title || result.data.card_one_title || prev.card_one_title,
            card_one_description: result.data.card_one?.description || result.data.card_one_description || prev.card_one_description,
            card_one_layout: result.data.card_one?.layout || result.data.card_one_layout || prev.card_one_layout,
            card_one_image: cardOneImage,
            card_one_image_preview: image1Url || prev.card_one_image_preview,
            card_one_image_file: null,
            card_two_title: result.data.card_two?.title || result.data.card_two_title || prev.card_two_title,
            card_two_description: result.data.card_two?.description || result.data.card_two_description || prev.card_two_description,
            card_two_layout: result.data.card_two?.layout || result.data.card_two_layout || prev.card_two_layout,
            card_two_image: cardTwoImage,
            card_two_image_preview: image2Url || prev.card_two_image_preview,
            card_two_image_file: null,
            card_three_title: result.data.card_three?.title || result.data.card_three_title || prev.card_three_title,
            card_three_description: result.data.card_three?.description || result.data.card_three_description || prev.card_three_description,
            card_three_layout: result.data.card_three?.layout || result.data.card_three_layout || prev.card_three_layout,
            card_three_image: cardThreeImage,
            card_three_image_preview: image3Url || prev.card_three_image_preview,
            card_three_image_file: null,
            chairman_name: result.data.chairman?.name || result.data.chairman_name || prev.chairman_name,
            chairman_title: result.data.chairman?.title || result.data.chairman_title || prev.chairman_title,
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
      const cardOneImage = data.card_one?.image || data.card_one_image || null;
      const cardTwoImage = data.card_two?.image || data.card_two_image || null;
      const cardThreeImage = data.card_three?.image || data.card_three_image || null;
      
      const image1Url = getImageUrl(cardOneImage);
      const image2Url = getImageUrl(cardTwoImage);
      const image3Url = getImageUrl(cardThreeImage);
      
      setSectionData({
        id: data.id || null,
        card_one_title: data.card_one?.title || data.card_one_title || DEFAULT_DATA.card_one_title,
        card_one_description: data.card_one?.description || data.card_one_description || DEFAULT_DATA.card_one_description,
        card_one_layout: data.card_one?.layout || data.card_one_layout || "left",
        card_one_image: cardOneImage,
        card_one_image_preview: image1Url,
        card_one_image_file: null,
        card_two_title: data.card_two?.title || data.card_two_title || DEFAULT_DATA.card_two_title,
        card_two_description: data.card_two?.description || data.card_two_description || DEFAULT_DATA.card_two_description,
        card_two_layout: data.card_two?.layout || data.card_two_layout || "right",
        card_two_image: cardTwoImage,
        card_two_image_preview: image2Url,
        card_two_image_file: null,
        card_three_title: data.card_three?.title || data.card_three_title || DEFAULT_DATA.card_three_title,
        card_three_description: data.card_three?.description || data.card_three_description || DEFAULT_DATA.card_three_description,
        card_three_layout: data.card_three?.layout || data.card_three_layout || "left",
        card_three_image: cardThreeImage,
        card_three_image_preview: image3Url,
        card_three_image_file: null,
        chairman_name: data.chairman?.name || data.chairman_name || DEFAULT_DATA.chairman_name,
        chairman_title: data.chairman?.title || data.chairman_title || DEFAULT_DATA.chairman_title,
        is_active: data.is_active !== undefined ? data.is_active : true,
        order: data.order || 1,
      });
    } else {
      setSectionData({
        id: null,
        card_one_title: DEFAULT_DATA.card_one_title,
        card_one_description: DEFAULT_DATA.card_one_description,
        card_one_layout: "left",
        card_one_image: null,
        card_one_image_preview: null,
        card_one_image_file: null,
        card_two_title: DEFAULT_DATA.card_two_title,
        card_two_description: DEFAULT_DATA.card_two_description,
        card_two_layout: "right",
        card_two_image: null,
        card_two_image_preview: null,
        card_two_image_file: null,
        card_three_title: DEFAULT_DATA.card_three_title,
        card_three_description: DEFAULT_DATA.card_three_description,
        card_three_layout: "left",
        card_three_image: null,
        card_three_image_preview: null,
        card_three_image_file: null,
        chairman_name: DEFAULT_DATA.chairman_name,
        chairman_title: DEFAULT_DATA.chairman_title,
        is_active: true,
        order: 1,
      });
    }
    setHasChanges(false);
    setError(null);
  };

  // Helper to render image upload for a card
  const renderImageUpload = (cardKey, label) => {
    const preview = sectionData[`${cardKey}_image_preview`];
    const isUploading = uploading[cardKey];

    return (
      <div className="rounded-xl border bg-gray-50 p-4">
        <label className="mb-2 block text-sm font-medium">{label}</label>
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="h-40 w-full rounded-lg object-cover"
              onError={(e) => {
                console.error("Image failed to load:", preview);
                e.target.src = "https://placehold.co/600x400?text=Image+Not+Found";
              }}
            />
            <button
              onClick={() => removeImage(cardKey)}
              className="absolute top-2 right-2 rounded-full bg-red-500 p-1.5 text-white hover:bg-red-600 transition"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ) : (
          <div className="flex h-40 w-full items-center justify-center rounded-lg bg-gray-100">
            <ImageIcon size={40} className="text-gray-300" />
          </div>
        )}
        <label className="mt-3 block cursor-pointer">
          <div className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-sm font-medium text-white hover:from-amber-600 hover:to-amber-700 transition">
            {isUploading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Upload size={14} />
            )}
            {isUploading ? "Uploading..." : (preview ? "Change Image" : "Upload Image")}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(cardKey, e.target.files[0])}
            className="hidden"
          />
        </label>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">About Section 2 - Mission, Vision & Chairman</h2>
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

      {/* Card One - Mission */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Card 1 - Mission</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Title</label>
              <input
                type="text"
                value={sectionData.card_one_title || ''}
                onChange={(e) => updateField("card_one_title", e.target.value)}
                className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none"
                placeholder="Enter title..."
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Description</label>
              <textarea
                value={sectionData.card_one_description || ''}
                onChange={(e) => updateField("card_one_description", e.target.value)}
                rows={4}
                className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none resize-y"
                placeholder="Enter description..."
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Layout</label>
              <select
                value={sectionData.card_one_layout || 'left'}
                onChange={(e) => updateField("card_one_layout", e.target.value)}
                className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none"
              >
                <option value="left">Image Left, Text Right</option>
                <option value="right">Image Right, Text Left</option>
              </select>
            </div>
          </div>
          <div>
            {renderImageUpload("card_one", "Image")}
          </div>
        </div>
      </div>

      {/* Card Two - Vision */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Card 2 - Vision</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Title</label>
              <input
                type="text"
                value={sectionData.card_two_title || ''}
                onChange={(e) => updateField("card_two_title", e.target.value)}
                className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none"
                placeholder="Enter title..."
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Description</label>
              <textarea
                value={sectionData.card_two_description || ''}
                onChange={(e) => updateField("card_two_description", e.target.value)}
                rows={4}
                className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none resize-y"
                placeholder="Enter description..."
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Layout</label>
              <select
                value={sectionData.card_two_layout || 'right'}
                onChange={(e) => updateField("card_two_layout", e.target.value)}
                className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none"
              >
                <option value="left">Image Left, Text Right</option>
                <option value="right">Image Right, Text Left</option>
              </select>
            </div>
          </div>
          <div>
            {renderImageUpload("card_two", "Image")}
          </div>
        </div>
      </div>

      {/* Card Three - Chairman's Message */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Card 3 - Chairman's Message</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Title</label>
              <input
                type="text"
                value={sectionData.card_three_title || ''}
                onChange={(e) => updateField("card_three_title", e.target.value)}
                className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none"
                placeholder="Enter title..."
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Description</label>
              <textarea
                value={sectionData.card_three_description || ''}
                onChange={(e) => updateField("card_three_description", e.target.value)}
                rows={4}
                className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none resize-y"
                placeholder="Enter description..."
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Layout</label>
              <select
                value={sectionData.card_three_layout || 'left'}
                onChange={(e) => updateField("card_three_layout", e.target.value)}
                className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none"
              >
                <option value="left">Image Left, Text Right</option>
                <option value="right">Image Right, Text Left</option>
              </select>
            </div>
          </div>
          <div>
            {renderImageUpload("card_three", "Image")}
          </div>
        </div>
      </div>

      {/* Chairman Info */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Chairman Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Chairman Name</label>
            <input
              type="text"
              value={sectionData.chairman_name || ''}
              onChange={(e) => updateField("chairman_name", e.target.value)}
              className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none"
              placeholder="Enter chairman name..."
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Chairman Title</label>
            <input
              type="text"
              value={sectionData.chairman_title || ''}
              onChange={(e) => updateField("chairman_title", e.target.value)}
              className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none"
              placeholder="Enter chairman title..."
            />
          </div>
        </div>
      </div>

      {/* Active Toggle */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
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

      {/* Live Preview */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Live Preview</h3>
        <div className="space-y-6">
          {/* Card One Preview */}
          <div className="bg-amber-50 rounded-xl p-6">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${sectionData.card_one_layout === 'right' ? 'md:flex-row-reverse' : ''}`}>
              <div>
                {sectionData.card_one_image_preview ? (
                  <img 
                    src={sectionData.card_one_image_preview} 
                    alt="Mission" 
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      console.error("Card One image failed to load:", sectionData.card_one_image_preview);
                      e.target.src = "https://placehold.co/600x400?text=Image+Not+Found";
                    }}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <ImageIcon size={32} className="text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">{sectionData.card_one_title}</h4>
                <p className="text-gray-700 mt-2">{sectionData.card_one_description}</p>
              </div>
            </div>
          </div>

          {/* Card Two Preview */}
          <div className="bg-amber-50 rounded-xl p-6">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${sectionData.card_two_layout === 'right' ? 'md:flex-row-reverse' : ''}`}>
              <div>
                {sectionData.card_two_image_preview ? (
                  <img 
                    src={sectionData.card_two_image_preview} 
                    alt="Vision" 
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      console.error("Card Two image failed to load:", sectionData.card_two_image_preview);
                      e.target.src = "https://placehold.co/600x400?text=Image+Not+Found";
                    }}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <ImageIcon size={32} className="text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">{sectionData.card_two_title}</h4>
                <p className="text-gray-700 mt-2">{sectionData.card_two_description}</p>
              </div>
            </div>
          </div>

          {/* Card Three Preview */}
          <div className="bg-amber-50 rounded-xl p-6">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${sectionData.card_three_layout === 'right' ? 'md:flex-row-reverse' : ''}`}>
              <div>
                {sectionData.card_three_image_preview ? (
                  <img 
                    src={sectionData.card_three_image_preview} 
                    alt="Chairman" 
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      console.error("Card Three image failed to load:", sectionData.card_three_image_preview);
                      e.target.src = "https://placehold.co/600x400?text=Image+Not+Found";
                    }}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <ImageIcon size={32} className="text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">{sectionData.card_three_title}</h4>
                <p className="text-gray-700 mt-2">{sectionData.card_three_description}</p>
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <p className="font-semibold text-amber-700">{sectionData.chairman_name}</p>
                  <p className="text-sm text-gray-500">{sectionData.chairman_title}</p>
                </div>
              </div>
            </div>
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
              <li>• Each card represents a different section (Mission, Vision, Chairman)</li>
              <li>• Upload images for each card to make it visually appealing</li>
              <li>• Choose layout (left/right) to alternate image position</li>
              <li>• The chairman name and title appear below the third card</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}