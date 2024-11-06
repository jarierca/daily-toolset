import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showInfoMessage } from "../../redux/Actions";
import AlertComponent from "../util/alert/AlertComponent";

const SplitTextPositions = ({ toggleDarkMode, isDarkMode }) => {
  const dispatch = useDispatch();
  const [originalText, setOriginalText] = useState("");
  const [splitRange, setSplitRange] = useState("");
  const [splitResult, setSplitResult] = useState([]);

  const handleOriginalTextChange = (e) => {
    setOriginalText(e.target.value);
  };

  const handleSplitRangeChange = (e) => {
    setSplitRange(e.target.value);
  };

  const handleSplitText = () => {
    if (!splitRange) {
      setSplitResult([{ lineNumber: 1, parts: ["Error: Write some text separator range"] }]);
      return;
    }

    const ranges = splitRange.split(",").map((num) => parseInt(num.trim(), 10));

    if (ranges.some(isNaN)) {
      setSplitResult([{ lineNumber: 1, parts: ["Error: Not all separator are numbers"] }]);
      return;
    }

    const lines = originalText.trim().split("\n");
    const result = lines.map((line, lineIndex) => {
      if (!line) return { lineNumber: lineIndex + 1, parts: [] };

      let position = 0;
      let splitParts = [];

      ranges.forEach((range) => {
        const part = line.substring(position, position + range);
        if (part) {
          splitParts.push(part);
        }
        position += range;
      });

      if (position < line.length) {
        splitParts.push(line.substring(position));
      }

      return {
        lineNumber: lineIndex + 1,
        parts: splitParts,
      };
    });

    setSplitResult(result);
  };

  const handleClearClick = () => {
    setOriginalText("");
    setSplitRange("");
    setSplitResult([]);
  };

  const handleCopyClick = () => {
    const resultText = splitResult.map(line => {
      return `Linea ${line.lineNumber}:\n${line.parts.join('\n')}\n`;
    }).join('\n');

    navigator.clipboard.writeText(resultText)
      .then(() => {
        dispatch(showInfoMessage({ message: "COPIED.", duration: 2500 }));
      })
      .catch(err => {
        console.error('Error copying text: ', err);
      });
  };


  return (
    <div className="container px-5">
      <div className="form-group">
        <div className="form-header-group">
          <div><h2 className="mb-4">Split Text By Positions</h2></div>
          <div className="btn-row mb-4">
            <button className="btn-icon btn-outline-secondary" title="Split text" onClick={handleSplitText}>
              Split
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
          </div>
        </div>

        <div className="btn-row mb-4">
          <input
            placeholder="Write split ranges with comma separator Ex: 4,4,9,3"
            className="inpt-txt"
            type="text"
            value={splitRange}
            onChange={handleSplitRangeChange}
          />
        </div>

        <textarea
          placeholder="Write a line to split..."
          className="form-control mb-4"
          rows="5"
          value={originalText}
          onChange={handleOriginalTextChange}
        ></textarea>

        <div className="split-results mt-3">
          {splitResult.map((line, index) => (
            line.parts ? (
              <div key={index} className="line-container">
                <div className="row">
                  <div className="separator-v2 mt-3"></div>
                  <div className="line-number">
                    Line {line.lineNumber}
                  </div>
                  <div className="separator-v2 mt-3"></div>
                </div>
                {line.parts.map((part, partIndex) => (
                  <div key={partIndex} className="line-part">{part}</div>
                ))}
              </div>
            ) : null
          ))}
        </div>
      </div>
      <AlertComponent />
    </div>
  );
};

export default SplitTextPositions;

