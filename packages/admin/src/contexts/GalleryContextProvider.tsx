import React, { createContext, useCallback, useEffect, useState } from 'react';

import { Children } from '@src/types/shared';

type AllowedFilesTypes = 'video' | 'image' | '*';

interface State {
  isOpen: boolean;
  resolve: any;
  reject: any;
  selectedFiles: string[];
  maxFilesCount: number;
  allowedTypes: 'video' | 'image' | '*';
}

type TContext = {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
};

const defaultState = {
  isOpen: false,
  resolve: null,
  reject: null,
  selectedFiles: [],
  maxFilesCount: 50,
  allowedTypes: '*',
} as State;

const GalleryContext = createContext<TContext>({
  state: defaultState,
  setState: () => undefined,
});

const GalleryContextProvider = (props: Children) => {
  const { children } = props;
  const [state, setState] = useState<State>(defaultState);

  return (
    <GalleryContext.Provider value={{ state, setState }}>
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryContextProvider;
export { GalleryContext, defaultState };
export type { AllowedFilesTypes };
