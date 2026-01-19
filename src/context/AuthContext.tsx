import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api from '../services/api';
interface User {
  email: string;
  nome?: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(token: string, user: User): void;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageToken = localStorage.getItem('@EventManager:token');
      const storageUser = localStorage.getItem('@EventManager:user');

      if (storageToken && storageUser) {
        api.defaults.headers.Authorization = `Bearer ${storageToken}`;
        setUser(JSON.parse(storageUser));
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = (token: string, userData: User) => {
    setUser(userData);
    api.defaults.headers.Authorization = `Bearer ${token}`;

    localStorage.setItem('@EventManager:token', token);
    localStorage.setItem('@EventManager:user', JSON.stringify(userData));
  };

  const signOut = () => {
    localStorage.removeItem('@EventManager:token');
    localStorage.removeItem('@EventManager:user');
    setUser(null);
    delete api.defaults.headers.Authorization;
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);