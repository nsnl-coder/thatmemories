import { useMutation, useQueryClient } from '@tanstack/react-query';

import axios from '@src/config/axios';
import { HttpError, HttpResponse } from '@src/types/http';
import { toastError } from '@src/utils/toast';

interface RequestConfig {
  presignedUrl: string;
  file: File;
  contentType: string;
}

type Response = HttpResponse<any>;

const useUploadFile = () => {
  const queryClient = useQueryClient();

  const mutationFn = async (payload: RequestConfig) => {
    const { data } = await axios<Response>({
      url: payload.presignedUrl,
      method: 'put',
      data: payload.file,
      headers: {
        'Content-Type': payload.file.type,
      },
    });

    return data;
  };

  const onError = () => {
    toastError('Cannot upload file!');
  };

  const onSuccess = () => {
    queryClient.invalidateQueries(['files']);
  };

  const mutation = useMutation<Response, HttpError, RequestConfig>({
    mutationFn,
    onError,
    onSuccess,
    retry: 0,
  });

  return {
    uploadFile: mutation.mutate,
    isUploading: mutation.isLoading,
    isUploaded: mutation.isSuccess,
    resetUploadFile: mutation.reset,
  };
};

export default useUploadFile;
