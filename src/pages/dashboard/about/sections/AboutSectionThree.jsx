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

// Default data for About Section Three
const DEFAULT_DATA = {
  title: "Meet Our Team",
  team_members: [
    {
      name: "Mazimpaka Emmanuel",
      title: "OPERATIONS MANAGER",
      image: null,
    },
    {
      name: "Musabyimana Louise",
      title: "HEAD OF CUSTOMER CARE",
      image: null,
    },
    {
      name: "Uwamahoro Delphine",
      title: "RECEPTIONIST",
      image: null,
    },
  ],
  board_members: [
    {
      name: "Ally Gasana",
      title: "CHAIRMAN OF THE BOARD",
      image: null,
    },
    {
      name: "Olivia Nyirandende",
      title: "BOARD MEMBER",
      image: null,
    },
    {
      name: "Edwin Kamanzi",
      title: "BOARD MEMBER",
      image: null,
    },
  ],
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

export default function AboutSectionThree({ data, onSave }) {
  const [sectionData, setSectionData] = useState({
    id: null,
    title: DEFAULT_DATA.title,
    team_members: JSON.parse(JSON.stringify(DEFAULT_DATA.team_members)),
    board_members: JSON.parse(JSON.stringify(DEFAULT_DATA.board_members)),
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
      const teamMembers = (data.team_members || []).map(member => ({
        ...member,
        image_preview: getImageUrl(member.image),
        image_file: null,
      }));
      
      const boardMembers = (data.board_members || []).map(member => ({
        ...member,
        image_preview: getImageUrl(member.image),
        image_file: null,
      }));
      
      setSectionData({
        id: data.id || null,
        title: data.title || DEFAULT_DATA.title,
        team_members: teamMembers.length > 0 ? teamMembers : JSON.parse(JSON.stringify(DEFAULT_DATA.team_members)),
        board_members: boardMembers.length > 0 ? boardMembers : JSON.parse(JSON.stringify(DEFAULT_DATA.board_members)),
        is_active: data.is_active !== undefined ? data.is_active : true,
        order: data.order || 1,
      });
    } else {
      setSectionData({
        id: null,
        title: DEFAULT_DATA.title,
        team_members: JSON.parse(JSON.stringify(DEFAULT_DATA.team_members)),
        board_members: JSON.parse(JSON.stringify(DEFAULT_DATA.board_members)),
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

  const updateMember = (type, index, field, value) => {
    const members = [...sectionData[type]];
    members[index] = { ...members[index], [field]: value };
    setSectionData((prev) => ({ ...prev, [type]: members }));
    setHasChanges(true);
    setSaved(false);
    setError(null);
  };

  const addMember = (type) => {
    const newMember = { name: "", title: "", image: null, image_preview: null, image_file: null };
    setSectionData((prev) => ({
      ...prev,
      [type]: [...prev[type], newMember],
    }));
    setHasChanges(true);
  };

  const removeMember = (type, index) => {
    const members = sectionData[type].filter((_, i) => i !== index);
    setSectionData((prev) => ({ ...prev, [type]: members }));
    setHasChanges(true);
  };

  const handleImageUpload = (type, index, file) => {
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

    const key = `${type}_${index}`;
    setUploading((prev) => ({ ...prev, [key]: true }));
    const previewUrl = URL.createObjectURL(file);
    
    const members = [...sectionData[type]];
    members[index] = {
      ...members[index],
      image_preview: previewUrl,
      image_file: file,
    };
    
    setSectionData((prev) => ({ ...prev, [type]: members }));
    setHasChanges(true);
    setUploading((prev) => ({ ...prev, [key]: false }));
  };

  const removeImage = (type, index) => {
    const members = [...sectionData[type]];
    if (members[index].image_preview?.startsWith("blob:")) {
      URL.revokeObjectURL(members[index].image_preview);
    }
    members[index] = {
      ...members[index],
      image: null,
      image_preview: null,
      image_file: null,
    };
    setSectionData((prev) => ({ ...prev, [type]: members }));
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
      
      // Append title and other fields
      formData.append("title", sectionData.title || "Meet Our Team");
      formData.append("is_active", sectionData.is_active ? "1" : "0");
      formData.append("order", String(sectionData.order || 1));

      // Process team members - send as array fields
      sectionData.team_members.forEach((member, index) => {
        formData.append(`team_members[${index}][name]`, member.name || "");
        formData.append(`team_members[${index}][title]`, member.title || "");
        if (member.image) {
          formData.append(`team_members[${index}][image]`, member.image);
        }
      });

      // Process board members - send as array fields
      sectionData.board_members.forEach((member, index) => {
        formData.append(`board_members[${index}][name]`, member.name || "");
        formData.append(`board_members[${index}][title]`, member.title || "");
        if (member.image) {
          formData.append(`board_members[${index}][image]`, member.image);
        }
      });

      // Handle image file uploads
      sectionData.team_members.forEach((member, index) => {
        if (member.image_file) {
          formData.append(`team_members_${index}_image`, member.image_file);
        }
      });

      sectionData.board_members.forEach((member, index) => {
        if (member.image_file) {
          formData.append(`board_members_${index}_image`, member.image_file);
        }
      });

      let url, method;
      if (sectionData.id) {
        url = `${API_URL}/about/section-three/${sectionData.id}`;
        method = "POST";
        formData.append("_method", "PUT");
      } else {
        url = `${API_URL}/about/section-three`;
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
          const teamMembers = (result.data.team_members || []).map(member => ({
            ...member,
            image_preview: getImageUrl(member.image),
            image_file: null,
          }));
          
          const boardMembers = (result.data.board_members || []).map(member => ({
            ...member,
            image_preview: getImageUrl(member.image),
            image_file: null,
          }));
          
          setSectionData((prev) => ({
            ...prev,
            id: result.data.id || prev.id,
            title: result.data.title || prev.title,
            team_members: teamMembers.length > 0 ? teamMembers : prev.team_members,
            board_members: boardMembers.length > 0 ? boardMembers : prev.board_members,
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
      const teamMembers = (data.team_members || []).map(member => ({
        ...member,
        image_preview: getImageUrl(member.image),
        image_file: null,
      }));
      
      const boardMembers = (data.board_members || []).map(member => ({
        ...member,
        image_preview: getImageUrl(member.image),
        image_file: null,
      }));
      
      setSectionData({
        id: data.id || null,
        title: data.title || DEFAULT_DATA.title,
        team_members: teamMembers.length > 0 ? teamMembers : JSON.parse(JSON.stringify(DEFAULT_DATA.team_members)),
        board_members: boardMembers.length > 0 ? boardMembers : JSON.parse(JSON.stringify(DEFAULT_DATA.board_members)),
        is_active: data.is_active !== undefined ? data.is_active : true,
        order: data.order || 1,
      });
    } else {
      setSectionData({
        id: null,
        title: DEFAULT_DATA.title,
        team_members: JSON.parse(JSON.stringify(DEFAULT_DATA.team_members)),
        board_members: JSON.parse(JSON.stringify(DEFAULT_DATA.board_members)),
        is_active: true,
        order: 1,
      });
    }
    setHasChanges(false);
    setError(null);
  };

  // Helper to render member card
  const renderMember = (type, member, index, label) => {
    const isUploading = uploading[`${type}_${index}`];

    return (
      <div className="border rounded-xl p-4 relative group bg-white hover:shadow-md transition-all">
        <div className="flex items-start gap-4">
          {/* Image */}
          <div className="w-20 h-20 shrink-0">
            <div className="relative w-full h-full">
              {member.image_preview ? (
                <div className="relative w-full h-full">
                  <img
                    src={member.image_preview}
                    alt={member.name || "Member"}
                    className="w-full h-full rounded-full object-cover border-2 border-amber-200"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/100x100?text=No+Image";
                    }}
                  />
                  <button
                    onClick={() => removeImage(type, index)}
                    className="absolute -top-1 -right-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition shadow-md"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ) : (
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                  <ImageIcon size={24} className="text-gray-300" />
                </div>
              )}
            </div>
            <label className="mt-1 block cursor-pointer text-center">
              <div className="text-xs text-amber-500 hover:text-amber-600 transition font-medium">
                {isUploading ? "Uploading..." : (member.image_preview ? "Change" : "Add Photo")}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(type, index, e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>

          {/* Fields */}
          <div className="flex-1 space-y-2">
            <div>
              <label className="text-xs font-medium text-gray-500">Name</label>
              <input
                type="text"
                value={member.name || ""}
                onChange={(e) => updateMember(type, index, "name", e.target.value)}
                className="w-full rounded-lg border px-3 py-1.5 text-sm focus:border-amber-400 focus:outline-none"
                placeholder="Enter name..."
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Title</label>
              <input
                type="text"
                value={member.title || ""}
                onChange={(e) => updateMember(type, index, "title", e.target.value)}
                className="w-full rounded-lg border px-3 py-1.5 text-sm focus:border-amber-400 focus:outline-none"
                placeholder="Enter title..."
              />
            </div>
          </div>

          <button
            onClick={() => removeMember(type, index)}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">About Section 3 - Meet Our Team & Board</h2>
            <p className="text-sm text-gray-500">
              {sectionData.id ? "Edit the team members" : "Create a new team section"}
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

      {/* Title */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-medium">Section Title</label>
          <input
            type="text"
            value={sectionData.title || ""}
            onChange={(e) => updateField("title", e.target.value)}
            className="w-full rounded-xl border px-4 py-2.5 focus:border-amber-400 focus:outline-none"
            placeholder="Enter section title..."
          />
        </div>
      </div>

      {/* Team Members */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
          <button
            onClick={() => addMember("team_members")}
            className="flex items-center gap-1 text-sm font-medium text-amber-500 hover:text-amber-600 transition"
          >
            <Plus size={16} /> Add Member
          </button>
        </div>
        <div className="space-y-3">
          {sectionData.team_members.map((member, index) => (
            <div key={index}>
              {renderMember("team_members", member, index, `Team Member ${index + 1}`)}
            </div>
          ))}
          {sectionData.team_members.length === 0 && (
            <p className="text-center text-gray-400 py-4">No team members added. Click "Add Member" to add one.</p>
          )}
        </div>
      </div>

      {/* Board Members */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Board of Directors</h3>
          <button
            onClick={() => addMember("board_members")}
            className="flex items-center gap-1 text-sm font-medium text-amber-500 hover:text-amber-600 transition"
          >
            <Plus size={16} /> Add Member
          </button>
        </div>
        <div className="space-y-3">
          {sectionData.board_members.map((member, index) => (
            <div key={index}>
              {renderMember("board_members", member, index, `Board Member ${index + 1}`)}
            </div>
          ))}
          {sectionData.board_members.length === 0 && (
            <p className="text-center text-gray-400 py-4">No board members added. Click "Add Member" to add one.</p>
          )}
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
          {/* Team Preview */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Team Members</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sectionData.team_members.map((member, index) => (
                <div key={index} className="bg-amber-50 rounded-lg p-4 text-center">
                  <div className="w-20 h-20 mx-auto mb-2">
                    {member.image_preview ? (
                      <img
                        src={member.image_preview}
                        alt={member.name || "Member"}
                        className="w-full h-full rounded-full object-cover border-2 border-amber-300"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-amber-200 flex items-center justify-center">
                        <span className="text-amber-600 font-bold text-xl">
                          {member.name?.[0] || "?"}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="font-semibold text-gray-800 text-sm">{member.name || "Name"}</p>
                  <p className="text-xs text-gray-500">{member.title || "Title"}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Board Preview */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Board of Directors</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sectionData.board_members.map((member, index) => (
                <div key={index} className="bg-amber-50 rounded-lg p-4 text-center">
                  <div className="w-20 h-20 mx-auto mb-2">
                    {member.image_preview ? (
                      <img
                        src={member.image_preview}
                        alt={member.name || "Member"}
                        className="w-full h-full rounded-full object-cover border-2 border-amber-300"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-amber-200 flex items-center justify-center">
                        <span className="text-amber-600 font-bold text-xl">
                          {member.name?.[0] || "?"}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="font-semibold text-gray-800 text-sm">{member.name || "Name"}</p>
                  <p className="text-xs text-gray-500">{member.title || "Title"}</p>
                </div>
              ))}
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
              <li>• Add team members and board members with their images</li>
              <li>• Upload square images (1:1 ratio) for best results</li>
              <li>• You can add or remove members at any time</li>
              <li>• All changes are saved directly to the database</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}