import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showInfoMessage } from "../../redux/Actions";
import AlertComponent from "../util/alert/AlertComponent";

const Base64EncoderDecoder = ({ toggleDarkMode, isDarkMode }) => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleEncode = () => {
    try {
      const encoded = btoa(inputText);
      setOutputText(encoded);
    } catch (error) {
      setOutputText("Error: " + error.message);
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(outputText);
    dispatch(showInfoMessage({ message: "COPIADO.", duration: 2500 }));
  };

  const handleDecode = () => {
    try {
      const decoded = atob(inputText);
      setOutputText(decoded);
    } catch (error) {
      setOutputText("Error: " + error.message);
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  return (
    <div className="container mt-5">
      <div className="form-header-group">
        <div><h2 className="mb-4">Base64 Encoder/Decoder</h2></div>
        <div className="btn-row mb-4">
          <button className="btn btn-outline-secondary" onClick={handleEncode}>
            Encode
          </button>
          <button className="btn btn-outline-secondary mx-3" onClick={handleDecode}>
            Decode
          </button>
          <button className="btn-icon btn-outline-secondary" onClick={handleClear} title="Clear">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd"/>
            </svg>
          </button>
          <button className="btn-icon btn-outline-secondary mx-3" onClick={handleCopyClick} title="Copy">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z" clipRule="evenodd"/>
              <path fillRule="evenodd" d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="form-group">
        <textarea
          className="form-control"
          id="inputText"
          value={inputText}
          onChange={handleInputChange}
          rows="5"
          cols="50"
        ></textarea>
      </div>

      <div className="form-header-group">
        <div><h2 className="mb-4">Result</h2></div>
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          id="outputText"
          value={outputText}
          readOnly
          rows="5"
          cols="50"
        ></textarea>
      </div>
      <AlertComponent />
    </div>
  );
};

export default Base64EncoderDecoder;
