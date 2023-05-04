import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { updateShippingInfo } from '@src/store/cart';
import { CHECKOUT_PROGRESS, goPaymentInfoStep } from '@src/store/checkout';
import { AddressElement, useElements } from '@stripe/react-stripe-js';
import { StripeAddressElementChangeEvent } from '@stripe/stripe-js';

function ShippingAddressForm(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const fullname = useAppSelector((state) => state.cart.fullname);
  const phone = useAppSelector((state) => state.cart.phone);
  const address = useAppSelector((state) => state.cart.shippingAddress);
  const elements = useElements();

  const handleShippingInfoChange = (e: StripeAddressElementChangeEvent) => {
    dispatch(updateShippingInfo(e.value));
  };

  const handleAddressValidation = async () => {
    const res = await elements?.getElement('address')?.getValue();
    if (res?.complete) {
      dispatch(goPaymentInfoStep());
    }
  };

  const checkoutProgress = useAppSelector(
    (state) => state.checkout.checkoutProgress,
  );

  if (checkoutProgress !== CHECKOUT_PROGRESS.STEP2) return null;

  return (
    <div className="flex flex-col gap-y-3 min-h-[200px]">
      <AddressElement
        options={{
          mode: 'shipping',
          defaultValues: {
            phone,
            name: fullname,
            address: {
              line1: '',
              line2: '',
              postal_code: '',
              city: '',
              country: '',
              ...address,
            },
          },
          fields: { phone: 'always' },
          validation: {
            phone: {
              required: 'always',
            },
          },
        }}
        onChange={handleShippingInfoChange}
      />
      <button
        type="button"
        className="bg-neutral h-11 text-lg text-primary-content font-medium flex-shrink-0 hover:bg-primary-focus"
        onClick={handleAddressValidation}
      >
        Next step
      </button>
    </div>
  );
}

export default ShippingAddressForm;
