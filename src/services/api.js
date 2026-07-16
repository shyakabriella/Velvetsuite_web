const API_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");

const getToken = () => {
  return localStorage.getItem("token") || localStorage.getItem("auth_token");
};

const api = {
  // GET request
  get: async (endpoint) => {
    const token = getToken();
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(`${API_URL}${endpoint}`, { headers });
    return response.json();
  },

  // POST request
  post: async (endpoint, data) => {
    const token = getToken();
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // PUT request
  put: async (endpoint, data) => {
    const token = getToken();
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // DELETE request
  delete: async (endpoint) => {
    const token = getToken();
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers,
    });
    return response.json();
  },

  // Login (no token required)
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  // Logout
  logout: async () => {
    const token = getToken();
    if (!token) return { success: false };

    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};

export default api;