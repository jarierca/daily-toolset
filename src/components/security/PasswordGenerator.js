import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showInfoMessage } from "./../../redux/actions";
import AlertComponent from "../util/alert/AlertComponent";

const PasswordGenerator = ({ toggleDarkMode, isDarkMode }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [useLetters, setUseLetters] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecialChars, setUseSpecialChars] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);

  const generatePassword = () => {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_-+=<>?/{}";

    let chars = lowercaseChars;

    if (useUppercase) chars += uppercaseChars;
    if (useNumbers) chars += numberChars;
    if (useSpecialChars) chars += specialChars;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars.charAt(randomIndex);
    }

    setPassword(generatedPassword);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(password);
    dispatch(showInfoMessage({ message: "COPIADO.", duration: 2500 }));
  };

  const handleClearClick = () => {
    setPassword("");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Generador Contraseñas</h2>
      <div className="row my-2">
        <div className="col-2">
            Longitud de la Contraseña:
        </div>
        <div className="col-2">
            <input
                type="range"
                className="form-range"
                id="passwordLength"
                min="4"
                max="100"
                step="1"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                />         
        </div>
        <div className="col-1">
            <input
            type="number"
            className="form-control"
            id="passwordLength"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            />
        </div>
      </div>
      <div className="form-check mb-2">
        <input
          type="checkbox"
          className="form-check-input"
          id="useLetters"
          checked={useLetters}
          onChange={() => setUseLetters(!useLetters)}
        />
        <label className="form-check-label" htmlFor="useLetters">
          Utilizar Letras (a - z)
        </label>
      </div>
      <div className="form-check mb-2">
        <input
          type="checkbox"
          className="form-check-input"
          id="useNumbers"
          checked={useNumbers}
          onChange={() => setUseNumbers(!useNumbers)}
        />
        <label className="form-check-label" htmlFor="useNumbers">
          Utilizar Números (0 - 9)
        </label>
      </div>
      <div className="form-check mb-2">
        <input
          type="checkbox"
          className="form-check-input"
          id="useSpecialChars"
          checked={useSpecialChars}
          onChange={() => setUseSpecialChars(!useSpecialChars)}
        />
        <label className="form-check-label" htmlFor="useSpecialChars">
          Utilizar Caracteres Especiales (!@#$%^&*)
        </label>
      </div>
      <div className="form-check mb-2">
        <input
          type="checkbox"
          className="form-check-input"
          id="useUppercase"
          checked={useUppercase}
          onChange={() => setUseUppercase(!useUppercase)}
        />
        <label className="form-check-label" htmlFor="useUppercase">
          Utilizar Mayúsculas (A - Z)
        </label>
      </div>
      <button className="btn btn-outline-secondary my-3" onClick={generatePassword}>
        Generar Contraseña
      </button>
      <button
        className="btn btn-outline-secondary mx-3"
        onClick={handleCopyClick}
      >
        Copiar
      </button>
      <button
        className="btn btn-outline-secondary"
        onClick={handleClearClick}
      >
        Borrar
      </button>
      <div className="mt-3">
        <label htmlFor="generatedPassword">Contraseña Generada:</label>
        <input
          type="text"
          className="form-control"
          id="generatedPassword"
          readOnly
          value={password}
        />
      </div>

      <AlertComponent />
    </div>
  );
};

export default PasswordGenerator;
