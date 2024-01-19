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
      <h2 className="mb-4">Base64 Encoder/Decoder</h2>
      <div className="form-group">
        <label htmlFor="inputText">Texto:</label>
        <textarea
          className="form-control"
          id="inputText"
          value={inputText}
          onChange={handleInputChange}
          rows="5"
          cols="50"
        ></textarea>
      </div>

      <div className="my-3">
        <button className="btn btn-outline-secondary" onClick={handleEncode}>
          Codificar
        </button>
        <button
          className="btn btn-outline-secondary mx-2"
          onClick={handleDecode}
        >
          Decodificar
        </button>
        <button
          className="btn btn-outline-secondary mx-2"
          onClick={handleClear}
        >
          Limpiar Todo
        </button>
        <button className="btn btn-outline-secondary" onClick={handleCopyClick}>
          Copiar
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="outputText">Resultado:</label>
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
