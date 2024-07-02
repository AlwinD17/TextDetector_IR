export const LanguageSelector = ({ selectedLanguage, onChange }) => {
    const languages = [
      { code: 'fr', label: 'Francés' },
      { code: 'es', label: 'Español' },
      { code: 'en', label: 'Inglés' },
      { code: 'ja', label: 'Japonés' },
      // Añade más idiomas según sea necesario
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