import React, { useState, useEffect } from 'react';
import { words_en, words_es } from '../../data/words';
import './Keyboard.css';

const TypingTest = ({ onRestart }) => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [time, setTime] = useState(30);
  const [intervalId, setIntervalId] = useState(null);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const generateWords = () => {
      let languageWords;
      if (language === 'en') {
        languageWords = words_en;
      } else if (language === 'es') {
        languageWords = words_es;
      } else {
        console.error('Invalid language selected');
        return;
      }

      console.log('Language words:', languageWords);
      if (!languageWords || languageWords.length === 0) {
        console.error('No words available for the selected language');
        return;
      }

      const shuffledWords = languageWords.sort(() => Math.random() - 0.5).slice(0, 100);
      setWords(shuffledWords);
    };

    generateWords();
  }, [language]);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(id);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.endsWith(' ')) {
      const currentWord = words[currentWordIndex];
      if (value.trim() === currentWord) {
        setCurrentWordIndex(prevIndex => prevIndex + 1);
      }
      setInputValue('');
    }
  };

  const handleRestart = () => {
    setCurrentWordIndex(0);
    setInputValue('');
    setTime(30);
    clearInterval(intervalId);
    const newIntervalId = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(newIntervalId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setIntervalId(newIntervalId);
    onRestart();
  };

  return (
    <div className="type-test-container">
      <div id="typing">
        <div className="input-container">
          <div className="input-row">
            <select
              id="typing-test-language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
        <div id="words-container">
          {words.length > 0 ? (
            words.map((word, index) => (
              <span key={index} className={`word ${index === currentWordIndex ? 'current-word' : ''}`}>
                {word.split('').map((letter, letterIndex) => (
                  <span key={letterIndex} className={`letter ${index === currentWordIndex && letterIndex === currentLetterIndex ? 'current-letter' : ''}`}>
                    {letter}
                  </span>
                ))}
              </span>
            ))
          ) : (
            <p>No words available</p>
          )}
        </div>
        <div className="input-container">
          <div className="input-row">
            <div id="time">{time}</div>
            <input
              id="typing-input"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              autoFocus
            />
            <button id="reload-button" onClick={handleRestart}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" />
                <path d="M20 4v5h-5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingTest;

