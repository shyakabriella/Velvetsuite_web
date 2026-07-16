// src/components/admin/menu/sections/MenuItems.jsx
import { useState, useEffect } from "react";
import {
  Save,
  RotateCcw,
  Check,
  AlertCircle,
  Plus,
  Trash2,
  Edit2,
  X,
  Upload,
  Image as ImageIcon,
  Utensils,
  Tag,
  DollarSign,
  Package,
} from "lucide-react";

const API_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");
const APP_URL = API_URL.replace(/\/api$/, "");

const getToken = () => {
  return sessionStorage.getItem("token") || localStorage.getItem("token") || localStorage.getItem("auth_token");
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

// Badge options for menu items
const BADGE_OPTIONS = [
  { value: "", label: "None" },
  { value: "popular", label: "Popular" },
  { value: "chef", label: "Chef's Special" },
  { value: "new", label: "New" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten-free", label: "Gluten Free" },
  { value: "spicy", label: "Spicy" },
  { value: "seasonal", label: "Seasonal" },
];

export default function MenuItems({ data, onSave }) {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
    image: null,
    image_preview: null,
    image_file: null,
    badge: "",
    is_available: true,
    is_active: true,
    order: 0,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Initialize with data
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setItems(data);
    } else {
      setItems([]);
    }
    fetchCategories();
  }, [data]);

  const fetchCategories = async () => {
    try {
      const token = getToken();
      const headers = {
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };
      const response = await fetch(`${API_URL}/menu/categories`, { headers });
      const result = await response.json();
      if (result.success) {
        setCategories(result.data || []);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      category_id: "",
      name: "",
      description: "",
      price: "",
      image: null,
      image_preview: null,
      image_file: null,
      badge: "",
      is_available: true,
      is_active: true,
      order: items.length,
    });
    setEditingId(null);
    setError(null);
  };

  const handleEdit = (item) => {
    const imageUrl = getImageUrl(item.image);
    setFormData({
      category_id: item.category?.id || item.category_id || "",
      name: item.name || "",
      description: item.description || "",
      price: item.price || "",
      image: item.image || null,
      image_preview: imageUrl,
      image_file: null,
      badge: item.badge || "",
      is_available: item.is_available !== undefined ? item.is_available : true,
      is_active: item.is_active !== undefined ? item.is_active : true,
      order: item.order || 0,
    });
    setEditingId(item.id);
    setShowForm(true);
    setError(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;

    try {
      const token = getToken();
      if (!token) {
        setError("Please login first");
        return;
      }

      const response = await fetch(`${API_URL}/menu/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        setHasChanges(true);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        
        if (onSave) {
          onSave(updatedItems);
        }
      } else {
        setError(result.message || "Error deleting menu item");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message || "Failed to delete menu item");
    }
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
    setFormData((prev) => ({
      ...prev,
      image_preview: previewUrl,
      image_file: file,
    }));
    setUploading(false);
    setHasChanges(true);
  };

  const removeImage = () => {
    if (formData.image_preview?.startsWith("blob:")) {
      URL.revokeObjectURL(formData.image_preview);
    }
    setFormData((prev) => ({
      ...prev,
      image: null,
      image_preview: null,
      image_file: null,
    }));
    setHasChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category_id) {
      setError("Please select a category");
      return;
    }
    if (!formData.name.trim()) {
      setError("Item name is required");
      return;
    }
    if (!formData.price || parseFloat(formData.price) < 0) {
      setError("Please enter a valid price");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const token = getToken();
      if (!token) {
        setError("Please login first");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("category_id", formData.category_id);
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("price", formData.price);
      formDataToSend.append("badge", formData.badge || "");
      formDataToSend.append("is_available", formData.is_available ? "1" : "0");
      formDataToSend.append("is_active", formData.is_active ? "1" : "0");
      formDataToSend.append("order", formData.order || 0);

      if (formData.image_file) {
        formDataToSend.append("image", formData.image_file);
      }

      let url, method;
      if (editingId) {
        url = `${API_URL}/menu/items/${editingId}`;
        method = "POST";
        formDataToSend.append("_method", "PUT");
      } else {
        url = `${API_URL}/menu/items`;
        method = "POST";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        let updatedItems;
        if (editingId) {
          updatedItems = items.map(item =>
            item.id === editingId ? { ...item, ...result.data } : item
          );
        } else {
          updatedItems = [...items, result.data];
        }
        
        setItems(updatedItems);
        setHasChanges(true);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        
        resetForm();
        setShowForm(false);
        
        if (onSave) {
          onSave(updatedItems);
        }
      } else {
        setError(result.message || "Error saving menu item");
      }
    } catch (err) {
      console.error("Save error:", err);
      setError(err.message || "Failed to save menu item");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : "Unknown";
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Menu Items</h2>
            <p className="text-sm text-gray-500">
              Manage your menu items
            </p>
          </div>
          <div className="flex gap-3">
            {saved && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-amber-600">
                <Check size={16} /> Saved
              </span>
            )}
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-sm font-semibold text-white hover:from-amber-600 hover:to-amber-700 transition"
            >
              <Plus size={15} /> Add Menu Item
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 flex items-center gap-2">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingId ? "Edit Menu Item" : "Add New Menu Item"}
            </h3>
            <button
              onClick={handleCancel}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Category *</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Item Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  placeholder="e.g., Grilled Salmon"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 resize-y"
                  placeholder="Describe the menu item..."
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Price *</label>
                <div className="relative">
                  <DollarSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full rounded-xl border px-4 py-2.5 pl-10 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Badge</label>
                <select
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                >
                  {BADGE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  placeholder="Display order"
                  min="0"
                />
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium">Available</label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, is_available: !formData.is_available })}
                    className={`relative h-6 w-12 rounded-full transition-colors ${
                      formData.is_available ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                        formData.is_available ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium">Active</label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
                    className={`relative h-6 w-12 rounded-full transition-colors ${
                      formData.is_active ? "bg-amber-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                        formData.is_active ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="rounded-xl border bg-gray-50 p-4">
              <label className="mb-2 block text-sm font-medium">Item Image</label>
              <div className="flex items-center gap-4">
                {formData.image_preview ? (
                  <div className="relative">
                    <img
                      src={formData.image_preview}
                      alt="Preview"
                      className="h-24 w-24 rounded-lg object-cover"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/200x200?text=Image+Not+Found";
                      }}
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-gray-200">
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
                    {uploading ? "Uploading..." : formData.image_preview ? "Change Image" : "Upload Image"}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500">Max 5MB. JPEG, PNG, WebP</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2.5 text-sm font-semibold text-white hover:from-amber-600 hover:to-amber-700 transition disabled:opacity-50"
              >
                {saving ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Save size={15} />
                )}
                {saving ? "Saving..." : editingId ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-2 rounded-xl border px-6 py-2.5 text-sm font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Items List */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            All Menu Items ({items.length})
          </h3>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <Utensils size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No menu items yet</p>
            <p className="text-sm text-gray-400">Click "Add Menu Item" to create your first one</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-gray-500">
                  <th className="pb-3 font-medium">Image</th>
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Badge</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const imageUrl = getImageUrl(item.image);
                  return (
                    <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                      <td className="py-3">
                        <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={item.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.src = "https://placehold.co/100x100?text=No+Image";
                              }}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <ImageIcon size={20} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3">
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          {item.description && (
                            <div className="text-xs text-gray-500 truncate max-w-[200px]">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 text-sm text-gray-500">
                        {item.category?.name || getCategoryName(item.category_id)}
                      </td>
                      <td className="py-3 font-medium text-gray-900">
                        {formatPrice(item.price)}
                      </td>
                      <td className="py-3">
                        {item.badge && (
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            item.badge === "popular" ? "bg-red-100 text-red-700" :
                            item.badge === "chef" ? "bg-purple-100 text-purple-700" :
                            item.badge === "new" ? "bg-green-100 text-green-700" :
                            item.badge === "vegan" ? "bg-emerald-100 text-emerald-700" :
                            item.badge === "gluten-free" ? "bg-blue-100 text-blue-700" :
                            item.badge === "spicy" ? "bg-orange-100 text-orange-700" :
                            "bg-gray-100 text-gray-700"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </td>
                      <td className="py-3">
                        <div className="flex gap-1">
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                              item.is_available
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {item.is_available ? "Available" : "Unavailable"}
                          </span>
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                              item.is_active
                                ? "bg-amber-100 text-amber-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {item.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="rounded-lg p-2 text-blue-500 hover:bg-blue-50 transition"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="rounded-lg p-2 text-red-500 hover:bg-red-50 transition"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertCircle size={16} className="text-amber-600" />
          <div>
            <p className="text-sm font-medium text-amber-800">Tips</p>
            <ul className="mt-1 space-y-1 text-xs text-amber-600">
              <li>• Add clear, descriptive names and prices for your menu items</li>
              <li>• Upload high-quality images to make items more appealing</li>
              <li>• Use badges to highlight special items (Popular, Chef's Special, etc.)</li>
              <li>• Toggle "Available" to temporarily hide items without deleting them</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}