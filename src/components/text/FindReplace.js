import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showInfoMessage } from "../../redux/Actions";
import AlertComponent from "../util/alert/AlertComponent";

const FindReplace = ({ toggleDarkMode, isDarkMode }) => {
  const dispatch = useDispatch();
  const [originalText, setOriginalText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [replaceText, setReplaceText] = useState("");

  const handleOriginalTextChange = (event) => {
    setOriginalText(event.target.value);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleReplaceTextChange = (event) => {
    setReplaceText(event.target.value);
  };

  const handleReplaceClick = () => {
    const regex = new RegExp(searchText, "g");
    const updatedText = originalText.replace(regex, replaceText);
    setOriginalText(updatedText);
  };

  const handleClearClick = () => {
    setOriginalText("");
    setSearchText("");
    setReplaceText("");
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(originalText);
    dispatch(showInfoMessage({ message: "COPIED.", duration: 2500 }));
  };

  return (
    <div className="container px-5">
      <div className="form-group">
        <div className="form-header-group">
          <div><h2 className="mb-4">Find & Replace</h2></div>
          <div className="btn-row mb-4">
             <button className="btn-icon btn-outline-secondary" onClick={handleReplaceClick}>
              Replace
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
        
        <div className="btn-row mb-4">
          <input placeholder="Search text..." className="inpt-txt" type="text" value={searchText} onChange={handleSearchTextChange} />
          <input placeholder="Replacement text..." className="inpt-txt ml-3 " type="text" value={replaceText} onChange={handleReplaceTextChange} />
        </div>

        <textarea
          placeholder="Enter text..."
          className="form-control"
          rows="10"
          value={originalText}
          onChange={handleOriginalTextChange}>
        </textarea>
      </div>

      <AlertComponent />
    </div>
  );
};

export default FindReplace;

