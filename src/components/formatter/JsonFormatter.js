// JsonFormatter.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showInfoMessage, showSuccessMessage, showErrorMessage } from "../../redux/Actions";
import AlertComponent from "../util/alert/AlertComponent";
import encodingOptions from '../../data/encodingOptions';

const JsonFormatter = ({ toggleDarkMode, isDarkMode }) => {
  const dispatch = useDispatch();
  const [jsonText, setJsonText] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [error, setError] = useState("");
  const [encoding, setEncoding] = useState("UTF-8");
  const [indentation, setIndentation] = useState("FOUR_SPACES");
  const [braceStyle, setBraceStyle] = useState("COLLAPSE");

  const handleJsonChange = (event) => {
    setJsonText(event.target.value);
    setError("");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setJsonText(e.target.result);
      };
      reader.readAsText(selectedFile, encoding);
    }
  };

  const handleFormatClick = () => {
    try {
      const parsedJson = JSON.parse(jsonText);

      let indent = 2;
      switch (indentation) {
        case "TWO_SPACES":
          indent = 2;
          break;
        case "THREE_SPACES":
          indent = 3;
          break;
        case "FOUR_SPACES":
          indent = 4;
          break;
        case "TABS":
          indent = "\t";
          break;
        case "COMPACT":
          indent = 0;
          break;
        default:
          indent = 2;
          break;
      }

      const formatted = JSON.stringify(parsedJson, null, indent);

      const braceStyleRegex = braceStyle === "COLLAPSE" ? /(\{|\[)\s*(\w+:)/g : /(\{|\[)\s*(\w+:)/g;
      const finalFormattedJson = braceStyle === "EXPAND" ? formatted.replace(braceStyleRegex, "$1\n$2") : formatted;

      setFormattedJson(finalFormattedJson);
      setError("JSON formatted successfully.");
      dispatch(showSuccessMessage({ message: "JSON formatted successfully.", duration: 2000 }));
    } catch (e) {
      setFormattedJson("");
      setError("Error, invalid JSON: " + e.message);
      dispatch(showErrorMessage({ message: "Error, invalid JSON.", duration: 2000 }));
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(formattedJson);
    dispatch(showInfoMessage({ message: "Formatted JSON copied to clipboard.", duration: 2500 }));
  };

  const handleClearClick = () => {
    setJsonText("");
    setFormattedJson("");
    setError("");
    dispatch(showInfoMessage({ message: "Cleared.", duration: 2500 }));
  };

  return (
    <div className="container mt-5">
      <div className="form-group">
        <div className="form-header-group">
          <div><h2 className="mb-4">JSON Formatter</h2></div>
          <div className="btn-row mb-4">
            <button className="btn-icon btn-outline-secondary" onClick={handleFormatClick} title="Format">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 9h16M4 15h16m-7-6h.01M4 15h.01M11 15h.01M20 9h.01M15 9h.01M15 15h.01M20 15h.01"/>
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

        <div className="mb-3">
          <label className="form-label">File Encoding:</label>
          <select
            id="encoding"
            name="encoding"
            className="form-select"
            value={encoding}
            onChange={(e) => setEncoding(e.target.value)}
          >
            {encodingOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Indentation Level:</label>
          <select
            id="indentation"
            name="indentation"
            className="form-select"
            value={indentation}
            onChange={(e) => setIndentation(e.target.value)}
          >
            <option value="TWO_SPACES">2 spaces per indent level</option>
            <option value="THREE_SPACES">3 spaces per indent level</option>
            <option value="FOUR_SPACES">4 spaces per indent level</option>
            <option value="TABS">Tab delimited</option>
            <option value="COMPACT">Compact (1 line)</option>
            <option value="JAVASCRIPT">JavaScript escaped</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Brace Style:</label>
          <select
            id="braceStyle"
            name="braceStyle"
            className="form-select"
            value={braceStyle}
            onChange={(e) => setBraceStyle(e.target.value)}
          >
            <option value="COLLAPSE">Collapsed (braces on same line)</option>
            <option value="EXPAND">Expanded (braces on different line)</option>
          </select>
        </div>

        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            accept=".json"
            onChange={handleFileChange}
          />
        </div>

        <textarea
          className="form-control"
          id="jsonTextarea"
          rows="5"
          value={jsonText}
          onChange={handleJsonChange}
          placeholder="Enter JSON here"
        ></textarea>

        {formattedJson && (
          <div className="mt-4">
            <label>Formatted JSON:</label>
            <textarea
              className="form-control"
              id="formattedJsonTextarea"
              rows="15"
              value={formattedJson}
              readOnly
            ></textarea>
          </div>
        )}
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

export default JsonFormatter;

