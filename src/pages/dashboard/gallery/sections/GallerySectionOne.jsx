import { useState, useEffect } from "react";
import {
  Save,
  RotateCcw,
  Check,
  AlertCircle,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

const API_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");
const APP_URL = API_URL.replace(/\/api$/, "");

const getImageUrl = (path) => {
  if (!path) return null;
  
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  
  if (path.startsWith("blob:")) {
    return path;
  }
  
  if (path.startsWith("/storage/")) {
    return `${APP_URL}${path}`;
  }
  
  if (path.startsWith("storage/")) {
    return `${APP_URL}/${path}`;
  }
  
  if (path.includes("gallery/section-one/")) {
    return `${APP_URL}/storage/${path}`;
  }
  
  return `${APP_URL}/storage/${path}`;
};

const getToken = () => {
  return sessionStorage.getItem("token") || localStorage.getItem("token") || localStorage.getItem("auth_token");
};

export default function GallerySectionOne({ data, onSave }) {
  const [sectionData, setSectionData] = useState({
    id: null,
    images: [],
    is_active: true,
    order: 1,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFiles, setImageFiles] = useState({});

  const fetchData = async () => {
    setLoading(true);
    
    try {
      const token = getToken();
      const headers = {
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const response = await fetch(`${API_URL}/gallery/section-one`, { headers });
      const result = await response.json();

      if (result.success && result.data && result.data.length > 0) {
        const section = result.data[0];
        
        let images = [];
        if (section.images && Array.isArray(section.images)) {
          images = section.images.map((img) => {
            if (typeof img === 'string') {
              return getImageUrl(img);
            }
            if (typeof img === 'object' && img.image) {
              return getImageUrl(img.image);
            }
            if (typeof img === 'object' && img.url) {
              return img.url;
            }
            return null;
          }).filter(img => img !== null && img !== 'null' && img !== 'undefined' && img !== '');
        }
        
        setSectionData({
          id: section.id || null,
          images: images.length > 0 ? images : [],
          is_active: section.is_active !== undefined ? section.is_active : true,
          order: section.order || 1,
        });
        setImageFiles({});
      } else {
        setSectionData({
          id: null,
          images: [],
          is_active: true,
          order: 1,
        });
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load gallery data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.id) {
      let images = [];
      if (data.images && Array.isArray(data.images)) {
        images = data.images.map(img => {
          if (typeof img === 'string') {
            return getImageUrl(img);
          }
          if (typeof img === 'object' && img.image) {
            return getImageUrl(img.image);
          }
          if (typeof img === 'object' && img.url) {
            return img.url;
          }
          return null;
        }).filter(img => img !== null && img !== 'null' && img !== 'undefined' && img !== '');
      }
      
      setSectionData(prev => ({
        ...prev,
        id: data.id || prev.id,
        images: images.length > 0 ? images : prev.images,
        is_active: data.is_active !== undefined ? data.is_active : prev.is_active,
        order: data.order || prev.order,
      }));
      setImageFiles({});
    }
  }, [data]);

  const updateField = (field, value) => {
    setSectionData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
    setSaved(false);
    setError(null);
  };

  const addImage = () => {
    setSectionData((prev) => ({
      ...prev,
      images: [...prev.images, null],
    }));
    setHasChanges(true);
  };

  const removeImage = (index) => {
    if (sectionData.images.length <= 1) {
      setError("You need at least one image");
      return;
    }
    
    const newImages = sectionData.images.filter((_, i) => i !== index);
    setSectionData((prev) => ({ 
      ...prev, 
      images: newImages 
    }));
    
    if (imageFiles[index]) {
      const newImageFiles = { ...imageFiles };
      delete newImageFiles[index];
      setImageFiles(newImageFiles);
    }
    
    setHasChanges(true);
    setError(null);
  };

  const handleImageUpload = (index, file) => {
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

    setUploadingIndex(index);
    setUploading(true);
    const previewUrl = URL.createObjectURL(file);
    
    const newImages = [...sectionData.images];
    newImages[index] = previewUrl;
    
    setSectionData((prev) => ({
      ...prev,
      images: newImages,
    }));
    setImageFiles(prev => ({
      ...prev,
      [index]: file,
    }));
    setHasChanges(true);
    setUploading(false);
    setUploadingIndex(null);
  };

  const moveImageUp = (index) => {
    if (index === 0) return;
    const newImages = [...sectionData.images];
    [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]];
    setSectionData((prev) => ({ ...prev, images: newImages }));
    setHasChanges(true);
  };

  const moveImageDown = (index) => {
    if (index === sectionData.images.length - 1) return;
    const newImages = [...sectionData.images];
    [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
    setSectionData((prev) => ({ ...prev, images: newImages }));
    setHasChanges(true);
  };

  const saveToBackend = async () => {
    if (!sectionData.images || sectionData.images.length === 0) {
      setError("At least one image is required");
      return;
    }

    const validImages = sectionData.images.filter(img => img && img !== '' && img !== 'null' && img !== 'undefined');
    if (validImages.length === 0) {
      setError("At least one valid image is required");
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
      formData.append("is_active", sectionData.is_active ? "1" : "0");
      formData.append("order", String(sectionData.order || 1));

      // Build the images array to send
      const imageUrls = [];
      const imageFilesData = { ...imageFiles };

      sectionData.images.forEach((img, index) => {
        if (imageFilesData[index]) {
          // This is a new file upload
          formData.append(`image_${index}`, imageFilesData[index]);
          imageUrls.push(`__file_${index}__`);
        } else if (img && typeof img === 'string') {
          if (img.startsWith('blob:')) {
            // Blob URL without file - skip
            imageUrls.push('');
          } else if (img.startsWith('http') || img.startsWith('https')) {
            // Full URL - extract the storage path
            const path = img.replace(`${APP_URL}/storage/`, '');
            imageUrls.push(path);
          } else {
            // Already a storage path
            imageUrls.push(img);
          }
        } else {
          imageUrls.push('');
        }
      });

      // Filter out empty values
      const filteredUrls = imageUrls.filter(url => url && url !== '' && url !== 'null' && url !== 'undefined');
      
      formData.append("images", JSON.stringify(filteredUrls));
      formData.append("image_count", String(filteredUrls.length));

      let url, method;
      if (sectionData.id) {
        url = `${API_URL}/gallery/section-one/${sectionData.id}`;
        method = "POST";
        formData.append("_method", "PUT");
      } else {
        url = `${API_URL}/gallery/section-one`;
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
        setImageFiles({});
        await fetchData();
        if (onSave) {
          onSave(result.data);
        }
      } else {
        setError(result.message || "Error saving gallery section");
      }
    } catch (err) {
      console.error("Save error:", err);
      setError(err.message || "Failed to save gallery section");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    fetchData();
    setImageFiles({});
    setHasChanges(false);
    setError(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
        <p className="ml-3 text-sm text-gray-500">Loading gallery data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Gallery Section 1 - Sliding Images</h2>
            <p className="text-sm text-gray-500">
              {sectionData.id ? "Edit the gallery images" : "Create a new gallery section"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Images: {sectionData.images.length}
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

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Gallery Images</h3>
          <button
            onClick={addImage}
            className="flex items-center gap-1 text-sm font-medium text-amber-500 hover:text-amber-600 transition"
          >
            <Plus size={16} /> Add Image
          </button>
        </div>

        {sectionData.images.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon size={48} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No images in gallery</p>
            <p className="text-sm text-gray-400">Click "Add Image" to add your first image</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sectionData.images.map((image, index) => {
              const isUploading = uploading && uploadingIndex === index;
              const hasImage = image && typeof image === 'string' && image !== '' && image !== 'null' && image !== 'undefined';
              
              return (
                <div key={index} className="border rounded-xl p-3 relative group bg-white hover:shadow-md transition-all">
                  <div className="relative h-40 w-full rounded-lg overflow-hidden bg-gray-100">
                    {isUploading ? (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
                      </div>
                    ) : hasImage ? (
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/400x300?text=Image+Not+Found";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        <ImageIcon size={40} />
                        <span className="text-xs mt-2">No image</span>
                      </div>
                    )}
                    
                    {!hasImage && !isUploading && (
                      <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-gray-50/80 hover:bg-gray-100/80 transition">
                        <Upload size={32} className="text-gray-400" />
                        <span className="text-xs text-gray-500 mt-1">Click to upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(index, e.target.files[0])}
                          className="hidden"
                        />
                      </label>
                    )}
                    
                    <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => moveImageUp(index)}
                        disabled={index === 0}
                        className={`p-1 rounded bg-white shadow hover:bg-gray-100 ${index === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveImageDown(index)}
                        disabled={index === sectionData.images.length - 1}
                        className={`p-1 rounded bg-white shadow hover:bg-gray-100 ${index === sectionData.images.length - 1 ? "opacity-30 cursor-not-allowed" : ""}`}
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => removeImage(index)}
                        className="p-1 rounded bg-white shadow text-red-400 hover:text-red-600 hover:bg-red-50 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Image {index + 1}</span>
                    {hasImage && (
                      <label className="cursor-pointer">
                        <span className="text-xs text-amber-500 hover:text-amber-600 transition font-medium">
                          Change
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(index, e.target.files[0])}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-3 mt-6 pt-4 border-t">
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

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Live Preview</h3>
        <div className="bg-amber-50 rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {sectionData.images.map((image, index) => {
              const hasImage = image && typeof image === 'string' && image !== '' && image !== 'null' && image !== 'undefined';
              return (
                <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-200">
                  {hasImage ? (
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/200x200?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon size={24} className="text-gray-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {sectionData.images.length === 0 && (
            <p className="text-center text-gray-400 py-4">No images to preview</p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertCircle size={16} className="text-amber-600" />
          <div>
            <p className="text-sm font-medium text-amber-800">Tips</p>
            <ul className="mt-1 space-y-1 text-xs text-amber-600">
              <li>• Click on the image slot to upload a new image</li>
              <li>• Use the arrows to reorder images</li>
              <li>• Click "Change" to replace an existing image</li>
              <li>• All images will be displayed as a sliding gallery</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}