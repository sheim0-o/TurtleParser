import React, { memo, useEffect, useState } from 'react'
import CSS from "./ElementAttribute.module.css"
import { InputText } from '../UI/InputText/InputText';

type ElementAttributeProps = {
  hintText: string;
  selectedRadio: number;
  idOfRadio: number;
  onTextChange: (value:string) => void;
  onRadioChange: (inputNumber: number) => void;
}

export const ElementAttribute = memo(({hintText, selectedRadio, idOfRadio, onTextChange, onRadioChange}: ElementAttributeProps) => {
  const [inputText, setInputText] = useState<string>('');

  const handleTextChange = (value: string) => {
    setInputText(value);
    onTextChange(value);
  };

  useEffect(() => {
    if (selectedRadio !== idOfRadio) {
      handleTextChange('');
    }
  }, [selectedRadio, idOfRadio]);

  return (
    <div className={CSS["element-attribute"]}>
      <p className={CSS["element-attribute__hint-text"]}>{hintText}</p>
      <input
        className={CSS["element-attribute__radio-input"]}
        type="radio"
        checked={selectedRadio === idOfRadio}
        onChange={() => onRadioChange(idOfRadio)}
      />
      <div className={CSS["element-attribute__text-input"]}>
        <InputText 
          value={inputText} 
          onChange={(value:string) => handleTextChange(value)} 
          disabled={selectedRadio !== idOfRadio} 
          textRequired={selectedRadio === idOfRadio} />
      </div>
    </div>
  );
});