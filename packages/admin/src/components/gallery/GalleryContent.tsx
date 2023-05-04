import { InfiniteData } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import FilePreview from '../filePreview/FilePreview';
import GridSkeleton from '../skeleton/GridSkeleton';
import FileWrapper from './FileWrapper';
import UploadLabel from './UploadLabel';

import { Response } from '@react-query/files/useGetFiles';

interface Props {
  s3Files: InfiniteData<Response>;
  isUploading: boolean;
  isLoadingFiles: boolean;
  isFetching: boolean;
  selectLocalFiles: (localFiles: File[] | FileList) => void;
}

function GalleryContent(props: Props): JSX.Element {
  const { s3Files, isUploading, isLoadingFiles, selectLocalFiles, isFetching } =
    props;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      selectLocalFiles(acceptedFiles);
    },
    [selectLocalFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 gap-4 relative min-h-full content-start"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <UploadLabel htmlFor="gallery_upload" />
      {isUploading && (
        <GridSkeleton
          count={1}
          className="h-48 rounded-xl overflow- shadow-lg border"
        />
      )}
      {isLoadingFiles && (
        <GridSkeleton
          count={9}
          className="h-48 rounded-xl overflow-hidden shadow-lg border"
        />
      )}
      {s3Files?.pages.map((page, index) => {
        return (
          <React.Fragment key={index}>
            {...(page.data?.keys || []).map((item, i) => (
              <FileWrapper key={item.Key} s3Key={item.Key}>
                <FilePreview
                  src={item.Key}
                  className="w-full object-contain cursor-pointer h-48"
                />
              </FileWrapper>
            ))}
          </React.Fragment>
        );
      })}
      {isDragActive && (
        <div className="bg-blue-50 absolute inset-0 rounded-md w-full h-full border-blue-400 text-blue-700 text-sm  z-20 flex items-center justify-center font-semibold border-dashed border">
          Drop media to upload!
        </div>
      )}
    </div>
  );
}

export default GalleryContent;
