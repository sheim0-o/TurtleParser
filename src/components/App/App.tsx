import React from 'react';
import ParserPage from '../ParserPage/ParserPage';
import CSS from "./App.module.css"
import { BackgroundImage } from '../BackgroundImage/BackgroundImage';

function App() {
  return (
    <div className={CSS["App"]}>
      <BackgroundImage />
      <ParserPage />
    </div>
  );
}

export default App;