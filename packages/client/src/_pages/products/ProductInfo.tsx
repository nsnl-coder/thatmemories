import Price from '@src/components/price/Price';
import Rating from '@src/components/rating/Rating';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import {
  resetCurrentItemState,
  setCurrentCartItem,
} from '@src/store/currentCartItem';
import { IProduct } from '@thatmemories/yup';
import { useEffect } from 'react';
import AddToCart from './AddToCart';
import ItemQuantity from './ItemQuantity';
import Variants from './Variants';

interface Props {
  product: IProduct;
}

function ProductInfo(props: Props): JSX.Element {
  const { product } = props;
  const slug = useAppSelector((state) => state.currentCartItem.slug);
  const highestOptionPrice = useAppSelector(
    (state) => state.currentCartItem.highestOptionPrice,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (product.slug && product.slug !== slug) {
      dispatch(resetCurrentItemState());
      dispatch(setCurrentCartItem(product));
    }
  }, [slug, product, dispatch]);

  return (
    <div>
      <h1 className="text-h2 font-medium mb-2">{product.name?.slice(3)}</h1>
      <Rating
        rating={product.ratingsAverage!}
        ratingsCount={product.ratingsAverage!}
      />
      <Price
        price={product.price}
        discountPrice={product.discountPrice}
        className="text-2xl mt-8"
        highestOptionPrice={highestOptionPrice}
      />
      <p className="mt-8">{product.overview}</p>
      {product.variants?.length && (
        <div className="mt-8">
          <Variants variants={product.variants} />
        </div>
      )}
      <div className="mt-8">
        <ItemQuantity />
      </div>
      <div className="mt-8">
        <AddToCart />
      </div>
    </div>
  );
}

export default ProductInfo;
