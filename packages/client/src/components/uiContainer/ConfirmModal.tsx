import { IoCloseSharp } from 'react-icons/io5';
import useConfirm from '../../hooks/useConfirm';

const ConfirmModal = () => {
  const {
    title,
    subTitle,
    isOpen = false,
    resolve,
    reject,
    confirmButtonText = 'confirm',
    cancelButtonText = 'cancel',
  } = useConfirm();

  return (
    <div onClick={reject} className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-box rounded-xl p-4 pt-8 mb-16 text-center flex flex-col max-w-[350px] gap-y-10"
      >
        <div>
          <h3 className="text-lg first-letter:capitalize font-medium mb-2">
            {title}
          </h3>
          <p className="first-letter:capitalize text-text/70">{subTitle}</p>
        </div>
        <div className="flex flex-col">
          <button
            type="button"
            className="bg-primary text-white font-semibold py-1 rounded-full mb-2 first-letter:capitalize"
            onClick={resolve}
          >
            {confirmButtonText}
          </button>
          <button
            type="button"
            className="bg-slate-100 font-semibold rounded-full py-1 first-letter:capitalize"
            onClick={reject}
          >
            {cancelButtonText}
          </button>
        </div>
        <button
          className="absolute top-2 right-2 rounded-full bg-base-300 p-1.5 text-gray-500 hover:text-neutral"
          type="button"
          onClick={reject}
        >
          <IoCloseSharp size={20} />
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
