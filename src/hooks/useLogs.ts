import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/apiClient';

type Log = {
  id: string;
  date: string;
  content: string;
  duration: number;
  memo: string;
  ai_comment: string;
  created_at: string;
};

export const useLogs = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await apiClient('/logs');
        setLogs(res.logs);
      } catch (err: any) {
        setError(err.message || 'ログ取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return { logs, loading, error };
};
