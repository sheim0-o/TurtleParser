import React from 'react'
import CSS from "./InputNumber.module.css"

type InputNumberProps = {
    number:number,
    setNumber:(number:number)=>void,
    minNumber?:number,
    maxNumber?:number
}

export default function InputNumber({number, setNumber, minNumber=0, maxNumber=999999}: InputNumberProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(event.target.value, 10) || minNumber;
    newValue = Math.min(Math.max(newValue, minNumber), maxNumber);
    setNumber(newValue);
  };

  return (
    <input
      className={CSS["input-number"]}
      type="number"
      value={number}
      onChange={handleChange}
    />
  );
};