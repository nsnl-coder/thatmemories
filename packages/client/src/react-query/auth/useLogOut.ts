import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

//
import axios from '@src/config/axios';
import { useAppDispatch } from '@src/hooks/redux';
import { failToLogin } from '@src/store/auth';
import { HttpError } from '@src/types/http';

const useLogOut = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const mutationFn = async (payload: any) => {
    const { data } = await axios.post('/api/auth/sign-out');
    return data;
  };

  const onSuccess = () => {
    dispatch(failToLogin());
    router.push('/auth/login');
  };

  const mutation = useMutation<any, HttpError>({
    mutationFn,
    onSuccess,
    retry: 0,
  });

  return {
    logout: mutation.mutate,
    isLoggingOut: mutation.isLoading,
  };
};

export default useLogOut;
