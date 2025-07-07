import Link from 'next/link';
import { useLogs } from '@/hooks/useLogs';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

export default function LogsPage() {
  useAuthRedirect();

  const { logs, loading, error } = useLogs();

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">学習ログ一覧</h1>
        <Link
          href="/logs/new"
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          ＋ 新規登録
        </Link>
      </div>

      {logs.length === 0 ? (
        <p>まだ学習ログがありません。</p>
      ) : (
        <ul className="space-y-6">
          {logs.map((log) => (
            <li key={log.id} className="border rounded p-4">
              <p className="text-sm text-gray-500">{log.date}</p>
              <p className="text-lg font-semibold">{log.content}</p>
              <p className="text-sm text-gray-700">時間: {log.duration}分</p>
              {log.memo && (
                <p className="text-sm text-gray-600 mt-1">メモ: {log.memo}</p>
              )}
              <p className="text-sm text-green-700 mt-2">
                AIコメント: {log.ai_comment}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
