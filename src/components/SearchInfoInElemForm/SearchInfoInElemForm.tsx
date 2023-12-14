import React, { memo, useEffect, useState } from 'react';
import CSS from "./SearchInfoInElemForm.module.css";
import { InputText } from '../UI/InputText/InputText';
import Selectable from '../UI/Selectable/Selectable';
import { SearchedInfo, TypeOfSearchedInfoPlace, getTypeOfSearchedInfoPlaceByString } from '../../types';

type SearchInfoInElemFormProps = {
  callback:(searchedInfo:SearchedInfo)=>void;
  elemIndex:number;
  infoIndex:number;
};

export const SearchInfoInElemForm = memo(({ callback, elemIndex, infoIndex }: SearchInfoInElemFormProps) => {
  const [fieldName, setFieldName] = useState<string>("");
  const [typeOfValuePlace, setTypeOfValuePlace] = useState<TypeOfSearchedInfoPlace>(TypeOfSearchedInfoPlace.InnerText);
  const [attributeName, setAttributeName] = useState<string | null>(null);

  const handleFieldNameChange = (value:string) => {
    setFieldName(value);
    callback(new SearchedInfo(value, typeOfValuePlace, attributeName));
  };

  const handleAttributeNameChange = (value:string) => {
    setAttributeName(value);
    callback(new SearchedInfo(fieldName, typeOfValuePlace, value));
  };
  
  const handleTypeChange = (value: string) => {
    const newTypeOfValuePlace: TypeOfSearchedInfoPlace = getTypeOfSearchedInfoPlaceByString(value);
    setTypeOfValuePlace(newTypeOfValuePlace);
    setAttributeName(newTypeOfValuePlace === TypeOfSearchedInfoPlace.InnerText ? null : "");
    callback(new SearchedInfo(fieldName, newTypeOfValuePlace, attributeName));
  };

  return (
    <div className={CSS['field-of-element']}>
      <h4 className={CSS["field-of-element__title"]}>Searched info {infoIndex} from element {elemIndex}</h4>
      <InputText value={fieldName} onChange={handleFieldNameChange} placeholder={"Enter field name"} textRequired={true}/>
      <Selectable value={typeOfValuePlace} options={Object.keys(TypeOfSearchedInfoPlace)} callback={handleTypeChange} />
      {
        typeOfValuePlace === TypeOfSearchedInfoPlace.FromAttribute && 
          <InputText value={attributeName||''} onChange={handleAttributeNameChange} placeholder={"Enter attribute name"} textRequired={true}/>
      }
    </div>
  );
});
