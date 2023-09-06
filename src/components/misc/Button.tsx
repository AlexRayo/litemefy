import React from 'react'
import { IconType } from 'react-icons';
import { AppContext } from '../../context/AppContext';

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

  const { isLoading } = React.useContext(AppContext)

  return (
    <button
      className={`
      py-2 px-4 
      rounded
      bg-white
      border
      
      gap-2
      flex
      items-center
      justify-center
      transition-colors duration-300   
      ${isLoading ? ' text-slate-300 border-slate-300' : ' text-slate-800 border-slate-200 hover:text-slate-300 hover:bg-slate-600 hover:cursor-pointer'}
      
      ${type === 'compressed' ? '' : 'flex-wrap'} 
      ${style}`}
      disabled={isLoading}
      onClick={onClick}
    >
      <Icon />
      {text}
    </button>
  )
}

export default Button