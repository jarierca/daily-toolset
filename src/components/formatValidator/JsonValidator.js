import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showConfirmMessage, showErrorMessage } from "./../../redux/actions";
import AlertComponent from "../util/alert/AlertComponent";

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
      setError("JSON válido");
      dispatch(showConfirmMessage({ message: "JSON válido.", duration: 2000 }));
    } catch (e) {
      setError("Error al validar el JSON: " + e.message);
      dispatch(showErrorMessage({ message: "Error al validar el JSON.", duration: 2000 }));
    }
  };

  const handleClearClick = () => {
    setJsonText("");
    setError("");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Validador JSON</h2>
      <div className="form-group">
        <textarea
          className="form-control"
          id="jsonTextarea"
          rows="15"
          value={jsonText}
          onChange={handleJsonChange}
        ></textarea>
      </div>
      <button className="btn btn-outline-secondary my-3" onClick={handleValidateClick}>
        Validar JSON
      </button>
      <button className="btn btn-outline-secondary mx-3" onClick={handleClearClick}>
        Limpiar
      </button>
      {error && (
        <div className="mt-4">
          <label>Resultado:</label>
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
