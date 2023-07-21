import readAndCompressImage from 'browser-image-compression';
import getExtensionType from '../utils/getExtension';
import checkPNGTransparency from '../utils/checkPNGTransparency';

export default function Process() {

  const compressImage = async (file: File) => {
    const hasTransparency = await checkPNGTransparency(file);
    if (hasTransparency) {
      console.log('La imagen tiene transparencia.');
    } else {
      console.log('La imagen no tiene transparencia.');
    }
    return new Promise<File>((resolve, reject) => {
      //if png suggested initialQuality: 0.05. When flat images cold be 0.2
      //if jprg suggested initialQuality: 0.8
      const options = {
        initialQuality: 0.8,
        maxSizeMB: 5,
        maxWidthOrHeight: 1920,
        fileType: getExtensionType(file.name), // Obtener el fileType según la extensión del archivo
        onProgress: (progress: number) => {
          console.log(`Progreso de compresión: ${progress * 100}%`);
        },
      };

      readAndCompressImage(file, options).then((compressedFile) => {
        resolve(compressedFile);
      }).catch((error) => {
        reject(error);
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

  const convertDataUrlToFile = async (dataUrl: string, fileType: string, originalImage: File | null) => {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    return new File([blob], `cropped_${originalImage?.name}`, { type: fileType });
  };


  const calculateReductionPercentage = (originalSize: number, compressedSize: number) => {
    return ((originalSize - compressedSize) / originalSize) * 100;
  };

  return {
    compressImage,
    convertToWebP,
    convertDataUrlToFile,
    calculateReductionPercentage
  }
}
