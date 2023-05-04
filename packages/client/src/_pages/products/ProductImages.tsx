import FilePreview from '@src/components/filePreview/FilePreview';
import { useAppSelector } from '@src/hooks/redux';
import useReactSlick from '@src/hooks/useReactSlick';
import { IVariant } from '@src/yup/productSchema';
import { useEffect } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import Slider from 'react-slick';

interface Props {
  images: string[] | undefined;
  variants: IVariant[] | undefined;
}

function ProductImages(props: Props): JSX.Element | null {
  const { images } = props;
  const { carouselImages, currentImgIndex } = useAppSelector(
    (state) => state.productCarousel,
  );

  const {
    sliderRef,
    nextSlide,
    prevSlide,
    goToSlide,
    setCurrentSlideIndex,
    currentSlideIndex,
  } = useReactSlick();

  useEffect(() => {
    if (currentImgIndex !== currentSlideIndex) {
      goToSlide(currentImgIndex);
    }
  }, [currentImgIndex, goToSlide, currentSlideIndex]);

  if (!images) return null;

  return (
    <div>
      <div className="group relative">
        <Slider
          infinite
          slidesToScroll={1}
          slidesToShow={1}
          speed={500}
          ref={sliderRef}
          afterChange={setCurrentSlideIndex}
        >
          {carouselImages.map((img) => (
            <div key={img} className="relative aspect-square bg-black">
              <FilePreview
                src={img}
                fill={true}
                sizes="(max-width: 768px) 100vw,
              (max-width: 1024px) 50vw,
              440px"
              />
            </div>
          ))}
        </Slider>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-2 opacity-30 group-hover:opacity-100"
        >
          <GrPrevious size={36} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-2 opacity-30 group-hover:opacity-100"
        >
          <GrNext size={36} />
        </button>
      </div>
      <div className="grid grid-cols-6 gap-x-1 md:gap-x-3">
        {images.map((img, index) => (
          <div
            onClick={() => goToSlide(index)}
            key={img}
            className={`aspect-square relative cursor-pointer ${
              currentSlideIndex === index ? 'border outline outline-1' : ''
            }`}
          >
            <FilePreview
              videoPlaceholder={images[1]}
              src={img}
              width={100}
              height={100}
              fill={false}
              previewOnly
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImages;
