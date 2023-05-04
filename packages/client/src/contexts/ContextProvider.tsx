import { SkeletonTheme } from 'react-loading-skeleton';
import { Provider } from 'react-redux';

import ConfirmContextProvider from '@src/contexts/ConfirmContextProvider';
import { store } from '@src/store';
import { Children } from '@src/types/shared';

import { queryClient, QueryClientProvider } from '@react-query/queryClient';

function ContextProvider(props: Children): JSX.Element {
  return (
    <SkeletonTheme borderRadius={0}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ConfirmContextProvider>{props.children}</ConfirmContextProvider>
        </Provider>
      </QueryClientProvider>
    </SkeletonTheme>
  );
}

export default ContextProvider;
