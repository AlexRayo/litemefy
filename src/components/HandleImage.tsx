import React from 'react';
import Image from 'next/image';
import { FaCrop, FaBolt, FaCompress, FaDownload, FaCheck } from "react-icons/fa";
import { AppContext } from '@/context/AppContext';
import 'cropperjs/dist/cropper.css';
import HandleFile from '../controllers/handleImage';
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
    handleDownload,
  } = HandleFile();

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
                    onClick={() => setCropImage(true)} />
                )
              }
              {
                cropImage && (
                  <Button
                    text='Set Crop'
                    icon={FaCheck}
                    onClick={handleCrop} />
                )
              }
              <Button
                text='WebP'
                icon={FaBolt}
                onClick={handleConvertToWebP} />

              <Button
                text='Compress'
                icon={FaCompress}
                onClick={handleCompress} />

              <Button
                text='Download'
                icon={FaDownload}
                onClick={handleDownload} />

            </div>
            {
              //SHOW THE IMAGE ONCE IS EDITED OR WHEN FIRST LOAD
              loadedImage && !cropImage ?
                <Image
                  src={loadedImage} alt="Cropped"
                  className={`${cropImage ? 'hidden' : 'block'}`}
                  height={1000}
                  width={2000}
                />
                :
                null
            }
          </div>
        )}
    </div>
  )
}
