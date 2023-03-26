import React from 'react';

interface AutoCompleteOptionProps {
  option: string;
  children: React.ReactNode;
  onOptionSelected: (value: string) => void;
  highlighted: boolean;
}

const AutoCompleteOption: React.FC<AutoCompleteOptionProps> = ({ option, children, onOptionSelected, highlighted }) => {
  const handleClick = () => {
    onOptionSelected(option);
  };

  return (
    <li
      className={`item ${highlighted && 'itemHighlighted'}`}
      aria-label="AutoComplete Option"
      data-value={option}
      tabIndex={0}
      onClick={handleClick}
    >
      {React.Children.map(children, (child) =>
        typeof child === 'string' ? (
          <strong>{child}</strong>
        ) : (
          child
        ),
      )}
    </li>
  );
};

export default AutoCompleteOption;
