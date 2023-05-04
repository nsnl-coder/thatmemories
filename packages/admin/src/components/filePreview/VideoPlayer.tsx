import { useEffect, useRef } from 'react';
import videojs from 'video.js';

import 'video.js/dist/video-js.css';
// City
import '@videojs/themes/dist/city/index.css';

export interface VideoProps {
  autoplay?: boolean;
  controls?: boolean;
  src: string;
  type?: string;
  className?: string;
  aspectRatio?: '16:9' | '1:1' | '9:16' | 'auto';
  theme?: 'city' | 'fantasy' | 'forest' | 'sea';
}

function VideoPlayer(props: VideoProps): JSX.Element {
  const playerRef = useRef<any>(null);
  const videoRef = useRef<any>(null);

  const {
    className,
    autoplay = false,
    controls = true,
    src,
    type = 'video/mp4',
    theme = 'city',
  } = props;

  useEffect(() => {
    const player = playerRef.current;

    if (!player) {
      const videoElement = videoRef.current;

      if (!videoElement) return;

      playerRef.current = videojs(videoElement, {
        autoplay,
        controls,
        sources: [{ src, type }],
        aspectRatio: '16:9',
      });
    }

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [src, type, videoRef, playerRef, controls, autoplay]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className={`video-js vjs-big-play-centered vjs-theme-${theme} ${className} aspect-video max-w-full`}
      />
    </div>
  );
}

export default VideoPlayer;
