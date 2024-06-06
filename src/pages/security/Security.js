// src/pages/security/Security.js
import React from "react";

import PasswordGenerator from "../../components/security/PasswordGenerator";
import AlertComponent from "../../components/util/alert/AlertComponent";

const Security = () => {
  return (
    <div className="container-fluid">
      <h2>Security Tools</h2>

      <div className="row">
        <div className="col-md-3">  
            <PasswordGenerator />
        </div>
      </div>

      <AlertComponent />
    </div>
  );
};

export default Security;
