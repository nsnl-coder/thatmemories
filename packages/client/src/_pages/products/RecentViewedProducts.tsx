import FilePreview from '@src/components/filePreview/FilePreview';
import routesConfig from '@src/config/routesConfig';
import { IProduct } from '@src/yup/productSchema';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

interface Props {
  products: IProduct[] | undefined;
  isLoading: boolean;
}

function RecentViewedProducts(props: Props): JSX.Element | null {
  const { products, isLoading } = props;

  if ((!products || !products.length) && !isLoading) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-medium mb-6">Recent views</h3>
      {products?.map((product) => (
        <Link
          href={routesConfig.productDetail(product._id!, product.slug)}
          key={product._id}
          className="flex gap-x-6"
        >
          <div className="w-16 h-20 flex-shrink-0">
            {product.previewImages && product.previewImages.length > 0 && (
              <FilePreview
                width={100}
                height={250}
                src={product.previewImages[0]}
                fill={false}
              />
            )}
          </div>
          <div className="flex flex-col justify-between">
            <h4 className="line-clamp-2 text-sm">{product.name}</h4>
            <span className="font-medium">
              $
              {product.discountPrice === undefined
                ? product.price
                : product.discountPrice}
            </span>
          </div>
        </Link>
      ))}
      {isLoading && <Skeleton className="h-20" />}
    </div>
  );
}

export default RecentViewedProducts;
