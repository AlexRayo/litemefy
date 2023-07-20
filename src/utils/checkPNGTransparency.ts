const checkPNGTransparency = (file: File): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const context = canvas.getContext('2d');
      if (!context) {
        reject(new Error('El contexto de canvas no está disponible.'));
        return;
      }

      context.drawImage(img, 0, 0);

      // Obtener el ImageData del contexto
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      // Verificar si existe algún píxel completamente transparente (canal alfa = 0)
      for (let i = 0; i < imageData.data.length; i += 4) {
        const alpha = imageData.data[i + 3];

        // Si el canal alfa es 0, significa que es completamente transparente
        if (alpha === 0) {
          resolve(true); // La imagen tiene transparencia
          return;
        }
      }

      resolve(false); // La imagen no tiene transparencia
    };

    img.onerror = function (error) {
      reject(error);
    };

    // Leer el archivo como URL (data URL)
    const reader = new FileReader();
    reader.onload = function (event) {
      if (typeof event.target?.result === 'string') {
        img.src = event.target.result;
      } else {
        reject(new Error('No se pudo leer el archivo como data URL.'));
      }
    };
    reader.readAsDataURL(file);
  });
};

export default checkPNGTransparency;