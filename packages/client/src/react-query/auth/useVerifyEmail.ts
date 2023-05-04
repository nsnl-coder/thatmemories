import { isError, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { withDefaultOnError } from '../queryClient';

import axios from '@src/config/axios';
import { useAppSelector } from '@src/hooks/redux';
import { HttpError, HttpResponse } from '@src/types/http';
import { toastSuccess } from '@src/utils/toast';

type Response = HttpResponse<any>;

const useVerifyEmail = () => {
  const token = useRouter().query.token;
  const user = useAppSelector((state) => state.auth.user);

  const mutationFn = async (token: string) => {
    const { data } = await axios<Response>({
      url: `/api/auth/verify-email/${token}`,
      method: 'post',
    });

    return data;
  };

  const onSuccess = () => {
    toastSuccess('Your email has been verified!');
  };
  const onError = () => {};

  const mutation = useMutation<Response, HttpError, string>({
    mutationFn,
    onError: withDefaultOnError(onError),
    onSuccess,
  });

  const verifyEmail = mutation.mutate;

  useEffect(() => {
    if (
      token &&
      !mutation.isError &&
      !mutation.isSuccess &&
      !user?.isVerified
    ) {
      if (typeof token === 'string') verifyEmail(token);
    }
  }, [
    token,
    verifyEmail,
    mutation.isError,
    mutation.isSuccess,
    user?.isVerified,
  ]);

  if (user?.isVerified) {
    return {
      isSuccess: true,
    };
  }

  return {
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};

export default useVerifyEmail;
