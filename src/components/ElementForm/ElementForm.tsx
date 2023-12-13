import React, { useCallback, useEffect, useState } from 'react'
import CSS from "./ElementForm.module.css"
import { SearchElementForm } from '../SearchElementForm/SearchElementForm';
import { RoundedButton } from '../UI/RoundedButton/RoundedButton';
import { ElementsContainer, SearchedElement, SearchedInfo } from '../../types';
import { SearchInfoInElemForm } from '../SearchInfoInElemForm/SearchInfoInElemForm';
type ElementFormProps = {
    onChildElementChange: (newChildElem: SearchedElement) => void;
}

export default function ElementForm({onChildElementChange}: ElementFormProps) {
    const [currentElement, setCurrentElement] = useState<SearchedElement>(new SearchedElement());
    const getNewSearchedElement = (el:SearchedElement): SearchedElement => Object.assign(new SearchedElement(), el) as SearchedElement; 


    const handleChangedCurrentAttributes = (elementsContainer: ElementsContainer) => {
        const newCurrentElement = getNewSearchedElement(currentElement);
        newCurrentElement.typeOfSearchElement = elementsContainer.typeOfSearchElement;
        newCurrentElement.nameOfType = elementsContainer.nameOfType;
        onChangedCurrentElem(newCurrentElement);
    };
    const onChangedCurrentElem = (newCurrentElem:SearchedElement) => {
        setCurrentElement(newCurrentElem);
        onChildElementChange(newCurrentElem);        
    };


    const handleAddChildElement = () => {
        const newCurrentElement = getNewSearchedElement(currentElement);
        newCurrentElement.searchedElements = [...newCurrentElement.searchedElements, new SearchedElement()];
        onChangedCurrentElem(newCurrentElement);
    };
    const handleRemoveChildElement = (index: number) => {
        const newCurrentElement = getNewSearchedElement(currentElement);
        newCurrentElement.searchedElements = newCurrentElement.searchedElements.filter((_, i) => i !== index);
        onChangedCurrentElem(newCurrentElement);
    };
    const handleChangedChildElement = (index: number, element: SearchedElement) => {
        const newCurrentElement = getNewSearchedElement(currentElement);
        newCurrentElement.searchedElements[index] = element;
        onChangedCurrentElem(newCurrentElement);
    }; 

    const handleAddSearchedInfoField = () => {
        const newCurrentElement = getNewSearchedElement(currentElement);
        newCurrentElement.searchedInfo = [...newCurrentElement.searchedInfo, new SearchedInfo()];
        onChangedCurrentElem(newCurrentElement);
    };
    const handleRemoveSearchedInfoField = (index: number) => {
        const newCurrentElement = getNewSearchedElement(currentElement);
        newCurrentElement.searchedInfo = newCurrentElement.searchedInfo.filter((_, i) => i !== index);
        onChangedCurrentElem(newCurrentElement);
    };
    const handleChangedSearchedInfoField = (index: number, infoField: SearchedInfo) => {
        const newCurrentElement = getNewSearchedElement(currentElement);
        newCurrentElement.searchedInfo[index] = infoField;
        onChangedCurrentElem(newCurrentElement);
    }; 
    
 
    return (
        <div className={CSS["element-form"]}>
            <h3 className={CSS["element-form__title"]}>Element Form</h3>
            <SearchElementForm callback={handleChangedCurrentAttributes} />
        
            <div className={CSS["element-form__list-of-searched-info"]}>
                {
                currentElement.searchedInfo.length > 0
                    ? currentElement.searchedInfo.map((searchedInfoField, index) => (
                        <div className={CSS["element-form__searched-info-field"]} key={index}>
                            <SearchInfoInElemForm callback={(searchedInfo) => handleChangedSearchedInfoField(index, searchedInfo)} />
                            <div className={CSS["element-form__searched-info-field-delete-btn"]}>
                                <RoundedButton text='Remove searched info' handleClick={() => handleRemoveSearchedInfoField(index)} />
                            </div>
                        </div>
                    ))
                    : <p className={CSS["element-form__no-data-message"]}>No searched info selected</p>
                }
            </div>
            <RoundedButton text='Add searched info in this element' handleClick={handleAddSearchedInfoField} />
        
            <div className={CSS["element-form__list-of-searched-elements"]}>
                {
                currentElement.searchedElements.length > 0 
                    ? currentElement.searchedElements.map((element, index) => (
                        <div className={CSS["element-form__child-searched-element"]} key={index}>
                            <ElementForm onChildElementChange={(newElement) => handleChangedChildElement(index, newElement)} />
                            <div className={CSS["element-form__child-searched-element-delete-btn"]}>
                                <RoundedButton text='Remove this element' handleClick={() => handleRemoveChildElement(index)} />
                            </div>
                        </div>
                    ))
                    : <p className={CSS["element-form__no-data-message"]}>No child elements selected</p>
                }
            </div>
        
            <RoundedButton text='Add child element' handleClick={handleAddChildElement} />
        </div>
    );
};