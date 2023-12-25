import React from 'react';
import ParserPage from '../ParserPage/ParserPage';
import CSS from "./App.module.css"
import { BackgroundImage } from '../BackgroundImage/BackgroundImage';
import { CustomAlertProvider } from '../UI/CustomAlert/CustomAlertContext';
import { LanguageProvider } from '../LanguageContext/LanguageContext';

function App() {
  return (
    <div className={CSS["App"]}>
      <CustomAlertProvider>
        <LanguageProvider>
          <BackgroundImage />
          <ParserPage />
        </LanguageProvider>
      </CustomAlertProvider>
    </div>
  );
}

export default App;