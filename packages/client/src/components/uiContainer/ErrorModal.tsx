import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { NOTIFY_MODALS, closeNotifyModal } from '@src/store/notifyModals';
import { useRouter } from 'next/router';
import { MdOutlineError } from 'react-icons/md';
import { VscClose } from 'react-icons/vsc';

function ErrorModal(): JSX.Element {
  const router = useRouter();
  const { currentOpenedModal, message } = useAppSelector(
    (state) => state.notifyModals,
  );
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(closeNotifyModal());
  };

  const gobackHome = () => {
    router.push('/');
    handleCloseModal();
  };

  return (
    <div
      onClick={handleCloseModal}
      className={`modal cursor-pointer ${
        currentOpenedModal === NOTIFY_MODALS.ERROR_MODAL ? 'modal-open' : ''
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-box cursor-default rounded-lg pb-10 mb-16 max-w-3xl w-fit pr-12 flex md:items-start gap-x-4 relative flex-col md:flex-row items-center text-start gap-y-2"
      >
        <div className="mt-0.5 flex items-center opacity-90 text-2xl md:text-lg">
          <MdOutlineError className="text-primary" />
        </div>
        <div>
          <p className="mb-4">{message}</p>
          <div className="flex flex-col md:flex-row gap-y-2 gap-x-4 text-sm">
            <button
              type="button"
              onClick={gobackHome}
              className="capitalize px-6 py-1 bg-primary text-white rounded-[4px]"
            >
              Back to homepage
            </button>
            <button
              type="button"
              className="capitalize px-6 py-1 text-primary border-primary border rounded-[4px]"
            >
              contact support
            </button>
          </div>
        </div>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          type="button"
          onClick={handleCloseModal}
        >
          <VscClose size={26} />
        </button>
      </div>
    </div>
  );
}

export default ErrorModal;
