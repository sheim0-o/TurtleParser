import React, { useState } from 'react'
import CSS from "./ContainerWithElements.module.css"
import {SearchElementForm} from '../SearchElementForm/SearchElementForm';
import { ElementsContainer } from '../../types';

type ContainerWithElementsProps = {
    listOfElements: ElementsContainer, 
    setListOfElements: React.Dispatch<React.SetStateAction<ElementsContainer>>
}

export default function ContainerWithElements({listOfElements, setListOfElements}: ContainerWithElementsProps) {
    const handleChange = (elementsContainer:ElementsContainer) => {
        const newElementsContainer = Object.assign(new ElementsContainer(), elementsContainer) as ElementsContainer;
        setListOfElements(newElementsContainer);
    };

    return (
        <div className={CSS["container-with-elements"]}>
            <h3 className={CSS["container-with-elements__title"]}>Container with searched element</h3>
            <SearchElementForm callback={handleChange} />
        </div>
    );
}