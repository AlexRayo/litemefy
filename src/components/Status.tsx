import React from 'react';

import { AppContext } from '@/context/AppContext';

export default function Status() {
  const {
    originalImage,
    compressedImage,
    conversionImage,
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
        <div className="flex">
          <p className=''>Original: </p>
          <p className="ml-1 font-bold text-teal-400">{_originalWeight}</p>
        </div>
      )
      }

      {compressedImage && (
        <div className="flex">
          <p>New: </p>
          <p className="ml-1 font-bold text-teal-400">{(compressedImage.size / 1024).toFixed(0)} KB</p>
        </div>
      )}

    </div>
  );
};
