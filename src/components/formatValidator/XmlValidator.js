import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showConfirmMessage, showErrorMessage } from "./../../redux/actions";
import AlertComponent from "../util/alert/AlertComponent";

const XmlValidator = ({ toggleDarkMode, isDarkMode }) => {
    const dispatch = useDispatch();
  const [xmlText, setXmlText] = useState("");
  const [error, setError] = useState("");

  const handleXmlChange = (event) => {
    setXmlText(event.target.value);
    setError("");
  };

  const handleValidateClick = () => {
    const parser = new DOMParser();
    try {
      const xmlDoc = parser.parseFromString(xmlText, "application/xml");
      if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
        throw new Error("Error de análisis XML");
        dispatch(showErrorMessage({ message: "Error de análisis XML.", duration: 2000 }));
      }
      dispatch(showConfirmMessage({ message: "XML válido.", duration: 2000 }));
      setError("XML válido");
    } catch (e) {
      setError("Error al validar el XML: " + e.message);
      dispatch(showErrorMessage({ message: "Error al validar el XML.", duration: 2000 }));
    }
  };

  const handleClearClick = () => {
    setXmlText("");
    setError("");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Validador XML</h2>
      <div className="form-group">
        <textarea
          className="form-control"
          id="xmlTextarea"
          rows="15"
          value={xmlText}
          onChange={handleXmlChange}
        ></textarea>
      </div>
      <button className="btn btn-outline-secondary my-3" onClick={handleValidateClick}>
        Validar XML
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

export default XmlValidator;
