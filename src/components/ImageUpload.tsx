import React, { DragEvent, MouseEventHandler } from 'react'
import { FaFileImage } from 'react-icons/fa'
type ImageUploadProps = {
  handleImageDrop: (event: DragEvent<HTMLInputElement>) => Promise<void>;
  handleDragOver: (event: DragEvent<HTMLInputElement>) => void;
  changeImage: MouseEventHandler<HTMLDivElement>;
};
export default function ImageUpload({ handleImageDrop, handleDragOver, changeImage }: ImageUploadProps) {
  return (
    <div
      className="h-96 w-full rounded-xl flex items-center justify-center text-center bg-white border-dotted border-4 border-slate-500 shadow-2xl"
      onDrop={handleImageDrop}
      onDragOver={handleDragOver}
      onClick={changeImage}
    >
      <div className="">
        <FaFileImage
          className={'mx-auto text-6xl'}
        />
        <p className='mt-4 text-2xl'>Drop or select an image</p>
      </div>
    </div>
  )
}
