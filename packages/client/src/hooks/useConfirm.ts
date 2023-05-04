import { useCallback, useContext } from 'react';

import { ConfirmContext } from '@src/contexts/ConfirmContextProvider';

const useConfirm = () => {
  const confirmContext = useContext(ConfirmContext);
  const [confirm, setConfirm] = confirmContext || [];

  const isConfirmed = useCallback(
    ({
      title,
      subTitle,
      confirmButtonText,
      cancelButtonText,
    }: {
      title: string;
      subTitle: string;
      confirmButtonText: string;
      cancelButtonText?: string;
    }) => {
      if (!setConfirm) {
        return;
      }

      const promise = new Promise((resolve, reject) => {
        setConfirm({
          title,
          subTitle,
          isOpen: true,
          resolve,
          reject,
          confirmButtonText,
          cancelButtonText,
        });
      });

      const reset = () => {
        setConfirm({
          title: '',
          subTitle: '',
          resolve: null,
          reject: null,
          isOpen: false,
          confirmButtonText: '',
        });
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
    title: confirm.title,
    subTitle: confirm.subTitle,
    confirmButtonText: confirm.confirmButtonText,
    cancelButtonText: confirm.cancelButtonText,
  };
};

export default useConfirm;
