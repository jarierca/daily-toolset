import React, { useState, useEffect } from "react";
import headsImage from "./../../assets/coinflip/heads.png"; 
import tailsImage from "./../../assets/coinflip/tails.png"; 

const CoinFlip = ({ toggleDarkMode, isDarkMode }) => {
  const [result, setResult] = useState("");
  const [flipping, setFlipping] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  const flipCoin = () => {
    setResult("");
    setFlipping(true);

    setTimeout(() => {
      const randomResult = Math.random() < 0.5 ? "Heads" : "Tails";
      setResult(randomResult);
      setFlipping(false);
    }, 2500);
  };

  const resetCoin = () => {
    setResult("");
  };

  useEffect(() => {
    let animationInterval;

    if (flipping) {
      animationInterval = setInterval(() => {
        setAnimationStep((prevStep) => (prevStep + 1) % 8);
      }, 50);
    } else {
      clearInterval(animationInterval);
      document.querySelector(".coin-image").src = result === 'Heads' ? headsImage : tailsImage ; 
    }

    return () => {
      clearInterval(animationInterval);
    };
  }, [flipping, result]);

  return (
    <div className="container mt-4 text-center">
      <h2 className="mb-4">Coin Flip</h2>
      <div className={`coin ${flipping ? "flip" : ""}`}>
        <img
          src={animationStep < 4 ? headsImage : tailsImage}
          alt="Coin"
          className="coin-image"
        />
      </div>
      <div className="mt-5">
        <button className={`btn-icon btn-outline-secondary ${flipping ? "disabled" : ""}`} onClick={flipCoin} title="Flip">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
          </svg>
        </button>
      </div>
      {result && (
        <div className="alert alert-success mt-5" role="alert">
          <h4 className="alert-heading">Winner:</h4>
          <p>{result}</p>
        </div>
      )}

    </div>
  );
};

export default CoinFlip;
