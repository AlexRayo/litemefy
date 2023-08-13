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
    croppedImage,
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
          <p>Peso comprimido de la imagen: {(compressedImage.size / 1024 / 1024).toFixed(2)} MB</p>
          <p>Porcentaje de reducción de peso: {Math.round(compressionPercentage)}%</p>

        </div>
      )}
      {originalImage && (
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
            croppedImage && !cropImage ?
              <img className={`${cropImage ? 'hidden' : 'block'}`} src={croppedImage} alt="Cropped" />
              :
              <img className={`${cropImage ? 'hidden' : 'block'}`} src={URL.createObjectURL(originalImage)} alt="Original image" />
          }
        </div>
      )}
      {
        //ENTER TO EDIT MODE
        cropImage && originalImage && (
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
              src={croppedImage ? croppedImage : URL.createObjectURL(originalImage)}
              alt="Original"
              style={{ maxWidth: '100%' }}
            />
          </div>
        )}
    </div>
  );
};

export default ImageUpload;
