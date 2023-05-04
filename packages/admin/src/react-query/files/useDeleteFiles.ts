import { useMutation, useQueryClient } from '@tanstack/react-query';
import { withDefaultOnError } from '../queryClient';

import axios from '@src/config/axios';
import { HttpError, HttpResponse } from '@src/types/http';
import { toastError } from '@src/utils/toast';

interface RequestData {
  deleteList: string[];
}

type Response = HttpResponse<any>;

const useDeleteFiles = () => {
  const queryClient = useQueryClient();

  const mutationFn = async ({ deleteList }: RequestData) => {
    const { data } = await axios<Response>({
      url: '/api/files',
      method: 'delete',
      data: {
        deleteList,
      },
    });

    return data;
  };

  const onError = () => {
    toastError('Cannot delete files!');
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
    isLoading: mutation.isLoading,
    deleteFiles: mutation.mutate,
    isDeleted: mutation.isSuccess,
  };
};

export default useDeleteFiles;
