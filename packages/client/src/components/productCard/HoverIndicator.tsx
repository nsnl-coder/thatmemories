interface Props {
  imagesCount: number;
  currentImgIndex: number;
  width: string;
}

function HoverIndicator(props: Props): JSX.Element | null {
  const { imagesCount, currentImgIndex, width } = props;

  if (imagesCount === 0) return null;

  return (
    <div className="flex gap-x-1 mt-1">
      {new Array(imagesCount).fill(0).map((img, index) => (
        <div
          className={`h-0.5 ${width} ${
            index === currentImgIndex ? 'bg-neutral' : 'bg-neutral/20'
          }`}
          key={index}
        ></div>
      ))}
    </div>
  );
}

export default HoverIndicator;
