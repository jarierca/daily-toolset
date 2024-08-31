import React, { useState, useEffect } from 'react';
import './Keyboard.css';

const KeyboardTest = ({ onStartTypingTest, onToggleSound, soundEnabled }) => {
  const [keys, setKeys] = useState([]);
  const [mouseButtons, setMouseButtons] = useState([]);
  const [keyPressed, setKeyPressed] = useState([]);

  useEffect(() => {
    const keyElements = Array.from(document.querySelectorAll('.key'));
    setKeys(keyElements);

    const mouseButtonElements = Array.from(document.querySelectorAll('.mousebutton'));
    setMouseButtons(mouseButtonElements);

    const handleKeyDown = (event) => {
      keys.forEach(key => {
        if (event.keyCode == key.dataset.key) {
          key.classList.add('active', 'actived');
          setKeyPressed(prev => [...prev, `${event.key} (${event.keyCode})`]);
          if (soundEnabled) {
            new Audio('/sound.mp3').play();
          }
          setTimeout(() => key.classList.remove('actived'), 100);
        }
      });
    };

    const handleKeyUp = (event) => {
      keys.forEach(key => {
        if (event.keyCode == key.dataset.key) {
          key.classList.add('active', 'actived');
          setKeyPressed(prev => [...prev, `${event.key} (${event.keyCode})`]);
          if (soundEnabled) {
            new Audio('/sound.mp3').play();
          }
          setTimeout(() => key.classList.remove('actived'), 100);
        }
      });
    };

    const handleMouseDown = (event) => {
      mouseButtons.forEach(button => {
        if (button.getAttribute("data-key") == event.button) {
          button.classList.add('active', 'actived');
          setKeyPressed(prev => [...prev, `Mouse Click (${event.button})`]);
          if (soundEnabled) {
            new Audio('/sound.mp3').play();
          }
          setTimeout(() => button.classList.remove('actived'), 100);
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [keys, mouseButtons, soundEnabled]);

  return (
    <div className="keyboard-container">
      <div className="key-pressed-container">
        <div className="key-pressed-list">
          {keyPressed.map((key, index) => (
            <span key={index} title={key}>{key}</span>
          ))}
        </div>
      </div>
      <div className="keyboard">
        {/* Aquí puedes incluir el código para renderizar el teclado */}
      </div>
      <button onClick={onStartTypingTest}>Start Typing Test</button>
      <button onClick={onToggleSound}>{soundEnabled ? "🔊" : "🔇"}</button>
    </div>
  );
};

export default KeyboardTest;

