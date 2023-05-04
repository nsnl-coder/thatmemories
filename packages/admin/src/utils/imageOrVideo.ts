import path from 'path';

const imageExtensions = ['jpeg', 'png', 'webp', 'gif', 'bmp'];
const videoExtensions = ['mp4', 'quicktime', 'x-ms-mv', 'x-msvideo', 'mpeg'];

const imageOrVideo = (key: string) => {
  if (!key) return;

  const extension = path.extname(key);

  if (videoExtensions.includes(extension.slice(1))) return 'video';
  if (imageExtensions.includes(extension.slice(1))) return 'image';
};

export default imageOrVideo;
export { videoExtensions, imageExtensions };
