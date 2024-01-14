// src/pages/Identity.js
import React from "react";
import DniGenerator from "../components/Identity/dni/DniGenerator";
import DniValidator from "../components/Identity/dni/DniValidator";
import PhoneNumberGenerator from "../components/Identity/phone/PhoneNumberGenerator";
import LandlineNumberGenerator from "../components/Identity/phone/LandlineNumberGenerator";
import AlertComponent from "../components/util/alert/AlertComponent";

const Identity = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <div className="container-fluid">
      <h1>Bienvenido a DailyToolset</h1>
      <h2>Identity</h2>

      <div className="row">
        <div className="col-md-3">
          <DniGenerator />
        </div>
        <div className="col-md-3">
          <DniValidator />
        </div>
      </div>

      <hr className="my-4" />

      <div className="row">
        <div className="col-md-3">
          <PhoneNumberGenerator />
        </div>
        <div className="col-md-3">
          <LandlineNumberGenerator />
        </div>
      </div>

      <button onClick={toggleDarkMode}>
        {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
      </button>

      <AlertComponent />
    </div>
  );
};

export default Identity;
