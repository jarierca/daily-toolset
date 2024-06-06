// JsonValidator.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showInfoMessage, showConfirmMessage, showErrorMessage } from "../../redux/Actions";
import AlertComponent from "../util/alert/AlertComponent";
import "./validator.css";

const JsonValidator = ({ toggleDarkMode, isDarkMode }) => {
  const dispatch = useDispatch();
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState("");

  const handleJsonChange = (event) => {
    setJsonText(event.target.value);
    setError("");
  };

  const handleValidateClick = () => {
    try {
      JSON.parse(jsonText);
      setError("Valid JSON");
      dispatch(showConfirmMessage({ message: "Valid JSON.", duration: 2000 }));
    } catch (e) {
      setError("Error, invalid JSON: " + e.message);
      dispatch(showErrorMessage({ message: "Error, invalid JSON.", duration: 2000 }));
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(jsonText);
    dispatch(showInfoMessage({ message: "COPIED.", duration: 2500 }));
  };

  const handleClearClick = () => {
    setJsonText("");
    setError("");
    dispatch(showInfoMessage({ message: "CLEARED.", duration: 2500 }));
  };

  return (
    <div className="container mt-5">
      <div className="form-group">
        <div className="form-header-group">
          <div><h2 className="mb-4">JSON Validator</h2></div>
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
          id="jsonTextarea"
          rows="15"
          value={jsonText}
          onChange={handleJsonChange}>
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

export default JsonValidator;

