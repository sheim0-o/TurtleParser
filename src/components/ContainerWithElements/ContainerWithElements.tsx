import React, { useState } from 'react'
import CSS from "./ContainerWithElements.module.css"
import { ElementsContainer, SearchedElement, SearchedElementAttribute, TypeOfSearchingElement, getTypeOfSearchingElementByString } from '../../types';
import ElementAttribute from '../ElementAttribute/ElementAttribute';
import { SearchElementForm } from '../SearchElementForm/SearchElementForm';

type ContainerWithElementsProps = {
    searchedElement: SearchedElement,
    setElementsContainer: React.Dispatch<React.SetStateAction<ElementsContainer>>;
    setSearchedElement: (newElement:SearchedElement)=>void;
}

export default function ContainerWithElements({searchedElement, setElementsContainer, setSearchedElement}: ContainerWithElementsProps) {
    const [inputText, setInputText] = useState<string>('');
    const [selectedRadio, setSelectedRadio] = useState<number>(1);
  
    const handleRadioChange = (inputNumber: number) => {
        const newType = getTypeOfSearchingElementByString(Object.keys(TypeOfSearchingElement)[inputNumber]);
        setSelectedRadio(inputNumber);
        setInputText("");
        onChangeContainer(new ElementsContainer(newType, inputText));
    };

    const handleTextChange = (value: string) => {
        const type = getTypeOfSearchingElementByString(Object.keys(TypeOfSearchingElement)[selectedRadio]);
        setInputText(value);
        onChangeContainer(new ElementsContainer(type, value));
    };

    const onChangeContainer = (searchedElementAttribute:SearchedElementAttribute) => {
        const newElementsContainer = new ElementsContainer(searchedElementAttribute.typeOfSearchElement, searchedElementAttribute.nameOfType);
        setElementsContainer(newElementsContainer);
    };
  
    return (
        <div className={CSS["container-with-elements"]}>
            <h3 className={CSS["container-with-elements__title"]}>Container with searched element</h3>
            <div className={CSS["container-with-elements__form"]}>
                <div className={CSS["container-with-elements__form-open-tag"]}>
                    {"<"}
                    <div className={CSS["container-with-elements__form-open-tag-attrs"]}>
                        <ElementAttribute 
                            hintText={""}
                            selectedRadio={selectedRadio}
                            idOfRadio={0}
                            onTextChange={handleTextChange}
                            onRadioChange={handleRadioChange}
                        />
                
                        <ElementAttribute
                            hintText={"id="}
                            selectedRadio={selectedRadio}
                            idOfRadio={1}
                            onTextChange={handleTextChange}
                            onRadioChange={handleRadioChange}
                        />

                        <ElementAttribute
                            hintText={"class="}
                            selectedRadio={selectedRadio}
                            idOfRadio={2}
                            onTextChange={handleTextChange}
                            onRadioChange={handleRadioChange}
                        />
                    </div>
                    {"> "}
                </div>

                <div className={CSS["container-with-elements__searched-element"]}>
                    <SearchElementForm searchedElement={searchedElement} setSearchedElement={(newElement:SearchedElement)=>setSearchedElement(newElement)}/>
                </div>
        
                <div className={CSS["container-with-elements__form-close-tag"]}>{`</${selectedRadio==0?inputText:""} id="${selectedRadio==1?inputText:""}" class="${selectedRadio==2?inputText:""}">`}</div>
            </div>
        </div>
    );
};