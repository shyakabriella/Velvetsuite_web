/**
 * Image helper functions for the frontend
 */

// Get the base URL without /api
const API_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");
const APP_URL = API_URL.replace(/\/api$/, "");

/**
 * Get the full URL for an image path
 * 
 * @param {string|null} path - The image path from the database
 * @returns {string|null} - The full image URL
 */
export const getImageUrl = (path) => {
  if (!path) return null;

  // If it's already a full URL (from external source)
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // If it starts with /storage/
  if (path.startsWith("/storage/")) {
    return `${APP_URL}${path}`;
  }

  // If it starts with storage/
  if (path.startsWith("storage/")) {
    return `${APP_URL}/${path}`;
  }

  // Default: assume it's a path under storage
  return `${APP_URL}/storage/${path}`;
};

/**
 * Validate an image file before upload
 * 
 * @param {File} file - The image file
 * @param {number} maxSize - Max size in MB
 * @param {string[]} allowedTypes - Allowed MIME types
 * @returns {Object} - { valid: boolean, errors: string[] }
 */
export const validateImage = (file, maxSize = 5, allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"]) => {
  const errors = [];

  if (!file) {
    errors.push("No image file provided");
    return { valid: false, errors };
  }

  // Check file size (in MB)
  if (file.size > maxSize * 1024 * 1024) {
    errors.push(`Image size must be less than ${maxSize}MB`);
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    errors.push(`Invalid image type. Allowed: ${allowedTypes.join(", ")}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Create a preview URL for an image file
 * 
 * @param {File} file - The image file
 * @returns {string} - The preview URL
 */
export const createImagePreview = (file) => {
  if (!file) return null;
  return URL.createObjectURL(file);
};

/**
 * Revoke a preview URL
 * 
 * @param {string} url - The preview URL to revoke
 */
export const revokeImagePreview = (url) => {
  if (url && url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
};

/**
 * Prepare FormData for image upload
 * 
 * @param {Object} data - The form data
 * @param {File|null} imageFile - The image file
 * @param {string} imageField - The field name for the image
 * @returns {FormData} - The prepared FormData
 */
export const prepareFormData = (data, imageFile, imageField = "image") => {
  const formData = new FormData();

  // Append all fields except the image
  Object.keys(data).forEach((key) => {
    if (key !== imageField && key !== `${imageField}_file`) {
      // Handle arrays and objects
      if (Array.isArray(data[key])) {
        formData.append(key, JSON.stringify(data[key]));
      } else if (typeof data[key] === "object" && data[key] !== null) {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key] !== null && data[key] !== undefined ? String(data[key]) : "");
      }
    }
  });

  // Append image file if exists
  if (imageFile) {
    formData.append(imageField, imageFile);
  }

  return formData;
};