import { QueryClient } from '@tanstack/react-query';

export const queryKeys = {
  COLLEAGUES: ['colleagues'],
  NEWS: ['news'],
  PERIODS: ['periods'],
  POSTS: ['posts'],
  POST: (id) => ['post', id],
  PUBLICATIONS: (id) => ['publications', id],
  RESEARCHES: ['researches'],
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 24 * 60 * 60 * 1000, // 24 hours
      gcTime: 24 * 60 * 60 * 1000, // 24 hours
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;
