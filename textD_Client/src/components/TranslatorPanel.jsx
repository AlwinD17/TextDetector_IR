import React, { useState, useEffect } from 'react';
import { LanguageSelector, CopyableText } from '@components';

export const TranslatorPanel = ( {sourceText} ) => {
    const [sourceLanguage, setSourceLanguage] = useState('es');
    const [targetLanguage, setTargetLanguage] = useState('fr');
    const [translatedText, setTranslatedText] = useState('');
    
  
    const handleTranslate = () => {
      // Simulación de una petición al servidor
      setTranslatedText('Bonjour amis de Youtube');
    };
  
    return (
      <div className="flex flex-col items-center text-white p-6 rounded-lg">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col sm:flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col items-center w-full sm:w-full lg:w-1/2">
              <LanguageSelector selectedLanguage={sourceLanguage} onChange={setSourceLanguage} />
              <CopyableText text={sourceText} />
            </div>
            <span className="mx-4 text-lg text-black my-4 lg:my-0 dark:text-white">⇄</span>
            <div className="flex flex-col items-center w-full sm:w-full lg:w-1/2">
              <LanguageSelector selectedLanguage={targetLanguage} onChange={setTargetLanguage} />
              <CopyableText text={translatedText} />
            </div>
          </div>
          <div className="flex justify-center mt-6"> 
            <button
              className="px-5 py-3 font-medium rounded-md tracking-wide text-center text-white capitalize transition-colors duration-300 transform bg-accent rounded-md hover:bg-accentHover focus:outline-none focus:ring focus:ring-focusRing focus:ring-opacity-80"
              onClick={handleTranslate}
            >
              Traducir
            </button>
          </div>
        </div>
      </div>
    );
  };
