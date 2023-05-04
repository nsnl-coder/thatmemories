import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import AuthTab from '@src/_pages/auth/AuthTab';
import { IUser, registerSchema } from '@src/yup/userSchema';

import useRegister from '@react-query/auth/useRegister';

import RowContainer from '@components/container/RowContainer';
import Input from '@components/form/Input';
import NotLoggedInUserOnly from '@components/hoc/NotLoggedInUserOnly';

function Register(): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors, isValidating, isValid },
  } = useForm<IUser>({
    resolver: yupResolver(registerSchema),
  });

  const { signup, reset, isLoading, httpErrors } = useRegister();

  const onSubmit = (data: IUser) => {
    signup(data);
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
              register={register}
              errors={errors}
              fieldName="email"
              labelTheme="light"
              placeholder="example@gmail.com"
              label="Email:"
            />
            <Input
              register={register}
              errors={errors}
              fieldName="password"
              labelTheme="light"
              placeholder=" "
              label="Password:"
              type="password"
              className="placeholder:text-2xl"
            />
            <Input
              register={register}
              errors={errors}
              fieldName="passwordConfirm"
              labelTheme="light"
              placeholder=" "
              label="Password Confirm:"
              type="password"
              required={true}
            />
            {isValid && httpErrors && httpErrors.message && (
              <p className="text-error mb-4 text-sm">{httpErrors.message}</p>
            )}
            <p className="text-p2 mb-4">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our privacy policy.
            </p>
            <button
              type="submit"
              className="bg-primary text-white w-full py-2 mb-4"
            >
              Register
            </button>
          </form>
        </div>
      </RowContainer>
    </NotLoggedInUserOnly>
  );
}

export default Register;
