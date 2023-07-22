import React from 'react';
import { AppContext } from '../context/AppContext';
import Process from '@/functions/process';

export default function imageUpload() {
  const {
    originalFile,
    compressedFile,
    convertedFile,
    editedImageUrlData,
    cropperRef,
    setoriginalFile,
    setcompressedFile,
    setconvertedFile,
    setCompressionPercentage,
    seteditedImageUrlData,
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
      setoriginalFile(file);
      setcompressedFile(null);
      setconvertedFile(null);
      setCompressionPercentage(0);
      seteditedImageUrlData(URL.createObjectURL(file));
    }
  };


  //user can compress image when is loaded or converted to webp
  //originalFile || convertedFile, can contain a file type
  const handleCompress = async () => {
    console.log("convertedFile: ", convertedFile)
    let imageToCompress = originalFile;
    if (convertedFile) {
      imageToCompress = convertedFile;
    }

    try {

      if (imageToCompress) {
        let editedFile = imageToCompress;

        //if image have been edited then convert the URL base64 encode Data to File
        if (editedImageUrlData) {
          editedFile = await convertDataUrlToFile(editedImageUrlData, imageToCompress.type, originalFile);
        }

        //get compressed image
        const compressedFile = await compressImage(editedFile);
        setcompressedFile(compressedFile);

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
    if (originalFile) {
      try {

        const convertedFile = await convertToWebP(originalFile);
        setconvertedFile(convertedFile);

        //UNCOMMENT IF YOU WANT TO AUTOMATICALLY COMPRESS FILE(NOT RECOMENDED)
        //const compressedFile = await compressImage(convertedFile);
        //setcompressedFile(compressedFile);
        //
        // const reductionPercentage = calculateReductionPercentage(
        //   originalFile.size,
        //   compressedFile.size
        // );
        // setCompressionPercentage(reductionPercentage);

      } catch (error) {
        console.error('Error al convertir la imagen a WebP:', error);
      }
    }
  };

  React.useEffect(() => {
    //handleCompress();
    console.log(compressedFile)
    return () => {

    }
  }, [compressedFile])


  //
  const startCrop = () => {
    if (editedImageUrlData && cropperRef.current) {
      cropperRef.current.replace(editedImageUrlData);
      seteditedImageUrlData(editedImageUrlData);
      setcompressedFile(null);
      setconvertedFile(null);
      setCompressionPercentage(0);
    }
  };

  //
  const saveCrop = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas();
      seteditedImageUrlData(croppedCanvas.toDataURL());
    }
  };

  //
  const handleDownload = () => {
    if (compressedFile) {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(compressedFile);
      downloadLink.download = `compressed_${compressedFile.name}`;
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
