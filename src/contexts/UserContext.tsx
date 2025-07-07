import { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '@/lib/apiClient';
import { getToken, clearToken } from '@/lib/auth';

type User = {
  id: string;
  name: string;
  email: string;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await apiClient('/me');
      setUser(res.user);
    } catch (err: any) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        refresh: fetchUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
