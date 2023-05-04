import { useMutation } from '@tanstack/react-query';
import { withDefaultOnError } from '../queryClient';

import axios from '@src/config/axios';
import { HttpError, HttpResponse } from '@src/types/http';
import { toastError } from '@src/utils/toast';

interface RequestData {
  type: string;
  size: number;
}

type Response = HttpResponse<{
  url: string;
  key: string;
  type: string;
  size: number;
}>;

const useCreatePresignedUrl = () => {
  const mutationFn = async (payload: RequestData) => {
    const { data } = await axios<Response>({
      method: 'post',
      url: '/api/files/presigned-url',
      data: payload,
    });

    return data;
  };

  const onError = () => {
    toastError('Cannot create presigned url!');
  };

  const mutation = useMutation<Response, HttpError, RequestData>({
    mutationFn,
    onError: withDefaultOnError(onError),
    retry: 0,
  });

  return {
    createPresignUrl: mutation.mutate,
    signUrlData: mutation.data?.data,
    status: mutation.status,
    isCreating: mutation.isLoading,
    resetCreatePresignedUrl: mutation.reset,
  };
};

export default useCreatePresignedUrl;
