import React from 'react';
import { FaPen, FaUndo, FaRedo, FaArrowsAltH, FaArrowsAltV, FaBolt, FaCompress, FaDownload, FaCheck, FaBan } from "react-icons/fa";
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
    cropperRef,
    loadedImage,
    setCropImage,
    conversionImage,
  } = React.useContext(AppContext);

  const {
    handleImageChange,
    handleCompress,
    handleConvertToWebP,
    handleCrop,
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
            <div className='flex justify-between my-2'>
              {
                !cropImage && (
                  <Button
                    text='Edit'
                    icon={FaPen}
                    onClick={() => { setCropImage(true) }}
                  />
                )
              }
              {
                cropImage && (
                  <div className="flex justify-between w-full">

                    <div className="flex gap-2">
                      <Button
                        text=''
                        icon={FaUndo}
                        onClick={() => { cropperRef.current?.rotate(-90); }} />
                      <Button
                        text=''
                        icon={FaRedo}
                        onClick={() => { cropperRef.current?.rotate(90); }} />
                      <Button
                        text=''
                        icon={FaArrowsAltH}
                        onClick={() => { cropperRef.current?.scaleX(-cropperRef.current?.getData().scaleX || -1); }} />
                      <Button
                        text=''
                        icon={FaArrowsAltV}
                        style
                        onClick={() => { cropperRef.current?.scaleY(-cropperRef.current?.getData().scaleY || -1); }} />
                      <Button
                        text=''
                        icon={FaRedo}
                        onClick={() => { cropperRef.current?.scale(0.5, 0.5); }} />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        text=''
                        icon={FaCheck}
                        onClick={handleCrop} />
                      <Button
                        text=''
                        icon={FaBan}
                        onClick={() => { cropperRef.current?.destroy(); setCropImage(false) }} />
                    </div>
                  </div>

                )
              }
              {!conversionImage && (<Button
                text='WebP'
                icon={FaBolt}
                style={`${cropImage ? 'hidden' : ''}`}
                onClick={handleConvertToWebP} />)}

              {/* <Button
                text='Compress'
                icon={FaCompress}
                style={`${cropImage ? 'hidden' : ''}`}
                onClick={handleCompress} /> */}

              <Button
                text='Download'
                icon={FaDownload}
                style={`${cropImage ? 'hidden' : ''}`}
                onClick={handleDownload} />

            </div>
            <div className="flex justify-center bg-slate-100 h-96 overflow-hidden">
              {
                //SHOW THE IMAGE ONCE IS EDITED OR WHEN FIRST LOAD
                loadedImage && !cropImage && (
                  <img
                    src={URL.createObjectURL(loadedImage)} alt="Cropped"
                    className={`${cropImage ? 'hidden' : 'block'} h-full`}
                  />)
              }
              <CropImage />
            </div>
          </div>
        )}
    </div>
  )
}
