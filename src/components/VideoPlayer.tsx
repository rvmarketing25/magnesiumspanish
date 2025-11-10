import React, { useRef, useEffect } from 'react';

const SHOW_YT_CONTROLS = true;

interface VideoPlayerProps {
  youtubeId: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ youtubeId }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const src = `https://www.youtube.com/embed/${youtubeId}?modestbranding=1&rel=0&playsinline=1&fs=1&controls=${SHOW_YT_CONTROLS ? 1 : 0}`;

  function toggleFullscreen() {
    const el = wrapperRef.current;
    if (!document.fullscreenElement) {
      el?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div ref={wrapperRef} className="video-wrap">
      <iframe
        className="video-iframe"
        src={src}
        title="YouTube video player"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowFullScreen
        playsInline
      />
      {!SHOW_YT_CONTROLS && (
        <button
          className="fs-btn"
          onClick={toggleFullscreen}
          aria-label="Tela cheia / Pantalla completa"
          title="Tela cheia (F)"
        >
          ⤢
        </button>
      )}
    </div>
  );
};
