import Link from 'next/link';
import { ChangeEvent } from 'react';
import { VscHeart, VscTrash } from 'react-icons/vsc';

import FilePreview from '@src/components/filePreview/FilePreview';
import Price from '@src/components/price/Price';
import Quantity from '@src/components/quantity/Quantity';
import routesConfig from '@src/config/routesConfig';
import { useAppDispatch } from '@src/hooks/redux';
import useConfirm from '@src/hooks/useConfirm';
import {
  ICartItem,
  changeCartItemQuantity,
  recalculateCart,
  removeItemFromCart,
} from '@src/store/cart';
import { openLittleToast } from '@src/store/notifyModals';

interface Props {
  cartItem: ICartItem;
}

function CartItem(props: Props): JSX.Element {
  const { cartItem } = props;
  const { isConfirmed } = useConfirm();
  const dispatch = useAppDispatch();

  const handleBlur = () => {};

  const handleDecreaseQuantity = () => {
    if (Number(cartItem.quantity) > 1) {
      dispatch(openLittleToast({ message: 'item removed' }));
    }

    dispatch(
      changeCartItemQuantity({
        ...cartItem,
        quantity: Number(cartItem.quantity) - 1,
      }),
    );
    dispatch(recalculateCart());
  };

  const handleIncreaseQuantity = () => {
    if (Number(cartItem.quantity) < 999) {
      dispatch(openLittleToast({ message: 'item added' }));
    }

    dispatch(
      changeCartItemQuantity({
        ...cartItem,
        quantity: Number(cartItem.quantity) + 1,
      }),
    );
    dispatch(recalculateCart());
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeCartItemQuantity({
        ...cartItem,
        quantity: e.target.value === '' ? '' : Number(e.target.value),
      }),
    );
    dispatch(recalculateCart());
  };

  const handleRemoveItemFromCart = async () => {
    const confirm = await isConfirmed({
      title: 'remove product',
      subTitle: 'remove item from cart?',
      confirmButtonText: 'remove',
    });

    if (confirm) {
      dispatch(removeItemFromCart(cartItem));
      dispatch(recalculateCart());
    }
  };

  return (
    <div className="flex px-6 py-4 gap-x-5 bg-base-100">
      <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-base-200">
        <FilePreview
          src={cartItem.image}
          fill={false}
          width={120}
          height={120}
        />
      </div>
      <div className="flex-grow">
        <div className="flex gap-x-4 items-start mb-1">
          <Link
            className="flex-grow"
            href={routesConfig.productDetail(cartItem._id, cartItem.slug)}
          >
            <p className="line-clamp-1 font-medium text-sm">{cartItem.name}</p>
          </Link>
          <div className="flex items-center gap-x-2">
            <button type="button">
              <VscHeart size={18} className="hover:text-primary" />
            </button>
            <button onClick={() => handleRemoveItemFromCart()} type="button">
              <VscTrash size={18} className="hover:text-primary" />
            </button>
          </div>
        </div>
        <div className="flex gap-x-4">
          {cartItem.selectedOptions.map((option) => (
            <div
              key={option._id}
              className="px-4 border rounded-full leading-5 flex font-medium bg-base-300 text-sm"
            >
              {option.optionName}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-end">
          <div className="mt-5">
            <Price
              discountPrice={cartItem.discountPrice}
              price={cartItem.price}
              highestOptionPrice={cartItem.highestOptionPrice}
              className="text-xl font-medium"
              showFinalPriceOnly
            />
            <div className="text-sm text-success mt-1">free shipping</div>
          </div>
          <div>
            <Quantity
              quantity={cartItem.quantity}
              handleBlur={handleBlur}
              handleDecreaseQuantity={handleDecreaseQuantity}
              handleQuantityChange={handleQuantityChange}
              handleIncreaseQuantity={handleIncreaseQuantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
