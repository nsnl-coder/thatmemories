import { useQuery } from '@tanstack/react-query';

import axios from '@src/config/axios';
//
import { useAppDispatch } from '@src/hooks/redux';
import { failToLogin, logUserIn } from '@src/store/auth';
import { HttpError, HttpResponse } from '@src/types/http';
import { IUser } from '@src/yup/userSchema';

type Response = HttpResponse<IUser>;

const useCurrentUser = () => {
  const dispatch = useAppDispatch();

  const queryFn = async () => {
    const { data } = await axios.get<Response>('/api/auth/current-user');
    return data;
  };

  const onSuccess = (data: Response) => dispatch(logUserIn(data));
  const onError = (err: HttpError) => dispatch(failToLogin());

  const res = useQuery<any, HttpError, Response>({
    queryKey: ['auth'],
    queryFn,
    onSuccess,
    onError,
    retry: 0,
  });

  return {
    isLoading: res.isLoading,
    apiError: res.error,
  };
};

export default useCurrentUser;
