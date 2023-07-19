import React, { useState, useRef } from 'react';
import Compressor from 'compressorjs';
import Cropper from 'cropperjs';

import 'cropperjs/dist/cropper.css';

const ImageUpload: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<File | null>(null);
  const [conversionImage, setConversionImage] = useState<File | null>(null);
  const [compressionPercentage, setCompressionPercentage] = useState<number>(0);

  const [cropImage, setCropImage] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cropperRef = useRef<Cropper | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file instanceof File) {
      setOriginalImage(file);
      setCompressedImage(null);
      setConversionImage(null);
      setCompressionPercentage(0);
      setCroppedImage(null);
    }
  };

  const handleConvertToWebP = async () => {
    if (originalImage) {
      try {
        const convertedFile = await convertToWebP(originalImage);
        setConversionImage(convertedFile);
      } catch (error) {
        console.error('Error al convertir la imagen a WebP:', error);
      }
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas();
      setCroppedImage(croppedCanvas.toDataURL());
    }
  };

  const handleCompress = async () => {
    if (originalImage || conversionImage) {
      try {
        const imageToCompress = conversionImage || originalImage;

        if (imageToCompress) {
          let croppedFile = imageToCompress;

          if (croppedImage) {
            croppedFile = await convertDataUrlToFile(croppedImage, imageToCompress.type);
          }

          const compressedFile = await compressImage(croppedFile);
          setCompressedImage(compressedFile);

          const reductionPercentage = calculateReductionPercentage(
            croppedFile.size,
            compressedFile.size
          );
          setCompressionPercentage(reductionPercentage);
        }
      } catch (error) {
        console.error('Error al comprimir la imagen:', error);
      }
    }
  };

  const convertDataUrlToFile = (dataUrl: string, fileType: string) => {
    return fetch(dataUrl)
      .then((res) => res.blob())
      .then((blob) => new File([blob], `cropped_${originalImage?.name}`, { type: fileType }));
  };

  const compressImage = (file: File) => {
    return new Promise<File>((resolve, reject) => {
      new Compressor(file, {
        quality: 0.45,
        success: (result: File) => {
          resolve(result);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  };

  const convertToWebP = (file: File) => {
    return new Promise<File>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();

        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, img.width, img.height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const convertedFile = new File([blob], `converted_${file.name}`, {
                  type: 'image/webp',
                  lastModified: Date.now(),
                });
                resolve(convertedFile);
              } else {
                reject(new Error('Error al generar el blob convertido.'));
              }
            },
            'image/webp',
            1
          );
        };

        img.src = reader.result as string;
      };

      reader.readAsDataURL(file);
    });
  };

  const calculateReductionPercentage = (originalSize: number, compressedSize: number) => {
    return ((originalSize - compressedSize) / originalSize) * 100;
  };

  const handleDownload = () => {
    if (compressedImage) {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(compressedImage);
      downloadLink.download = `compressed_${compressedImage.name}`;
      downloadLink.click();
    }
  };

  const handleCropButtonClick = () => {
    if (originalImage && cropperRef.current) {
      cropperRef.current.replace(URL.createObjectURL(originalImage));
      setCroppedImage(null);
      setCompressedImage(null);
      setConversionImage(null);
      setCompressionPercentage(0);
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
