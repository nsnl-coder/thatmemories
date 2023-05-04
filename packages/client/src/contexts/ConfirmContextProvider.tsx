import React, { createContext, useState } from 'react';

import { Children } from '@src/types/shared';

interface Confirm {
  title: string;
  subTitle: string;
  isOpen: boolean;
  resolve: any;
  reject: any;
  confirmButtonText: string;
  cancelButtonText?: string;
}

type TContext = [Confirm, React.Dispatch<React.SetStateAction<Confirm>>];
const ConfirmContext = createContext<TContext | null>(null);

const ConfirmContextProvider = (props: Children) => {
  const { children } = props;

  const [confirm, setConfirm] = useState<Confirm>({
    title: '',
    subTitle: '',
    isOpen: false,
    resolve: null,
    reject: null,
    confirmButtonText: '',
  });

  return (
    <ConfirmContext.Provider value={[confirm, setConfirm]}>
      {children}
    </ConfirmContext.Provider>
  );
};

export default ConfirmContextProvider;
export { ConfirmContext };
