import useGetOnes from '@src/react-query/query/useGetOnes';
import queryConfig from '@src/react-query/queryConfig';
import { IOrder } from '@thatmemories/yup';
import OrderRow from './OrderRow';

function OrdersTable(): JSX.Element {
  const {
    data: orders,
    pagination,
    isLoading,
  } = useGetOnes<IOrder[]>(queryConfig.orders);

  return (
    <div className="flex flex-col gap-y-6 flex-grow">
      {orders?.map((order) => (
        <OrderRow key={order._id?.toString()} order={order} />
      ))}
    </div>
  );
}

export default OrdersTable;
