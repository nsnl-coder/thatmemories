import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { withDefaultOnError } from '../queryClient';
import { RequestConfig } from '../queryConfig';

import axios from '@src/config/axios';
import { HttpError, HttpResponse } from '@src/types/http';
import { ObjectId } from '@src/types/objectId';
import { toastError, toastSuccess } from '@src/utils/toast';

const useCreateOne = <T extends { _id?: ObjectId }>(
  requestConfig: RequestConfig,
) => {
  const router = useRouter();

  const mutationFn = async (payload: T) => {
    const { data } = await axios<HttpResponse<T>>({
      url: requestConfig.url,
      method: 'post',
      data: payload,
    });

    return data;
  };

  const onSuccess = (res: HttpResponse<T>) => {
    toastSuccess(`${requestConfig.singularName} has been created!`);

    if (res.data?._id) {
      router.push(`/${requestConfig.pluralName}/${res.data._id}`);
    }
  };

  const onError = (err: HttpError) => {
    toastError(`Can not create ${requestConfig.singularName}`);
  };

  const mutation = useMutation<HttpResponse<T>, HttpError, T>({
    mutationFn,
    onError: withDefaultOnError(onError),
    onSuccess,
  });

  const createOne = (payload: T, id: string | string[] | undefined) => {
    if (id === 'create') mutation.mutate(payload);
  };

  return {
    isLoading: mutation.isLoading,
    createOne,
    error: mutation.error,
    isCreated: mutation.isSuccess,
    isError: mutation.isError,
  };
};

export default useCreateOne;
