import { useAppSelector } from '@src/hooks/redux';
import useCreateOrder from '@src/react-query/orders/useCreateOrder';
import { CHECKOUT_PROGRESS } from '@src/store/checkout';
import { openErrorModal } from '@src/store/notifyModals';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function PaymentForm(): JSX.Element | null {
  const dispatch = useDispatch();
  const elements = useElements();
  const stripe = useStripe();

  const checkoutProgress = useAppSelector(
    (state) => state.checkout.checkoutProgress,
  );
  const grandTotal = useAppSelector((state) => state.cart.grandTotal);
  const { order, createOrder, isSuccess, isLoading, reset } = useCreateOrder();
  const processPayment = async () => {
    if (!elements) return;
    const { error } = await elements?.submit();

    if (error) return;
    createOrder();
  };

  const createPayment = useCallback(async () => {
    if (!stripe) return;
    if (!elements) return;
    if (!order?.client_secret) return;

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret: order.client_secret,
      confirmParams: {
        return_url: 'http://localhost:3000',
      },
    });

    if (error) {
      dispatch(
        openErrorModal({
          message: 'We can not process the payment at the moment.',
        }),
      );
    }

    reset();
  }, [stripe, elements, order?.client_secret, reset, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      createPayment();
    }
  }, [isSuccess, createPayment]);

  if (checkoutProgress !== CHECKOUT_PROGRESS.STEP3) return null;

  return (
    <div>
      <PaymentElement />
      <button
        type="button"
        className="bg-neutral h-11 text-lg text-white font-medium w-full mt-4"
        onClick={processPayment}
      >
        Pay ${grandTotal}
      </button>
    </div>
  );
}

export default PaymentForm;
