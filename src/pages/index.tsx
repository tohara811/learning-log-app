import Link from 'next/link';
import { useUser } from '@/hooks/useUser';

export default function HomePage() {
  const { user, loading, error } = useUser();

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-10 p-4 text-center">
        <p className="mb-4">ログインしてください。</p>
        <div className="flex justify-center gap-4">
          <Link href="/login" className="text-blue-600 underline">
            ログイン
          </Link>
          <Link href="/register" className="text-blue-600 underline">
            新規登録
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">ようこそ、{user.name} さん！</h1>
      <p className="text-gray-700">メールアドレス: {user.email}</p>
    </div>
  );
}
