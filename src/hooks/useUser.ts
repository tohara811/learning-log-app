import { useEffect, useState } from 'react';
import { apiClient, ApiError } from '@/lib/apiClient';

type User = {
  id: string;
  name: string;
  email: string;
};

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient('/me');
        setUser(res.user);
      } catch (err: any) {
        if (err instanceof ApiError && err.status === 401) {
          // 未ログインとして扱う（正常）
          setUser(null);
        } else {
          setError(err.message || 'ユーザー情報の取得に失敗しました');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};
