import ProductCard from '@src/components/productCard/ProductCard';
import { IProduct } from '@thatmemories/yup';

interface Props {
  products: IProduct[] | null;
}

function RelatedProduct(props: Props): JSX.Element | null {
  const { products } = props;

  if (!products || products.length === 0) return null;

  return (
    <div className="pb-16">
      <h3 className="text-h1 font-medium mb-3"> Related products </h3>
      <div className="border-b mb-8"></div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-x-6 md:gap-y-6">
        {products.map((product, index) => (
          <div
            className={`${index > 3 && index <= 6 ? 'hidden md:block' : ''} ${
              index >= 4 ? 'lg:hidden' : ''
            }`}
            key={product._id}
          >
            <ProductCard
              product={product}
              className="h-72 md:h-80"
              sizes="(max-width:768px) 50vw,
              (max-width:1024px) 33vw,
              300px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedProduct;
