import React, { ReactNode } from 'react'
import { IconType } from 'react-icons';
import { FaCrop, FaEnvelope } from "react-icons/fa";

type PropsTypes = {
  type?: "compressed" | "extended" | "default" | undefined
  text?: string
  target?: "_self" | "_blank"
  style?: any
  icon: IconType
  disabled?: boolean
  onClick: () => void
}

function Button({
  type,
  text,
  style,
  icon: Icon,
  disabled,
  onClick }: PropsTypes) {

  return (
    <button
      className={`
      py-2 px-4 
      rounded
      
      gap-2
      flex
      items-center
      justify-center
      border   
      transition-colors duration-300   
      ${disabled ? ' text-slate-300 border-slate-300' : 'border-slate-900 hover:text-slate-300 hover:bg-slate-800 hover:cursor-pointer'}
      
      ${type === 'compressed' ? '' : 'flex-wrap'} 
      ${style}`}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon />
      {text}
    </button>
  )
}

export default Button