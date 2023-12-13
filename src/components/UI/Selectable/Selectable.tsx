import React from 'react'
import CSS from "./Selectable.module.css"

type SelectableProps = {
  value: string,
  options: string[],
  callback: (value:string)=>void
}

export default function Selectable({ value, options, callback }: SelectableProps) {
  return (
    <select className={CSS["selectable"]} value={value} onChange={(e) => callback(e.target.value as string)}>
      {options.map((option, index) => (
        <option className={CSS["selectable__option"]} value={option} key={index}>{option}</option>
      ))}
    </select>
  )
}