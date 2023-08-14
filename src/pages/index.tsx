import React, { useState, useRef } from 'react';
import Cropper from 'cropperjs';

import 'cropperjs/dist/cropper.css';

import { AppContext } from '@/context/AppContext';
import HandleFile from '../controllers/handleFile';

const ImageUpload: React.FC = () => {
  const {
    originalImage,
    compressedImage,
    conversionImage,
    compressionPercentage,
    cropImage,
    loadedImage,
    inputRef,
    cropperRef,
    setCropImage,
  } = React.useContext(AppContext);

  const {
    handleFileChange,
    handleCompress,
    handleConvertToWebP,
    handleCrop,
    //handleCropButtonClick,
    handleDownload,
  } = HandleFile();

  return (
    <div className="mt-20">
      <input type="file" onChange={handleFileChange} ref={inputRef} />
      {originalImage && (
        <div>
          <p>Nombre: {originalImage.name}</p>
          <p>Peso original: {(originalImage.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}
      {conversionImage && (
        <div className=''>
          <p>Peso actual: {(Number(conversionImage.size / 1024).toFixed(2))} KB</p>
        </div>
      )}
      {compressedImage && (
        <div className='mt-10'>
          <p>Peso comprimido de la imagen: {(compressedImage.size / 1024).toFixed(2)} KB</p>
          <p>Porcentaje de reducción de peso: {Math.round(compressionPercentage)}%</p>

        </div>
      )}
      {loadedImage && (
        < div className={`mt-10 w-96`}>
          <div className='flex justify-between'>
            {
              !cropImage && (
                <button onClick={() => setCropImage(true)}>Crop</button>
              )
            }
            {
              cropImage && (<button className='mt-1' onClick={handleCrop}>Guardar recorte</button>)
            }
            <button onClick={handleConvertToWebP}>Convert To WebP</button>
            <button onClick={handleCompress}>Compress</button>
            <button onClick={handleDownload}>Descargar</button>
          </div>
          {
            //SHOW THE IMAGE ONCE IS EDITED OR WHEN FIRST LOAD
            loadedImage && !cropImage ?
              <img className={`${cropImage ? 'hidden' : 'block'}`} src={loadedImage} alt="Cropped" />
              :
              null
          }
        </div>
      )}
      {
        //CROP EDIT MODE
        cropImage && (
          <div className='w-96 h-96'>
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
              style={{ maxWidth: '100%' }}
            />
          </div>
        )}
    </div>
  );
};

export default ImageUpload;
