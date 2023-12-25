import React from 'react'
import CSS from "./LanguageSwitcher.module.css";
import { Language, useLanguage } from '../LanguageContext';

type Props = {}

export default function LanguageSwitcher({}: Props) {
  const { language, setLanguage } = useLanguage();
  const availableLanguages: Language[] = ["en", "ru"];

  return (
    <div className={CSS["language-switcher"]}>
      <select onChange={(e) => setLanguage(e.target.value as Language)} value={language}>
        {availableLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
}