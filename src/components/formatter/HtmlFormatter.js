// HtmlFormatter.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showInfoMessage, showSuccessMessage, showErrorMessage } from "../../redux/Actions";
import AlertComponent from "../util/alert/AlertComponent";
import encodingOptions from '../../data/encodingOptions';

const HtmlFormatter = ({ toggleDarkMode, isDarkMode }) => {
  const dispatch = useDispatch();
  const [htmlText, setHtmlText] = useState("");
  const [formattedHtml, setFormattedHtml] = useState("");
  const [error, setError] = useState("");
  const [encoding, setEncoding] = useState("UTF-8");
  const [indentation, setIndentation] = useState("FOUR_SPACES");

  const handleHtmlChange = (event) => {
    setHtmlText(event.target.value);
    setError("");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setHtmlText(e.target.result);
      };
      reader.readAsText(selectedFile, encoding);
    }
  };

  const formatHtml = (htmlString, indentation) => {
    let indentSize;
    switch (indentation) {
      case "TWO_SPACES":
        indentSize = 2;
        break;
      case "THREE_SPACES":
        indentSize = 3;
        break;
      case "FOUR_SPACES":
        indentSize = 4;
        break;
      case "TABS":
        indentSize = '\t';
        break;
      case "COMPACT":
        indentSize = 0;
        break;
      default:
        indentSize = 4;
    }

    const indent = typeof indentSize === 'number' ? ' '.repeat(indentSize) : indentSize;
    let formattedHtml = "";
    let depth = 0;
    let inTag = false;
    let currentIndent = '';

    for (let i = 0; i < htmlString.length; i++) {
      let char = htmlString[i];
      if (char === '<') {
        if (htmlString[i + 1] === '/') {
          depth--;
          currentIndent = indent.repeat(depth);
        }
        if (!inTag) {
          formattedHtml += '\n' + currentIndent;
        }
        inTag = true;
        formattedHtml += char;
      } else if (char === '>') {
        inTag = false;
        formattedHtml += char;
        if (htmlString[i + 1] === '<' && htmlString[i + 2] !== '/') {
          depth++;
          currentIndent = indent.repeat(depth);
        }
      } else {
        formattedHtml += char;
      }
    }

    if (indentation === "COMPACT") {
      formattedHtml = formattedHtml.replace(/\n\s*\n/g, '\n');
    }

    return formattedHtml;
  };

  const handleFormatClick = () => {
    try {
      const formatted = formatHtml(htmlText, indentation);
      setFormattedHtml(formatted);
      setError("HTML formatted successfully.");
      dispatch(showSuccessMessage({ message: "HTML formatted successfully.", duration: 2000 }));
    } catch (e) {
      setFormattedHtml("");
      setError("Error, invalid HTML: " + e.message);
      dispatch(showErrorMessage({ message: "Error, invalid HTML.", duration: 2000 }));
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(formattedHtml);
    dispatch(showInfoMessage({ message: "Formatted HTML copied to clipboard.", duration: 2500 }));
  };

  const handleClearClick = () => {
    setHtmlText("");
    setFormattedHtml("");
    setError("");
    dispatch(showInfoMessage({ message: "Cleared.", duration: 2500 }));
  };

  return (
    <div className="container mt-5">
      <div className="form-group">
        <div className="form-header-group">
          <div><h2 className="mb-4">HTML Formatter</h2></div>
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
            <option value="COMPACT">Compact mode</option>
            <option value="TABS">Tab delimited</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">File Input:</label>
          <input
            type="file"
            className="form-control"
            accept=".html"
            onChange={handleFileChange}
          />
        </div>

        <textarea
          className="form-control"
          id="htmlTextarea"
          rows="5"
          value={htmlText}
          onChange={handleHtmlChange}
          placeholder="Enter HTML here"
        ></textarea>

        {formattedHtml && (
          <div className="mt-4">
            <label>Formatted HTML:</label>
            <textarea
              className="form-control"
              id="formattedHtmlTextarea"
              rows="15"
              value={formattedHtml}
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

export default HtmlFormatter;

