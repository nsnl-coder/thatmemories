import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { withDefaultOnError } from '../queryClient';
import { RequestConfig } from '../queryConfig';

import axios from '@src/config/axios';
import useConfirm from '@src/hooks/useConfirm';
import { HttpError, HttpResponse } from '@src/types/http';
import { toastError, toastSuccess } from '@src/utils/toast';

type Response = HttpResponse<{
  deletedCount: number;
}>;

const useDeleteOnes = (requestConfig: RequestConfig) => {
  const router = useRouter();
  const { isConfirmed } = useConfirm();
  const queryClient = useQueryClient();

  const mutationFn = async (ids: string[]) => {
    const { data } = await axios<Response>({
      url: requestConfig.url,
      method: 'delete',
      data: {
        deleteList: ids,
      },
    });

    return data;
  };

  const onSuccess = (data: Response) => {
    if (data.data?.deletedCount) {
      toastSuccess(
        `${data.data.deletedCount} ${
          data.data.deletedCount > 1
            ? requestConfig.pluralName
            : requestConfig.singularName
        } has been deleted!`,
      );
    }
    queryClient.invalidateQueries([requestConfig.pluralName]);
  };

  const onError = () => {
    toastError(`Can not delete ${requestConfig.pluralName}`);
  };

  const mutation = useMutation<Response, HttpError, string[]>({
    mutationFn,
    onError: withDefaultOnError(onError),
    onSuccess,
  });

  const deleteOnes = async (ids: string[]) => {
    if (ids.length === 0) return;
    const confirm = await isConfirmed(
      `Do you want to delete ${ids.length} ${
        ids.length > 1 ? requestConfig.pluralName : requestConfig.singularName
      }?`,
    );

    if (confirm) {
      mutation.mutate(ids);
    }
  };

  return {
    isLoading: mutation.isLoading,
    deleteOnes,
    isDeleted: mutation.isSuccess,
    reset: mutation.reset,
  };
};

export default useDeleteOnes;
