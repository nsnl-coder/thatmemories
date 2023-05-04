import RowContainer from '@components/container/RowContainer';
import ProductCard from '@components/productCard/ProductCard';
import useReactSlick from '@src/hooks/useReactSlick';
import { ObjectId } from '@src/types/objectId';
import { IProduct } from '@thatmemories/yup';
import { GrNext, GrPrevious } from 'react-icons/gr';
import Slider from 'react-slick';

interface Props {
  featuredProducts: IProduct[] | ObjectId[];
}

function FeaturedProducts(props: Props): JSX.Element | null {
  const { featuredProducts } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    swipeToSlide: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const { sliderRef, nextSlide, prevSlide } = useReactSlick();

  if (!featuredProducts || featuredProducts.length === 0) return null;

  return (
    <RowContainer className="pt-10 md:pt-20 border-b">
      <div className="flex flex-col mb-16 justify-between gap-x-12">
        <h2 className="text-h1 font-semibold whitespace-nowrap">
          Featured products
        </h2>
        <p className="text-text/50 max-w-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </p>
      </div>

      <div className="relative group max-w-full overflow--verflow-visible pb-24">
        <Slider ref={sliderRef} {...settings} className="-mx-3">
          {featuredProducts?.map((product) =>
            '_id' in product ? (
              <div className="px-3" key={product._id}>
                <ProductCard
                  product={product}
                  className="h-60 md:h-80 lg:h-[450px]"
                  sizes="(max-width:768px) 50vw,(max-width:1024px) 33.33vw, 320px"
                />
              </div>
            ) : null,
          )}
        </Slider>
        <button
          onClick={prevSlide}
          className="absolute top-1/3 -left-12 opacity-30 group-hover:opacity-100"
        >
          <GrPrevious size={36} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/3 -right-12 opacity-30 group-hover:opacity-100"
        >
          <GrNext size={36} />
        </button>
      </div>
    </RowContainer>
  );
}

export default FeaturedProducts;
