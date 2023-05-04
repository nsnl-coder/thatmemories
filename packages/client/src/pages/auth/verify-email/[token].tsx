import Link from 'next/link';
import { useRouter } from 'next/router';
import { RiMailCheckFill, RiMailCloseFill } from 'react-icons/ri';

import ResendEmailButton from '@src/_pages/auth/ResendEmailButton';
import { useAppSelector } from '@src/hooks/redux';

import useVerifyEmail from '@react-query/auth/useVerifyEmail';

//
import RowContainer from '@components/container/RowContainer';
import LoadingPage from '@components/hoc/LoadingPage';

function VerifyEmailWithToken(): JSX.Element | null {
  const router = useRouter();
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const { isError, isLoading, isSuccess } = useVerifyEmail();

  if (isLoggedIn === false) {
    router.push('/auth/login');
  }

  return (
    <RowContainer className="p-6">
      <div className="border max-w-lg mx-auto justify-center flex flex-col items-center pt-12 pb-24 gap-y-3">
        {isLoading && <LoadingPage />}
        {isError && (
          <>
            <RiMailCloseFill size={72} />
            <h2 className="font-semibold text-lg">Can not verify your email</h2>
            <p>Your token is invalid or expired!</p>
            <ResendEmailButton />
          </>
        )}
        {isSuccess && (
          <>
            <RiMailCheckFill size={72} />
            <h2 className="font-semibold text-lg">
              Your email has been verified
            </h2>
            {user?.email && (
              <p>
                Hi <span className="font-semibold">{user.email}</span>, your
                account has been verified.
              </p>
            )}
            <div className="flex flex-col gap-y-1 mt-8">
              <Link
                type="button"
                className="bg-neutral text-white px-6 py-1 rounded-sm hover:opacity-70 text-center"
                href="/profile"
              >
                Check your profile page
              </Link>
              <span className="self-center">or</span>
              <Link
                type="button"
                className="bg-primary px-6 py-1 text-center text-white rounded-sm hover:brightness-125"
                href="/"
              >
                Visit store
              </Link>
            </div>
          </>
        )}
      </div>
    </RowContainer>
  );
}

export default VerifyEmailWithToken;
