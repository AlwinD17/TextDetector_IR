import React, { useState, useEffect } from 'react';
import { LanguageSelector, CopyableText } from '@components';
import axios from 'axios'

export const TranslatorPanel = ( {sourceText, sourceAudio} ) => {

    const [targetLanguage, setTargetLanguage] = useState('fr');
    const [translatedText, setTranslatedText] = useState('');
    const [translatedAudio, setTranslatedAudio] = useState(null)
    
  
    const handleTranslate = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/translatorApi/translate/', {
          input: sourceText,
          to: targetLanguage
        });
  
        setTranslatedText(response.data.translatedText);
        setTranslatedAudio(response.data.translatedAudio);
      } catch (error) {
        console.error('Error translating text:', error);
      }
    };
  
    return (
      <div className="flex flex-col items-center text-white p-6 rounded-lg">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col sm:flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col items-center w-full sm:w-full lg:w-1/2">
              <CopyableText text={sourceText} audio={sourceAudio} />
            </div>
            <span className="mx-4 text-lg text-black my-4 lg:my-0 dark:text-white">⇄</span>
            <div className="flex flex-col items-center w-full sm:w-full lg:w-1/2">
              <LanguageSelector selectedLanguage={targetLanguage} onChange={setTargetLanguage} />
              <CopyableText text={translatedText} audio= {translatedAudio}/>
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
