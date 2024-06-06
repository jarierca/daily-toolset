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
    <div className="container mt-5">
      <div className="form-group">
        <div className="form-header-group">
          <div><h2 className="mb-4">Random Draw</h2></div>
          <div className="btn-row mb-4">
            <div className="form-header-group mx-3">
                Number of items to pick:
                <input
                  type="number"
                  className="form-control"
                  id="winnersCountInput"
                  value={winnersCount}
                  onChange={handleWinnersCountChange}
                />
            </div>
            <button className="btn-icon btn-outline-secondary" onClick={handleDraw} title="Validate">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
            </button>
            <button className="btn-icon btn-outline-secondary mx-3" onClick={handleClear} title="Clear">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>

      <div className="form-group">
        <textarea
          className="form-control"
          id="participantsTextarea"
          rows="10"
          value={participants}
          onChange={handleParticipantsChange}
          placeholder="Enter items (one per line):">
        </textarea>
      </div>
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
