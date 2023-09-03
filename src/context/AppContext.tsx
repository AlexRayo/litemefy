import React, { createContext, useState, useRef } from 'react';
import Cropper from 'cropperjs';

interface AppContextProps {
  originalImage: File | null;
  compressedImage: File | null;
  conversionImage: File | null;
  compressionPercentage: number;
  cropImage: boolean;
  loadedImage: File | undefined;
  inputRef: React.RefObject<HTMLInputElement>;
  cropperRef: React.MutableRefObject<Cropper | null>;
  isLoading: boolean; // Nuevo estado isLoading
  setOriginalImage: React.Dispatch<React.SetStateAction<File | null>>;
  setCompressedImage: React.Dispatch<React.SetStateAction<File | null>>;
  setConversionImage: React.Dispatch<React.SetStateAction<File | null>>;
  setCompressionPercentage: React.Dispatch<React.SetStateAction<number>>;
  setCropImage: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadedImage: React.Dispatch<React.SetStateAction<File | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>; // Nuevo estado setIsLoading
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
  isLoading: false, // Nuevo estado isLoading con valor predeterminado false
  setOriginalImage: () => { },
  setCompressedImage: () => { },
  setConversionImage: () => { },
  setCompressionPercentage: () => { },
  setCropImage: () => { },
  setLoadedImage: () => { },
  setIsLoading: () => { }, // Nuevo estado setIsLoading
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
  const [loadedImage, setLoadedImage] = useState<File | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado isLoading

  const inputRef = useRef<HTMLInputElement | null>(null);
  const cropperRef = useRef<Cropper | null>(null);

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
        isLoading, // Agregar isLoading al contexto
        setOriginalImage,
        setCompressedImage,
        setConversionImage,
        setCompressionPercentage,
        setCropImage,
        setLoadedImage,
        setIsLoading, // Agregar setIsLoading al contexto
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
