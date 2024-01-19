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
      <h2 className="mb-4">XML Encoder/Decoder</h2>
      <div className="mb-3">
        <textarea
          id="xmlInput"
          className="form-control"
          value={xmlInput}
          onChange={handleInputChange}
          rows={8}
        />
      </div>
      <div className="mb-3">
        <button className="btn btn-outline-secondary me-2" onClick={() => processXml(encodeXml)}>
          Encode
        </button>
        <button className="btn btn-outline-secondary me-2" onClick={() => processXml(decodeXml)}>
          Decode
        </button>
        <button className="btn btn-outline-secondary me-2" onClick={clearAll}>
          Limpiar
        </button>
        <button className="btn btn-outline-secondary" onClick={handleCopyClick}>
          Copiar
        </button>
      </div>
      <div className="mb-3">
        <label htmlFor="resultXml" className="form-label">Result:</label>
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
