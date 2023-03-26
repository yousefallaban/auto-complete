import React, { useRef, useState, useEffect, useCallback } from 'react';

import { getNextIndex } from '../../utils/utils';
import AutoCompleteOption from './AutoCompleteOption';
import HighlightText from './HighlightText';

interface Props {
  options: string[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onOptionSelected: (value: string) => void;
}

const AutoComplete: React.FC<Props> = ({ options, inputValue, onInputChange, onOptionSelected }) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showOptions, setShowOptions] = useState(false);

  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [options, inputValue]);

  useEffect(() => {
    if (listRef.current && highlightedIndex >= 0) {
      const highlightedElement = listRef.current.children[highlightedIndex];
      highlightedElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [highlightedIndex]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex(
            (prev) => getNextIndex(prev, options.length - 1, "up")
          );
          break;
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex((prev) => getNextIndex(prev, options.length - 1, "down"));
          break;
        case 'Enter':
        case 'Tab':
          if (highlightedIndex >= 0) {
            event.preventDefault();
            onOptionSelected(options[highlightedIndex]);
            setShowOptions(false);
          }
          break;
        case 'Escape':
          event.preventDefault();
          setHighlightedIndex(-1);
          setShowOptions(false);
          break;
      }
    },
    [highlightedIndex, options, onOptionSelected],
  );

  const handleOptionClick = (value: string) => {
    onOptionSelected(value);
    setShowOptions(false);
  };

  const handleShowOptions = () => {
    if (options.length > 0) {
      setShowOptions(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowOptions(false);
    }, 200);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value);
    setShowOptions(true);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        className="autocompleteInput"
        autoComplete="off"
        placeholder="Search..."
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleShowOptions}
        onBlur={handleBlur}
        onFocus={handleShowOptions}
        onKeyDown={handleKeyDown}
      />
      {showOptions && options.filter(Boolean).length > 0 && (
        <ul ref={listRef} className="autocompleteList">
          {options.map((option, index) => (
            <AutoCompleteOption
              key={option}
              option={option}
              highlighted={index === highlightedIndex}
              onOptionSelected={handleOptionClick}
            >
              <HighlightText text={option} highlight={inputValue} />
            </AutoCompleteOption>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
