'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseApiOptions {
  /** If false, won't auto-fetch on mount. Call refetch() manually. */
  autoFetch?: boolean;
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Generic hook to fetch data from any API endpoint.
 *
 * Usage:
 *   const { data, loading, error, refetch } = useApi(() => api.orders.getAll());
 */
export function useApi<T>(
  fetcher: () => Promise<T>,
  options: UseApiOptions = {}
): UseApiResult<T> {
  const { autoFetch = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (autoFetch) run();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, refetch: run };
}
