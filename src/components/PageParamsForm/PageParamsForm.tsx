import React, { useEffect, useState } from 'react'
import CSS from "./PageParamsForm.module.css"
import { PageParams } from '../types'
import Checkbox from '../UI/Checkbox/Checkbox'
import InputNumber from '../UI/InputNumber/InputNumber'
import { InputText } from '../UI/InputText/InputText'
import { localizedText, useLanguage } from '../LanguageContext/LanguageContext'

type PageParamsFormProps = {
    pageParams: PageParams,
    setPageParams: React.Dispatch<React.SetStateAction<PageParams>>
}

export default function PageParamsForm({pageParams, setPageParams}: PageParamsFormProps) {
  const [isMultiplePages, setIsMultiplePages] = React.useState(pageParams.isMultiplePages);
  const [pageParameter, setPageParameter] = useState<string>('');
  const [firstPage, setFirstPage] = useState(pageParams.firstPage);
  const [step, setStep] = useState(pageParams.step);
  const [lastPage, setLastPage] = useState(pageParams.lastPage);

  const { language } = useLanguage();
  
  useEffect(() => {
    setPageParams(
    {
      isMultiplePages:isMultiplePages,
      nameOfPageParam:pageParameter,
      firstPage:firstPage,
      step:step,
      lastPage:lastPage
    } as PageParams);
  }, [isMultiplePages, firstPage, step, lastPage]);

  return (
    <div className={CSS["page-params-form"]}>
      <h3 className={CSS["page-params-form__title"]}>{localizedText(language, "PAGE_PARAMETERS_TITLE")}</h3>
      <div className={CSS["page-params-form__multiple-pages-checkbox"]}>
        <span>{localizedText(language, "PAGE_PARAMETERS_IS_MULTIPLE_PAGES")}</span> 
        <Checkbox isChecked={isMultiplePages} setIsChecked={(isChecked:boolean)=>setIsMultiplePages(isChecked)} />
      </div>
      
      {isMultiplePages && (
        <div className={CSS["page-params-form__multiple-pages-block"]}>
          <div className={CSS["page-params-form__multiple-pages-param"]}>
            <span>{localizedText(language, "PAGE_PARAMETERS_SET_QP_FOR_NUMBER_OF_PAGE")}</span> 
            <InputText placeholder='' value={pageParameter} onChange={(value:string) =>setPageParameter(value)} textRequired={true} />
          </div>
          <div className={CSS["page-params-form__multiple-pages-param"]}>
            <span>{localizedText(language, "PAGE_PARAMETERS_SET_START_PAGE")}</span> 
            <InputNumber number={firstPage} setNumber={(number:number)=>setFirstPage(number)} minNumber={1} />
          </div>
          <div className={CSS["page-params-form__multiple-pages-param"]}>
            <span>{localizedText(language, "PAGE_PARAMETERS_SET_STEP")}</span> 
            <InputNumber number={step} setNumber={(number:number)=>setStep(number)} minNumber={1} />
          </div>
          <div className={CSS["page-params-form__multiple-pages-param"]}>
            <span>{localizedText(language, "PAGE_PARAMETERS_SET_LAST_PAGE")}</span> 
            <InputNumber number={lastPage} setNumber={(number:number)=>setLastPage(number)} minNumber={1} />
          </div>
        </div>
      )}
    </div>
  )
}