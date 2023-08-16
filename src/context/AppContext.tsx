import React, { createContext, useState, useRef } from 'react';
import Cropper from 'cropperjs';

interface AppContextProps {
  originalImage: File | null;
  compressedImage: File | null;
  conversionImage: File | null;
  compressionPercentage: number;
  cropImage: boolean;
  loadedImage: string | undefined;
  inputRef: React.RefObject<HTMLInputElement>;
  cropperRef: React.MutableRefObject<Cropper | null>;
  setOriginalImage: React.Dispatch<React.SetStateAction<File | null>>;
  setCompressedImage: React.Dispatch<React.SetStateAction<File | null>>;
  setConversionImage: React.Dispatch<React.SetStateAction<File | null>>;
  setCompressionPercentage: React.Dispatch<React.SetStateAction<number>>;
  setCropImage: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadedImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const AppContext = createContext<AppContextProps>({
  originalImage: null,
  compressedImage: null,
  conversionImage: null,
  compressionPercentage: 0,
  cropImage: false,
  loadedImage: undefined,
  inputRef: {} as React.RefObject<HTMLInputElement>,
  cropperRef: {} as React.RefObject<Cropper>,
  setOriginalImage: () => { },
  setCompressedImage: () => { },
  setConversionImage: () => { },
  setCompressionPercentage: () => { },
  setCropImage: () => { },
  setLoadedImage: () => { },
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<File | null>(null);
  const [conversionImage, setConversionImage] = useState<File | null>(null);
  const [compressionPercentage, setCompressionPercentage] = useState<number>(0);

  const [cropImage, setCropImage] = useState(false);
  const [loadedImage, setLoadedImage] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cropperRef = useRef<Cropper | null>(null);

  console.log('cropperRef', cropperRef)

  return (
    <AppContext.Provider
      value={{
        originalImage,
        compressedImage,
        conversionImage,
        compressionPercentage,
        cropImage,
        loadedImage,
        inputRef,
        cropperRef,
        setOriginalImage,
        setCompressedImage,
        setConversionImage,
        setCompressionPercentage,
        setCropImage,
        setLoadedImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
