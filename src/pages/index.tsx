import React, { useState, useRef } from 'react';
import Compressor from 'compressorjs';
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
    handleCropButtonClick,
    handleDownload,
  } = HandleFile();

  return (
    <div className="mt-20">
      <input type="file" onChange={handleFileChange} ref={inputRef} />
      {originalImage && (
        <div>
          <p>Nombre original de la imagen: {originalImage.name}</p>
          <p>Peso actual de la imagen: {(originalImage.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}
      {originalImage && !conversionImage && !compressedImage && !croppedImage && (
        <div>
          <button onClick={() => setCropImage(true)}>Recortar imagen</button>
          <button onClick={handleConvertToWebP}>Convertir a WebP</button>
          <button onClick={handleCompress}>Comprimir imagen</button>
        </div>
      )}
      {croppedImage && (
        < div className='w-96 h-96'>
          <img src={croppedImage} alt="Cropped" style={{ maxWidth: '100%' }} />

          <div className='flex justify-between'>
            <button onClick={handleCropButtonClick}>Crop</button>
            <button onClick={handleConvertToWebP}>Convert To WebP</button>
            <button onClick={handleCompress}>Compress</button>
          </div>
        </div>
      )}
      {conversionImage && (
        <div>
          <p>Imagen convertida a WebP</p>
          <p>Peso actual de la imagen: {(conversionImage.size / 1024 / 1024).toFixed(2)} MB</p>
          <button onClick={handleCompress}>Comprimir imagen convertida</button>
        </div>
      )}
      {compressedImage && (
        <div>
          <p>Peso comprimido de la imagen: {(compressedImage.size / 1024 / 1024).toFixed(2)} MB</p>
          <p>Porcentaje de reducción de peso: {Math.round(compressionPercentage)}%</p>
          <button onClick={handleDownload}>Descargar imagen comprimida</button>
        </div>
      )}
      {originalImage && !croppedImage && cropImage && (
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
            src={URL.createObjectURL(originalImage)}
            alt="Original"
            style={{ maxWidth: '100%' }}
          />
          <button onClick={handleCrop}>Guardar recorte</button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
