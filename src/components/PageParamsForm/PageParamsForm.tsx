import React, { useEffect, useState } from 'react'
import CSS from "./PageParamsForm.module.css"
import { PageParams } from '../../types'
import Checkbox from '../UI/Checkbox/Checkbox'
import InputNumber from '../UI/InputNumber/InputNumber'
import { InputText } from '../UI/InputText/InputText'

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

  const handlePageParameter = (value:string) => { setPageParameter(value); };
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
      <h2 className={CSS["page-params-form__title"]}>Page Parameters</h2>
      <div className={CSS["page-params-form__multiple-pages-checkbox"]}>
        <span>Is Multiple Pages</span> 
        <Checkbox isChecked={isMultiplePages} setIsChecked={(isChecked:boolean)=>setIsMultiplePages(isChecked)} />
      </div>
      
      {isMultiplePages && (
        <div className={CSS["page-params-form__multiple-pages-block"]}>
          <div className={CSS["page-params-form__multiple-pages-param"]}>
            <span>Set name of url page parameter</span> 
            <InputText placeholder='' value={pageParameter} onChange={(value:string) =>setPageParameter(value)} textRequired={true} />
          </div>
          <div className={CSS["page-params-form__multiple-pages-param"]}>
            <span>Set start page number</span> 
            <InputNumber number={firstPage} setNumber={(number:number)=>setFirstPage(number)} minNumber={1} />
          </div>
          <div className={CSS["page-params-form__multiple-pages-param"]}>
            <span>Set step</span> 
            <InputNumber number={step} setNumber={(number:number)=>setStep(number)} minNumber={1} />
          </div>
          <div className={CSS["page-params-form__multiple-pages-param"]}>
            <span>Set last page number</span> 
            <InputNumber number={lastPage} setNumber={(number:number)=>setLastPage(number)} minNumber={1} />
          </div>
        </div>
      )}
    </div>
  )
}