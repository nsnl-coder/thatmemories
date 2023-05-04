import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { gotoShippingInfoStep } from '@src/store/checkout';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  setShowStepOne: Dispatch<SetStateAction<boolean>>;
}

function CheckoutSteps(props: Props): JSX.Element {
  const { setShowStepOne } = props;
  const stepNumber = useAppSelector((state) => state.checkout.stepNumber);
  const dispatch = useAppDispatch();

  const gotoStepOne = () => {
    if (stepNumber !== 1) dispatch(gotoShippingInfoStep());
  };

  return (
    <div className="-ml-6 -mr-8">
      <ul className="steps w-full mb-8 capitalize">
        <li
          onClick={() => setShowStepOne(true)}
          className={`cursor-pointer step ${
            stepNumber >= 1 ? 'step-neutral' : ''
          }`}
        >
          <span className="inline-block w-20">Shipping method</span>
        </li>
        <li
          onClick={gotoStepOne}
          className={`cursor-pointer step ${
            stepNumber >= 2 ? 'step-neutral' : ''
          }`}
        >
          Shipping address
        </li>
        <li
          className={`step cursor-not-allowed ${
            stepNumber >= 3 ? 'step-neutral' : ''
          }`}
        >
          payment information
        </li>
        <li
          className={`step cursor-not-allowed ${
            stepNumber >= 4 ? 'step-neutral' : ''
          }`}
        >
          Processing Purchase
        </li>
      </ul>
    </div>
  );
}

export default CheckoutSteps;
