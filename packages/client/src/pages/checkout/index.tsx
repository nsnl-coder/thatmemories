import ApplyCoupon from '@src/_pages/checkout/ApplyCoupon';
import BackToCart from '@src/_pages/checkout/BackToCart';
import CheckoutItems from '@src/_pages/checkout/CheckoutItems';
import CheckoutSteps from '@src/_pages/checkout/CheckoutSteps';
import CheckoutSummary from '@src/_pages/checkout/CheckoutSummary';
import PaymentForm from '@src/_pages/checkout/PaymentForm';
import ShippingAddressForm from '@src/_pages/checkout/ShipingAddressForm';
import ShippingMethods from '@src/_pages/checkout/ShippingMethods';
import RowContainer from '@src/components/container/RowContainer';
import { useAppSelector } from '@src/hooks/redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);

function Checkout(): JSX.Element {
  const grandTotal = useAppSelector((state) => state.cart.grandTotal);
  const [showStepOne, setShowStepOne] = useState<boolean>(true);

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: 'payment',
        currency: 'usd',
        amount: grandTotal * 100 || 100,
        appearance: {
          // theme: 'night',
        },
      }}
    >
      <RowContainer>
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pb-16">
          <div
            className={`lg:block lg:bg-base-200 ${showStepOne ? '' : 'hidden'}`}
          >
            <div className="px-4 md:px-4 md:max-w-lg mx-auto flex flex-col gap-y-8">
              <BackToCart />
              <CheckoutSummary />
              <div className="flex flex-col gap-y-2">
                <ShippingMethods />
                <ApplyCoupon />
              </div>
              <CheckoutItems setShowStepOne={setShowStepOne} />
            </div>
          </div>
          <div
            className={`py-16 lg:block mx-auto ${
              showStepOne ? 'hidden' : 'block'
            }`}
          >
            <div className="mx-auto md:max-w-xl px-4 md:px-20">
              <CheckoutSteps setShowStepOne={setShowStepOne} />
              <ShippingAddressForm />
              <PaymentForm />
            </div>
          </div>
        </div>
      </RowContainer>
    </Elements>
  );
}

export default Checkout;

Checkout.noLayout = true;
