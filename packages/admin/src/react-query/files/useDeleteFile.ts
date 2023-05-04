import { useMutation, useQueryClient } from '@tanstack/react-query';
import { withDefaultOnError } from '../queryClient';

import axios from '@src/config/axios';
import { HttpError, HttpResponse } from '@src/types/http';
import { toastError } from '@src/utils/toast';

interface RequestData {
  key: string;
}

type Response = HttpResponse<any>;

const useDeleteFile = () => {
  const queryClient = useQueryClient();

  const mutationFn = async ({ key }: RequestData) => {
    const { data } = await axios<Response>({
      url: '/api/files/delete-one-file',
      method: 'delete',
      params: {
        key,
      },
    });

    return data;
  };

  const onError = () => {
    toastError('Cannot delete file!');
  };

  const onSuccess = () => {
    queryClient.invalidateQueries(['files']);
  };

  const mutation = useMutation<Response, HttpError, RequestData>({
    mutationFn,
    mutationKey: ['delete-file'],
    onError: withDefaultOnError(onError),
    onSuccess,
  });

  return {
    isDeleting: mutation.isLoading,
    deleteFile: mutation.mutate,
    isDeleted: mutation.isSuccess,
  };
};

export default useDeleteFile;
