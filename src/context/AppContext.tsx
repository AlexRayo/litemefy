import React, { createContext, useState, useRef } from 'react';
import Cropper from 'cropperjs';

interface AppContextProps {
  originalImage: File | null;
  compressedImage: File | null;
  convertedImage: File | null;
  compressionPercentage: number;
  scaledImage: string;//save de url data base64 img
  cropImage: boolean;
  editedImage: string | null;
  pngTransparency: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  cropperRef: React.MutableRefObject<Cropper | null>;
  setOriginalImage: React.Dispatch<React.SetStateAction<File | null>>;
  setCompressedImage: React.Dispatch<React.SetStateAction<File | null>>;
  setconvertedImage: React.Dispatch<React.SetStateAction<File | null>>;
  setCompressionPercentage: React.Dispatch<React.SetStateAction<number>>;
  setScaledImage: React.Dispatch<React.SetStateAction<string>>;
  setCropImage: React.Dispatch<React.SetStateAction<boolean>>;
  setEditedImage: React.Dispatch<React.SetStateAction<string | null>>;
  setPngTransparency: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextProps>({
  originalImage: null,
  compressedImage: null,
  convertedImage: null,
  compressionPercentage: 0,
  scaledImage: '',
  cropImage: false,
  editedImage: null,
  pngTransparency: false,
  inputRef: {} as React.RefObject<HTMLInputElement>,
  cropperRef: {} as React.RefObject<Cropper>,
  setOriginalImage: () => { },
  setCompressedImage: () => { },
  setconvertedImage: () => { },
  setCompressionPercentage: () => { },
  setScaledImage: () => { },
  setCropImage: () => { },
  setEditedImage: () => { },
  setPngTransparency: () => { },
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<File | null>(null);
  const [convertedImage, setconvertedImage] = useState<File | null>(null);
  const [compressionPercentage, setCompressionPercentage] = useState<number>(0);

  const [scaledImage, setScaledImage] = useState('');
  const [cropImage, setCropImage] = useState(false);
  const [pngTransparency, setPngTransparency] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cropperRef = useRef<Cropper | null>(null);

  return (
    <AppContext.Provider
      value={{
        originalImage,
        compressedImage,
        convertedImage,
        compressionPercentage,
        scaledImage,
        cropImage,
        editedImage,
        pngTransparency,
        inputRef,
        cropperRef,
        setOriginalImage,
        setCompressedImage,
        setconvertedImage,
        setCompressionPercentage,
        setScaledImage,
        setCropImage,
        setEditedImage,
        setPngTransparency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
