import Image from 'next/image';
import { MdOutlineImageNotSupported } from 'react-icons/md';
import VideoPlayer, { VideoProps } from './VideoPlayer';

import getS3FileUrl from '@src/utils/getFileUrl';
import imageOrVideo from '@src/utils/imageOrVideo';

interface Props extends VideoProps {
  src: string;
  className?: string;
  fallback?: 'icon' | 'text';
}

function FilePreview(props: Props): JSX.Element {
  let { src, className = 'h-full w-full object-cover', fallback } = props;

  let fileType: 'video' | 'image' | undefined;

  fileType = imageOrVideo(src);

  if (!src.startsWith('http')) {
    src = getS3FileUrl(src);
  }

  if (fileType === 'video') {
    return <VideoPlayer src={src} className="" />;
  }

  if (fileType === 'image') {
    return (
      <Image
        alt="preview"
        width={400}
        height={400}
        src={src}
        className={className}
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
