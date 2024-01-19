import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showInfoMessage } from "../../redux/Actions";
import AlertComponent from "../util/alert/AlertComponent";

const UrlEncoderDecoder = ({ toggleDarkMode, isDarkMode }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleEncode = () => {
    const encodedText = encodeURIComponent(text);
    setResult(encodedText);
  };

  const handleDecode = () => {
    const decodedText = decodeURIComponent(text);
    setResult(decodedText);
  };

  const handleClear = () => {
    setText("");
    setResult("");
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(result);
    dispatch(showInfoMessage({ message: "COPIADO.", duration: 2500 }));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">URL Encoder/Decoder</h2>
      <div className="form-group">
        <label htmlFor="url-text">Texto:</label>
        <textarea
          className="form-control"
          id="url-text"
          value={text}
          rows="5"
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="my-3">
        <button className="btn btn-outline-secondary me-2" onClick={handleEncode}>
          Codificar
        </button>
        <button className="btn btn-outline-secondary me-2" onClick={handleDecode}>
          Decodificar
        </button>
        <button className="btn btn-outline-secondary" onClick={handleClear}>
          Limpiar
        </button>
        <button className="btn btn-outline-secondary" onClick={handleCopyClick}>
          Copiar
        </button>
      </div>
      <div className="form-group">
        <label htmlFor="url-result">Resultado:</label>
        <textarea 
          className="form-control" 
          id="url-result" 
          value={result} 
          rows="5"
          readOnly />
      </div>
      <AlertComponent />
    </div>
  );
};

export default UrlEncoderDecoder;
