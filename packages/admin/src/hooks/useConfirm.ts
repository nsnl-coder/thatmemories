import { useCallback, useContext } from 'react';

import { ConfirmContext } from '@src/contexts/ConfirmContextProvider';

const useConfirm = () => {
  const confirmContext = useContext(ConfirmContext);
  const [confirm, setConfirm] = confirmContext || [];

  const isConfirmed = useCallback(
    (prompt: string) => {
      if (!setConfirm) {
        return;
      }

      const promise = new Promise((resolve, reject) => {
        setConfirm({ prompt, isOpen: true, resolve, reject });
      });

      const reset = () => {
        setConfirm({ prompt: '', resolve: null, reject: null, isOpen: false });
      };

      return promise.then(
        () => {
          reset();
          return true;
        },
        () => {
          reset();
          return false;
        },
      );
    },
    [setConfirm],
  );

  if (!confirm)
    return {
      isConfirmed,
    };

  return {
    isConfirmed,
    resolve: confirm.resolve,
    reject: confirm.reject,
    isOpen: confirm.isOpen,
    prompt: confirm.prompt,
  };
};

export default useConfirm;
