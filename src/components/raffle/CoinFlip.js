import React, { useState, useEffect } from "react";
import caraImage from "./../../assets/coinflip/cara.png"; 
import cruzImage from "./../../assets/coinflip/cruz.png"; 

const CoinFlip = ({ toggleDarkMode, isDarkMode }) => {
  const [result, setResult] = useState("");
  const [flipping, setFlipping] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  const flipCoin = () => {
    setResult("");
    setFlipping(true);

    setTimeout(() => {
      const randomResult = Math.random() < 0.5 ? "Cara" : "Cruz";
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
    }

    return () => {
      clearInterval(animationInterval);
    };
  }, [flipping]);

  return (
    <div className="container mt-4 text-center">
      <h2 className="mb-4">Coin Flip</h2>
      <div className={`coin ${flipping ? "flip" : ""}`}>
        <img
          src={animationStep < 4 ? caraImage : cruzImage}
          alt="Coin"
          className="coin-image"
        />
      </div>
      <div className="my-4">
        <button
          className={`btn btn-outline-secondary ${flipping ? "disabled" : ""}`}
          onClick={flipCoin}
        >
          Lanzar Moneda
        </button>
        <button className="btn btn-outline-secondary mx-3" onClick={resetCoin}>
          Reiniciar
        </button>
      </div>
      {result && (
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Ganador:</h4>
          <p>{result}</p>
        </div>
      )}

    </div>
  );
};

export default CoinFlip;
