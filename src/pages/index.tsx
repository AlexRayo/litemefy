import React, { useState } from 'react';
import Cropper from 'cropperjs';

import 'cropperjs/dist/cropper.css';

import { AppContext } from '@/context/AppContext';
import HandleFile from '../controllers/handleFile';

import { scaleImage } from '@/utils/scaleImage';

const ImageUpload: React.FC = () => {
  const {
    originalFile,
    compressedFile,
    convertedFile,
    compressionPercentage,
    cropImage,
    editedImageUrlData,
    inputRef,
    cropperRef,
    seteditedImageUrlData,
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
    if (originalFile) {
      setScaleValue(scale)
      try {
        const scaledData = await scaleImage(originalFile, scale);
        // Obtenemos la URL de datos de la imagen escalada
        const scaledDataURL = scaledData.scaledDataURL;

        // Aquí puedes hacer lo que necesites con la URL de datos de la imagen escalada
        console.log('URL de datos de la imagen escalada:', scaledDataURL);
        seteditedImageUrlData(scaledDataURL)
      } catch (error) {
        console.error('Error al escalar la imagen:', error);
      }
    }
  };

  return (
    <div className="mt-20">
      <input type="file" onChange={handleFileChange} ref={inputRef} />
      {originalFile && (
        <div>
          <p>Nombre original de la imagen: {originalFile.name}</p>
          <p>Peso actual de la imagen: {(originalFile.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}
      {originalFile && !convertedFile && !compressedFile && !editedImageUrlData && (
        <div>
          <button onClick={() => setCropImage(true)}>Recortar imagen</button>
          <button onClick={handleConvertToWebP}>To WebP</button>
          <button onClick={handleCompress}>Comprimir imagen</button>
        </div>
      )}
      {editedImageUrlData && (
        < div className='max-h-3.5'>
          <img src={editedImageUrlData} alt="Cropped" style={{ maxWidth: '100%' }} />

          <div className='flex justify-between'>
            <button onClick={startCrop}>Crop</button>
            <button onClick={handleConvertToWebP}>Convert To WebP</button>
            <button onClick={handleCompress}>Compress</button>
          </div>
        </div>
      )}
      {convertedFile && (
        <div>
          <p>Imagen convertida a WebP</p>
          <p>Peso actual de la imagen: {(convertedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          <button onClick={handleCompress}>Comprimir imagen convertida</button>
        </div>
      )}
      {compressedFile && (
        <div>
          <p>Peso comprimido de la imagen: {Math.round(compressedFile.size / 1024)} KB</p>
          <p>Porcentaje de reducción de peso: {Math.round(compressionPercentage)}%</p>
          <button onClick={handleDownload}>Descargar imagen comprimida</button>
        </div>
      )}
      {originalFile && cropImage && (
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
            src={URL.createObjectURL(originalFile)}
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
        <label>Scale: {scaleValue}</label>
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
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
