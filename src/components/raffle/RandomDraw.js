import React, { useState } from "react";

const RandomDraw = ({ toggleDarkMode, isDarkMode }) => {
  const [participants, setParticipants] = useState("");
  const [winnersCount, setWinnersCount] = useState(1);
  const [winners, setWinners] = useState([]);

  const handleParticipantsChange = (event) => {
    setParticipants(event.target.value);
  };

  const handleWinnersCountChange = (event) => {
    const count = parseInt(event.target.value, 10);
    setWinnersCount(count);
  };

  const handleDraw = () => {
    const participantsArray = participants
      .split("\n")
      .filter((participant) => participant.trim() !== "");
    const shuffledParticipants = participantsArray.sort(
      () => Math.random() - 0.5
    );
    const selectedWinners = shuffledParticipants.slice(0, winnersCount);
    
    setWinners(selectedWinners);
  };

  const handleClear = () => {
    setParticipants("");
    setWinnersCount(1);
    setWinners([]);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Sorteo Aleatorio</h2>
      <div className="form-group">
        <textarea
          className="form-control"
          id="participantsTextarea"
          rows="10"
          value={participants}
          onChange={handleParticipantsChange}
          placeholder="Escribe un participante por línea"
        ></textarea>
      </div>
      <div className="form-group my-3 row">
        <div className="col-2">
          Número de Ganadores:
        </div>
        <div className="col-2">
          <input
            type="number"
            className="form-control col-1"
            id="winnersCountInput"
            value={winnersCount}
            onChange={handleWinnersCountChange}
          />
        </div>
      </div>
      <div className="my-3">
        <button className="btn btn-outline-secondary" onClick={handleDraw}>
          Sortear
        </button>
        <button
          className="btn btn-outline-secondary mx-3"
          onClick={handleClear}
        >
          Limpiar
        </button>
      </div>
      {winners.length > 0 && (
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Ganadores:</h4>
          <ul>
            {winners.map((winner, index) => (
              <li key={index}>{winner}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RandomDraw;
