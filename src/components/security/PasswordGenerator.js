import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showInfoMessage } from "../../redux/Actions";
import AlertComponent from "../util/alert/AlertComponent";

const PasswordGenerator = ({ toggleDarkMode, isDarkMode }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [useLowercaseChars, setUseLowercaseChars] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecialChars, setUseSpecialChars] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);

  const generatePassword = () => {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_-+=<>?/{}";

    let chars = "";

    if (useLowercaseChars) chars += lowercaseChars;
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
      <h2 className="mb-4">Password Generator</h2>
      <div className="row my-2">
        <div className="col-2">
            Password length:
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
          id="useLowercaseChars"
          checked={useLowercaseChars}
          onChange={() => setUseLowercaseChars(!useLowercaseChars)}
        />
        <label className="form-check-label" htmlFor="useLowercaseChars">
          Lowercase (a - z)
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
          Numbers (0 - 9)
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
          Special Characters (!@#$%^&*)
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
          Uppercase (A - Z)
        </label>
      </div>
        <button className="btn-icon btn-outline-secondary" onClick={generatePassword} title="Generate a password">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
          </svg>
        </button>
        <button className="btn-icon btn-outline-secondary mx-3" onClick={handleClearClick} title="Clear">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd"/>
          </svg>
        </button>
        <button className="btn-icon btn-outline-secondary" onClick={handleCopyClick} title="Copy">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z" clipRule="evenodd"/>
            <path fillRule="evenodd" d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z" clipRule="evenodd"/>
          </svg>
        </button>
      <div className="mt-3">
        <label htmlFor="generatedPassword">Generated Password</label>
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
