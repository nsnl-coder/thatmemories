import { useState } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

interface Props {
  className?: string;
}

const SelectRating = (props: Props): JSX.Element => {
  const { className } = props;
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);

  const selectedRating = hoveredRating || rating;

  const stars = [1, 2, 3, 4, 5].map((num) => {
    let currentStar = <BsStarHalf />;

    if (selectedRating < num - 0.55) {
      currentStar = <BsStar />;
    }

    if (selectedRating >= num) {
      currentStar = <BsStarFill />;
    }

    return (
      <div
        onMouseLeave={() => setHoveredRating(0)}
        className="relative text-3xl cursor-pointer"
        key={num}
      >
        {currentStar}
        <span
          className="absolute w-1/2 left-0 top-0 h-full"
          onMouseOver={() => setHoveredRating(num - 0.5)}
          onClick={() => setRating(num - 0.5)}
        ></span>
        <span
          className="absolute w-1/2 right-0 top-0 h-full"
          onMouseOver={() => setHoveredRating(num)}
          onClick={() => setRating(num)}
        ></span>
      </div>
    );
  });

  return (
    <div className={`text-accent3 flex gap-x-0.5 p-1 ${className}`}>
      {stars}
    </div>
  );
};

export default SelectRating;
