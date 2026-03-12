import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [users, setUsers] = useState<{ name: string; email: string; password: string }[]>([]);

  const login = (email: string, password: string): boolean => {
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser({ name: found.name, email: found.email });
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    if (users.find((u) => u.email === email)) return false;
    setUsers((prev) => [...prev, { name, email, password }]);
    setUser({ name, email });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
