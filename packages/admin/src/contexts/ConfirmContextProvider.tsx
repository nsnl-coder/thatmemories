import React, { createContext, useState } from 'react';

import { Children } from '@src/types/shared';

interface Confirm {
  prompt: string;
  isOpen: boolean;
  resolve: any;
  reject: any;
}

type TContext = [Confirm, React.Dispatch<React.SetStateAction<Confirm>>];
const ConfirmContext = createContext<TContext | null>(null);

const ConfirmContextProvider = (props: Children) => {
  const { children } = props;

  const [confirm, setConfirm] = useState<Confirm>({
    prompt: '',
    isOpen: false,
    resolve: null,
    reject: null,
  });

  return (
    <ConfirmContext.Provider value={[confirm, setConfirm]}>
      {children}
    </ConfirmContext.Provider>
  );
};

export default ConfirmContextProvider;
export { ConfirmContext };
