import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Provider } from 'react-redux';

import ConfirmContextProvider from '@src/contexts/ConfirmContextProvider';
import GalleryContextProvider from '@src/contexts/GalleryContextProvider';
import { store } from '@src/store';
import { Children } from '@src/types/shared';

//
import { queryClient, QueryClientProvider } from '@react-query/queryClient';

function ContextProvider(props: Children): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SkeletonTheme borderRadius={0}>
          <DndProvider backend={HTML5Backend}>
            <ConfirmContextProvider>
              <GalleryContextProvider>{props.children}</GalleryContextProvider>
            </ConfirmContextProvider>
          </DndProvider>
        </SkeletonTheme>
      </Provider>
    </QueryClientProvider>
  );
}

export default ContextProvider;
