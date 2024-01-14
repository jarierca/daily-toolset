import React, { useState } from "react";

const UppercaseConverter = () => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    const newText = event.target.value;
    setInputText(newText);
  };

  const handleUppercaseClick = () => {
    const uppercaseText = inputText.toUpperCase();
    setInputText(uppercaseText);
  };

  const handleClearClick = () => {
    setInputText("");
  };

  return (
    <div className="container mt-4">
      <div className="form-group">
        <label htmlFor="uppercaseTextarea">Introduce tu texto aquí:</label>
        <textarea
          className="form-control"
          id="uppercaseTextarea"
          rows="4"
          value={inputText}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <button className="btn btn-primary" onClick={handleUppercaseClick}>
        Convertir a Mayúsculas
      </button>
      <button className="btn btn-secondary ml-2" onClick={handleClearClick}>
        Limpiar
      </button>
    </div>
  );
};

export default UppercaseConverter;
