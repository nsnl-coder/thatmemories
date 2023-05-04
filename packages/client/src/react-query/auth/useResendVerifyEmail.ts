import { useMutation } from '@tanstack/react-query';
import { withDefaultOnError } from '../queryClient';

import axios from '@src/config/axios';
import { HttpError, HttpResponse } from '@src/types/http';
import { toastError, toastSuccess } from '@src/utils/toast';

type Response = HttpResponse<any>;

const useResendVerifyEmail = () => {
  const mutationFn = async () => {
    const { data } = await axios<Response>({
      url: '/api/auth/resend-verify-email',
      method: 'post',
    });

    return data;
  };

  const onSuccess = () => {
    toastSuccess('We send you an email. Plese check your inbox.');
  };
  const onError = () => {};

  const mutation = useMutation<Response, HttpError>({
    mutationFn,
    onError: withDefaultOnError(onError),
    onSuccess,
  });

  return {
    isLoading: mutation.isLoading,
    resendEmail: mutation.mutate,
  };
};

export default useResendVerifyEmail;
