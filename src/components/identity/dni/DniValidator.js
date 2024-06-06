// src/components/DniValidator.js
import React, { useState } from 'react';
import ValidateCard from "../../util/card/ValidateCard";

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
    <ValidateCard title="DNI Validator" validateDni={() => setDni("")}>
      <div>
        <input type="text" value={dni} onChange={(e) => setDni(e.target.value)} />
        {isValid !== undefined && isValid && (
          <p>Valid DNI</p>
        )}
        {isValid !== undefined && !isValid && (
          <p>DNI inválido</p>
        )}
      </div>
    </ValidateCard>
  );
};

export default DniValidator;
