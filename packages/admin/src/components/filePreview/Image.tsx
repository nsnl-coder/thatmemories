import Image from 'next/image';

interface Props {
  src: string;
  className: string;
}

function GalleryImage(props: Props): JSX.Element {
  const { src, className } = props;

  let imageLink = src.startsWith('https')
    ? src
    : `${process.env.NEXT_PUBLIC_S3_BUCKET}/${src}`;

  return <Image alt="gallery" src={imageLink} className={className} />;
}

export default GalleryImage;
