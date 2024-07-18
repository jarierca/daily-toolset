// src/components/PhoneNumberGenerator.js
import React, { useState } from "react";
import Card from "../../util/card/Card";

const PhoneNumberGenerator = ({ isDarkMode, toggleDarkMode }) => {
  const [generatedPhoneNumber, setGeneratedPhoneNumber] = useState("");

  const generateRandomMobileNumber = () => {
    const randomNumber = Math.floor(Math.random() * 900000000) + 100000000;
    const prefix = ["6", "7"][Math.floor(Math.random() * 2)];
    return `${prefix}${randomNumber}`;
  };

  return (
    <Card
      title="Phone Number"
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      onRefresh={() => setGeneratedPhoneNumber(generateRandomMobileNumber)}
    >
      {generatedPhoneNumber && generatedPhoneNumber}
    </Card>
  );
};

export default PhoneNumberGenerator;
