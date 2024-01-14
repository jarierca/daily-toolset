// src/pages/Identity.js
import React from "react";

import TextComparator from "../components/text/TextComparator";
import AlertComponent from "../components/util/AlertComponent"; // Importa el componente de alerta

const Identity = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <div className="container-fluid">
      <h1>Bienvenido a DailyToolset</h1>
      <h2>Text Tools</h2>

      <div className="row">
        <div className="col-md-3">  
            <TextComparator />
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
