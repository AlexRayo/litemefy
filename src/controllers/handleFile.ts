import React from 'react';
import { AppContext } from '../context/AppContext';
import Process from '@/functions/process';

export default function imageUpload() {
  const {
    originalImage,
    compressedImage,
    convertedImage,
    editedImage,
    cropperRef,
    setOriginalImage,
    setCompressedImage,
    setconvertedImage,
    setCompressionPercentage,
    setEditedImage,
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
      setconvertedImage(null);
      setCompressionPercentage(0);
      setEditedImage(null);
    }
  };


  //user can compress image when is loaded or converted to webp
  //originalImage || convertedImage, can contain a file type
  const handleCompress = async () => {
    console.log("convertedImage: ", convertedImage)
    let imageToCompress = originalImage;
    if (convertedImage) {
      imageToCompress = convertedImage;
    }

    try {

      if (imageToCompress) {
        let editedFile = imageToCompress;

        //if image have been edited then convert the URL base64 encode Data to File
        if (editedImage) {
          editedFile = await convertDataUrlToFile(editedImage, imageToCompress.type, originalImage);
        }

        //get compressed image
        const compressedFile = await compressImage(editedFile);
        setCompressedImage(compressedFile);

        const reductionPercentage = calculateReductionPercentage(
          editedFile.size,
          compressedFile.size
        );
        setCompressionPercentage(reductionPercentage);
      }
    } catch (error) {
      console.error('Error al comprimir la imagen:', error);
    }
  };

  //
  const handleConvertToWebP = async () => {
    if (originalImage) {
      try {

        const convertedFile = await convertToWebP(originalImage);
        const compressedFile = await compressImage(convertedFile);
        setconvertedImage(convertedFile);
        setCompressedImage(compressedFile);
        //
        const reductionPercentage = calculateReductionPercentage(
          originalImage.size,
          compressedFile.size
        );
        setCompressionPercentage(reductionPercentage);

        // convertToWebP(originalImage).then((convertedFile) => {

        //   setconvertedImage(convertedFile)
        //   setTimeout(() => {
        //     handleCompress();
        //   }, 1);
        // });

      } catch (error) {
        console.error('Error al convertir la imagen a WebP:', error);
      }
    }
  };

  React.useEffect(() => {
    //handleCompress();
    console.log(compressedImage)
    return () => {

    }
  }, [compressedImage])


  //
  const startCrop = () => {
    if (originalImage && cropperRef.current) {
      cropperRef.current.replace(URL.createObjectURL(originalImage));
      setEditedImage(null);
      setCompressedImage(null);
      setconvertedImage(null);
      setCompressionPercentage(0);
    }
  };

  //
  const saveCrop = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas();
      setEditedImage(croppedCanvas.toDataURL());
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
    startCrop,
    saveCrop,
    handleDownload
  }
}
