import { resetCartState } from '@src/store/cart';
import { openSuccessModal } from '@src/store/notifyModals';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function useHandleSuccessPayment(): null {
  const router = useRouter();
  const dispatch = useDispatch();
  const redirect_status = router.query.redirect_status;
  const payment_intent = router.query.payment_intent;

  useEffect(() => {
    if (redirect_status === 'succeeded') {
      dispatch(resetCartState());
      dispatch(
        openSuccessModal({
          message:
            'Your order has been placed. We sent you an email with your invoice.',
          leftButtonLink: '/orders',
          leftButtonText: 'see your orders',
          rightButtonLink: '/',
          rightButtonText: 'close',
          cancelLink: '/',
        }),
      );
    }
  }, [payment_intent, redirect_status, dispatch]);

  return null;
}

export default useHandleSuccessPayment;
