// src/components/admin/menu/sections/MenuCategories.jsx
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
  GripVertical,
  List,
  Coffee,
  Utensils,
  Wine,
  Cake,
  Pizza,
  Beer,
  GlassWater,
  Sandwich,
  Soup,
  Salad,
  IceCream,
  Apple,
  Bone,
  CupSoda,
  Package,
} from "lucide-react";

const API_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");

const getToken = () => {
  return sessionStorage.getItem("token") || localStorage.getItem("token") || localStorage.getItem("auth_token");
};

// Icon options for categories
const ICON_OPTIONS = [
  { value: "coffee", label: "Coffee", icon: Coffee },
  { value: "utensils", label: "Utensils", icon: Utensils },
  { value: "wine", label: "Wine", icon: Wine },
  { value: "cake", label: "Cake", icon: Cake },
  { value: "pizza", label: "Pizza", icon: Pizza },
  { value: "beer", label: "Beer", icon: Beer },
  { value: "glass-water", label: "Glass Water", icon: GlassWater },
  { value: "sandwich", label: "Sandwich", icon: Sandwich },
  { value: "soup", label: "Soup", icon: Soup },
  { value: "salad", label: "Salad", icon: Salad },
  { value: "ice-cream", label: "Ice Cream", icon: IceCream },
  { value: "apple", label: "Apple", icon: Apple },
  { value: "bone", label: "Bone", icon: Bone },
  { value: "cup-soda", label: "Cup Soda", icon: CupSoda },
  { value: "package", label: "Package", icon: Package },
  { value: "list", label: "List", icon: List },
];

const getIconComponent = (iconName) => {
  const option = ICON_OPTIONS.find(opt => opt.value === iconName);
  return option ? option.icon : List;
};

export default function MenuCategories({ data, onSave }) {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    icon: "utensils",
    is_active: true,
    order: 0,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Initialize with data
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setCategories(data);
    } else {
      setCategories([]);
    }
  }, [data]);

  const resetForm = () => {
    setFormData({
      name: "",
      icon: "utensils",
      is_active: true,
      order: categories.length,
    });
    setEditingId(null);
    setError(null);
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      icon: category.icon || "utensils",
      is_active: category.is_active,
      order: category.order || 0,
    });
    setEditingId(category.id);
    setShowForm(true);
    setError(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const token = getToken();
      if (!token) {
        setError("Please login first");
        return;
      }

      const response = await fetch(`${API_URL}/menu/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        const updatedCategories = categories.filter(cat => cat.id !== id);
        setCategories(updatedCategories);
        setHasChanges(true);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        
        if (onSave) {
          onSave(updatedCategories);
        }
      } else {
        setError(result.message || "Error deleting category");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message || "Failed to delete category");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Category name is required");
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

      const payload = {
        name: formData.name.trim(),
        icon: formData.icon,
        is_active: formData.is_active,
        order: formData.order || categories.length,
      };

      let url, method;
      if (editingId) {
        url = `${API_URL}/menu/categories/${editingId}`;
        method = "PUT";
      } else {
        url = `${API_URL}/menu/categories`;
        method = "POST";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        let updatedCategories;
        if (editingId) {
          updatedCategories = categories.map(cat =>
            cat.id === editingId ? { ...cat, ...result.data } : cat
          );
        } else {
          updatedCategories = [...categories, result.data];
        }
        
        setCategories(updatedCategories);
        setHasChanges(true);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        
        resetForm();
        setShowForm(false);
        
        if (onSave) {
          onSave(updatedCategories);
        }
      } else {
        setError(result.message || "Error saving category");
      }
    } catch (err) {
      console.error("Save error:", err);
      setError(err.message || "Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  const handleReorder = async (id, direction) => {
    const index = categories.findIndex(cat => cat.id === id);
    if (index === -1) return;
    
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= categories.length) return;
    
    const newCategories = [...categories];
    const [movedItem] = newCategories.splice(index, 1);
    newCategories.splice(newIndex, 0, movedItem);
    
    // Update order values
    const updatedCategories = newCategories.map((cat, idx) => ({
      ...cat,
      order: idx,
    }));
    
    setCategories(updatedCategories);
    setHasChanges(true);
    
    // Save order changes to backend
    try {
      const token = getToken();
      if (!token) return;
      
      for (const cat of updatedCategories) {
        await fetch(`${API_URL}/menu/categories/${cat.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ order: cat.order }),
        });
      }
      
      if (onSave) {
        onSave(updatedCategories);
      }
    } catch (err) {
      console.error("Reorder error:", err);
    }
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  const IconComponent = (iconName) => {
    const Icon = getIconComponent(iconName);
    return <Icon size={18} />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Menu Categories</h2>
            <p className="text-sm text-gray-500">
              Manage your menu categories
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
              <Plus size={15} /> Add Category
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
              {editingId ? "Edit Category" : "Add New Category"}
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
                <label className="mb-1 block text-sm font-medium">Category Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  placeholder="e.g., Appetizers"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Icon</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                >
                  {ICON_OPTIONS.map((opt) => (
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

      {/* Categories List */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            All Categories ({categories.length})
          </h3>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <List size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No categories yet</p>
            <p className="text-sm text-gray-400">Click "Add Category" to create your first one</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-gray-500">
                  <th className="pb-3 font-medium">Order</th>
                  <th className="pb-3 font-medium">Icon</th>
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Slug</th>
                  <th className="pb-3 font-medium">Items</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => {
                  const Icon = getIconComponent(category.icon);
                  return (
                    <tr key={category.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                      <td className="py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleReorder(category.id, "up")}
                            disabled={category.order === 0}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => handleReorder(category.id, "down")}
                            disabled={category.order === categories.length - 1}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          >
                            ↓
                          </button>
                          <span className="ml-2 text-sm text-gray-500">{category.order || 0}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
                          <Icon size={18} />
                        </div>
                      </td>
                      <td className="py-3 font-medium text-gray-900">{category.name}</td>
                      <td className="py-3 text-sm text-gray-500">{category.slug}</td>
                      <td className="py-3 text-sm text-gray-500">{category.items_count || 0}</td>
                      <td className="py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            category.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {category.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(category)}
                            className="rounded-lg p-2 text-blue-500 hover:bg-blue-50 transition"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
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
              <li>• Categories help organize your menu items</li>
              <li>• Use the arrows to reorder categories</li>
              <li>• Each category can have multiple menu items</li>
              <li>• Inactive categories won't show on the website</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}