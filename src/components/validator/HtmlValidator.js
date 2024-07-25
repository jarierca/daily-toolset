import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showInfoMessage, showSuccessMessage, showErrorMessage } from "../../redux/Actions";
import AlertComponent from "../util/alert/AlertComponent";
import "./validator.css";

const HtmlValidator = ({ toggleDarkMode, isDarkMode }) => {
  const dispatch = useDispatch();
  const [htmlText, setHtmlText] = useState("");
  const [error, setError] = useState("");

  const handleHtmlChange = (event) => {
    setHtmlText(event.target.value);
    setError("");
  };

  const validateHtml = (htmlString) => {
    const errors = [];
    const tagStack = [];
    const tagPattern = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;
    const selfClosingPattern = /<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*\/>/;

    let match;
    let lastIndex = 0;

    while ((match = tagPattern.exec(htmlString)) !== null) {
      const [fullMatch, tagName] = match;
      const tagStartIndex = match.index;
      const lineNumber = htmlString.slice(0, tagStartIndex).split('\n').length;

      if (fullMatch.startsWith('</')) {
        if (tagStack.length === 0 || tagStack[tagStack.length - 1] !== tagName) {
          errors.push({ line: lineNumber, message: `Unmatched closing tag: ${fullMatch}` });
        } else {
          tagStack.pop();
        }
      } else if (selfClosingPattern.test(fullMatch)) {
      } else {
        tagStack.push(tagName);
      }
      
      lastIndex = tagPattern.lastIndex;
    }

    tagStack.forEach(tag => {
      errors.push({ line: htmlString.split('\n').length, message: `Unclosed tag: <${tag}>` });
    });

    return errors;
  };

  const handleValidateClick = () => {
    try {
      const errors = validateHtml(htmlText);
      if (errors.length === 0) {
        setError("Valid HTML");
        dispatch(showSuccessMessage({ message: "Valid HTML.", duration: 2000 }));
      } else {
        setError(`Error, invalid HTML:\n${errors.map(e => `Line ${e.line}: ${e.message}`).join('\n')}`);
        dispatch(showErrorMessage({ message: `Error, invalid HTML. ${errors.length} error(s) found.`, duration: 2000 }));
      }
    } catch (e) {
      setError("Error, invalid HTML: " + e.message);
      dispatch(showErrorMessage({ message: "Error, invalid HTML.", duration: 2000 }));
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(htmlText);
    dispatch(showInfoMessage({ message: "COPIED.", duration: 2500 }));
  };

  const handleClearClick = () => {
    setHtmlText("");
    setError("");
    dispatch(showInfoMessage({ message: "CLEARED.", duration: 2500 }));
  };

  return (
    <div className="container mt-5">
      <div className="form-group">
        <div className="form-header-group">
          <div><h2 className="mb-4">HTML Validator</h2></div>
          <div className="btn-row mb-4">
            <button className="btn-icon btn-outline-secondary" onClick={handleValidateClick} title="Validate">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
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
          id="htmlTextarea"
          rows="15"
          value={htmlText}
          onChange={handleHtmlChange}>
        </textarea>
      </div>

      {error && (
        <div className="mt-4">
          <label>Result:</label>
          <div
            className={`border p-2 ${
              error.includes("Error") ? "text-danger" : "text-success"
            }`}
          >
            {error}
          </div>
        </div>
      )}

      <AlertComponent />
    </div>
  );
};

export default HtmlValidator;

