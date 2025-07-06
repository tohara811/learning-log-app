import { useState } from 'react';
import { useRouter } from 'next/router';
import { apiClient } from '@/lib/apiClient';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

export default function NewLogPage() {
  useAuthRedirect();
  const router = useRouter();
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [duration, setDuration] = useState('');
  const [memo, setMemo] = useState('');
  const [aiComment, setAiComment] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setAiComment('');
    setLoading(true);

    try {
      const res = await apiClient('/logs', {
        method: 'POST',
        body: JSON.stringify({
          date,
          content,
          duration: Number(duration),
          memo,
        }),
      });

      setMessage(res.message);
      setAiComment(res.ai_comment);
      setDate('');
      setContent('');
      setDuration('');
      setMemo('');
    } catch (err: any) {
      setError(err.message || '登録に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">学習ログを登録</h1>
      {message && <p className="text-green-600 mb-2">{message}</p>}
      {aiComment && (
        <p className="bg-green-50 border-l-4 border-green-400 p-2 mb-4">
          AIコメント: {aiComment}
        </p>
      )}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="学習内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="所要時間（分）"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full border p-2 rounded"
          required
          min="1"
        />
        <textarea
          placeholder="メモ（任意）"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className="w-full border p-2 rounded"
          rows={3}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? '登録中...' : '登録する'}
        </button>
      </form>
    </div>
  );
}
