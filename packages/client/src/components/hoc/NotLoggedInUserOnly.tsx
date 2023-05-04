import { useRouter } from 'next/router';
import LoadingPage from './LoadingPage';

import { useAppSelector } from '@src/hooks/redux';
import { Children } from '@src/types/shared';

interface Props extends Children {}

function NotLoggedInUserOnly(props: Props): JSX.Element | null {
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const router = useRouter();

  if (isLoggedIn && user?.isVerified === true) {
    router.push('/profile');
  }

  if (isLoggedIn && user?.isVerified === false) {
    router.push('/auth/verify-email');
  }

  if (isLoggedIn === false) {
    return <>{props.children}</>;
  }

  if (isLoggedIn === undefined) return <LoadingPage />;

  return null;
}

export default NotLoggedInUserOnly;
