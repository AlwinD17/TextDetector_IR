import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

export const CopyableText = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="relative bg-translated text-black dark:text-white p-4 min-h-44 sm:w-11/12 lg:min-h-96 lg:w-96 rounded mx-auto dark:bg-translatedDark">
      <pre className="whitespace-pre-wrap font-mono">{text}</pre>
      <div className="absolute top-2 right-2 flex space-x-2">
        <button className="bg-accent dark:bg-gray-700 text-white p-2 rounded hover:bg-gray-300" onClick={handleSpeak}>
          <FontAwesomeIcon icon={faVolumeUp} />
        </button>
        <CopyToClipboard text={text} onCopy={handleCopy}>
          <button className="bg-accent dark:bg-gray-700 text-white p-2 rounded hover:bg-gray-300">
            {copied ? <span className="bg-green-600 text-white p-1 rounded">Copied!</span> : <FontAwesomeIcon icon={faClipboard} />}
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
};