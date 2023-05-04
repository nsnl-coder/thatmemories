import { useAppSelector } from '@src/hooks/redux';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';

function BackToCart(): JSX.Element {
  const grandTotal = useAppSelector((state) => state.cart.grandTotal);

  return (
    <div>
      <Link href={'/cart'} className="flex items-center gap-x-3 mb-6 mt-6">
        <BiArrowBack size={18} />
        <span>Back to cart</span>
      </Link>
      <div>
        <span className="uppercase text-sm font-medium">Total order</span>
        <h3 className="font-semibold text-5xl">${grandTotal}</h3>
      </div>
    </div>
  );
}

export default BackToCart;
