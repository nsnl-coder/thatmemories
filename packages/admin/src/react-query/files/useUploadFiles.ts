import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react';
import { FileInfo } from '../../hooks/useSelectLocalFiles';
import { withDefaultOnError } from '../queryClient';

import axios from '@src/config/axios';
import { HttpError, HttpResponse } from '@src/types/http';
import { toastError } from '@src/utils/toast';

/**
 * this hook accept state and setState as arguement!
 * this hook will create a signed url then upload it until files in state is empty
 * use useUpload & useCreatePresignedUrl hooks under the hood
 */

interface SignUrlPayload {
  type: string;
  size: number;
}

type SignUrlResponse = HttpResponse<{
  url: string;
  key: string;
  size: number;
  type: string;
}>;

interface UploadFilePayload {
  presignedUrl: string;
  file: File;
  s3Key: string;
  contentType: string;
  size: number;
}

type UploadFileResponse = HttpResponse<{
  s3Key: string;
  size: number;
  type: string;
}>;

type Props = {
  localFiles: FileInfo[];
  setLocalFiles: Dispatch<SetStateAction<FileInfo[]>>;
  isMaxFilesCount: boolean;
};

const useUploadFiles = ({
  localFiles,
  setLocalFiles,
  isMaxFilesCount,
}: Props) => {
  const queryClient = useQueryClient();
  const isUploaded = useRef<boolean>(false);

  // presign url
  const createSignUrl = async (payload: SignUrlPayload) => {
    const { data } = await axios<SignUrlResponse>({
      method: 'post',
      url: '/api/files/presigned-url',
      data: payload,
    });

    return data;
  };

  const onCreateSignUrlSuccess = (res: SignUrlResponse) => {
    const index = localFiles.findIndex(
      (item) =>
        item.file.type === res.data?.type && item.file.size === res.data?.size,
    );

    if (index === -1) {
      toastError('Can not read selected files!');
      return;
    }

    if (
      !res.data ||
      !res.data.type ||
      !res.data.size ||
      !res.data.key ||
      !res.data.url
    ) {
      toastError('Server error! Can not read sign url!');
      setLocalFiles([]);
      return;
    }

    uploadFileMutation.mutate({
      contentType: res.data.type,
      file: localFiles[index].file,
      presignedUrl: res.data.url,
      s3Key: res.data.key,
      size: res.data.size,
    });
  };

  const onSignUrlError = () => {
    toastError('Can not create signed url');
    setLocalFiles([]);
    resetMutationState();
  };

  // upload file
  const uploadFile = async (payload: UploadFilePayload) => {
    await axios<any>({
      url: payload.presignedUrl,
      method: 'put',
      data: payload.file,
      headers: {
        'Content-Type': payload.file.type,
      },
    });

    const res: UploadFileResponse = {
      status: 'success',
      data: {
        s3Key: payload.s3Key,
        size: payload.size,
        type: payload.contentType,
      },
    };

    return res;
  };

  const onUploadFileSuccess = (res: UploadFileResponse) => {
    setLocalFiles((prev) => {
      const index = localFiles.findIndex(
        (item) =>
          item.file.size === res.data?.size && item.file.type === res.data.type,
      );

      if (index === -1) return [];
      isUploaded.current = true;
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  };

  const onUploadFileError = () => {
    toastError('Can not upload files!');
    setLocalFiles([]);
    resetMutationState();
  };

  // mutation
  const signUrlMutatation = useMutation<
    SignUrlResponse,
    HttpError,
    SignUrlPayload
  >({
    mutationFn: createSignUrl,
    onError: withDefaultOnError(onSignUrlError),
    onSuccess: onCreateSignUrlSuccess,
  });

  const uploadFileMutation = useMutation<
    UploadFileResponse,
    HttpError,
    UploadFilePayload
  >({
    mutationFn: uploadFile,
    onError: withDefaultOnError(onUploadFileError),
    onSuccess: onUploadFileSuccess,
  });

  const signUrl = signUrlMutatation.mutate;
  const s3Key = uploadFileMutation.data?.data?.s3Key;

  const resetMutationState = useCallback(() => {
    signUrlMutatation.reset();
    uploadFileMutation.reset();
  }, [signUrlMutatation, uploadFileMutation]);

  useEffect(() => {
    if (localFiles?.length > 0 && !s3Key && !isMaxFilesCount) {
      signUrl({
        size: localFiles[0].file.size,
        type: localFiles[0].file.type,
      });
    }
  }, [localFiles, signUrl, s3Key, isMaxFilesCount]);

  useEffect(() => {
    if (localFiles?.length > 0 && isMaxFilesCount && isUploaded.current) {
      toastError('Reached maximum files allowed!');
      setLocalFiles([]);
      resetMutationState();
      isUploaded.current = false;
    }
  }, [isMaxFilesCount, localFiles, resetMutationState, setLocalFiles]);

  useEffect(() => {
    if (isUploaded.current && localFiles.length === 0) {
      queryClient.invalidateQueries(['files']);
      isUploaded.current = false;
    }
  }, [isUploaded, localFiles, queryClient]);

  return {
    isUploading:
      signUrlMutatation.isLoading ||
      uploadFileMutation.isLoading ||
      isUploaded.current,
    s3Key,
    resetMutationState,
  };
};

export default useUploadFiles;
