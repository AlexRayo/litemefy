import React from 'react';
import { FaCrop, FaBolt, FaCompress, FaDownload, FaCheck, FaBan } from "react-icons/fa";
import { AppContext } from '@/context/AppContext';
import 'cropperjs/dist/cropper.css';
import imageController from '../controllers/handleImage';

import CropImage from '../components/CropImage';
import Status from '@/components/Status';

import Button from './misc/Button';

export default function HandleImage() {
  const {
    inputRef,
    cropImage,
    loadedImage,
    setCropImage,
  } = React.useContext(AppContext);

  const {
    handleImageChange,
    handleCompress,
    handleConvertToWebP,
    handleCrop,
    cancelCrop, setCancelCrop,
    handleDownload,
  } = imageController();

  return (
    <div className="">

      <input
        type="file"
        onChange={handleImageChange}
        ref={inputRef} />
      <Status />
      {
        loadedImage && (
          < div className={``}>
            <div className='flex justify-between'>
              {
                !cropImage && (
                  <Button
                    text='Crop'
                    icon={FaCrop}
                    onClick={() => { setCancelCrop(false); setCropImage(true) }}
                  />
                )
              }
              {
                cropImage && (
                  <div className="flex gap-2">
                    <Button
                      text='Set Crop'
                      icon={FaCheck}
                      onClick={handleCrop} />
                    <Button
                      text='Cancel'
                      icon={FaBan}
                      onClick={() => {
                        setCancelCrop(true)
                        setCropImage(false)
                      }} />
                  </div>

                )
              }
              <Button
                text='WebP'
                icon={FaBolt}
                disabled={cropImage ? true : false}
                onClick={handleConvertToWebP} />

              <Button
                text='Compress'
                icon={FaCompress}
                disabled={cropImage ? true : false}
                onClick={handleCompress} />

              <Button
                text='Download'
                icon={FaDownload}
                disabled={cropImage ? true : false}
                onClick={handleDownload} />

            </div>
            <div className="flex justify-center bg-slate-100 h-96">
              {
                //SHOW THE IMAGE ONCE IS EDITED OR WHEN FIRST LOAD
                loadedImage && !cropImage && (
                  <img
                    src={loadedImage} alt="Cropped"
                    className={`${cropImage ? 'hidden' : 'block'} h-full`}
                  />)
              }
              <CropImage
                cancelCrop={cancelCrop}
              />
            </div>
          </div>
        )}
    </div>
  )
}
