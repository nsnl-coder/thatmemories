import { closePreviewFile, openPreviewFile } from '@src/store/previewFile';

import { useAppDispatch, useAppSelector } from './redux';

const usePreviewOriginalFile = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, s3Key } = useAppSelector((state) => state.previewFile);

  const openPreviewModal = (s3Key: string) => {
    dispatch(openPreviewFile(s3Key));
  };

  const closePreviewModal = () => {
    dispatch(closePreviewFile());
  };

  return { isModalOpen, s3Key, openPreviewModal, closePreviewModal };
};

export default usePreviewOriginalFile;
