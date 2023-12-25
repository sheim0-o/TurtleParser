import axios from "axios";
import { ParserForm, SearchedElement, TypeOfSearchedInfoPlace } from "../components/types";
import { Language, localizedText, useLanguage } from "../components/LanguageContext/LanguageContext";
import { useCustomAlert } from "../components/UI/CustomAlert/CustomAlertContext";

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
      return "MSG_URL_IS_INCORRECT";
    //
    
    // if name of url page parameter filled, if isMultiplePages set true and query parameter for number of parameter
    if (obj.pageParams.isMultiplePages && !obj.pageParams.nameOfPageParam.trim())
      return "MSG_QP_FOR_NUMBER_OF_PARAMETER_IS_NOT_SET";
    //

    // if elementsContainer has empty nameOfType or exist empty fields in searched elements
    if (!(obj.elementsContainer.nameOfType.trim()) || !isAllFieldsInSearchedElementsFilled(obj.searchedElement))
      return "MSG_NOT_ALL_FIELDS_ARE_FILLED";
    //

    // if there are no SearchedInfo
    if (!hasAtLeastOneSearchedInfo)
      return "MSG_NO_ONE_SEARCHED_INFO";
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
    const response = await axios.post(process.env.REACT_APP_PYTHON_PARSER_URL+'/api/parser', { "api_key": process.env.REACT_APP_PARSER_API_KEY, json: jsonParserForm });
    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8' });
    
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'table.csv';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return {status:"success", message:""};
    
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
    console.error('Error:', error);
    return {status:"error", message:errorText};
  }
};