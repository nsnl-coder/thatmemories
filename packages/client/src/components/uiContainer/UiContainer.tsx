import { ToastContainer } from 'react-toastify';
import ConfirmModal from './ConfirmModal';
import ErrorModal from './ErrorModal';
import LittleToast from './LittleToast';
import SuccessModal from './SuccessModal';

function UiContainer(): JSX.Element {
  return (
    <div>
      <ToastContainer />
      <ConfirmModal />
      <ErrorModal />
      <SuccessModal />
      <LittleToast />
    </div>
  );
}

export default UiContainer;
