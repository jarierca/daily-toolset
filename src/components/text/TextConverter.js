import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showInfoMessage } from "../../redux/Actions";
import AlertComponent from "../util/alert/AlertComponent";

const TextConverter = ({ toggleDarkMode, isDarkMode }) => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const [convertedText, setConvertedText] = useState("");

  const handleInputChange = (event) => {
    const newText = event.target.value;
    setInputText(newText);
  };

  const handleUppercaseClick = () => {
    const uppercaseText = inputText.toUpperCase();
    setConvertedText(uppercaseText);
  };

  const handleLowercaseClick = () => {
    const lowercaseText = inputText.toLowerCase();
    setConvertedText(lowercaseText);
  };

  const handleClearClick = () => {
    setInputText("");
    setConvertedText("");
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(convertedText);
    dispatch(showInfoMessage({ message: "COPIED.", duration: 2500 }));
  };

  return (
    <div className="container px-5">
      <div className="form-group">
        <div className="form-header-group">
          <div><h2 className="mb-4">Convert Text to Uppercase or Lowercase</h2></div>
          <div className="btn-row mb-4">
            <button className="btn-icon btn-outline-secondary mx-3" onClick={handleUppercaseClick}>
              Convert to Uppercase
            </button>
            <button className="btn-icon btn-outline-secondary" onClick={handleLowercaseClick}>
              Convert to Lowercase
            </button>
            <button className="btn-icon btn-outline-secondary mx-3" onClick={handleClearClick} title="Clear">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd"/>
              </svg>
            </button>
            <button className="btn-icon btn-outline-secondary" onClick={handleCopyClick} title="Copy">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z" clipRule="evenodd"/>
                <path fillRule="evenodd" d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>

        <textarea
          className="form-control"
          id="converterTextarea"
          rows="4"
          value={inputText}
          onChange={handleInputChange} >
        </textarea>
      </div>
      
      {convertedText && (
        <div className="text-converter-result">
          <div className="text-converter-result-box">
            <label>Result:</label>
            <div className="text-converter-result-text">
              {convertedText}
            </div>
          </div>
        </div>
      )}

      <AlertComponent />
    </div>


  );
};

export default TextConverter;

