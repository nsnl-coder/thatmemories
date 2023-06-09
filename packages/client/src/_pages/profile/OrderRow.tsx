import FilePreview from '@src/components/filePreview/FilePreview';
import routesConfig from '@src/config/routesConfig';
import { IOrder } from '@thatmemories/yup';
import { format } from 'date-fns';
import Link from 'next/link';
import ShipToDropdown from './ShipToDropdown';

interface Props {
  order: IOrder;
}

function OrderRow(props: Props): JSX.Element {
  const { order } = props;

  let photos = order.items.map((order) => order.photos[0]);

  return (
    <div className="border divide-y rounded-lg overflow-hidden bg-base-100">
      <div className="flex gap-x-12 text-sm py-4 px-6">
        <div className="flex flex-col">
          <span className="uppercase text-xs font-medium">Order placed</span>
          <span>
            {order.createdAt &&
              format(new Date(order.createdAt), 'MMM dd, yyyy')}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase font-medium">Ship to</span>
          <ShipToDropdown order={order} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase font-medium">Order number</span>
          <span>#{order.orderNumber}</span>
        </div>
      </div>
      <div className="flex gap-x-3 px-6 py-6">
        <div className="flex rounded-md overflow-hidden">
          {photos.map((item) =>
            item ? (
              <FilePreview
                key={item}
                src={item}
                width={100}
                height={100}
                fill={false}
                className="w-25"
              />
            ) : null,
          )}
        </div>
        <div className="flex flex-col justify-between flex-grow">
          <p className="font-medium text-sm mb-3">
            {order.items[0]?.productName}
          </p>
          <div className="flex justify-between">
            <div>
              <div className="font-medium text-3xl">${order.grandTotal}</div>
              <div className="text-sm">Delivery estimated at Dec 25 2022</div>
            </div>
            <div className="self-end">
              <Link
                href={routesConfig.orderDetail(order._id.toString())}
                className="py-0.5 bg-primary px-3 text-white rounded-full"
              >
                See all items
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderRow;
