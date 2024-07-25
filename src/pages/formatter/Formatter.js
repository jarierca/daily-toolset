// src/pages/formatter/Formatter.js
import React from "react";

import JsonFormatter from "../../components/formatter/JsonFormatter";
import XmlFormatter from "../../components/formatter/XmlFormatter";
import SqlFormatter from "../../components/formatter/SqlFormatter";
import HtmlFormatter from "../../components/formatter/HtmlFormatter";
import AlertComponent from "../../components/util/alert/AlertComponent";

const Formatter = () => {
  return (
    <div className="container">
      <h2>Formatter Tools</h2>

      <JsonFormatter />

      <div className="separator mt-5"></div>

      <XmlFormatter />

      <div className="separator mt-5"></div>

      <SqlFormatter />

      <div className="separator mt-5"></div>

      <HtmlFormatter />

      <AlertComponent />
    </div>
  );
};

export default Formatter;
