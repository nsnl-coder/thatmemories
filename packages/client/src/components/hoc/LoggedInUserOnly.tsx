import { useRouter } from 'next/router';
//
import LoadingPage from './LoadingPage';

import { useAppSelector } from '@src/hooks/redux';
import { Children } from '@src/types/shared';

interface Props extends Children {}

/**
 * Only return children is user is logged in and verified
 */

function LoggedInUserOnly(props: Props): JSX.Element | null {
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  if (isLoggedIn && user?.isVerified) {
    return <>{props.children}</>;
  }

  if (isLoggedIn && user?.isVerified === false) {
    router.push('/auth/verify-email');
  }

  if (isLoggedIn === undefined) return <LoadingPage />;

  return null;
}

export default LoggedInUserOnly;
