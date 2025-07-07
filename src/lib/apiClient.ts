import { getToken } from './auth';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const apiClient = async (
  path: string,
  options: RequestInit = {}
) => {
  const token = getToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = errorData.message || res.statusText || 'API request failed';
    throw new ApiError(message, res.status);
  }

  return res.json();
};
