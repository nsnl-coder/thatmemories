import Quantity from '@src/components/quantity/Quantity';
import { useAppSelector } from '@src/hooks/redux';
import { changeCurrentItemQuantity } from '@src/store/currentCartItem';
import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

function SelectOptions(): JSX.Element {
  const quantity = useAppSelector((state) => state.currentCartItem.quantity);
  const dispatch = useDispatch();

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeCurrentItemQuantity(e.target.value));
  };

  const handleBlur = () => {
    if (quantity === '') {
      dispatch(changeCurrentItemQuantity('1'));
    }
  };

  const handleIncreaseQuantity = () => {
    dispatch(changeCurrentItemQuantity(Number(quantity) + 1));
  };

  const handleDecreaseQuantity = () => {
    dispatch(changeCurrentItemQuantity(Number(quantity) - 1));
  };

  return (
    <div>
      <h4 className="font-medium mb-4"> Quantity </h4>
      <Quantity
        quantity={quantity}
        handleBlur={handleBlur}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
        handleQuantityChange={handleQuantityChange}
      />
    </div>
  );
}

export default SelectOptions;
