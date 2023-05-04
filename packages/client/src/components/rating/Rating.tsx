import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

interface Props {
  rating: number;
  ratingsCount: number;
  size?: number;
}

const Rating = (props: Props): JSX.Element => {
  const { rating = 0, size = 14, ratingsCount } = props;

  const stars = [1, 2, 3, 4, 5].map((num) => {
    let currentStar = <BsStarHalf size={size} />;

    if (rating < num - 0.55) {
      currentStar = <BsStar size={size} />;
    }

    if (rating >= num) {
      currentStar = <BsStarFill size={size} />;
    }

    return (
      <div className="relative text-3xl cursor-pointer" key={num}>
        {currentStar}
        <span className="absolute w-1/2 left-0 top-0 h-full"></span>
        <span className="absolute w-1/2 right-0 top-0 h-full"></span>
      </div>
    );
  });

  return (
    <div className="flex items-center gap-x-4">
      <span className="text-accent3 flex gap-x-0.5">{stars}</span>
      <span className="text-sm text-text/70">
        {rating.toFixed(1)} ({ratingsCount} ratings)
      </span>
    </div>
  );
};

export default Rating;
