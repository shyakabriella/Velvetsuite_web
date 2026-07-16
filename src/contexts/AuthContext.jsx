import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check sessionStorage for user data
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");
    
    console.log('AuthContext - Checking sessionStorage:', { 
      hasToken: !!storedToken, 
      hasUser: !!storedUser 
    });
    
    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log('AuthContext - User loaded from sessionStorage:', parsedUser);
      } catch (e) {
        console.error('AuthContext - Error parsing user:', e);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
      }
    } else {
      console.log('AuthContext - No valid session found');
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    try {
      const API_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");
      
      console.log('AuthContext - Attempting login to:', `${API_URL}/login`);
      
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('AuthContext - Login response:', data);
      
      if (data.success) {
        // Store in sessionStorage
        sessionStorage.setItem("token", data.data.token);
        sessionStorage.setItem("auth_token", data.data.token);
        sessionStorage.setItem("user", JSON.stringify(data.data.user));
        
        // Update state
        setUser(data.data.user);
        setLoading(false);
        console.log('AuthContext - Login successful, user set');
        return true;
      } else {
        console.log('AuthContext - Login failed:', data.message);
        setLoading(false);
        return false;
      }
    } catch (err) {
      console.error("AuthContext - Login error:", err);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    console.log('AuthContext - Logging out');
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("user");
    setUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = !!user && !!sessionStorage.getItem("token");

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;