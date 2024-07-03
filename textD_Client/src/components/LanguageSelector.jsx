export const LanguageSelector = ({ selectedLanguage, onChange }) => {
    const languages = [
      { code: 'de', label: 'Alemán'},
      { code: 'ar', label: 'Árabe'},
      { code: 'zh', label: 'Chino'},
      { code: 'ko', label: 'Coreano'},
      { code: 'es', label: 'Español' },
      { code: 'fr', label: 'Francés' },
      { code: 'en', label: 'Inglés' },
      { code: 'it', label: 'Italiano'},
      { code: 'ja', label: 'Japonés' },
      { code: 'pt', label: 'Portugués'},
      { code: 'ru', label: 'Ruso'},
    ];
  
    return (
      <select
        className="bg-accent text-white  dark:bg-gray-800  p-2 rounded-lg mb-2"
        value={selectedLanguage}
        onChange={(e) => onChange(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    );
  };