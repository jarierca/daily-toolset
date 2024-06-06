import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showConfirmMessage, showErrorMessage } from "../../redux/Actions";
import AlertComponent from "../util/alert/AlertComponent";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";

const TextComparator = ({ toggleDarkMode, isDarkMode }) => {
  const dispatch = useDispatch();
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diffVisible, setDiffVisible] = useState(false);

  const handleText1Change = (event) => {
    setText1(event.target.value);
  };

  const handleText2Change = (event) => {
    setText2(event.target.value);
  };

  const compareTexts = () => {
    if (text1 === text2) {
      setDiffVisible(false);
      dispatch(
        showConfirmMessage({
          message: "The texts are identical.",
          duration: 5000,
        })
      );
    } else {
      setDiffVisible(true);
      dispatch(
        showErrorMessage({
          message: "The texts are different. See below for the differences.",
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
    setDiffVisible(false);
  };

  return (
    <div className="container mt-5">
      <div className="form-group">
        <div className="form-header-group">
          <div><h2 className="mb-4">Text Comparator</h2></div>
          <div className="btn-row mb-4">
            <button className="btn-icon btn-outline-secondary mx-3" onClick={compareTexts}>
              Compare Texts
            </button>
            <button className="btn-icon btn-outline-secondary" onClick={clearFields} title="Clear">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="btn-row mb-4">
          <textarea
            className="form-control"
            rows="15"
            value={text1}
            onChange={handleText1Change}
            placeholder="Text 1" />

          <textarea
            className="form-control"
            rows="15"
            value={text2}
            onChange={handleText2Change}
            placeholder="Text 2" />
        </div>
      </div>

      {diffVisible && (
        <ReactDiffViewer
          oldValue={text1}
          newValue={text2}
          splitView={true}
          compareMethod={DiffMethod.WORDS}
          styles={newStyles}
          leftTitle="Text 1"
          rightTitle="Text 2"
        />
      )}

      <AlertComponent />
    </div>

  );
};

export default TextComparator;

