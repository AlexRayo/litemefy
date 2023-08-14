import React from 'react';

import { AppContext } from '@/context/AppContext';

export default function Status() {
  const {
    originalImage,
    compressedImage,
    conversionImage,
    compressionPercentage,
  } = React.useContext(AppContext);

  let _originalWeight = '';
  if (originalImage) {
    _originalWeight = (originalImage.size / 1024 / 1024).toFixed(2)
    if (Number(_originalWeight) >= 1) {
      _originalWeight += ' MB'
    }
    else {
      _originalWeight = (originalImage.size / 1024).toFixed(0) + ' KB'
    }
  }

  return (
    <div className="mt-2 flex justify-between">

      {originalImage && (
        <p>Original: {_originalWeight}</p>
      )
      }

      {conversionImage && (
        <div className=''>
          <p>WebP: {(Number(conversionImage.size / 1024).toFixed(0))} KB</p>
        </div>
      )}

      {compressedImage && (
        <p>Compressed: {(compressedImage.size / 1024).toFixed(0)} KB ({Math.round(compressionPercentage)}%)</p>
      )}

    </div>
  );
};
