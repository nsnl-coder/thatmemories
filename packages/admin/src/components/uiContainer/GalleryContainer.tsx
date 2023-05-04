import React from 'react';
import Gallery from '../gallery/Gallery';

//
import useSelectFromGallery from '@src/hooks/useSelectFromGallery';

function GalleryContainer(): JSX.Element | null {
  const { isOpen, reject } = useSelectFromGallery();

  return (
    <div
      className={`modal cursor-pointer ${isOpen ? 'modal-open' : ''}`}
      onClick={reject}
    >
      <div
        className="modal-box cursor-default max-w-6xl relative w-screen flex flex-col h-screen rounded-md p-0"
        onClick={(e) => e.stopPropagation()}
      >
        <Gallery />
      </div>
    </div>
  );
}

export default GalleryContainer;
