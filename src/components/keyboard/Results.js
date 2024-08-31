import React from 'react';
import './Keyboard.css';

const Results = ({ wpm, keystrokes, accuracy, correctWords, wrongWords }) => {
  return (
    <div id="results">
      <div>
        <span>
          <h2>WPM</h2>
          <h3 id="results-wpm">{wpm}</h3>
        </span>
        <span>
          <h2>Keystrokes</h2>
          <h3 id="results-keystrokes">{keystrokes}</h3>
        </span>
        <span>
          <h2>Accuracy</h2>
          <h3 id="results-accuracy">{accuracy}</h3>
        </span>
        <span>
          <h2>Correct words</h2>
          <h3 id="results-correct">{correctWords}</h3>
        </span>
        <span>
          <h2>Wrong words</h2>
          <h3 id="results-wrong">{wrongWords}</h3>
        </span>
      </div>
    </div>
  );
};

export default Results;

