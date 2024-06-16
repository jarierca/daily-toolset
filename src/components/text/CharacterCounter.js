import React, { useState } from "react";

const CharacterCounter = ({ toggleDarkMode, isDarkMode }) => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    const newText = event.target.value;
    setInputText(newText);
  };

  const handleClearClick = () => {
    setInputText("");
  };

  const characterCount = inputText.length;

  return (
    <div className="container mt-5 px-5">
      <div className="form-group">
        <div className="form-header-group">
          <div><h2 className="mb-4">Character Counter</h2></div>
            <div className="character-counter-text">Character Count: {characterCount}</div>
            <div className="btn-row mb-4">
              <button className="btn-icon btn-outline-secondary mx-3 character-counter-btn" onClick={handleClearClick} title="Clear">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>

          <textarea
            className="form-control"
            id="textarea"
            rows="4"
            value={inputText}
            onChange={handleInputChange}>
        </textarea>
      </div>
    </div>
  );
};

export default CharacterCounter;

