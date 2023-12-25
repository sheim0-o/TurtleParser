import { useMemo, useState } from 'react'
import CSS from "./ParserPage.module.css"
import {RoundedButton} from '../UI/RoundedButton/RoundedButton';
import { ElementsContainer, PageParams, ParserForm, SearchedElement } from '../types';
import {InputText} from '../UI/InputText/InputText';
import { handleDownload, isObjectFilled } from '../../utils/sendRequestUtils';
import {ContainerWithElements} from '../ContainerWithElements/ContainerWithElements';
import PageParamsForm from '../PageParamsForm/PageParamsForm';
import { v4 as uuidv4 } from 'uuid';
import { useCustomAlert } from '../UI/CustomAlert/CustomAlertContext';
import InfoModal from '../UI/InfoModal/InfoModal';
import { MessagesType, localizedText, useLanguage } from '../LanguageContext/LanguageContext';
import LanguageSwitcher from '../LanguageContext/LanguageSwitcher/LanguageSwitcher';
import InfoButton from '../UI/InfoButton/InfoButton';
import { checkNumberOfSendedRequests, isFirstVisitSite } from '../../utils/utils';
import { AlertType } from '../UI/CustomAlert/ModalAlert/ModalAlert';

type ParserPageProps = {}


export default function ParserPage({}: ParserPageProps) {
  const [pageParams, setPageParams] = useState<PageParams>(new PageParams());
  const [elementsContainer, setElementsContainer] = useState<ElementsContainer>(new ElementsContainer());
  const [searchedElement, setSearchedElement] = useState<SearchedElement>(new SearchedElement(uuidv4()));
  const [url, setUrl] = useState<string>('');

  const isFirstVisit: boolean = useMemo(()=>isFirstVisitSite(), []);
  
  const [isModalOpen, setIsModalOpen] = useState(isFirstVisit);
  const { showCustomAlert } = useCustomAlert();
  const { language } = useLanguage();


  const handleParse = async () => {
    const parserForm: ParserForm = new ParserForm(url, pageParams, elementsContainer, searchedElement);

    const formError = isObjectFilled(parserForm);
    if(formError != "")
    {
      showCustomAlert("error", localizedText(language, formError as MessagesType));
      return;
    }
    if(!checkNumberOfSendedRequests())
    {
      showCustomAlert("error", localizedText(language, "MAX_NUMBER_OF_REQUESTS_HAS_BEEN_EXCEEDED"));
      return;
    }


    const jsonParserForm: string = JSON.stringify(parserForm);
    showCustomAlert("info", "Запрос был отправлен, ожидайте обратного ответа");
    handleDownload(jsonParserForm)
      .then((result)=> alertResult(result.status, result.message));
  };

  const alertResult = (status:string, message:string) => {
    if(status == "success")
      showCustomAlert(status as AlertType, localizedText(language, "MSG_SUCCESSFUL_REQUEST_TO_PARSER_API"));    
    else
      showCustomAlert(status as AlertType, message);
  }

  const handleSearchedElementChange = (newElement: SearchedElement) => {
    setSearchedElement(newElement);
  }
  const handleUrlChange = (value:string) => { setUrl(value); };



  return (
    <div className={CSS["parser-page"]}>
      <div className={CSS["parser-page__settings"]}>
        <LanguageSwitcher />
        <InfoButton onClick={()=>setIsModalOpen(!isModalOpen)}/>
      </div>

      <InfoModal modalTitle={localizedText(language, "START_TEXT_TITLE")} description={localizedText(language, "START_TEXT")} isOpen={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)} />
      
      <h1 className={CSS["parser-page__title"]}>Turtle Parser</h1>
      <InputText placeholder={localizedText(language, "TITLE_FOR_INPUT_URL")} value={url} onChange={(handleUrlChange)} textRequired={true} />

      <PageParamsForm pageParams={pageParams} setPageParams={setPageParams} />
      <ContainerWithElements 
        elementsContainer={elementsContainer} setElementsContainer={setElementsContainer} 
        searchedElement={searchedElement} setSearchedElement={(newElement:SearchedElement) => handleSearchedElementChange(newElement)}/>
      
      <div className={CSS["parser-page__send-btn"]}>
        <RoundedButton text={localizedText(language, "BUTTON_SEND_REQUEST_TEXT")} handleClick={()=>handleParse()} />
      </div>
    </div>
  );
};