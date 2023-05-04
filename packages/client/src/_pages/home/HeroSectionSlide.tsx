import FilePreview from '@src/components/filePreview/FilePreview';
import { ICarouselItem } from '@src/yup/homeSchema';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';

interface Props {
  carousel: ICarouselItem;
  index: number;
}

function HeroSectionSlide(props: Props): JSX.Element {
  const { carousel, index } = props;

  return (
    <div className="w-full relative aspect-square md:aspect-[16/8] ">
      {carousel.photo && (
        <FilePreview
          src={carousel.photo}
          fill
          sizes="100vw"
          priority={index === 0}
        />
      )}
      <div className="absolute max-w-6xl h-full flex items-center">
        <div className="px-6 md:ml-20 w-full">
          <h2 className="text-3xl md:text-7xl font-medium md:font-light max-w-xl">
            {carousel.title}
          </h2>
          <p className="text-md text-text/90 mt-6">{carousel.description}</p>
          <Link
            href={carousel.link}
            className="gap-x-1 flex items-center mt-10 text-lg font-medium underline hover:text-blue-500"
          >
            <span>Shop collection</span>
            <BsArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSectionSlide;
