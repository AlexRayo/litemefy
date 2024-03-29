import React, { useContext, useEffect } from 'react';
import readAndCompressImage from 'browser-image-compression';
import { AppContext } from '../context/AppContext';
import Process from './process';
import getExtensionType from '../utils/getExtension';
import checkPNGTransparency from '../utils/checkPNGTransparency';

export default function ImageUpload() {
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
    setCropImage,
    setIsLoading,
    setImgSize
  } = useContext(AppContext);

  const {
    convertToWebP,
  } = Process();

  const handleImageDrop = async (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setImage(file)
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
  };
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file)
    }
  };

  const setImage = (file: File) => {
    if (file.type.includes('image')) {
      setOriginalImage(file);
      setCompressedImage(null);
      setConversionImage(null);
      setCompressionPercentage(0);
      setLoadedImage(file);
    } else {
      alert('File must be an image')
      return
    }
  }

  const handleCompress = async () => {
    setIsLoading(true);
    if (loadedImage && originalImage) {
      let compressImage = loadedImage;
      let imgWidth = 0;
      const imageElement = new Image();
      imageElement.src = URL.createObjectURL(compressImage);
      imageElement.onload = async () => {
        imgWidth = imageElement.naturalWidth;
        setImgSize({ height: imageElement.naturalHeight, width: imageElement.naturalWidth });

        compress(compressImage)

      };
      const compress = async (file: File) => {
        const hasTransparency = await checkPNGTransparency(file);
        //if png suggested initialQuality: 0.05. When flat images cold be 0.2
        //if jpeg suggested initialQuality: 0.8
        const options = {
          initialQuality:
            hasTransparency && imgWidth > 1280 ? 0.035
              : hasTransparency && imgWidth > 960 ? 0.25
                : hasTransparency && imgWidth > 0 ? 0.5
                  //
                  : !hasTransparency && imgWidth > 1280 ? 0.3
                    : !hasTransparency && imgWidth > 960 ? 0.5
                      : 0.8,

          maxSizeMB: 5,
          maxWidthOrHeight: 1920,
          fileType: getExtensionType(file.name), // get the file type from the file name
          onProgress: (progress: number) => {
            console.log(`Progress compression: ${progress}%`);
          },
        };

        readAndCompressImage(file, options)
          .then((compressedFile) => {
            setCompressedImage(compressedFile);
            setIsLoading(false);

          }).catch((error) => {
            setIsLoading(false);
          });
      }
    }
  };

  //
  const handleConvertToWebP = async () => {
    setIsLoading(true);
    if (loadedImage) {
      try {
        const convertedFile = await convertToWebP(loadedImage);
        setConversionImage(convertedFile);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error al convertir la imagen a WebP:', error);
      }
    }
  };
  //
  const handleCrop = async () => {
    setCropImage(false);

    if (loadedImage) {
      const extType: string = getExtensionType(loadedImage.name);
      console.log('extType', extType);

      if (cropperRef.current?.getCroppedCanvas()) {
        let croppedCanvas = cropperRef.current.getCroppedCanvas();

        croppedCanvas.toBlob(function (blob) {
          if (blob) {
            // Crear un nuevo nombre de archivo con la extensión correcta
            const newFileName = loadedImage.name.replace(/\.[^.]+$/, `.${extType.split('/')[1]}`);

            // Crear un nuevo objeto File con el Blob y el nuevo nombre
            const file = new File([blob], newFileName, { type: extType });

            setLoadedImage(file);
          } else {
            console.error('Blob could not be created');
          }
        }, extType);
      }
    }
  };


  useEffect(() => {
    if (loadedImage) {
      handleCompress();
    }
    return () => {
    }
  }, [loadedImage])



  //
  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    const download = (image: File) => {
      downloadLink.href = URL.createObjectURL(image);
      downloadLink.download = `${image.name}`;
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
    handleImageDrop,
    handleImageChange,
    handleDragOver,
    handleCompress,
    handleConvertToWebP,
    handleCrop,
    handleDownload,
  }
}