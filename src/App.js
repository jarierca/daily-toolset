// src/App.js
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Identity from "./pages/Identity";
import TextComparator from "./components/text/TextComparator";
import CharacterCounter from "./components/text/CharacterCounter";
import "./App.css";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Identity
                toggleDarkMode={toggleDarkMode}
                isDarkMode={isDarkMode}
              />
            </>
          }
        />
        <Route
          path="/text-tools/text-comparator"
          element={
            <>
              <TextComparator
                toggleDarkMode={toggleDarkMode}
                isDarkMode={isDarkMode}
              />
            </>
          }
        />
        <Route
          path="/text-tools/character-counter"
          element={
            <>
              <CharacterCounter
                toggleDarkMode={toggleDarkMode}
                isDarkMode={isDarkMode}
              />
            </>
          }
        />
      </Routes>
    </div>
  );
};
/*

*/
export default App;
