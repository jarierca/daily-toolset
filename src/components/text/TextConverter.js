import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showInfoMessage } from "./../../redux/actions";
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
    dispatch(showInfoMessage({ message: "COPIADO.", duration: 2500 }));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Convertir texto a mayúsculas o minúsculas</h2>
      <div className="form-group">
        <textarea
          className="form-control"
          id="converterTextarea"
          rows="4"
          value={inputText}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="btn-group my-3">
        <button className="btn btn-outline-secondary" onClick={handleUppercaseClick}>
          Convertir a Mayúsculas
        </button>
        <button className="btn btn-outline-secondary" onClick={handleLowercaseClick}>
          Convertir a Minúsculas
        </button>
      </div>
      <div className="btn-group m-3">
        <button className="btn btn-outline-secondary" onClick={handleClearClick}>
          Limpiar
        </button>
        <button className="btn btn-outline-secondary" onClick={handleCopyClick}>
          Copiar
        </button>
      </div>
      
      {convertedText && (
        <div className="my-4">
          <div className="border p-2">
            <label>Resultado:</label>
            <div className="overflow-auto">
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
