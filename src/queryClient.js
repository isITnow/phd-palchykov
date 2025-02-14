import { QueryClient } from '@tanstack/react-query';

export const queryKeys = {
  COLLEAGUES: ['colleagues'],
  NEWS: ['news'],
  PERIODS: ['periods'],
  POSTS: ['posts'],
  POST: (id) => ['post', id],
  PUBLICATIONS: (id) => ['publications', id],
  RESEARCHES: ['researches'],
  PHOTO_ALBUMS: ['photoAlbums'],
  PHOTO_ALBUM: (id) => ['photoAlbum', id],
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 24 * 60 * 60 * 1000, // 24 години
      cacheTime: 48 * 60 * 60 * 1000, // 48 годин
      gcTime: 24 * 60 * 60 * 1000, // 24 години
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    },
  },
});

export default queryClient;
