import { useMutation } from '@tanstack/react-query';
import { withDefaultOnError } from '../queryClient';

//
import axios from '@src/config/axios';
import { useAppDispatch } from '@src/hooks/redux';
import { failToLogin, logUserIn } from '@src/store/auth';
import { HttpError, HttpResponse } from '@src/types/http';
import { IUser } from '@src/yup/userSchema';

type Response = HttpResponse<IUser>;

interface RequestData {
  email: string;
  password: string;
}

const useLogin = () => {
  const dispatch = useAppDispatch();

  const mutationFn = async (payload: RequestData) => {
    const { data } = await axios<Response>({
      method: 'post',
      url: '/api/auth/sign-in',
      data: payload,
    });

    return data;
  };

  const onSuccess = (data: Response) => dispatch(logUserIn(data));
  const onError = (error: HttpError) => dispatch(failToLogin());

  const mutation = useMutation<Response, HttpError, RequestData>({
    mutationFn,
    onError: withDefaultOnError(onError),
    onSuccess,
    retry: 0,
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isLoading,
    apiError: mutation.error?.response?.data || null,
    reset: mutation.reset,
  };
};

export default useLogin;
