import { useState } from 'react'
import CSS from "./ParserPage.module.css"
import {RoundedButton} from '../UI/RoundedButton/RoundedButton';
import { ElementsContainer, PageParams, ParserForm, SearchedElement } from '../../types';
import {InputText} from '../UI/InputText/InputText';
import { handleDownload, isObjectFilled } from '../utility';
import {ContainerWithElements} from '../ContainerWithElements/ContainerWithElements';
import PageParamsForm from '../PageParamsForm/PageParamsForm';
import { v4 as uuidv4 } from 'uuid';

type ParserPageProps = {}

export default function ParserPage({}: ParserPageProps) {
  const [pageParams, setPageParams] = useState<PageParams>(new PageParams());
  const [elementsContainer, setElementsContainer] = useState<ElementsContainer>(new ElementsContainer());
  const [searchedElement, setSearchedElement] = useState<SearchedElement>(new SearchedElement(uuidv4()));
  const [url, setUrl] = useState<string>('');


  const handleParse = async () => {
    const parserForm: ParserForm = new ParserForm(url, pageParams, elementsContainer, searchedElement);
    console.log(parserForm)

    const formError = isObjectFilled(parserForm);
    if(formError != "")
    {
      alert(formError);
      return;
    }

    const jsonParserForm: string = JSON.stringify(parserForm);
    handleDownload(jsonParserForm);
    alert("Запрос был успешно отправлен! Ожидайте обратного ответа");
  };

  const handleSearchedElementChange = (newElement: SearchedElement) => {
    setSearchedElement(newElement);
  }
  const handleUrlChange = (value:string) => { setUrl(value); };

  return (    
    <div className={CSS["parser-page"]}>
      <h1 className={CSS["parser-page__title"]}>Turtle Parser App</h1>
      <InputText placeholder='Enter the url of the site page you need' value={url} onChange={(handleUrlChange)} textRequired={true} />

      <PageParamsForm pageParams={pageParams} setPageParams={setPageParams} />
      <ContainerWithElements 
        elementsContainer={elementsContainer} setElementsContainer={setElementsContainer} 
        searchedElement={searchedElement} setSearchedElement={(newElement:SearchedElement) => handleSearchedElementChange(newElement)}/>
      
      <div className={CSS["parser-page__send-btn"]}>
        <RoundedButton text='Send form' handleClick={()=>handleParse()} />
      </div>
    </div>
  );
};