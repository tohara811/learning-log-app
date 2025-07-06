import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getToken } from '@/lib/auth';

export const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace('/login');
    }
  }, [router]);
};
