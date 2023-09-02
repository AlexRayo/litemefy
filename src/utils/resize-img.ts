export function resizeImg(
  file: File,
  maxWidth: number
): Promise<File | null> {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      const originalWidth = image.width;
      const originalHeight = image.height;

      let newWidth = originalWidth;
      let newHeight = originalHeight;

      // Verifica si es necesario escalar la imagen
      if (originalWidth > maxWidth) {
        newWidth = maxWidth;
        newHeight = (originalHeight * maxWidth) / originalWidth;
      }

      // Crea un elemento canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        resolve(null);
        return;
      }

      // Establece el tamaño del canvas
      canvas.width = newWidth;
      canvas.height = newHeight;

      // Dibuja la imagen escalada en el canvas
      context.drawImage(image, 0, 0, newWidth, newHeight);

      // Convierte el canvas en una imagen File
      canvas.toBlob((blob) => {
        if (blob) {
          const scaledImage = new File([blob], file.name, { type: file.type });
          resolve(scaledImage);
        } else {
          resolve(null);
        }
      }, file.type);
    };
  });
}
