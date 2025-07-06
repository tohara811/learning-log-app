import { useState } from 'react';
import { useRouter } from 'next/router';
import { apiClient } from '@/lib/apiClient';
import { setToken } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await apiClient('/users/register', {
        method: 'POST',
        body: JSON.stringify({ email, name, password }),
      });

      const loginRes = await apiClient('/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      setToken(loginRes.token);
      router.push('/');
    } catch (err: any) {
      setError(err.message || '登録に失敗しました');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded">
      <h1 className="text-xl font-bold mb-4">アカウント登録</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="表示名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          登録してログイン
        </button>
      </form>
    </div>
  );
}
