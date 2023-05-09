import OrderItems from '@src/_pages/orders/OrderItems';
import RowContainer from '@src/components/container/RowContainer';
import useGetOne from '@src/react-query/query/useGetOne';
import queryConfig from '@src/react-query/queryConfig';
import { IOrder } from '@thatmemories/yup';
import { useRouter } from 'next/router';

interface Props {
  order: IOrder;
}

function Order(): JSX.Element | null {
  const id = useRouter().query.id;
  const { isLoading, data: order } = useGetOne<IOrder>(queryConfig.orders);

  if (!order) {
    return null;
  }

  return (
    <RowContainer className="py-8 bg-base-300">
      <div className="bg-base-100 py-12 px-16">
        <div className="flex gap-x-6 mb-8 justify-between">
          <div>
            <h2 className="font-medium text-lg mb-2">Shipping details</h2>
            <p>Order number: {order.orderNumber}</p>
            <p>Name: {order.fullname}</p>
            <p>
              Shipping address: {order.shippingAddress.line1}
              {order.shippingAddress.city} {order.shippingAddress.state}
              {order.shippingAddress.country}
              {', '}
              {order.shippingAddress.postal_code}
            </p>
            <p>Phone: {order.phone}</p>
          </div>
          <div className="w-60">
            <h2 className="font-medium text-lg mb-2">Order details</h2>
            <p>Payment status: {order.paymentStatus}</p>
            <p>Shipping status: {order.paymentStatus}</p>
          </div>
        </div>
        <div>
          <OrderItems items={order.items} />
          <div className="flex justify-end mt-12">
            <div className="w-60 flex flex-col gap-y-2">
              <div className="flex justify-between">
                <span>Sub total:</span> <span>${order.subTotal}</span>
              </div>
              <div className="flex justify-between">
                <span> Discount:</span> <span>${order.discount.inDollar}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping fees:</span> <span>${order.shipping.fees}</span>
              </div>
              <div className="border-t py-3 flex justify-between">
                <span className="font-medium">Grand total:</span>
                <span>${order.grandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RowContainer>
  );
}

export default Order;
