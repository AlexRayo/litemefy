export default function getExtensionType(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    // Agrega otros casos según las extensiones de imagen que necesites
    default:
      return 'image/jpeg'; // Tipo de archivo predeterminado en caso de que la extensión no coincida con ninguna de las anteriores
  }
};

