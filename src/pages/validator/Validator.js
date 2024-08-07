// src/pages/validator/Validator.js
import React from "react";

import JsonValidator from "../../components/validator/JsonValidator";
import XmlValidator from "../../components/validator/XmlValidator";
import HtmlValidator from "../../components/validator/HtmlValidator";
import AlertComponent from "../../components/util/alert/AlertComponent";

const Validator = () => {
  return (
    <div className="container">
      <h2>Validator Tools</h2>

      <JsonValidator />

      <div className="separator mt-5"></div>

      <XmlValidator />

      <div className="separator mt-5"></div>

      <HtmlValidator />

      <AlertComponent />
    </div>
  );
};

export default Validator;
