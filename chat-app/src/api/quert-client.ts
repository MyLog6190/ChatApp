import {QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // 요청 실패시 재요청 false
      staleTime: 60 * 1000,
    },
    mutations: {
      retry: false, // 요청 실패시 재요청 false
    },
  },
});

export default queryClient;
