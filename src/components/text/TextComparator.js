import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showConfirmMessage, showErrorMessage } from "../../redux/Actions";
import AlertComponent from "../util/alert/AlertComponent";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";

const TextComparator = ({ toggleDarkMode, isDarkMode }) => {
  const dispatch = useDispatch();
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diffVisible, setdiffVisible] = useState(false);

  const handleText1Change = (event) => {
    setText1(event.target.value);
  };

  const handleText2Change = (event) => {
    setText2(event.target.value);
  };

  const compareTexts = () => {

    if (text1 === text2) {
      setdiffVisible(false);
      dispatch(
        showConfirmMessage({
          message: "Los textos son iguales.",
          duration: 5000,
        })
      );
    } else {
      setdiffVisible(true);
      dispatch(
        showErrorMessage({
          message:
            "Los textos son diferentes. Consulta debajo para ver las diferencias.",
          duration: 5000,
        })
      );
    }
  }; 
  
  const newStyles = {
    variables: {
      light: {
        codeFoldGutterBackground: "#6F767E",
        codeFoldBackground: "#E2E4E5"
      }
    }
  };

  const clearFields = () => {
    setText1("");
    setText2("");
    setdiffVisible(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Comparador de Textos</h2>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <div className="btn-group mb-3">
          <button className="btn btn-outline-secondary" onClick={compareTexts}>
            Comparar Textos
          </button>
          <button className="btn btn-outline-secondary" onClick={clearFields}>
            Limpiar
          </button>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <textarea
            className="form-control"
            rows="15"
            value={text1}
            onChange={handleText1Change}
            placeholder="Texto 1"
          />
        </div>
        <div className="col-md-6">
          <textarea
            className="form-control"
            rows="15"
            value={text2}
            onChange={handleText2Change}
            placeholder="Texto 2"
          />
        </div>
      </div>
        
      {
        diffVisible && (<ReactDiffViewer
          oldValue={text1}
          newValue={text2}
          splitView={true}
          compareMethod={DiffMethod.WORDS}
          styles={newStyles}
          leftTitle="Texto 1"
          rightTitle="Texto 2"
        />)
      }
      
      <AlertComponent />

    </div>
  );
};

export default TextComparator;
