import { Dispatch, SetStateAction } from 'react';

interface Props {
  imagesCount: number;
  setCurrentImgIndex: Dispatch<SetStateAction<number>>;
  isSwiping: boolean | null;
}

function PreviewController(props: Props): JSX.Element {
  const { imagesCount, setCurrentImgIndex, isSwiping } = props;
  let width = `w-1/${imagesCount}`;

  const handleHoverPreviewImg = (index: number) => {
    if (isSwiping === null)
      setTimeout(() => {
        setCurrentImgIndex(index);
      }, 150);
  };

  return (
    <div className="absolute w-full h-full z-10 flex">
      {new Array(imagesCount).fill(0).map((item, index) => (
        <div
          key={index}
          className={`${width} h-full`}
          onMouseEnter={() => handleHoverPreviewImg(index)}
        ></div>
      ))}
    </div>
  );
}

export default PreviewController;
