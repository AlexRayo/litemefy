import React, { ReactNode } from 'react'
import { IconType } from 'react-icons';
import { FaCrop, FaEnvelope } from "react-icons/fa";

type PropsTypes = {
  type?: "compressed" | "extended" | "default" | undefined
  text?: string
  target?: "_self" | "_blank"
  style?: any
  icon: IconType
  onClick: () => void
}

function Button({
  type,
  text,
  style,
  icon: Icon,
  onClick }: PropsTypes) {

  return (
    <button
      className={`
      py-2 px-4 
      rounded 
      bg-primary 
      border 
      border-slate-900 
      hover:bg-opacity-90 
      hover:border-opacity-5
      gap-2
      flex
      items-center
      justify-center
      ${type === 'compressed' ? '' : 'flex-wrap'} 
      ${style}`}
      onClick={onClick}
    >
      <Icon />
      {text}
    </button>
  )
}

export default Button