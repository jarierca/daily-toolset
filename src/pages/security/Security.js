// src/pages/security/Security.js
import React from "react";

import PasswordGenerator from "../../components/security/PasswordGenerator";
import AlertComponent from "../../components/util/alert/AlertComponent";

const Security = () => {
  return (
    <div className="container">
      <h2>Security Tools</h2>

      <PasswordGenerator />

      <div className="separator mt-5"></div>

      <AlertComponent />
    </div>
  );
};

export default Security;
