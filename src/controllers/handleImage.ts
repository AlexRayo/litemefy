import React, { useContext, useEffect } from 'react';
import readAndCompressImage from 'browser-image-compression';
import { AppContext } from '../context/AppContext';
import Process from './process';
import getExtensionType from '@/utils/getExtension';
import checkPNGTransparency from '@/utils/checkPNGTransparency';
import { resizeImg } from '@/utils/resize-img';

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
    setCropImage
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
    if (loadedImage && originalImage) {
      let compressImage = loadedImage;
      let imgWidth = 0;
      const imageElement = new Image();
      imageElement.src = URL.createObjectURL(compressImage);
      imageElement.onload = async () => {
        imgWidth = imageElement.naturalWidth;
        if (imgWidth > 10920) {
          try {
            const scaledImage = await resizeImg(compressImage, 1920);
            if (scaledImage) {
              compress(scaledImage)
            } else {
              //console.error('resize error');
            }
          } catch (error) {
            //console.error('try/catch resize image error:', error);
          }

        }
        else {
          compress(compressImage)
        }
      };
      const compress = async (file: File) => {
        const hasTransparency = await checkPNGTransparency(file);
        //if png suggested initialQuality: 0.05. When flat images cold be 0.2
        //if jpeg suggested initialQuality: 0.8
        const options = {
          initialQuality:
            hasTransparency && imgWidth > 1280 ? 0.05
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

          }).catch((error) => {
          });
      }
    }
  };

  //
  const handleConvertToWebP = async () => {
    if (loadedImage) {
      try {
        const convertedFile = await convertToWebP(loadedImage);
        setConversionImage(convertedFile);
      } catch (error) {
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
    handleImageDrop,
    handleImageChange,
    handleDragOver,
    handleCompress,
    handleConvertToWebP,
    handleCrop,
    handleDownload
  }
}