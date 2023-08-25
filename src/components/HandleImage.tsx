import React, { ChangeEvent } from 'react';
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
    handleImageChange,
    handleConvertToWebP,
    handleCrop,
    handleDownload,
  } = imageController();




  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const value = parseFloat(event.target.value);
  //   setSliderValue(value)
  //   //setSliderValue(value);
  //   if (cropperRef.current) {
  //     const x = cropperRef.current.getData().scaleX * value
  //     const y = cropperRef.current?.getData().scaleY * value
  //     cropperRef.current?.scale(x, y);
  //   }


  // };
  // React.useEffect(() => {
  //   if (cropperRef.current) {
  //     const x = cropperRef.current.getData().scaleX * sliderValue
  //     const y = cropperRef.current?.getData().scaleY * sliderValue
  //     cropperRef.current?.scale(x, y);
  //   }

  //   return () => {

  //   }
  // }, [sliderValue])


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
        )}
    </div>
  )
}
