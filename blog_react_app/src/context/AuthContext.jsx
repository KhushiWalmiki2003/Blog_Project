import { createContext, useContext, useEffect, useState } from "react";
import { attachTokenToApi } from "../api/axiosconfig";
import { loginApi } from "../api/Auth";

const AuthContext = createContext();

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  const [token, setToken] = useState(() =>
    localStorage.getItem("token")
  );

  useEffect(() => {
    attachTokenToApi(token);
  }, [token]);

  const login = async (userName, password) => {
    try {
      const res = await loginApi(userName, password);
      const { token: jwt, user: userDto } = res.data;

      if (!jwt) {
        return {
          success: false,
          message: "Login response does not contain a token",
        };
      }

      setUser(userDto || null);
      setToken(jwt);

      localStorage.setItem("token", jwt);

      if (userDto) {
        localStorage.setItem("user", JSON.stringify(userDto));
      } else {
        localStorage.removeItem("user");
      }

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login Failed",
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
