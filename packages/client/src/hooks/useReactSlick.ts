import { useRef, useState } from 'react';
import Slider from 'react-slick';

const useReactSlick = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const goToSlide = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return {
    sliderRef,
    prevSlide,
    nextSlide,
    goToSlide,
    setCurrentSlideIndex,
    currentSlideIndex,
  };
};

export default useReactSlick;
