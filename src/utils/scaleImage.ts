export const scaleImage = (imageFile: File, scale: number = 1): Promise<{ scaledDataURL: string; newSize: { width: number; height: number } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.onload = () => {
        const newWidth = image.width * scale;
        const newHeight = image.height * scale;

        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(image, 0, 0, newWidth, newHeight);

        const scaledDataURL = canvas.toDataURL(imageFile.type);
        resolve({
          scaledDataURL,
          newSize: { width: newWidth, height: newHeight },
        });
      };
      image.src = event.target?.result as string;
    };
    reader.readAsDataURL(imageFile);
  });
};
