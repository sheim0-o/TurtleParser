import React, { memo, useMemo, useState } from 'react'
import CSS from "./SearchElementForm.module.css"
import { SearchedElement, SearchedInfo, getIndexOfTypeOfSearching, getTypeOfSearchingByIndex, getTypeOfSearchingElementByString, getUpdatedSearchedElement } from '../../types';
import { RoundedButton } from '../UI/RoundedButton/RoundedButton';
import { SearchInfoInElemForm } from '../SearchInfoInElemForm/SearchInfoInElemForm';
import { ElementAttribute } from '../ElementAttribute/ElementAttribute';
import { v4 as uuidv4 } from 'uuid';

interface SearchElementFormProps {
    searchedElement:SearchedElement;
    setSearchedElement: (searchedElement:SearchedElement) => void;
}

export const SearchElementForm = memo(({searchedElement, setSearchedElement}: SearchElementFormProps) => {
    const [currentElement, setCurrentElement] = useState<SearchedElement>(searchedElement);
    const selectedRadio = useMemo(()=>getIndexOfTypeOfSearching(currentElement.typeOfSearchElement), [currentElement]);

    
    const onChangedCurrentElem = (newCurrentElem:SearchedElement) => {
        const newElement = getUpdatedSearchedElement(newCurrentElem);
        setCurrentElement(newElement);
        setSearchedElement(newElement);    
    };

    const handleRadioChange = (inputNumber: number) => {
        const newType = getTypeOfSearchingElementByString(getTypeOfSearchingByIndex(inputNumber));
        const updatedCurrentElement = getUpdatedSearchedElement(currentElement);
        updatedCurrentElement.typeOfSearchElement = newType;
        onChangedCurrentElem(updatedCurrentElement);
    };
    const handleTextChange = (value: string) => {
        const updatedCurrentElement = getUpdatedSearchedElement(currentElement);
        updatedCurrentElement.nameOfType = value;
        onChangedCurrentElem(updatedCurrentElement);
    };


    const handleAddChildElement = () => {
        const newCurrentElement = getUpdatedSearchedElement(currentElement);
        newCurrentElement.searchedElements = [...newCurrentElement.searchedElements, new SearchedElement(uuidv4())];
        onChangedCurrentElem(newCurrentElement);
    };
    const handleRemoveChildElement = (index: number) => {
        const newCurrentElement = getUpdatedSearchedElement(currentElement);
        newCurrentElement.searchedElements = newCurrentElement.searchedElements.filter((_, i) => i !== index);
        onChangedCurrentElem(newCurrentElement);
    };
    const handleChangedChildElement = (index: number, element: SearchedElement) => {
        const newCurrentElement = getUpdatedSearchedElement(currentElement);
        newCurrentElement.searchedElements[index] = element;
        onChangedCurrentElem(newCurrentElement);
    }; 

    const handleAddSearchedInfoField = () => {
        const newCurrentElement = getUpdatedSearchedElement(currentElement);
        newCurrentElement.searchedInfo = [...newCurrentElement.searchedInfo, new SearchedInfo(uuidv4())];
        onChangedCurrentElem(newCurrentElement);
    };
    const handleRemoveSearchedInfoField = (index: number) => {
        const newCurrentElement = getUpdatedSearchedElement(currentElement);
        newCurrentElement.searchedInfo = newCurrentElement.searchedInfo.filter((_, i) => i !== index);
        onChangedCurrentElem(newCurrentElement);
    };
    const handleChangedSearchedInfoField = (index: number, infoField: SearchedInfo) => {
        const newCurrentElement = getUpdatedSearchedElement(currentElement);
        newCurrentElement.searchedInfo[index] = infoField;
        onChangedCurrentElem(newCurrentElement);
    };

  
    return (
        <div className={CSS["element-form"]}>
            <div className={CSS["element-form__open-tag"]}>
                {"<"}
                <div className={CSS["element-form__open-tag-attrs"]}>
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


            <div className={CSS["element-form__content"]}>

                <div className={CSS["element-form__content-actions"]}>
                    <div className={CSS["element-form__content-action"]}>
                        <RoundedButton text='Add searched info' handleClick={() => handleAddSearchedInfoField()} />
                    </div>
                    <div className={CSS["element-form__content-action"]}>
                        <RoundedButton text='Add child element' handleClick={() => handleAddChildElement()} />
                    </div>
                </div>
                <div className={CSS["element-form__list-of-searched-info"]}>
                    {
                    currentElement.searchedInfo.length > 0
                        ? currentElement.searchedInfo.map((searchedInfoField, i) => (
                            <div className={CSS["element-form__searched-info-field"]} key={searchedInfoField.id}>
                                <SearchInfoInElemForm searchedInfo={searchedInfoField} setSearchedInfo={(newSearchedInfo) => handleChangedSearchedInfoField(i, newSearchedInfo)} infoIndex={i} />
                                <div className={CSS["element-form__searched-info-delete-btn"]}>
                                    <RoundedButton text='Remove searched info' handleClick={() => handleRemoveSearchedInfoField(i)} />
                                </div>
                            </div>
                        ))
                        : <p className={CSS["element-form__no-data-message"]}>No searched info selected</p>
                    }
                </div>
        
                <div className={CSS["element-form__list-of-child-elements"]}>
                    {
                    currentElement.searchedElements.length > 0 
                        ? currentElement.searchedElements.map((subElement, i) => {
                            const id = uuidv4();
                            return (
                            <div className={CSS["element-form__child-element"] + " elem-"+i} key={subElement.id}>
                                <div className={CSS["element-form__child-element-delete-btn"]}>
                                    <RoundedButton text='×' handleClick={() => handleRemoveChildElement(i)} />
                                </div>
                                <SearchElementForm searchedElement={subElement} setSearchedElement={(newElement: SearchedElement) => handleChangedChildElement(i, newElement)}/>
                            </div>
                        )})
                        : <div className={CSS["element-form__no-child-elements"]}>
                            <p>{"<>"}</p>
                            <p>{"</>"}</p>
                        </div>
                    }
                </div>
                    
            </div>
            
            <div className={CSS["element-form__close-tag"]}>
            {`</${selectedRadio==0?currentElement.nameOfType:""} id="${selectedRadio==1?currentElement.nameOfType:""}" class="${selectedRadio==2?currentElement.nameOfType:""}">`}
            </div>
        </div>
    );
});