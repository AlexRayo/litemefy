import React from 'react';
import { AppContext } from '@/context/AppContext';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

export default function CropImage() {
  const {
    cropImage,
    cropperRef,
    loadedImage
  } = React.useContext(AppContext);

  return (
    cropImage && loadedImage && (
      <div className='w-full'>
        <img
          ref={(node) => {
            if (node) {
              cropperRef.current = new Cropper(node, {
                aspectRatio: 0,
                viewMode: 0,
                zoomable: false, // Desactivar opción de hacer zoom
              });

            }
          }}
          src={loadedImage}
          alt="Original"
          style={{ width: '100%' }}
        />
      </div>
    )
  )
}
