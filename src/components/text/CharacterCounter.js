import React, { useState } from "react";

const CharacterCounter = ({ toggleDarkMode, isDarkMode }) => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    const newText = event.target.value;
    setInputText(newText);
  };

  const handleClearClick = () => {
    setInputText("");
  };

  const characterCount = inputText.length;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Contador de caracteres</h2>
      <div className="form-group">
        <textarea
          className="form-control"
          id="textarea"
          rows="4"
          value={inputText}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <p className="my-3">Número de caracteres: {characterCount}</p>
      <button className="btn btn-outline-secondary" onClick={handleClearClick}>
        Limpiar
      </button>
    </div>
  );
};

export default CharacterCounter;
