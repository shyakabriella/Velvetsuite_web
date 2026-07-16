import { useState, useEffect } from "react";
import {
  Save,
  RotateCcw,
  Check,
  AlertCircle,
  Plus,
  Trash2,
} from "lucide-react";

const API_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");
const APP_URL = API_URL.replace(/\/api$/, "");

// Default data for Policies Section One
const DEFAULT_DATA = {
  policies: [
    {
      title: "Who we are",
      content: "Our website address is: https://www.velvetsuites.rw.",
      type: "text",
    },
    {
      title: "Check-In / Check-Out",
      content: "Check-In: From 2:00 PM\nEarly Check-In: $20 (if before 10:00 AM)\nCheck-Out: Until 11:00 AM\nLate Check-Out: Free until 12:00 PM; 50% rate until 3:00 PM",
      type: "list",
    },
    {
      title: "Cancellation Policy",
      content: "Free cancellation 48+ hours before arrival\n1-night charge for late cancellations/no-shows\n30% deposit required for stays of 5+ nights",
      type: "list",
    },
    {
      title: "Accepted Payment Methods",
      content: "Credit Cards (Visa / MasterCard / Amex) – 3% fee\nBank Transfer (for groups)\nOnline Payment Link\nCash in USD or RWF",
      type: "list",
    },
  ],
  is_active: true,
  order: 1,
};

const getToken = () => {
  return sessionStorage.getItem("token") || localStorage.getItem("token") || localStorage.getItem("auth_token");
};

export default function PoliciesSectionOne({ data, onSave }) {
  const [sectionData, setSectionData] = useState({
    id: null,
    policies: JSON.parse(JSON.stringify(DEFAULT_DATA.policies)),
    is_active: true,
    order: 1,
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
        policies: data.policies && data.policies.length > 0 
          ? data.policies 
          : JSON.parse(JSON.stringify(DEFAULT_DATA.policies)),
        is_active: data.is_active !== undefined ? data.is_active : true,
        order: data.order || 1,
      });
    } else {
      setSectionData({
        id: null,
        policies: JSON.parse(JSON.stringify(DEFAULT_DATA.policies)),
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

  const updatePolicy = (index, field, value) => {
    const newPolicies = [...sectionData.policies];
    newPolicies[index] = { ...newPolicies[index], [field]: value };
    setSectionData((prev) => ({ ...prev, policies: newPolicies }));
    setHasChanges(true);
    setSaved(false);
    setError(null);
  };

  const addPolicy = () => {
    setSectionData((prev) => ({
      ...prev,
      policies: [...prev.policies, { title: "", content: "", type: "text" }],
    }));
    setHasChanges(true);
  };

  const removePolicy = (index) => {
    if (sectionData.policies.length <= 1) {
      setError("You need at least one policy");
      return;
    }
    const newPolicies = sectionData.policies.filter((_, i) => i !== index);
    setSectionData((prev) => ({ ...prev, policies: newPolicies }));
    setHasChanges(true);
    setError(null);
  };

  const movePolicyUp = (index) => {
    if (index === 0) return;
    const newPolicies = [...sectionData.policies];
    [newPolicies[index], newPolicies[index - 1]] = [newPolicies[index - 1], newPolicies[index]];
    setSectionData((prev) => ({ ...prev, policies: newPolicies }));
    setHasChanges(true);
  };

  const movePolicyDown = (index) => {
    if (index === sectionData.policies.length - 1) return;
    const newPolicies = [...sectionData.policies];
    [newPolicies[index], newPolicies[index + 1]] = [newPolicies[index + 1], newPolicies[index]];
    setSectionData((prev) => ({ ...prev, policies: newPolicies }));
    setHasChanges(true);
  };

  const saveToBackend = async () => {
    if (!sectionData.policies || sectionData.policies.length === 0) {
      setError("At least one policy is required");
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
        policies: sectionData.policies,
        is_active: sectionData.is_active,
        order: sectionData.order || 1,
      };

      let url, method;
      if (sectionData.id) {
        url = `${API_URL}/policies/section-one/${sectionData.id}`;
        method = "PUT";
      } else {
        url = `${API_URL}/policies/section-one`;
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
            policies: result.data.policies || prev.policies,
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
        policies: data.policies && data.policies.length > 0 
          ? data.policies 
          : JSON.parse(JSON.stringify(DEFAULT_DATA.policies)),
        is_active: data.is_active !== undefined ? data.is_active : true,
        order: data.order || 1,
      });
    } else {
      setSectionData({
        id: null,
        policies: JSON.parse(JSON.stringify(DEFAULT_DATA.policies)),
        is_active: true,
        order: 1,
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
            <h2 className="text-xl font-bold text-gray-900">Policies Section 1</h2>
            <p className="text-sm text-gray-500">
              {sectionData.id ? "Edit the policies" : "Create new policies"}
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Policies</h3>
          <button
            onClick={addPolicy}
            className="flex items-center gap-1 text-sm font-medium text-amber-500 hover:text-amber-600 transition"
          >
            <Plus size={16} /> Add Policy
          </button>
        </div>

        <div className="space-y-4">
          {sectionData.policies.map((policy, index) => (
            <div key={index} className="border rounded-xl p-4 relative group bg-white hover:shadow-sm transition">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Title</label>
                  <input
                    type="text"
                    value={policy.title || ""}
                    onChange={(e) => updatePolicy(index, "title", e.target.value)}
                    className="w-full rounded-lg border px-3 py-2 focus:border-amber-400 focus:outline-none"
                    placeholder="Policy title..."
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Type</label>
                  <select
                    value={policy.type || "text"}
                    onChange={(e) => updatePolicy(index, "type", e.target.value)}
                    className="w-full rounded-lg border px-3 py-2 focus:border-amber-400 focus:outline-none"
                  >
                    <option value="text">Text</option>
                    <option value="list">List</option>
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <label className="mb-1 block text-sm font-medium">Content</label>
                {policy.type === "list" ? (
                  <textarea
                    value={policy.content || ""}
                    onChange={(e) => updatePolicy(index, "content", e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border px-3 py-2 focus:border-amber-400 focus:outline-none resize-y"
                    placeholder="Enter policy content (one item per line)..."
                  />
                ) : (
                  <textarea
                    value={policy.content || ""}
                    onChange={(e) => updatePolicy(index, "content", e.target.value)}
                    rows={2}
                    className="w-full rounded-lg border px-3 py-2 focus:border-amber-400 focus:outline-none resize-y"
                    placeholder="Enter policy content..."
                  />
                )}
              </div>

              <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => movePolicyUp(index)}
                  disabled={index === 0}
                  className={`p-1 rounded hover:bg-gray-100 ${index === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
                >
                  ↑
                </button>
                <button
                  onClick={() => movePolicyDown(index)}
                  disabled={index === sectionData.policies.length - 1}
                  className={`p-1 rounded hover:bg-gray-100 ${index === sectionData.policies.length - 1 ? "opacity-30 cursor-not-allowed" : ""}`}
                >
                  ↓
                </button>
                <button
                  onClick={() => removePolicy(index)}
                  className="p-1 rounded text-red-400 hover:text-red-600 hover:bg-red-50 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {sectionData.policies.length === 0 && (
          <p className="text-center text-gray-400 py-4">No policies added. Click "Add Policy" to create one.</p>
        )}

        {/* Active Toggle */}
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

      {/* Live Preview */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Live Preview</h3>
        <div className="bg-amber-50 rounded-xl p-6 space-y-6">
          {sectionData.policies.map((policy, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">{policy.title || "Untitled Policy"}</h4>
              {policy.type === "list" ? (
                <ul className="space-y-1">
                  {policy.content?.split("\n").filter(line => line.trim()).map((line, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">•</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-600">{policy.content}</p>
              )}
            </div>
          ))}
          {sectionData.policies.length === 0 && (
            <p className="text-center text-gray-400 py-4">No policies to preview</p>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertCircle size={16} className="text-amber-600" />
          <div>
            <p className="text-sm font-medium text-amber-800">Tips</p>
            <ul className="mt-1 space-y-1 text-xs text-amber-600">
              <li>• Each policy has a title, content, and type (text or list)</li>
              <li>• Use "list" type for policies with multiple bullet points</li>
              <li>• Separate list items with new lines</li>
              <li>• You can reorder policies using the arrows</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}