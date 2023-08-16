import React from 'react';
import { AppContext } from '../context/AppContext';
import Process from '@/functions/process';

export default function imageUpload() {
  const {
    originalImage,
    compressedImage,
    conversionImage,
    loadedImage,
    cropperRef,
    setOriginalImage,
    setCompressedImage,
    setConversionImage,
    setCompressionPercentage,
    setLoadedImage,
    setCropImage
  } = React.useContext(AppContext);

  const {
    compressImage,
    convertToWebP,
    convertDataUrlToFile,
    calculateReductionPercentage
  } = Process();

  const [cancelCrop, setCancelCrop] = React.useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file instanceof File) {
      setOriginalImage(file);
      setCompressedImage(null);
      setConversionImage(null);
      setCompressionPercentage(0);
      setLoadedImage(URL.createObjectURL(file));
    }
  };


  //user can compress image when is loaded or converted to webp
  //originalImage || conversionImage, can contain a file type
  const handleCompress = async () => {

    //if (originalImage || conversionImage) {
    try {

      let _compressImg = null;

      if (loadedImage && originalImage) {
        let _imageExtension = originalImage.type
        if (conversionImage) {
          _imageExtension = 'image/webp'
        }
        _compressImg = await convertDataUrlToFile(loadedImage, _imageExtension);

        console.log('_compressImg', _compressImg)
        console.log('_imageExtension', _imageExtension)
      }


      if (_compressImg) {
        //get compressed image
        const compressedFile = await compressImage(_compressImg);
        setCompressedImage(compressedFile);

        const reductionPercentage = calculateReductionPercentage(
          _compressImg.size,
          compressedFile.size
        );
        setCompressionPercentage(reductionPercentage);
      }

    } catch (error) {
      console.error('Error al comprimir la imagen:', error);
    }
    //}
  };

  const getImageExtension = (): string => {
    let _imageExtension = ''
    if (loadedImage && originalImage) {
      _imageExtension = originalImage.type;
      if (conversionImage) {
        _imageExtension = '.webp'
      }
    }
    return _imageExtension
  }

  //
  const handleConvertToWebP = async () => {
    if (loadedImage) {
      try {
        const ext = getImageExtension()
        const _convertToFile = await convertDataUrlToFile(loadedImage, ext)

        const convertedFile = await convertToWebP(_convertToFile);
        setConversionImage(convertedFile);
      } catch (error) {
        console.error('Error al convertir la imagen a WebP:', error);
      }
    }
  };

  //
  const handleCrop = () => {
    setCropImage(false)
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas();
      setLoadedImage(croppedCanvas.toDataURL());
    }
  };

  //
  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    const download = (image: File) => {
      downloadLink.href = URL.createObjectURL(image);
      downloadLink.download = `compressed_${image.name}`;
      downloadLink.click();
    }
    if (compressedImage) {
      download(compressedImage)
    }
    else if (conversionImage) {
      download(conversionImage)
    }
  };

  return {
    handleImageChange,
    handleCompress,
    handleConvertToWebP,
    //handleCropButtonClick,
    handleCrop,
    cancelCrop, setCancelCrop,
    handleDownload
  }
}
