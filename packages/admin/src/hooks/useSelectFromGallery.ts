import { useCallback, useContext } from 'react';

import {
    AllowedFilesTypes, defaultState, GalleryContext
} from '@src/contexts/GalleryContextProvider';

const useSelectFromGallery = () => {
  const galleryContext = useContext(GalleryContext);

  const { state, setState } = galleryContext;

  const selectFile = (url: string) => {
    setState((prev) => ({
      ...prev,
      selectedFiles: [...prev.selectedFiles, url],
    }));
  };

  const unselectDeletedFiles = useCallback(() => {
    setState((prev) => ({
      ...prev,
      selectedFiles: [],
    }));
  }, [setState]);

  const unselectFiles = (files: string | string[]) => {
    if (typeof files === 'string') files = [files];

    setState((prev) => {
      return {
        ...prev,
        selectedFiles: prev.selectedFiles.filter(
          (file) => !files.includes(file),
        ),
      };
    });
  };

  const selectFromGallery = useCallback(
    (
      maxFilesCount: number,
      allowedTypes: AllowedFilesTypes = '*',
      excludedFiles: string[] = [],
    ) => {
      const promise: Promise<string[]> = new Promise((resolve, reject) => {
        setState({
          isOpen: true,
          selectedFiles: excludedFiles,
          resolve,
          reject,
          maxFilesCount,
          allowedTypes,
        });
      });

      const cleanup = () => {
        setState(defaultState);
      };

      return promise.then(
        (files) => {
          cleanup();
          return files;
        },
        () => {
          cleanup();
          return [];
        },
      );
    },
    [setState],
  );

  return {
    selectFile,
    selectFromGallery,
    unselectDeletedFiles,
    unselectFiles,
    resolve: state.resolve,
    reject: state.reject,
    isOpen: state.isOpen,
    selectedFiles: state.selectedFiles,
    maxFilesCount: state.maxFilesCount,
    allowedTypes: state.allowedTypes,
  };
};

export default useSelectFromGallery;
