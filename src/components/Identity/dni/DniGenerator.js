// src/components/dni/DniGenerator.js
import React, { useState } from "react";
import Card from "../../util/card/Card";

const DniGenerator = () => {
  const [generatedDni, setGeneratedDni] = useState("");

  const generateRandomDni = () => {
    const chain = "TRWAGMYFPDXBNJZSQVHLCKET";
    const num = String(Math.floor(Math.random() * 100000000)).padStart(8, "0");
    const letter = chain[num % 23];
    return num + letter;
  };

  return (
    <Card
      title="DNI"
      onRefresh={() => setGeneratedDni(generateRandomDni)} >
      {generatedDni && generatedDni}
    </Card>
  );
};

export default DniGenerator;
