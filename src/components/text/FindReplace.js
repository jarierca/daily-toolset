import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showInfoMessage } from "./../../redux/actions";
import AlertComponent from "../util/alert/AlertComponent";

const FindReplace = ({ toggleDarkMode, isDarkMode }) => {
  const dispatch = useDispatch();
  const [originalText, setOriginalText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [replaceText, setReplaceText] = useState("");

  const handleOriginalTextChange = (event) => {
    setOriginalText(event.target.value);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleReplaceTextChange = (event) => {
    setReplaceText(event.target.value);
  };

  const handleReplaceClick = () => {
    const regex = new RegExp(searchText, "g");
    const updatedText = originalText.replace(regex, replaceText);
    setOriginalText(updatedText);
  };

  const handleClearClick = () => {
    setOriginalText("");
    setSearchText("");
    setReplaceText("");
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(originalText);
    dispatch(showInfoMessage({ message: "COPIADO.", duration: 2500 }));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Buscar & Remplazar</h2>
      <div className="form-inline mb-2"> 
        <div className="form-group mr-2">
            <input
                placeholder="Texto a buscar..."
                type="text"
                className="form-control"
                id="searchText"
                value={searchText}
                onChange={handleSearchTextChange}
                />
        </div>
        <div className="form-group mr-2">
            <input
                placeholder="Texto de Reemplazo..."
                type="text"
                className="form-control"
                id="replaceText"
                value={replaceText}
                onChange={handleReplaceTextChange}
                />
        </div>
      </div>
      <div className="form-group">
        <textarea
          placeholder="Introduce un texto..."
          className="form-control"
          id="originalText"
          rows="10"
          value={originalText}
          onChange={handleOriginalTextChange}
        ></textarea>
      </div>
      <button
        className="btn btn-outline-secondary my-3"
        onClick={handleReplaceClick}
      >
        Reemplazar
      </button>
      <button
        className="btn btn-outline-secondary mx-3"
        onClick={handleCopyClick}
      >
        Copiar
      </button>
      <button
        className="btn btn-outline-secondary mx-3"
        onClick={handleClearClick}
      >
        Limpiar
      </button>

      <AlertComponent />
    </div>
  );
};

export default FindReplace;
