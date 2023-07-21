import React, { createContext, useState, useRef } from 'react';
import Cropper from 'cropperjs';

interface AppContextProps {
  originalFile: File | null;
  compressedFile: File | null;
  convertedFile: File | null;
  compressionPercentage: number;
  scaledImageUrlData: string;//save de url data base64 img
  cropImage: boolean;
  editedImageUrlData: string;
  pngTransparency: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  cropperRef: React.MutableRefObject<Cropper | null>;
  setoriginalFile: React.Dispatch<React.SetStateAction<File | null>>;
  setcompressedFile: React.Dispatch<React.SetStateAction<File | null>>;
  setconvertedFile: React.Dispatch<React.SetStateAction<File | null>>;
  setCompressionPercentage: React.Dispatch<React.SetStateAction<number>>;
  setscaledImageUrlData: React.Dispatch<React.SetStateAction<string>>;
  setCropImage: React.Dispatch<React.SetStateAction<boolean>>;
  seteditedImageUrlData: React.Dispatch<React.SetStateAction<string>>;
  setPngTransparency: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextProps>({
  originalFile: null,
  compressedFile: null,
  convertedFile: null,
  compressionPercentage: 0,
  scaledImageUrlData: '',
  cropImage: false,
  editedImageUrlData: '',
  pngTransparency: false,
  inputRef: {} as React.RefObject<HTMLInputElement>,
  cropperRef: {} as React.RefObject<Cropper>,
  setoriginalFile: () => { },
  setcompressedFile: () => { },
  setconvertedFile: () => { },
  setCompressionPercentage: () => { },
  setscaledImageUrlData: () => { },
  setCropImage: () => { },
  seteditedImageUrlData: () => { },
  setPngTransparency: () => { },
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [originalFile, setoriginalFile] = useState<File | null>(null);
  const [compressedFile, setcompressedFile] = useState<File | null>(null);
  const [convertedFile, setconvertedFile] = useState<File | null>(null);
  const [compressionPercentage, setCompressionPercentage] = useState<number>(0);

  const [scaledImageUrlData, setscaledImageUrlData] = useState('');
  const [cropImage, setCropImage] = useState(false);
  const [pngTransparency, setPngTransparency] = useState(false);
  const [editedImageUrlData, seteditedImageUrlData] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cropperRef = useRef<Cropper | null>(null);

  return (
    <AppContext.Provider
      value={{
        originalFile,
        compressedFile,
        convertedFile,
        compressionPercentage,
        scaledImageUrlData,
        cropImage,
        editedImageUrlData,
        pngTransparency,
        inputRef,
        cropperRef,
        setoriginalFile,
        setcompressedFile,
        setconvertedFile,
        setCompressionPercentage,
        setscaledImageUrlData,
        setCropImage,
        seteditedImageUrlData,
        setPngTransparency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
