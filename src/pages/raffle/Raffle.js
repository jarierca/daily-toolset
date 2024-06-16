// src/pages/raffle/Raffle.js
import React from "react";

import CoinFlip from "../../components/raffle/CoinFlip";
import RandomDraw from "../../components/raffle/RandomDraw";
import AlertComponent from "../../components/util/alert/AlertComponent";

const Raffle = () => {
  return (
    <div className="container">
      <h2>Raffle Tools</h2>

      <CoinFlip />

      <div className="separator mt-5"></div>

      <RandomDraw />

      <AlertComponent />
    </div>
  );
};

export default Raffle;
