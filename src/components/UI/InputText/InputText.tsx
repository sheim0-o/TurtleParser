import React, { memo } from 'react'
import CSS from "./InputText.module.css"

type InputTextProps = {
  value:string,
  onChange:(value:string)=>void,
  placeholder?:string,
  textRequired?:boolean,
  disabled?:boolean
}

export const InputText = memo(({value, onChange, placeholder="", textRequired=false, disabled=false}: InputTextProps) => {
  return (
    <input
      className={CSS["input-text"] + (textRequired && value=="" ? ` ${CSS["input-text_empty"]}` : '')}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e)=>onChange(e.target.value)}
      disabled={disabled}
    />
  )
}); 