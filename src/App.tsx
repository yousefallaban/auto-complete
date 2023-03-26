import React, { useState } from 'react';

import AutoComplete from './components/AutoComplete/AutoComplete';
import useDebounce from './hook/useDebounce';
import useJokeSearch from './hook/useJokeSearch';

import './App.css';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue, 500);

  const { options, isLoading, error } = useJokeSearch(debouncedInputValue);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleOptionSelected = (value: string) => {
    setInputValue(value);
  };

  return (
    <div className="appContainer">
      <h1>Chuck Norris Jokes</h1>
      <AutoComplete
        options={options}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onOptionSelected={handleOptionSelected}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default App;
