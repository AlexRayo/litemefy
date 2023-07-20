import React from 'react';
import { AppContext } from '../context/AppContext';
import Process from '@/functions/process';

export default function imageUpload() {
  const {
    originalImage,
    compressedImage,
    conversionImage,
    croppedImage,
    cropperRef,
    setOriginalImage,
    setCompressedImage,
    setConversionImage,
    setCompressionPercentage,
    setCroppedImage,
  } = React.useContext(AppContext);

  const {
    compressImage,
    convertToWebP,
    convertDataUrlToFile,
    calculateReductionPercentage
  } = Process();

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


  //user can compress image when is loaded or converted to webp
  //originalImage || conversionImage, can contain a file type
  const handleCompress = async () => {
    if (originalImage || conversionImage) {
      try {
        const imageToCompress = conversionImage || originalImage;

        if (imageToCompress) {
          let croppedFile = imageToCompress;

          if (croppedImage) {
            croppedFile = await convertDataUrlToFile(croppedImage, imageToCompress.type, originalImage);
          }

          //get compressed image
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

  //
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

  //
  const handleCropButtonClick = () => {
    if (originalImage && cropperRef.current) {
      cropperRef.current.replace(URL.createObjectURL(originalImage));
      setCroppedImage(null);
      setCompressedImage(null);
      setConversionImage(null);
      setCompressionPercentage(0);
    }
  };

  //
  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas();
      setCroppedImage(croppedCanvas.toDataURL());
    }
  };

  //
  const handleDownload = () => {
    if (compressedImage) {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(compressedImage);
      downloadLink.download = `compressed_${compressedImage.name}`;
      downloadLink.click();
    }
  };

  return {
    handleFileChange,
    handleCompress,
    handleConvertToWebP,
    handleCropButtonClick,
    handleCrop,
    handleDownload
  }
}
