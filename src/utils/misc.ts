export default function misc() {
  const calculateReductionPercentage = (originalSize: number, compressedSize: number) => {
    return ((originalSize - compressedSize) / originalSize) * 100;
  };
  return {
    calculateReductionPercentage
  }
}
