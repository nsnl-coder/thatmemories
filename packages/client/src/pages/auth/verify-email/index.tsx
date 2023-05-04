import { useRouter } from 'next/router';
import { GrMail } from 'react-icons/gr';

import ResendEmailButton from '@src/_pages/auth/ResendEmailButton';
import { useAppSelector } from '@src/hooks/redux';

import useLogOut from '@react-query/auth/useLogOut';

import RowContainer from '@components/container/RowContainer';

function VerifyEmailNotify(): JSX.Element {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const { logout } = useLogOut();

  const handleSignInAgain = () => {
    logout();
  };

  if (user?.isVerified) {
    router.push('/profile');
  }

  return (
    <RowContainer className="p-6">
      <div className="border max-w-lg mx-auto justify-center flex flex-col items-center pt-12 pb-24 gap-y-3">
        <GrMail size={90} />
        <h2 className="font-semibold">Verify your email address!</h2>
        {user?.email && (
          <p>
            You&lsquo;ve entered{' '}
            <span className="font-semibold"> {user.email} </span> as the email
            address for your account.
          </p>
        )}
        <p>Please check your email box to confirm this is your email!</p>
        <ResendEmailButton />
        <button
          type="button"
          className="text-blue-600 underline hover:text-blue-700 text-sm"
          onClick={() => handleSignInAgain()}
        >
          Sign in with different email?
        </button>
      </div>
    </RowContainer>
  );
}

export default VerifyEmailNotify;
