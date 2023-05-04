import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Skeleton from 'react-loading-skeleton';
import FilePreview from '../filePreview/FilePreview';
//
import FileWrapper from './FileWrapper';
import HiddenInput from './HiddenInput';
import Label from './Label';
import SelectFromGallery from './SelectFromGallery';

import { AllowedFilesTypes } from '@src/contexts/GalleryContextProvider';
import useSelectLocalFiles from '@src/hooks/useSelectLocalFiles';

//
import useUploadFiles from '@react-query/files/useUploadFiles';

interface SelectFilesProps {
  files: string[];
  setFiles: (fn: (files: string[]) => string[]) => void;
  maxFilesCount: number;
  allowedTypes: AllowedFilesTypes;
  className?: string;
  fieldName: string;
  showUploadLabel?: boolean;
}

function SelectFiles(props: SelectFilesProps): JSX.Element {
  const {
    files,
    setFiles,
    maxFilesCount,
    allowedTypes,
    fieldName,
    showUploadLabel,
  } = props;
  const isMaxFilesCount = files.length >= maxFilesCount;

  const { localFiles, setLocalFiles, selectLocalFiles } = useSelectLocalFiles();

  const { isUploading, s3Key, resetMutationState } = useUploadFiles({
    localFiles,
    setLocalFiles,
    isMaxFilesCount,
  });

  useEffect(() => {
    if (s3Key) {
      setFiles((prev) => [...prev, s3Key]);
      resetMutationState();
    }
  }, [s3Key, setFiles, resetMutationState]);

  const swapPosition = (dragKey: string, dropKey: string) => {
    setFiles((files) => {
      const copyFiles = [...files];

      const dragIndex = copyFiles.findIndex((s3Key) => s3Key === dragKey);
      const dropIndex = copyFiles.findIndex((s3Key) => s3Key === dropKey);

      if (dragIndex === -1 || dropIndex == -1) return files;

      [copyFiles[dragIndex], copyFiles[dropIndex]] = [
        copyFiles[dropIndex],
        copyFiles[dragIndex],
      ];

      return copyFiles;
    });
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0 && !isMaxFilesCount)
        selectLocalFiles(acceptedFiles);
    },
    [selectLocalFiles, isMaxFilesCount],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <div
      className={`gap-4 grid relative ${
        maxFilesCount > 3 ? 'grid-cols-4' : showUploadLabel ? 'grid-cols-2' : ''
      }`}
      {...getRootProps()}
    >
      <HiddenInput id={fieldName} selectFiles={selectLocalFiles} />
      <input {...getInputProps()} />
      {files.map((s3Key, index) => (
        <FileWrapper
          key={s3Key}
          s3Key={s3Key}
          index={index}
          setFiles={setFiles}
          swapPosition={swapPosition}
        >
          <FilePreview src={s3Key} fallback="text" />
        </FileWrapper>
      ))}
      {isUploading && (
        <div className="w-full">
          <Skeleton count={1} className="h-full" />
        </div>
      )}
      {!isMaxFilesCount && (
        <SelectFromGallery
          allowedTypes={allowedTypes}
          files={files}
          setFiles={setFiles}
          className="aspect-square"
          maxFilesCount={maxFilesCount}
          currentFilesCount={files.length}
        />
      )}
      {!isMaxFilesCount && showUploadLabel && (
        <Label htmlFor={fieldName} className="aspect-square" />
      )}
      {isDragActive && (
        <div
          className={`bg-blue-50 absolute w-full h-full z-20 rounded-md border-blue-400 border-dashed border font-semibold flex items-center justify-center text-blue-600 text-sm`}
        >
          Drop media to upload
        </div>
      )}
      {isDragActive && isMaxFilesCount && (
        <div
          className={`bg-red-50 absolute w-full h-full z-20 rounded-md border-red-400 border-dashed border font-semibold flex items-center justify-center text-red-600 text-sm`}
        >
          Can not upload because only {maxFilesCount} selected files allowed.
        </div>
      )}
    </div>
  );
}

export default SelectFiles;
export type { SelectFilesProps };
