import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { clearToken } from '@/lib/auth';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  const { user, loading } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    clearToken();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow fixed top-0 inset-x-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-4 py-3">
          <Link href="/" className="text-lg font-bold text-blue-700">
            📘 学習ログ
          </Link>
          {!loading && (
            <nav className="space-x-4 text-sm text-gray-700">
              {user ? (
                <>
                  <Link href="/logs" className="hover:underline">一覧</Link>
                  <Link href="/logs/new" className="hover:underline">登録</Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:underline"
                  >
                    ログアウト
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="hover:underline">ログイン</Link>
                  <Link href="/register" className="hover:underline">新規登録</Link>
                </>
              )}
            </nav>
          )}
        </div>
      </header>

      <main className="pt-20 px-4 pb-10 max-w-4xl mx-auto">{children}</main>
    </div>
  );
};
