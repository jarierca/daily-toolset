// src/pages/raffle/Raffle.js
import React from "react";

import CoinFlip from "../../components/raffle/CoinFlip";
import RandomDraw from "../../components/raffle/RandomDraw";
import AlertComponent from "../../components/util/alert/AlertComponent";

const Raffle = () => {
  return (
    <div className="container-fluid">
      <h2>Raffle Tools</h2>

      <CoinFlip />
      <RandomDraw />

      <AlertComponent />
    </div>
  );
};

export default Raffle;
