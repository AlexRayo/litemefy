import React, { ChangeEvent } from 'react'

type PropsType = {
  cropperRef: React.MutableRefObject<Cropper | null>
}

export default function RangeSlider({ cropperRef }: PropsType) {
  const [sliderValue, setSliderValue] = React.useState(1)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setSliderValue(value)
    if (cropperRef.current) {
      let x = cropperRef.current.getData().scaleX
      let y = cropperRef.current?.getData().scaleY
      x < 0 ? x = value * -1 : x = value
      y < 0 ? y = value * -1 : y = value
      cropperRef.current?.scale(x, y);
    }
  }

  return (
    <div className="mt-2 xl:mt-0">
      <span className='mx-auto block text-center text-xs font-thin'>Scale: {sliderValue * 100}%</span>
      <input
        type="range"
        className="appearance-none w-full h-3 bg-gray-200 rounded-md outline-none focus:ring focus:ring-blue-300"
        max={1}
        min={0.1}
        step={0.1}
        value={sliderValue}
        onChange={handleChange}
      />
    </div>
  )
}
