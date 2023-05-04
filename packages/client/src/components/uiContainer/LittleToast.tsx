import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { NOTIFY_MODALS, closeNotifyModal } from '@src/store/notifyModals';
import { useEffect, useRef } from 'react';

function LittleToast(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const lastTimeOut = useRef<any>();

  const { currentOpenedModal, message } = useAppSelector(
    (state) => state.notifyModals,
  );

  useEffect(() => {
    if (currentOpenedModal === NOTIFY_MODALS.LITTLE_TOAST) {
      if (lastTimeOut.current) clearTimeout(lastTimeOut.current);

      lastTimeOut.current = setTimeout(() => {
        dispatch(closeNotifyModal());
      }, 700);
    }

    return () => {
      if (lastTimeOut.current) {
        clearTimeout(lastTimeOut.current);
      }
    };
  }, [currentOpenedModal, dispatch]);

  const isOpen = currentOpenedModal === NOTIFY_MODALS.LITTLE_TOAST;

  return (
    <div className={`${isOpen ? 'opacity-100' : 'opacity-0'} duration-300`}>
      <div className="fixed top-[10%] left-1/2 -translate-x-1/2 bg-neutral text-neutral-content px-3 py-0.5 rounded-full text-sm">
        {message}
      </div>
    </div>
  );
}

export default LittleToast;
