import axios from "axios";
import { ParserForm, SearchedElement, TypeOfSearchedInfoPlace } from "../types";
import { PARSER_API_KEY, PYTHON_PARSER_URL } from "../strings";

export const isObjectFilled = (obj: ParserForm): string => {
    let hasAtLeastOneSearchedInfo:boolean = false;
    const isAllFieldsInSearchedElementsFilled = (searchedElement: SearchedElement): boolean => {
      // if all fields not empty in object searchedInfo array
      for (const infoItem of searchedElement.searchedInfo) {
        hasAtLeastOneSearchedInfo = true;

        if (!infoItem.targetColumn?.trim()) {
          return false;
        }

        if (infoItem.typeOfSearchedInfoPlace !== TypeOfSearchedInfoPlace.InnerText) {
          if (!infoItem.attributeName?.trim()) {
            return false;
          }
        }
      }

      // if all fields not empty in object searchedInfo array
      if(!searchedElement.nameOfType.trim())
        return false;
        
      for (const subElement of searchedElement.searchedElements) {
        const isAllFieldsFilledInSubElement = isAllFieldsInSearchedElementsFilled(subElement);
        if(!isAllFieldsFilledInSubElement)
          return false;
      }

      return true;
    }

    // if url is empty
    if (!isValidUrl(obj.url)) 
      return "The URL is incorrect!";
    //
    
    // if name of url page parameter filled, if isMultiplePages set true 
    if (obj.pageParams.isMultiplePages && !obj.pageParams.nameOfPageParam.trim())
      return "The name for the page parameter is not set!";
    //

    // if elementsContainer has empty nameOfType
    if (!obj.elementsContainer.nameOfType.trim())
      return "Not not all required fields are filled in!";
    //

    // if all fields in searched elements filled
    if (!isAllFieldsInSearchedElementsFilled(obj.searchedElement))
      return "Not not all required fields are filled in!";
    //

    // if there are no SearchedInfo
    if (!hasAtLeastOneSearchedInfo)
      return "At least one searched info is needed!";
    //

    // if all fields and data are entered correctly
    return "";
};


export function isValidUrl(url: string): boolean {
  const urlPattern = /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/;
  return urlPattern.test(url);
}

export const handleDownload = async (jsonParserForm:string) => {
  try {
    const response = await axios.post(PYTHON_PARSER_URL+'/api/parser', { "api_key": PARSER_API_KEY, json: jsonParserForm });
    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8' });
    
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'table.csv';

    alert("Данные были успешно получены! Сейчас начнётся загрузка файла.");
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  } catch (error) {
    let errorText = "";
    if (axios.isAxiosError(error))
    {
      const responseData = error.response?.data.detail;
      if(responseData?.error)
        errorText = responseData.error;
      else if(responseData?.result_data?.errors[0]?.error)
        errorText = responseData.result_data?.errors[0]?.error;
      else
        errorText = error.message;
    }
    if(errorText!="")
      alert(errorText)
    console.error('Error:', error);
  }
};