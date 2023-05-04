import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { HttpError } from '@src/types/http';
import { toastError } from '@src/utils/toast';

type OnErrorFn = (error: HttpError) => void;

const defaultOnError = (err: unknown) => {
  const error = err as HttpError;

  if (!error.response) {
    toastError('Fail to connect to server!');
    return;
  }

  if (error.response.data.message === 'Something wentwrong') {
    toastError('Unexpected error happened!');
  }
};

const withDefaultOnError = (onError?: OnErrorFn) => {
  return (error: HttpError) => {
    defaultOnError(error);
    if (onError) onError(error);
  };
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError: defaultOnError,
      retry: 0,
    },
    mutations: {
      onError: defaultOnError,
      retry: 0,
    },
  },
});

export { QueryClientProvider, queryClient, withDefaultOnError };
