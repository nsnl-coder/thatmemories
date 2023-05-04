import FilePreview from '@src/components/filePreview/FilePreview';
import routesConfig from '@src/config/routesConfig';
import { useAppSelector } from '@src/hooks/redux';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  setShowStepOne: Dispatch<SetStateAction<boolean>>;
}

function CheckoutItems(props: Props): JSX.Element {
  const { setShowStepOne } = props;
  const { items } = useAppSelector((state) => state.cart);

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Your items</h2>
      <div className="flex flex-col gap-y-3 lg:min-h-screen">
        {items.map((item) => (
          <div key={item._id} className="flex items-start gap-x-3">
            <Link
              href={routesConfig.productDetail(item._id, item.slug)}
              className="w-12 rounded-md overflow-hidden flex-shrink-0"
            >
              <FilePreview
                fill={false}
                width={60}
                height={60}
                src={item.image}
              />
            </Link>
            <div className="flex flex-col justify-between self-stretch">
              <Link
                href={routesConfig.productDetail(item._id, item.slug)}
                className="line-clamp-1"
              >
                {item.name}
              </Link>
              <div className="flex gap-x-2">
                {item.selectedOptions.map((option) => (
                  <div
                    key={option._id}
                    className="px-4 border rounded-full leading-4 flex font-medium bg-base-300 text-xs"
                  >
                    {option.optionName}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm text-text/70">
                {item.finalPrice}x{item.quantity}
              </div>
              <div className="font-medium">${item.itemTotal}</div>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="bg-neutral h-11 lg:hidden text-lg text-white font-medium flex-shrink-0 w-full mt-8"
        onClick={() => setShowStepOne(false)}
      >
        Next step
      </button>
    </div>
  );
}

export default CheckoutItems;
