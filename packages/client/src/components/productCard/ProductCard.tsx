import routesConfig from '@src/config/routesConfig';
import { IProduct } from '@src/yup/productSchema';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import FilePreview from '../filePreview/FilePreview';
import Price from '../price/Price';
import HoverIndicator from './HoverIndicator';
import PreviewController from './PreviewController';

interface Props {
  product: IProduct;
  className?: string;
  sizes: string;
}

function ProductCard(props: Props): JSX.Element {
  const router = useRouter();
  const { product, className = 'h-96', sizes } = props;
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState<boolean | null>(null);

  const currentImgSrc = product.previewImages
    ? product.previewImages[currentImgIndex]
    : null;

  const imagesCount = product.previewImages?.length || 0;
  const width = `w-1/${imagesCount}`;

  const handleMouseMove = () => {
    if (isSwiping === false) setIsSwiping(true);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isSwiping && e.button === 0) {
      if (product._id && product.slug)
        router.push(routesConfig.productDetail(product._id, product.slug));
    }
    setIsSwiping(null);
  };

  return (
    <div className="pb-4">
      <div
        onMouseDown={() => setIsSwiping(false)}
        onMouseMove={() => handleMouseMove()}
        onMouseUp={handleMouseUp}
        className={`bg-base-300 relative cursor-pointer ${className}`}
      >
        {currentImgSrc && (
          <FilePreview src={currentImgSrc} fill sizes={sizes} />
        )}
        <PreviewController
          setCurrentImgIndex={setCurrentImgIndex}
          imagesCount={imagesCount}
          isSwiping={isSwiping}
        />
      </div>
      <HoverIndicator
        imagesCount={imagesCount}
        currentImgIndex={currentImgIndex}
        width={width}
      />
      <div className="flex items-center gap-x-2 py-3">
        <AiFillStar className="text-accent3" />
        {!product.numberOfRatings
          ? '0 review'
          : `${product.numberOfRatings} reviews`}
      </div>
      <Link href={routesConfig.productDetail(product._id!, product.slug)}>
        <span className="text-sm font-medium cursor-pointer line-clamp-2">
          {product.name}
        </span>
      </Link>
      <div className="mt-4">
        <Price price={product.price} discountPrice={product.discountPrice} />
      </div>
    </div>
  );
}

export default ProductCard;
