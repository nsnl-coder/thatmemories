import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { MdOutlineImageNotSupported } from 'react-icons/md';
import VideoPlayer, { VideoProps } from './VideoPlayer';

import getS3FileUrl from '@src/utils/getS3FileUrl';
import imageOrVideo from '@src/utils/imageOrVideo';

interface Props extends VideoProps {
  src: string;
  className?: string;
  fallback?: 'icon' | 'text';
  fill: boolean;
  width?: number;
  height?: number;
  previewOnly?: boolean;
  videoPlaceholder?: string;
  sizes?: string;
  priority?: boolean;
}

function FilePreview(props: Props): JSX.Element {
  let {
    src,
    className = 'h-full w-full object-cover',
    fallback,
    fill = true,
    width,
    height,
    previewOnly,
    videoPlaceholder,
    sizes,
    priority,
  } = props;

  let fileType: 'video' | 'image' | undefined;

  fileType = imageOrVideo(src);

  if (!src.startsWith('http')) {
    src = getS3FileUrl(src);
  }

  if (fileType === 'video') {
    if (!previewOnly)
      return (
        <div className="w-full h-full flex items-center justify-center">
          <VideoPlayer src={src} className={'w-full'} aspectRatio="1:1" />
        </div>
      );

    if (previewOnly)
      return (
        <div className="text-neutral-content flex items-center justify-center w-full h-full bg-neutral">
          {videoPlaceholder && (
            <Image
              alt="preview"
              fill={fill}
              src={getS3FileUrl(videoPlaceholder)}
              className={className}
              sizes={sizes}
              priority={priority}
              width={width}
              height={height}
            />
          )}
          <div className="absolute shadow-2xl w-full h-full flex items-center justify-center bg-neutral/30">
            <FaPlay size={24} />
          </div>
        </div>
      );
  }

  if (fileType === 'image') {
    return (
      <Image
        alt="preview"
        fill={fill}
        src={src}
        className={className}
        priority={priority}
        sizes={sizes}
        width={width}
        height={height}
      />
    );
  }

  if (fallback === 'text') {
    return (
      <div className="flex text-xl items-center justify-center text-center">
        Cannot identify file type, try again later!
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <MdOutlineImageNotSupported className="w-full h-full" />
    </div>
  );
}

export default FilePreview;
