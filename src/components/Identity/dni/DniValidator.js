// src/components/DniValidator.js
import React, { useState } from 'react';

const DniValidator = () => {
  const [dni, setDni] = useState('');
  const [isValid, setIsValid] = useState(undefined);

  const validateDni = () => {
    const chain = "TRWAGMYFPDXBNJZSQVHLCKET";

    if (dni.length === 9) {
      const numPart = dni.substring(0, 8);
      const letterPart = dni.substring(8).toUpperCase();
      const calculatedLetter = chain[numPart % 23];

      setIsValid(letterPart === calculatedLetter);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div>
      <h2>Validador de DNI</h2>
      <label>
        Introduce un DNI:
        <input type="text" value={dni} onChange={(e) => setDni(e.target.value)} />
      </label>
      <button onClick={validateDni}>Validar DNI</button>
      {isValid !== undefined && isValid && (
        <p>DNI válido</p>
      )}
      {isValid !== undefined && !isValid && (
        <p>DNI inválido</p>
      )}
    </div>
  );
};

export default DniValidator;
