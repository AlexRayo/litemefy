import React, { ChangeEvent } from 'react';
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
    handleConvertToWebP,
    handleCrop,
    handleDownload,
  } = imageController();

  const flipHorizontal = React.useRef(true)
  const flipVertical = React.useRef(true)
  const scale = React.useRef(1)
  const flip = React.useRef({ x: scale.current, y: scale.current })

  const [sliderValue, setSliderValue] = React.useState(1);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setSliderValue(value);
    cropperRef.current?.scale(value, value);
  };

  React.useEffect(() => {
    if (flipHorizontal.current) {
      cropperRef.current?.scale(flip.current.x, flip.current.y)
    }
    else {
      cropperRef.current?.scale(flip.current.x, flip.current.y)
    };

    if (flipVertical.current) {
      cropperRef.current?.scale(flip.current.x, flip.current.y)
    }
    else {
      cropperRef.current?.scale(flip.current.x, flip.current.y)
    }

    return () => {

    }
  }, [cropImage])


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
                          if (flipHorizontal.current) {
                            cropperRef.current?.scale(flip.current.x * -1, flip.current.y)
                            flip.current.x = scale.current * -1;
                          }
                          else {
                            cropperRef.current?.scale(scale.current, flip.current.y)
                            flip.current.x = scale.current;
                          }
                          flipHorizontal.current = !flipHorizontal.current
                        }} />
                      <Button
                        text=''
                        icon={FaArrowsAltV}
                        style
                        onClick={() => {
                          if (flipVertical.current) {
                            cropperRef.current?.scale(flip.current.x, flip.current.y * -1)
                            flip.current.y = scale.current * -1;
                          }
                          else {
                            cropperRef.current?.scale(flip.current.x, scale.current)
                            flip.current.y = scale.current;
                          }
                          flipVertical.current = !flipVertical.current
                        }} />

                      <div className="">
                        <input
                          type="range"
                          className="appearance-none w-full h-3 bg-gray-200 rounded-md outline-none focus:ring focus:ring-blue-300"
                          max={1}
                          min={0.1}
                          step={0.1}
                          value={sliderValue}
                          onChange={handleChange}
                        />
                        <span className='mx-auto block text-center'>Scale: {sliderValue * 100}%</span>
                      </div>

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
