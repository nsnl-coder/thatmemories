import FilePreview from '@src/components/filePreview/FilePreview';
import routesConfig from '@src/config/routesConfig';
import { IOrder } from '@thatmemories/yup';
import Link from 'next/link';

interface Props {
  items: IOrder['items'];
}

function OrderItems(props: Props): JSX.Element {
  const { items } = props;

  return (
    <table className="shared-table ">
      <thead>
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>Variants</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.productName}>
            <td>
              <div className="w-24">
                {item.photos[0] && (
                  <FilePreview
                    src={item.photos[0]}
                    fill={false}
                    width={120}
                    height={120}
                    className="rounded-lg"
                  />
                )}
              </div>
            </td>
            <td className="max-w-xs">
              <Link
                href={routesConfig.productDetail(item.productId, item.slug)}
              >
                <p className="line-clamp-1 font-medium text-sm">
                  {item.productName}
                </p>
              </Link>
            </td>
            <td>
              {item.variants.map((variant) => (
                <div key={variant._id?.toString()}>{variant.optionName}</div>
              ))}
            </td>
            <td>
              <div>{item.price}</div>
            </td>
            <td>
              <div>{item.quantity}</div>
            </td>
            <td>
              <span>{(item.price * item.quantity).toFixed(2)}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrderItems;
