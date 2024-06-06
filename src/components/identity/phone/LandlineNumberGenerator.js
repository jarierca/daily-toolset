// src/components/LandlineNumberGenerator.js
import React, { useState } from "react";
import Card from "../../util/card/Card";

const LandlineNumberGenerator = () => {
  const [generatedLandlineNumber, setGeneratedLandlineNumber] = useState("");

  const generateRandomLandlineNumber = () => {
    const prefix = ["9", "8"][Math.floor(Math.random() * 2)];
    const randomNumber = Math.floor(Math.random() * 900000000) + 100000000;
    return `${prefix}${randomNumber}`;
  };

  return (
    <Card
      title="Teléfono Fijo"
      onRefresh={() => setGeneratedLandlineNumber(generateRandomLandlineNumber)} >
      {generatedLandlineNumber && generatedLandlineNumber }
    </Card>
  );
};

export default LandlineNumberGenerator;
