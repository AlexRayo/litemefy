import React, { useState } from 'react';
import Cropper from 'cropperjs';

import 'cropperjs/dist/cropper.css';

import { AppContext } from '@/context/AppContext';
import HandleFile from '../controllers/handleFile';

import { scaleImage } from '@/utils/scaleImage';

const ImageUpload: React.FC = () => {
  const {
    originalImage,
    compressedImage,
    conversionImage,
    compressionPercentage,
    cropImage,
    editedImage,
    inputRef,
    cropperRef,
    setEditedImage,
    setCropImage,
    setPngTransparency
  } = React.useContext(AppContext);

  const {
    handleFileChange,
    handleCompress,
    handleConvertToWebP,
    saveCrop,
    startCrop,
    handleDownload,
  } = HandleFile();

  // Estado local para almacenar el valor de escala de la imagen
  const [scalingMode, setScalingMode] = useState(false);
  const [scaleValue, setScaleValue] = useState(1);

  const handleImageScale = async (scale: number) => {
    if (originalImage) {
      setScaleValue(scale)
      try {
        const scaledData = await scaleImage(originalImage, scale);
        // Obtenemos la URL de datos de la imagen escalada
        const scaledDataURL = scaledData.scaledDataURL;

        // Aquí puedes hacer lo que necesites con la URL de datos de la imagen escalada
        console.log('URL de datos de la imagen escalada:', scaledDataURL);
        setEditedImage(scaledDataURL)
      } catch (error) {
        console.error('Error al escalar la imagen:', error);
      }
    }
  };

  return (
    <div className="mt-20">
      <input type="file" onChange={handleFileChange} ref={inputRef} />
      {originalImage && (
        <div>
          <p>Nombre original de la imagen: {originalImage.name}</p>
          <p>Peso actual de la imagen: {(originalImage.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}
      {originalImage && !conversionImage && !compressedImage && !editedImage && (
        <div>
          <button onClick={() => setCropImage(true)}>Recortar imagen</button>
          <button onClick={handleConvertToWebP}>Convertir a WebP</button>
          <button onClick={handleCompress}>Comprimir imagen</button>
        </div>
      )}
      {editedImage && (
        < div className='max-h-3.5'>
          <img src={editedImage} alt="Cropped" style={{ maxWidth: '100%' }} />

          <div className='flex justify-between'>
            <button onClick={startCrop}>Crop</button>
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
      {originalImage && !editedImage && cropImage && (
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
          <button onClick={saveCrop}>Guardar recorte</button>
        </div>
      )}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={scalingMode}
          onChange={() => setScalingMode((prevMode) => !prevMode)}
        />
        <label>Modo de edición de escala, value: {scaleValue}</label>
      </div>
      {scalingMode && (
        <div>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.025"
            value={scaleValue}
            onChange={(e) => { handleImageScale(Number(e.target.value)) }}
          />
          <button onClick={() => handleImageScale(scaleValue)}>
            Aplicar escala
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
