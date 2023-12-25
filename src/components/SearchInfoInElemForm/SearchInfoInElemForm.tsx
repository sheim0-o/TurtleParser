import React, { memo, useState } from 'react';
import CSS from "./SearchInfoInElemForm.module.css";
import { InputText } from '../UI/InputText/InputText';
import Selectable from '../UI/Selectable/Selectable';
import { SearchedInfo, TypeOfSearchedInfoPlace, getTypeOfSearchedInfoPlaceByString } from '../types';
import { localizedText, useLanguage } from '../LanguageContext/LanguageContext';

type SearchInfoInElemFormProps = {
  searchedInfo: SearchedInfo;
  setSearchedInfo:(searchedInfo:SearchedInfo)=>void;
  infoIndex:number;
};

export const SearchInfoInElemForm = memo(({ searchedInfo, setSearchedInfo, infoIndex }: SearchInfoInElemFormProps) => {
  const [currentSearchedInfo, setCurrentSearchedInfo] = useState<SearchedInfo>(searchedInfo);
  const { language } = useLanguage();

  const handleFieldNameChange = (value:string) => {
    const newSearchedInfo = new SearchedInfo(currentSearchedInfo.id, value, currentSearchedInfo.typeOfSearchedInfoPlace, currentSearchedInfo.attributeName);
    handleInfoUpdated(newSearchedInfo);
  };
  const handleTypeChange = (value: string) => {
    const newTypeOfValuePlace: TypeOfSearchedInfoPlace = getTypeOfSearchedInfoPlaceByString(value);
    const newSearchedInfo = new SearchedInfo(currentSearchedInfo.id, currentSearchedInfo.targetColumn, newTypeOfValuePlace, currentSearchedInfo.attributeName);
    handleInfoUpdated(newSearchedInfo);
  };
  const handleAttributeNameChange = (value:string) => {
    const newSearchedInfo = new SearchedInfo(currentSearchedInfo.id, currentSearchedInfo.targetColumn, currentSearchedInfo.typeOfSearchedInfoPlace, value);
    handleInfoUpdated(newSearchedInfo);
  };

  const handleInfoUpdated = (newInfo:SearchedInfo) => {
    setCurrentSearchedInfo(newInfo);
    setSearchedInfo(newInfo);
  }

  return (
    <div className={CSS['field-of-element']}>
      <h4 className={CSS["field-of-element__title"]}>{localizedText(language, "SEARCHED_INFO_ELEMENT")} {infoIndex+1}</h4>
      <InputText value={currentSearchedInfo.targetColumn} onChange={handleFieldNameChange} placeholder={localizedText(language, "SEARCHED_INFO_TARGET_TABLE_FIELD")} textRequired={true}/>
      <Selectable value={currentSearchedInfo.typeOfSearchedInfoPlace} options={Object.keys(TypeOfSearchedInfoPlace)} callback={handleTypeChange} />
      {
        currentSearchedInfo.typeOfSearchedInfoPlace === TypeOfSearchedInfoPlace.FromAttribute && 
          <InputText value={currentSearchedInfo.attributeName||''} onChange={handleAttributeNameChange} placeholder={localizedText(language, "SEARCHED_INFO_ATTRIBUTE_NAME")} textRequired={true}/>
      }
    </div>
  );
});
