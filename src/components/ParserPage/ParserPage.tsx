import { useState } from 'react'
import CSS from "./ParserPage.module.css"
import PageParamsForm from '../PageParamsForm/PageParamsForm';
import ListOfElementsForm from '../ContainerWithElements/ContainerWithElements';
import {RoundedButton} from '../UI/RoundedButton/RoundedButton';
import { ElementsContainer, PageParams, ParserForm, SearchedElement } from '../../types';
import {InputText} from '../UI/InputText/InputText';
import ElementForm from '../ElementForm/ElementForm';
import { handleDownload, isObjectFilled } from '../utility';

type ParserPageProps = {}

export default function ParserPage({}: ParserPageProps) {
  const [pageParams, setPageParams] = useState<PageParams>(new PageParams());
  const [containerWithElements, setContainerWithElements] = useState<ElementsContainer>(new ElementsContainer());
  const [searchedElement, setSearchedElement] = useState<SearchedElement>(new SearchedElement());
  const [url, setUrl] = useState<string>('');


  const handleParse = async () => {
    const parserForm: ParserForm = new ParserForm(url, pageParams, containerWithElements, searchedElement);

    const formError = isObjectFilled(parserForm);
    if(formError != "")
    {
      alert(formError);
      return;
    }

    const jsonParserForm: string = JSON.stringify(parserForm);
    handleDownload(jsonParserForm);
  };

  const handleSearchedElementChange = (element: SearchedElement) => {
    setSearchedElement(element);
  }
  const handleUrlChange = (value:string) => { setUrl(value); };

  return (    
    <div className={CSS["parser-page"]}>
      <h1 className={CSS["parser-page__title"]}>Turtle Parser</h1>
      <InputText placeholder='Enter the url of the site page you need' value={url} onChange={(handleUrlChange)} textRequired={true} />
      <PageParamsForm pageParams={pageParams} setPageParams={setPageParams} />
      <ListOfElementsForm listOfElements={containerWithElements} setListOfElements={setContainerWithElements} />
      <ElementForm onChildElementChange={(newElement:SearchedElement) => handleSearchedElementChange(newElement)} elemIndex={1}/>
      <div className={CSS["parser-page__send-btn"]}>
        <RoundedButton text='Send form' handleClick={()=>handleParse()} />
      </div>
    </div>
  );
};