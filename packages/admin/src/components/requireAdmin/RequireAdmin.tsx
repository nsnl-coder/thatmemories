import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ErrorMessage from './ErrorMessage';

import { useAppSelector } from '@src/hooks/redux';
import { Children } from '@src/types/shared';

function RequireAdmin(props: Children): JSX.Element | null {
  const router = useRouter();
  const { children } = props;

  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!router.isReady) return;

    if (auth.isLoggedIn === false) {
      router.push({
        pathname: '/auth/login',
      });
    }
  }, [router.isReady, auth.isLoggedIn, router]);

  if (auth.isLoggedIn && auth.user?.role !== 'admin') return <ErrorMessage />;

  if (auth.isLoggedIn && auth.user?.role === 'admin') {
    return <>{children}</>;
  }

  return null;
}

export default RequireAdmin;
