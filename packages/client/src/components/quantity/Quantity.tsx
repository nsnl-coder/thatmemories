import { ChangeEvent } from 'react';
import { BiMinus } from 'react-icons/bi';
import { BsPlus } from 'react-icons/bs';

interface Props {
  handleIncreaseQuantity: () => void;
  handleDecreaseQuantity: () => void;
  handleQuantityChange: (e: ChangeEvent<HTMLInputElement>) => void;
  quantity: number | '';
  handleBlur: () => void;
}

function Quantity(props: Props): JSX.Element {
  const {
    quantity,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    handleBlur,
    handleQuantityChange,
  } = props;

  return (
    <div className="flex ">
      <div className="w-32 text-text flex items-center px-1.5">
        <button
          onClick={handleDecreaseQuantity}
          type="button"
          className={`bg-base-300 rounded-full w-7 aspect-square flex items-center justify-center ${
            quantity === 1 ? 'cursor-not-allowed' : ''
          }`}
        >
          <BiMinus size={18} />
        </button>
        <input
          className="w-0 flex-grow outline-none h-full text-center"
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          onBlur={handleBlur}
        />
        <button
          onClick={handleIncreaseQuantity}
          type="button"
          className={`bg-base-300 rounded-full w-7 aspect-square flex items-center justify-center ${
            quantity === 999 ? 'cursor-not-allowed' : ''
          }`}
        >
          <BsPlus size={18} />
        </button>
      </div>
    </div>
  );
}

export default Quantity;
