import React from 'react';
import { FaPen, FaUndo, FaRedo, FaArrowsAltH, FaArrowsAltV, FaBolt, FaCompress, FaDownload, FaCheck, FaBan } from "react-icons/fa";
import { AppContext } from '@/context/AppContext';
import 'cropperjs/dist/cropper.css';
import imageController from '../controllers/handleImage';

import CropImage from '../components/CropImage';
import Status from '@/components/Status';

import Button from './misc/Button';
import RangeSlider from './misc/RangeSlider';

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
    handleImageDrop,
    handleImageChange,
    handleDragOver,
    handleConvertToWebP,
    handleCrop,
    handleDownload,
  } = imageController();

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="h-96 w-full">

      {
        !loadedImage ?
          <div
            className="h-full w-full bg-pink-300 flex items-center justify-center text-center"
            onDrop={handleImageDrop}
            onDragOver={handleDragOver}
            onClick={handleClick}
          >
            <div className="">
              <input
                value={'Upload image'}
                ref={inputRef}
                type="file"
                onChange={handleImageChange}
              />
              <p>or drop a file</p>
            </div>
          </div>
          :
          <>
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
                              onClick={() => {
                                cropperRef.current?.scale(cropperRef.current?.getData().scaleX * -1, cropperRef.current?.getData().scaleY)
                              }} />
                            <Button
                              text=''
                              icon={FaArrowsAltV}
                              style
                              onClick={() => {
                                cropperRef.current?.scale(cropperRef.current?.getData().scaleX, cropperRef.current?.getData().scaleY * -1)
                              }} />

                            <RangeSlider
                              cropperRef={cropperRef}
                            />

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
              )
            }
          </>
      }

    </div>
  )
}
