import React, { memo } from 'react'
import CSS from "./RoundedButton.module.css"

type RoundedButtonProps = {
  text:string, 
  handleClick:()=>void
}

export const RoundedButton = memo(({text, handleClick}: RoundedButtonProps) => {
  return (
    <button className={CSS["rounded-button"]} onClick={()=>handleClick()}>{text}</button>
  )
});