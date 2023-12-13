import React, { memo, useState } from 'react'
import CSS from "./SearchElementForm.module.css"
import Selectable from '../UI/Selectable/Selectable';
import {InputText} from '../UI/InputText/InputText';
import { ElementsContainer, TypeOfSearchingElement, getTypeOfSearchingElementByString } from '../../types';

interface SearchElementFormProps {
    callback:(elementsContainer:ElementsContainer)=>void
}

export const SearchElementForm = memo(({callback}: SearchElementFormProps) => {
    const [type, setType] = useState<TypeOfSearchingElement>(TypeOfSearchingElement.SearchByTag);
    const [valueOfType, setValueOfType] = useState<string>("");

    const handleTypeChange = (value: string) => {
        const newTypeOfSearchElement:TypeOfSearchingElement = getTypeOfSearchingElementByString(value);
        setType(newTypeOfSearchElement);
        callback(new ElementsContainer(newTypeOfSearchElement, valueOfType));
    };

    const handleValueOfTypeChange = (value: string) => {
        setValueOfType(value);
        callback(new ElementsContainer(type, value));
    };

    return (
        <div className={CSS["search-element"]}>
            <Selectable value={type} options={Object.keys(TypeOfSearchingElement)} callback={handleTypeChange} />
            <InputText value={valueOfType} onChange={handleValueOfTypeChange} placeholder='Text' textRequired={true} />
        </div>
    );
});