import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showSuccessMessage, showErrorMessage } from "../../redux/Actions";

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
        showSuccessMessage({
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

  const clearFields = () => {
    setText1("");
    setText2("");
    setDiffVisible(false);
  };

  // Compute diffs between the two texts
  const computeDiff = (text1, text2) => {
    const diff = [];
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");

    const maxLength = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < maxLength; i++) {
      const line1 = lines1[i] || "";
      const line2 = lines2[i] || "";

      if (line1 !== line2) {
        if (line1) diff.push({ type: 'removed', lineNumber: i + 1, content: line1 });
        if (line2) diff.push({ type: 'added', lineNumber: i + 1, content: line2 });
      } else {
        diff.push({ type: 'unchanged', lineNumber: i + 1, content: line1 });
      }
    }

    return diff;
  };

  const renderDiff = () => {
    const diff = computeDiff(text1, text2);
    const groupedDiff = [];

    diff.forEach(item => {
      if (groupedDiff.length === 0) {
        groupedDiff.push([item]);
      } else {
        const lastItem = groupedDiff[groupedDiff.length - 1];
        if (lastItem[0].lineNumber === item.lineNumber) {
          lastItem.push(item);
        } else {
          groupedDiff.push([item]);
        }
      }
    });

    return (
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#ddd' : '#333' }}>
        <thead>
          <tr>
            <th style={{ width: '50px', textAlign: 'center', backgroundColor: isDarkMode ? '#444' : '#f4f4f4' }}>Line</th>
            <th style={{ width: '20px', textAlign: 'center', backgroundColor: isDarkMode ? '#444' : '#f4f4f4' }}></th>
            <th style={{ padding: '8px', backgroundColor: isDarkMode ? '#444' : '#f4f4f4' }}>Text 1</th>
            <th style={{ width: '50px', textAlign: 'center', backgroundColor: isDarkMode ? '#444' : '#f4f4f4' }}>Line</th>
            <th style={{ width: '20px', textAlign: 'center', backgroundColor: isDarkMode ? '#444' : '#f4f4f4' }}></th>
            <th style={{ padding: '8px', backgroundColor: isDarkMode ? '#444' : '#f4f4f4' }}>Text 2</th>
          </tr>
        </thead>
        <tbody>
          {groupedDiff.map((group, index) => {
            const isLineRemoved = group.some(item => item.type === 'removed');
            const isLineAdded = group.some(item => item.type === 'added');
            const isLineUnchanged = group.every(item => item.type === 'unchanged');
            const firstItem = group[0];

            return (
              <tr key={index}>
                <td style={{ textAlign: 'center', backgroundColor: 'rgb(247, 247, 247)' }}>
                  {isLineRemoved || isLineAdded || isLineUnchanged ? firstItem.lineNumber : ''}
                </td>
                <td style={{ textAlign: 'center', color: isLineRemoved ? '#000' : 'transparent', backgroundColor: isLineRemoved ? '#fdd' : 'transparent' }}>
                  {isLineRemoved ? '-' : ''}
                </td>
                <td style={{ padding: '8px', backgroundColor: isLineRemoved ? '#fdd' : isLineUnchanged ? 'transparent' : 'transparent' }}>
                  {isLineRemoved ? group.map(item => item.type === 'removed' ? item.content : '').join('\n') : ''}
                  {isLineUnchanged ? group.map(item => item.type === 'unchanged' ? item.content : '').join('\n') : ''}
                </td>
                <td style={{ textAlign: 'center', backgroundColor: 'rgb(247, 247, 247)' }}>
                  {isLineAdded || isLineUnchanged ? firstItem.lineNumber : ''}
                </td>
                <td style={{ textAlign: 'center', color: isLineAdded ? '#000' : 'transparent', backgroundColor: isLineAdded ? '#d0f0c0' : 'transparent' }}>
                  {isLineAdded ? '+' : ''}
                </td>
                <td style={{ padding: '8px', backgroundColor: isLineAdded ? '#d0f0c0' : isLineUnchanged ? 'transparent' : 'transparent' }}>
                  {isLineAdded ? group.map(item => item.type === 'added' ? item.content : '').join('\n') : ''}
                  {isLineUnchanged ? group.map(item => item.type === 'unchanged' ? item.content : '').join('\n') : ''}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mt-5 px-5">
      <div className="form-group">
        <div className="form-header-group">
          <div><h2 className="mb-4">Text Comparator</h2></div>
          <div className="btn-row mb-4" style={{ marginBottom: '20px' }}>
            <button className="btn-icon btn-outline-secondary mx-3" onClick={compareTexts}>
              Compare Texts
            </button>
            <button className="btn-icon btn-outline-secondary" onClick={clearFields} title="Clear">
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="btn-row mb-4">
          <textarea
            className="form-control mr-3"
            rows="15"
            value={text1}
            onChange={handleText1Change}
            placeholder="Text 1"
            style={{ width: '48%', height: '400px', padding: '10px', borderRadius: '4px', borderColor: '#ddd' }}
          />

          <textarea
            className="form-control ml-3"
            rows="15"
            value={text2}
            onChange={handleText2Change}
            placeholder="Text 2"
            style={{ width: '48%', height: '400px', padding: '10px', borderRadius: '4px', borderColor: '#ddd' }}
          />
        </div>
      </div>

      {diffVisible && renderDiff()}
    </div>
  );
};

export default TextComparator;

