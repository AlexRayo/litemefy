import React from 'react';
import {
  FaFileImage,
  FaFile,
  FaPen,
  FaUndo,
  FaRedo,
  FaArrowsAltH,
  FaArrowsAltV,
  FaBolt,
  FaDownload,
  FaCheck,
  FaBan
} from "react-icons/fa";
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
    isLoading
  } = React.useContext(AppContext);

  const {
    handleImageDrop,
    handleImageChange,
    handleDragOver,
    handleConvertToWebP,
    handleCrop,
    handleDownload,
  } = imageController();

  const changeImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="w-full p-2 md:p4 xl:p-0">

      <input
        ref={inputRef}
        type="file"
        onChange={handleImageChange}
        className='hidden'
      />

      {
        !loadedImage ?
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
          :
          <>
            <div className='text-center'>
              <p className="font-thin bg-slate-200 inline-block py-1 px-2 rounded">
                If you wish a lighter image, consider scale it down
              </p>
            </div>
            {
              isLoading && (
                <span className="loader absolute top-0 xl:top-10"></span>
              )
            }

            <Status />
            {
              loadedImage && (
                < div className={``}>
                  <div className='flex justify-between my-2'>
                    {
                      !cropImage && (
                        <div className="flex gap-2">
                          <Button
                            text=''
                            icon={FaFile}
                            onClick={changeImage}
                            style={'h-12'}
                          />
                          <Button
                            text=''
                            icon={FaPen}
                            onClick={() => { setCropImage(true) }}
                            style={'h-12'}
                          />
                        </div>
                      )
                    }
                    {
                      cropImage && (
                        <div className="flex justify-between w-full">
                          <div className="xl:flex gap-3">
                            <div className="flex gap-2">
                              <Button
                                text=''
                                icon={FaUndo}
                                onClick={() => { cropperRef.current?.rotate(-90); }}
                                style={'w-12 h-12 rounded-full'}
                              />
                              <Button
                                text=''
                                icon={FaRedo}
                                onClick={() => { cropperRef.current?.rotate(90); }}
                                style={'w-12 h-12 rounded-full'}
                              />
                              <Button
                                text=''
                                icon={FaArrowsAltH}
                                onClick={() => {
                                  cropperRef.current?.scale(cropperRef.current?.getData().scaleX * -1, cropperRef.current?.getData().scaleY)
                                }}
                                style={'w-12 h-12 rounded-full'}
                              />
                              <Button
                                text=''
                                icon={FaArrowsAltV}
                                onClick={() => {
                                  cropperRef.current?.scale(cropperRef.current?.getData().scaleX, cropperRef.current?.getData().scaleY * -1)
                                }}
                                style={'w-12 h-12 rounded-full'}
                              />
                            </div>
                            <RangeSlider
                              cropperRef={cropperRef}
                            />
                          </div>

                          <div className="flex gap-2">
                            <Button
                              text=''
                              icon={FaCheck}
                              onClick={handleCrop}
                              style={'w-12 h-12 rounded-full mb-2'}
                            />
                            <Button
                              text=''
                              icon={FaBan}
                              onClick={() => { cropperRef.current?.destroy(); setCropImage(false) }}
                              style={'w-12 h-12 rounded-full'}
                            />
                          </div>
                        </div>

                      )
                    }
                    <div className="flex gap-2">
                      {!conversionImage && (<Button
                        text='WebP'
                        icon={FaBolt}
                        style={`${cropImage ? 'hidden' : 'h-12'}`}
                        onClick={handleConvertToWebP}
                      />)}

                      <Button
                        text={'Download'}
                        icon={FaDownload}
                        style={`${cropImage ? 'hidden' : 'h-12'}`}
                        onClick={handleDownload} />
                    </div>

                  </div>
                  <div className="flex justify-center bg-squares rounded overflow-hidden shadow-2xl">
                    {
                      //SHOW THE IMAGE ONCE IS EDITED OR WHEN FIRST LOAD
                      loadedImage && !cropImage && (
                        <img
                          src={URL.createObjectURL(loadedImage)} alt="Cropped"
                          className={`${cropImage ? 'hidden' : 'block'} h-auto w-full`}
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
