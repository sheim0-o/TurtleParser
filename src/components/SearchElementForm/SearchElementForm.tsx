import React, { memo, useState } from 'react'
import CSS from "./SearchElementForm.module.css"
import { SearchedElement, SearchedInfo, TypeOfSearchingElement, getTypeOfSearchingElementByString } from '../../types';
import ElementAttribute from '../ElementAttribute/ElementAttribute';
import { RoundedButton } from '../UI/RoundedButton/RoundedButton';
import { SearchInfoInElemForm } from '../SearchInfoInElemForm/SearchInfoInElemForm';

interface SearchElementFormProps {
    searchedElement: SearchedElement;
    setSearchedElement: (searchedElement:SearchedElement) => void;
}

export const SearchElementForm = ({searchedElement, setSearchedElement}: SearchElementFormProps) => {    
    const getUpdatedSearchedElement = (el:SearchedElement): SearchedElement => Object.assign(new SearchedElement(), el) as SearchedElement; 
    const getTypeOfSearchingByIndex = (index:number) => Object.keys(TypeOfSearchingElement)[index];
    const getIndexOfTypeOfSearching = (type:TypeOfSearchingElement) => Object.keys(TypeOfSearchingElement).find(key => key === type);


    const [inputText, setInputText] = useState<string>(searchedElement.nameOfType);
    const [selectedRadio, setSelectedRadio] = useState<number>(1);

    
    const onChangedCurrentElem = (newCurrentElem:SearchedElement) => {
        setSearchedElement(newCurrentElem);    
    };

    const handleRadioChange = (inputNumber: number) => {
        const newType = getTypeOfSearchingElementByString(getTypeOfSearchingByIndex(inputNumber));
        setSelectedRadio(inputNumber);
        setInputText("");
        const updatedCurrentElement = getUpdatedSearchedElement(searchedElement);
        updatedCurrentElement.typeOfSearchElement = newType;
        onChangedCurrentElem(updatedCurrentElement);
    };
    const handleTextChange = (value: string) => {
        setInputText(value);
        const updatedCurrentElement = getUpdatedSearchedElement(searchedElement);
        updatedCurrentElement.nameOfType = value;
        onChangedCurrentElem(updatedCurrentElement);
    };


    const handleAddChildElement = () => {
        const newCurrentElement = getUpdatedSearchedElement(searchedElement);
        newCurrentElement.searchedElements = [...newCurrentElement.searchedElements, new SearchedElement()];
        onChangedCurrentElem(newCurrentElement);
    };
    const handleRemoveChildElement = (index: number) => {
        const newCurrentElement = getUpdatedSearchedElement(searchedElement);
        newCurrentElement.searchedElements = newCurrentElement.searchedElements.filter((_, i) => i !== index);
        onChangedCurrentElem(newCurrentElement);
    };
    const handleChangedChildElement = (index: number, element: SearchedElement) => {
        const newCurrentElement = getUpdatedSearchedElement(searchedElement);
        newCurrentElement.searchedElements[index] = element;
        onChangedCurrentElem(newCurrentElement);
    }; 

    const handleAddSearchedInfoField = () => {
        const newCurrentElement = getUpdatedSearchedElement(searchedElement);
        newCurrentElement.searchedInfo = [...newCurrentElement.searchedInfo, new SearchedInfo()];
        onChangedCurrentElem(newCurrentElement);
    };
    const handleRemoveSearchedInfoField = (index: number) => {
        const newCurrentElement = getUpdatedSearchedElement(searchedElement);
        newCurrentElement.searchedInfo = newCurrentElement.searchedInfo.filter((_, i) => i !== index);
        onChangedCurrentElem(newCurrentElement);
    };
    const handleChangedSearchedInfoField = (index: number, infoField: SearchedInfo) => {
        const newCurrentElement = getUpdatedSearchedElement(searchedElement);
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
                    searchedElement.searchedInfo.length > 0
                        ? searchedElement.searchedInfo.map((searchedInfoField, i) => (
                            <div className={CSS["element-form__searched-info-field"]} key={i}>
                                <SearchInfoInElemForm key={i} searchedInfo={searchedInfoField} callback={(newSearchedInfo) => handleChangedSearchedInfoField(i, newSearchedInfo)} infoIndex={i} />
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
                    searchedElement.searchedElements.length > 0 
                        ? searchedElement.searchedElements.map((element, i) => (
                            <div className={CSS["element-form__child-element"] + " elem-"+i} key={i}>
                                <div className={CSS["element-form__child-element-delete-btn"]}>
                                    <RoundedButton text='×' handleClick={() => handleRemoveChildElement(i)} />
                                </div>
                                <SearchElementForm searchedElement={element} setSearchedElement={(newElement: SearchedElement) => handleChangedChildElement(i, newElement)}/>
                            </div>
                        ))
                        : <div className={CSS["element-form__no-child-elements"]}>
                            <p>{"<>"}</p>
                            <p>{"</>"}</p>
                        </div>
                    }
                </div>
                    
            </div>
            

            <div className={CSS["element-form__close-tag"]}>{`</${selectedRadio==0?inputText:""} id="${selectedRadio==1?inputText:""}" class="${selectedRadio==2?inputText:""}">`}</div>
        </div>
    );
};



        
