import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { withDefaultOnError } from '../queryClient';
import { RequestConfig } from '../queryConfig';

import axios from '@src/config/axios';
import useConfirm from '@src/hooks/useConfirm';
import { HttpError, HttpResponse } from '@src/types/http';
import { toastError, toastSuccess } from '@src/utils/toast';

const useDeleteOne = (requestConfig: RequestConfig) => {
  const router = useRouter();
  const { isConfirmed } = useConfirm();
  const queryClient = useQueryClient();

  const mutationFn = async (id: string) => {
    const { data } = await axios<HttpResponse<any>>({
      url: `${requestConfig.url}/${id}`,
      method: 'delete',
    });

    return data;
  };

  const onSuccess = () => {
    toastSuccess(`${requestConfig.singularName} has been deleted!`);
    if (router.query.id) router.push(`/${requestConfig.pluralName}`);
    if (!router.query.id) {
      queryClient.invalidateQueries([requestConfig.pluralName]);
    }
  };

  const onError = () => {
    toastError(`Can not delete ${requestConfig.singularName}`);
  };

  const mutation = useMutation<HttpResponse<any>, HttpError, string>({
    mutationFn,
    onError: withDefaultOnError(onError),
    onSuccess,
  });

  const deleteOne = async (id: string | string[] | undefined) => {
    if (!id) return;
    if (typeof id !== 'string') return;

    const confirm = await isConfirmed(
      `Do you want to delete ${requestConfig.singularName}?`,
    );
    if (confirm) mutation.mutate(id);
  };

  return {
    deleteOne,
    isDeleting: mutation.isLoading,
  };
};

export default useDeleteOne;
