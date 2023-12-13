import React from 'react'
import CSS from "./Checkbox.module.css"

type CheckboxProps = {
    isChecked:boolean,
    setIsChecked:(isChecked:boolean)=>void
}

export default function Checkbox({isChecked, setIsChecked}: CheckboxProps) {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
    
  return (
    <input
        className={CSS["checkbox"]}
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
    />
  )
}