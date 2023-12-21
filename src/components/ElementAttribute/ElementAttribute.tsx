import React, { useEffect, useState } from 'react'
import CSS from "./ElementAttribute.module.css"

type ElementAttributeProps = {
    hintText: string;
    selectedRadio: number;
    idOfRadio: number;
    onTextChange: (value:string) => void;
    onRadioChange: (inputNumber: number) => void;
}

export default function ElementAttribute({hintText, selectedRadio, idOfRadio, onTextChange, onRadioChange}: ElementAttributeProps) {
    const [inputText, setInputText] = useState<string>('');

    const handleTextChange = (value: string) => {
        setInputText(value);
        onTextChange(value);
    };

    useEffect(() => {
        if (selectedRadio !== idOfRadio) {
            setInputText('');
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
        <input
          className={CSS["element-attribute__text-input"]}
          type="text"
          value={inputText}
          onChange={(e) => handleTextChange(e.target.value)}
          disabled={selectedRadio !== idOfRadio}
        />
      </div>
    );
}