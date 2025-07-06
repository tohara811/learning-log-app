import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/apiClient';

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
        // 👇 401の場合は「未ログイン扱い」として user = null のまま
        if (err.message?.includes('401') || err.message?.includes('Unauthorized')) {
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
