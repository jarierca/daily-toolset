// src/pages/validator/Validator.js
import React from "react";

import JsonValidator from "../../components/validator/JsonValidator";
import XmlValidator from "../../components/validator/XmlValidator";
import AlertComponent from "../../components/util/alert/AlertComponent";

const Validator = () => {
  return (
    <div className="container-fluid">
      <h2>Validator Tools</h2>

      <JsonValidator />
      <XmlValidator />

      <AlertComponent />
    </div>
  );
};

export default Validator;
