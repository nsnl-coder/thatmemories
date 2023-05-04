import RowContainer from '@components/container/RowContainer';
import { ICarouselItem } from '@src/yup/homeSchema';
import { GrNext, GrPrevious } from 'react-icons/gr';
import Slider from 'react-slick';
import HeroSectionSlide from './HeroSectionSlide';

interface Props {
  carouselItems: ICarouselItem[] | undefined;
}

function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}  !left-4 z-20 before:hidden`}
      style={style}
      onClick={onClick}
    >
      <GrPrevious size={22} className="opacity-0 group-hover:opacity-100" />
    </div>
  );
}

function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}  !right-8 z-20 before:hidden`}
      style={style}
      onClick={onClick}
    >
      <GrNext size={22} className="opacity-0 group-hover:opacity-100" />
    </div>
  );
}

function HeroSection(props: Props): JSX.Element {
  const { carouselItems } = props;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <RowContainer className="px-0 mt-4 group pb-6">
      <Slider {...settings}>
        {carouselItems?.map((carousel, index) => (
          <HeroSectionSlide
            key={carousel._id}
            carousel={carousel}
            index={index}
          />
        ))}
      </Slider>
    </RowContainer>
  );
}

export default HeroSection;
