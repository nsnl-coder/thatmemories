import { ToastContainer } from 'react-toastify';
import ConfirmModal from './ConfirmModal';
import CustomDragPreview from './CustomDragLayer';
import GalleryContainer from './GalleryContainer';
import GetCurrentUser from './GetCurrentUser';
import PreviewOriginalFile from './PreviewOriginalFile';

function UiContainer(): JSX.Element {
  return (
    <div>
      <GetCurrentUser />
      <GalleryContainer />
      <ToastContainer />
      <ConfirmModal />
      <PreviewOriginalFile />
      <CustomDragPreview />
    </div>
  );
}

export default UiContainer;
