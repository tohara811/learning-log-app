import Link from 'next/link';
import { useUser } from '@/hooks/useUser';

export default function HomePage() {
  const { user, loading, error } = useUser();

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 space-y-6">
      <h1 className="text-2xl font-bold text-blue-700 text-center">📘 学習ログ</h1>

      <p className="text-gray-700 text-sm leading-relaxed">
        <strong>学習ログ</strong>は、あなたの日々の学習内容を記録・振り返るためのWebアプリです。
        <br />
        学習記録に加えて、AIがやる気を引き出すコメントも自動生成します。
        <br />
        シンプルな操作で継続しやすく、記録した内容は一覧でいつでも見返せます。
      </p>

      {!user ? (
        <div className="text-center space-y-3">
          <p>ご利用にはログインまたは新規登録が必要です。</p>
          <div className="flex justify-center gap-4">
            <Link href="/login" className="text-blue-600 underline">
              ログイン
            </Link>
            <Link href="/register" className="text-blue-600 underline">
              新規登録
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-700">ようこそ、{user.name} さん！</p>
          <Link
            href="/logs/new"
            className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            学習ログを登録する
          </Link>
        </div>
      )}
    </div>
  );
}
