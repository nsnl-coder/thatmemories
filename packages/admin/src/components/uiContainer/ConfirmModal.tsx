import { AiOutlineClose } from 'react-icons/ai';
import useConfirm from '../../hooks/useConfirm';

const ConfirmModal = () => {
  const { prompt = '', isOpen = false, resolve, reject } = useConfirm();

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box rounded-lg pb-10 mb-16">
        <div>
          <div className="flex justify-between">
            <h2 className="font-semibold pb-2 text-xl">Confirmation</h2>
            <AiOutlineClose
              onClick={reject}
              className="font-bold text-2xl hover:text-red-400 cursor-pointer"
            />
          </div>
          <p className="my-4">{prompt}</p>
          <div className="flex justify-end gap-x-2 modal-action mt-10">
            <button
              className="bg-gray-100 hover:bg-gray-200 rounded-sm text-gray-500 px-4 py-1"
              onClick={reject}
            >
              Cancel
            </button>
            <button
              className="bg-blue-600 rounded-sm px-4 py-1 text-white hover:bg-blue-700"
              onClick={resolve}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
