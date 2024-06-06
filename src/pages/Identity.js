// src/pages/Identity.js
import React from "react";
import DniGenerator from "../components/identity/dni/DniGenerator";
import DniValidator from "../components/identity/dni/DniValidator";
import PhoneNumberGenerator from "../components/identity/phone/PhoneNumberGenerator";
import LandlineNumberGenerator from "../components/identity/phone/LandlineNumberGenerator";
import AlertComponent from "../components/util/alert/AlertComponent";

const Identity = () => {
  return (
    <div className="container">
      <h1>Bienvenido a DailyToolset</h1>
      <h2>Identity</h2>

      <div className="row">
          <DniGenerator />
          <DniValidator />
      </div>

      <hr className="separator" />

      <div className="row">
          <PhoneNumberGenerator />
          <LandlineNumberGenerator />
      </div>

      <AlertComponent />
    </div>
  );
};

export default Identity;
