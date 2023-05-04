import { useMutation, useQueryClient } from '@tanstack/react-query';
import { withDefaultOnError } from '../queryClient';
import { RequestConfig } from '../queryConfig';

import axios from '@src/config/axios';
import { HttpError, HttpResponse } from '@src/types/http';
import { toastError, toastSuccess } from '@src/utils/toast';

type Response = HttpResponse<{
  modifiedCount: number;
}>;

interface Payload {
  updateList: string[];
  [key: string]: any;
}

const useUpdateOnes = (requestConfig: RequestConfig) => {
  const queryClient = useQueryClient();
  const mutationFn = async (payload: Payload) => {
    const { data } = await axios<Response>({
      url: requestConfig.url,
      method: 'put',
      data: payload,
    });

    return data;
  };

  const onSuccess = (res: Response) => {
    if (res.data?.modifiedCount) {
      toastSuccess(
        `${res.data.modifiedCount} ${
          res.data.modifiedCount > 1
            ? requestConfig.pluralName
            : requestConfig.singularName
        } has been updated!`,
      );
    }
    queryClient.invalidateQueries([requestConfig.pluralName]);
  };

  const onError = () => {
    toastError(`Can not update ${requestConfig.pluralName}`);
  };

  const mutation = useMutation<Response, HttpError, Payload>({
    mutationKey: [requestConfig.pluralName],
    mutationFn,
    onError: withDefaultOnError(onError),
    onSuccess,
  });

  const updateOnes = (payload: any, ids: string[]) => {
    if (!ids.length) return;

    let updatePayload = {
      ...payload,
      updateList: ids,
    };

    mutation.mutate(updatePayload);
  };

  return {
    isLoading: mutation.isLoading,
    updateOnes,
  };
};

export default useUpdateOnes;
