interface Props {
  discountPrice: number | undefined;
  price: number | undefined;
  className?: string;
  showFinalPriceOnly?: boolean;
  highestOptionPrice?: number | undefined;
}

function Price(props: Props): JSX.Element {
  const {
    discountPrice = 0,
    price,
    className = 'text-lg',
    showFinalPriceOnly,
    highestOptionPrice,
  } = props;

  if (price === undefined)
    return <div className="text-error text-sm">Can not fetch price</div>;

  if (highestOptionPrice)
    return <div className={className}>${highestOptionPrice}</div>;

  return (
    <div className={`flex gap-x-3 ${className}`}>
      <span
        className={` ${
          discountPrice
            ? 'line-through text-text/40 font-normal scale-75 mt-0.5'
            : 'font-medium'
        } ${discountPrice && showFinalPriceOnly ? 'hidden' : ''}`}
      >
        ${price}
      </span>
      {discountPrice ? (
        <span className={`font-medium`}>${discountPrice}</span>
      ) : null}
    </div>
  );
}

export default Price;
