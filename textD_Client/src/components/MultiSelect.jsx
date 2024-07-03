import { useState } from 'react';
import { Menu, MenuItem } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

export const MultiSelect = ({ options, selectedOptions, onChange, placeholder = 'Seleccionar idioma(s)' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filteredOptions = query === ''
    ? options
    : options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase())
      );

  
      const handleSelect = (value) => {
        const newSelection = selectedOptions.includes(value)
            ? selectedOptions.filter(option => option !== value)
            : [...selectedOptions, value];
        
        onChange(newSelection);
    };

  return (
    <div className="relative sm:ml-4 lg:ml-0 lg:mt-4">
      <button
        type="button"
        className="bg-white/80 text-black rounded-lg shadow-xl dark:text-white dark:bg-black/50 p-2 rounded-lg flex items-center justify-between "
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">Idiomas</span>
        <ChevronDownIcon className="w-5 h-5 ml-2 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white" aria-hidden="true" />
      </button>
      
      {isOpen && (
        <div className="absolute mt-2 max-h-32 overflow-auto rounded-xl border border-white/5 bg-white/5 p-1 shadow-lg z-10">
          <input
            type="text"
            placeholder="Buscar..."
            className={clsx(
              'w-full rounded-lg border-none bg-white/10 py-1.5 px-3 text-sm text:black dark:text-white',
              'focus:outline-none focus:ring-2 focus:ring-blue-500'
            )}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Menu as="ul" className="mt-1">
            {filteredOptions.map((option) => (
              <MenuItem key={option.code}>
                {({ active }) => (
                  <li
                    onClick={() => handleSelect(option.code)}
                    className={clsx(
                      'group flex cursor-pointer items-center gap-2 rounded-lg py-2 px-3 select-none',
                      selectedOptions.includes(option.code) ? 'bg-accent text-black dark:text-white' : 'text-gray-900 dark:text-gray-100',
                      active ? 'bg-gray-200 dark:bg-gray-600' : ''
                    )}
                  >
                    <CheckIcon
                      className={clsx(
                        'w-5 h-5 text-black/60 dark:text-white/60',
                        selectedOptions.includes(option.code) ? 'visible' : 'invisible'
                      )}
                      aria-hidden="true"
                    />
                    <div className="text-sm  text-black dark:text-white">{option.label}</div>
                  </li>
                )}
              </MenuItem>
            ))}
          </Menu>
        </div>
      )}
    </div>
  );
};
