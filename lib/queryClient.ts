// lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,                  // ritenta 2 volte se fallisce
      staleTime: 1000 * 60 * 5,  // 5 min cache
      gcTime: 1000 * 60 * 30,    // garbage collect dopo 30 min
    },
  },
});