import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import useGetOnes from '@src/react-query/query/useGetOnes';
import queryConfig from '@src/react-query/queryConfig';
import { addShippingMethod, recalculateCart } from '@src/store/cart';
import { IShipping } from '@thatmemories/yup';
import Skeleton from 'react-loading-skeleton';
import ShippingMethod from './ShippingMethod';

const methods = [
  {
    name: 'Freeshipping',
    estimation: '1-3 days',
    price: 0,
    id: 1,
  },
  {
    name: 'Express shipping',
    estimation: '4-24 hours',
    price: 14,
    id: 2,
  },
];

interface Props {
  className?: string;
}

function ShippingMethods(props: Props): JSX.Element | null {
  const { className } = props;
  const dispatch = useAppDispatch();
  const shippingMethod = useAppSelector((state) => state.cart.shippingMethod);

  const { data: shippingMethods, isLoading } = useGetOnes<IShipping[]>(
    queryConfig.shippings,
    {
      includeUrlQuery: false,
      additionalQuery: {
        sort: 'fees',
      },
    },
  );
  const handleAddShipping = (shipping: IShipping) => {
    dispatch(addShippingMethod(shipping));
    dispatch(recalculateCart());
  };

  // make sure you do not select non-existent method
  if (!shippingMethod && shippingMethods?.length) {
    handleAddShipping(shippingMethods[0]);
  }

  if (shippingMethod && shippingMethods?.length) {
    const index = shippingMethods?.findIndex(
      (method) => method._id.toString() === shippingMethod,
    );

    if (index === -1) {
      handleAddShipping(shippingMethods[0]);
    }
  }

  return (
    <div className={className}>
      {isLoading && <Skeleton className="h-16" />}
      <div className="border rounded-md divide-y bg-base-100">
        {shippingMethods?.map((method) => (
          <ShippingMethod
            key={method._id.toString()}
            method={method}
            handleAddShipping={handleAddShipping}
          />
        ))}
      </div>
    </div>
  );
}

export default ShippingMethods;
