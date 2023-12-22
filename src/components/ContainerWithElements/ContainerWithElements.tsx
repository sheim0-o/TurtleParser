import React, { memo, useMemo, useState } from 'react'
import CSS from "./ContainerWithElements.module.css"
import { ElementsContainer, SearchedElement, getIndexOfTypeOfSearching, getTypeOfSearchingByIndex, getTypeOfSearchingElementByString } from '../../types';
import {ElementAttribute} from '../ElementAttribute/ElementAttribute';
import { SearchElementForm } from '../SearchElementForm/SearchElementForm';

type ContainerWithElementsProps = {
    elementsContainer:ElementsContainer;
    setElementsContainer: React.Dispatch<React.SetStateAction<ElementsContainer>>;
    searchedElement:SearchedElement;
    setSearchedElement: (newElement:SearchedElement)=>void;
}

export const ContainerWithElements = memo(({ elementsContainer, setElementsContainer, searchedElement, setSearchedElement}: ContainerWithElementsProps) => {
    const [currentElementsContainer, setCurrentElementsContainer] = useState<ElementsContainer>(elementsContainer);
    const [currentSearchedElement, setCurrentSearchedElement] = useState<SearchedElement>(searchedElement);
    const selectedRadio: number = useMemo(()=>getIndexOfTypeOfSearching(currentElementsContainer.typeOfSearchElement), [currentElementsContainer]);
  
    const handleRadioChange = (inputNumber: number) => {
        const newType = getTypeOfSearchingElementByString(getTypeOfSearchingByIndex(inputNumber)); 
        onChangeContainer(new ElementsContainer(newType, currentElementsContainer.nameOfType));
    };
    const handleTextChange = (value: string) => {
        const type = getTypeOfSearchingElementByString(getTypeOfSearchingByIndex(selectedRadio));
        onChangeContainer(new ElementsContainer(type, value));
    };
    const onChangeContainer = (newElementsContainer:ElementsContainer) => {
        setCurrentElementsContainer(newElementsContainer);
        setElementsContainer(newElementsContainer);
    };
    const onChangeSearchedElement = (newSearchedElement:SearchedElement) => {
        setCurrentSearchedElement(newSearchedElement);
        setSearchedElement(newSearchedElement);
    };
  
    return (
        <div className={CSS["container-with-elements"]}>
            <h3 className={CSS["container-with-elements__title"]}>Form for searching info in elements</h3>
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
                    <SearchElementForm searchedElement={currentSearchedElement} setSearchedElement={(newElement:SearchedElement)=>onChangeSearchedElement(newElement)}/>
                </div>
        
                <div className={CSS["container-with-elements__form-close-tag"]}>
                    {`</${selectedRadio==0?currentElementsContainer.nameOfType:""} id="${selectedRadio==1?currentElementsContainer.nameOfType:""}" class="${selectedRadio==2?currentElementsContainer.nameOfType:""}">`}
                </div>
            </div>
        </div>
    );
});