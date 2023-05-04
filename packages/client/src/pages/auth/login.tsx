import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import RowContainer from '@components/container/RowContainer';
import Input from '@components/form/Input';
import NotLoggedInUserOnly from '@components/hoc/NotLoggedInUserOnly';
import { yupResolver } from '@hookform/resolvers/yup';
import useLogin from '@react-query/auth/useLogin';
import AuthTab from '@src/_pages/auth/AuthTab';
import { IUser, loginUserSchema } from '@thatmemories/yup';

function Login(): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors, isValidating, isValid },
  } = useForm<IUser>({
    resolver: yupResolver(loginUserSchema),
  });

  const { login, isLoading, httpErrors, reset } = useLogin();

  const onSubmit = (user: IUser) => {
    login(user);
  };

  useEffect(() => {
    if (httpErrors && isValidating) {
      reset();
    }
  }, [isValidating, reset, httpErrors]);

  return (
    <NotLoggedInUserOnly>
      <RowContainer>
        <div className="pt-6 pb-36 max-w-lg mx-auto lg:border lg:px-12 lg:my-12">
          <AuthTab />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              errors={errors}
              fieldName="email"
              labelTheme="light"
              register={register}
              label="Email:"
              placeholder="example@gmail.com"
            />
            <Input
              register={register}
              errors={errors}
              fieldName="password"
              labelTheme="light"
              label="Password:"
              placeholder=" "
              type="password"
              className="text-2xl"
            />
            {isValid && httpErrors?.message && (
              <div className="mb-6 text-sm text-error">
                {httpErrors.message}
              </div>
            )}
            <button
              type="submit"
              className={`bg-primary text-white w-full py-2 mb-4 ${
                isLoading ? 'pointer-events-none opacity-80' : ''
              }`}
            >
              Login
            </button>
          </form>
          <span>Lost your password?</span>
        </div>
      </RowContainer>
    </NotLoggedInUserOnly>
  );
}

export default Login;

Login.NeedLayout = true;
