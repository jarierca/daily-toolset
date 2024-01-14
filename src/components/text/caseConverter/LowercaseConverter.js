import React, { useState } from "react";

const LowercaseConverter = () => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    const newText = event.target.value;
    setInputText(newText);
  };

  const handleLowercaseClick = () => {
    const lowercaseText = inputText.toLowerCase();
    setInputText(lowercaseText);
  };

  const handleClearClick = () => {
    setInputText("");
  };

  return (
    <div className="container mt-4">
      <div className="form-group">
        <label htmlFor="lowercaseTextarea">Introduce tu texto aquí:</label>
        <textarea
          className="form-control"
          id="lowercaseTextarea"
          rows="4"
          value={inputText}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <button className="btn btn-success" onClick={handleLowercaseClick}>
        Convertir a Minúsculas
      </button>
      <button className="btn btn-secondary ml-2" onClick={handleClearClick}>
        Limpiar
      </button>
    </div>
  );
};

export default LowercaseConverter;
