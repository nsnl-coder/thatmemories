import FilePreview from '../filePreview/FilePreview';

import usePreviewOriginalFile from '@src/hooks/usePreviewOriginalFile';
import imageOrVideo from '@src/utils/imageOrVideo';

function PreviewOriginalFile(): JSX.Element {
  const { isModalOpen, s3Key, closePreviewModal } = usePreviewOriginalFile();

  const fileIsVideo = s3Key && imageOrVideo(s3Key) === 'video';

  return (
    <div
      onClick={() => closePreviewModal()}
      className={`modal ${
        isModalOpen ? 'modal-open' : ''
      } bg-black cursor-pointer`}
    >
      <div
        onClick={() => closePreviewModal()}
        className="modal-box max-w-none flex items-center justify-center py-4 rounded-none bg-black max-h-screen hidden-scrollbar cursor-pointer"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`max-h-full ${fileIsVideo ? 'max-w-3xl w-full' : ''}`}
        >
          {s3Key && <FilePreview src={s3Key} type="unknown" />}
        </div>
      </div>
    </div>
  );
}

export default PreviewOriginalFile;
