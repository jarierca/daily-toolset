import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showInfoMessage } from "../../redux/Actions";
import AlertComponent from "../util/alert/AlertComponent";

const XmlEncoderDecoder = ({ toggleDarkMode, isDarkMode }) => {
  const dispatch = useDispatch();
  const [xmlInput, setXmlInput] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (e) => {
    setXmlInput(e.target.value);
  };

  const processXml = (action) => {
    const processedXml = action(xmlInput);
    setResult(processedXml);
  };

  const clearAll = () => {
    setXmlInput("");
    setResult("");
  };

  const encodeXml = (str) => {
    return str.replace(/([&"<>])/g, function(_, item) {
      return xml_special_to_escaped_one_map[item];
    });
  };

  const decodeXml = (str) => {
    return str.replace(/(&quot;|&lt;|&gt;|&amp;)/g, function(_, item) {
      return escaped_one_to_xml_special_map[item];
    });
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(result);
    dispatch(showInfoMessage({ message: "COPIADO.", duration: 2500 }));
  };


  const xml_special_to_escaped_one_map = {
    '&': '&amp;',
    '"': '&quot;',
    '<': '&lt;',
    '>': '&gt;'
  };

  const escaped_one_to_xml_special_map = {
    '&amp;': '&',
    '&quot;': '"',
    '&lt;': '<',
    '&gt;': '>'
  };

  return (
    <div className="container mt-5">
      <div className="form-header-group">
        <div><h2 className="mb-4">XML Encoder/Decoder</h2></div>
        <div className="btn-row mb-4">
          <button className="btn btn-outline-secondary" onClick={() => processXml(encodeXml)}>
            Encode
          </button>
          <button className="btn btn-outline-secondary mx-3" onClick={() => processXml(decodeXml)}>
            Decode
          </button>
          <button className="btn-icon btn-outline-secondary" onClick={clearAll} title="Clear">
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
          id="xmlInput"
          className="form-control"
          value={xmlInput}
          onChange={handleInputChange}
          rows={8}
        />
      </div>

      <div className="form-header-group">
        <div><h2 className="mb-4">Result</h2></div>
      </div>

      <div className="form-group">
        <textarea
          id="resultXml"
          className="form-control"
          value={result}
          readOnly
          rows={8}
        />
      </div>
      <AlertComponent />
    </div>
  );
};

export default XmlEncoderDecoder;
