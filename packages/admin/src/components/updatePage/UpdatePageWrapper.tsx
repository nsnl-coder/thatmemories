import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Control, UseFormReset, useFormState } from 'react-hook-form';
import UpdatePageHeader from './UpdatePageHeader';

import useConfirm from '@src/hooks/useConfirm';
import { Children } from '@src/types/shared';

interface Props extends Children {
  className?: string;
  control: Control<any>;
  reset: UseFormReset<any>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

function UpdatePageWrapper(props: Props): JSX.Element {
  const { control, onSubmit, reset } = props;
  const { isDirty } = useFormState({ control });
  const id = useRouter().query.id;
  const { isConfirmed } = useConfirm();
  const [nextPath, setNextPath] = useState<string | null>(null);
  const router = useRouter();

  const onRouteChangeStart = useCallback(
    (nextPath: string) => {
      if (isDirty && id !== 'create') {
        setNextPath(nextPath);
        nProgress.done();
        router.events.emit('routeChangeError');
        throw 'User cancel route change! You can savely ignore this message!';
      }
    },
    [router.events, isDirty, id],
  );

  const confirmToLeave = useCallback(async () => {
    const isConfirm = await isConfirmed(
      'You have unsaved changes, do you really want to leave?',
    );

    if (isConfirm && nextPath) {
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.push(nextPath);
    }
    setNextPath(null);
  }, [isConfirmed, nextPath, onRouteChangeStart, router]);

  useEffect(() => {
    if (!nextPath) return;
    confirmToLeave();
  }, [nextPath, confirmToLeave]);

  useEffect(() => {
    if (!router.query.id) return;
    router.events.on('routeChangeStart', onRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
    };
  }, [onRouteChangeStart, router.query.id, router.events]);

  const handleBeforeUnload = (e: any) => {
    e.preventDefault();
    e.returnValue = '';
  };

  useEffect(() => {
    if (isDirty) window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  return (
    <form onSubmit={onSubmit}>
      <UpdatePageHeader reset={reset} control={control} />
      <div className={`px-6 ${props.className} mx-auto max-w-5xl pb-32 `}>
        {props.children}
      </div>
    </form>
  );
}

export default UpdatePageWrapper;
