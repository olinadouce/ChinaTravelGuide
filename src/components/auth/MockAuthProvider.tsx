'use client';
import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  avatar: string;
  isMember: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('ctg_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (name: string) => {
    const newUser = {
      id: 'user-' + Date.now(),
      name,
      avatar: `https://i.pravatar.cc/150?u=${name}`,
      isMember: true,
    };
    setUser(newUser);
    localStorage.setItem('ctg_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ctg_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within MockAuthProvider');
  return context;
}