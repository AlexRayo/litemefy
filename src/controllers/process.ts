import React from 'react';
import { AppContext } from '../context/AppContext';

export default function Process() {
  const {
    setLoadedImage,
  } = React.useContext(AppContext)

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
                // Cambiar la extensión del archivo a .webp
                const newName = file.name.replace(/\.[^.]+$/, '.webp');
                const convertedFile = new File([blob], newName, {
                  type: 'image/webp',
                  lastModified: Date.now(),
                });
                setLoadedImage(convertedFile);
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

  return {
    convertToWebP,
  }
}
