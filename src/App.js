// src/App.js
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Identity from "./pages/Identity";
import TextComparator from "./components/text/TextComparator";
import CharacterCounter from "./components/text/CharacterCounter";
import TextConverter from "./components/text/TextConverter";
import FindReplace from './components/text/FindReplace';
import JsonValidator from "./components/formatValidator/JsonValidator";
import XmlValidator from "./components/formatValidator/XmlValidator";
import PasswordGenerator from "./components/security/PasswordGenerator";
import CoinFlip from "./components/raffle/CoinFlip";
import RandomDraw from "./components/raffle/RandomDraw";
import CodeGenerator from "./components/text/CodeGenerator";
import Base64EncoderDecoder from "./components/encode/Base64EncoderDecoder";
import UrlEncoderDecoder from "./components/encode/UrlEncoderDecoder";
import XMLDecoderEncoder from "./components/encode/XMLDecoderEncoder";
import Header from "./components/util/Header";
import "./App.css";


const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <Header />
      <Routes>
        <Route path="/"
            element={<Identity toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />

        <Route path="/indentity"
          element={<Identity toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />

        <Route path="/text/text-comparator"
          element={<TextComparator toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />

        <Route path="/text/character-counter"
          element={<CharacterCounter toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />

        <Route path="/text/text-converter"
          element={<TextConverter toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />

        <Route  path="/text/find-and-replace"
          element={<FindReplace toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />

        <Route path="/text/code-generator"
          element={<CodeGenerator toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />

        <Route path="/validator/json-validator"
          element={<JsonValidator toggleDarkMode={toggleDarkMode}  isDarkMode={isDarkMode} />}/>

        <Route path="/validator/xml-validator"
          element={<XmlValidator toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />
        
        <Route path="/security/password-generator"
          element={<PasswordGenerator toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />
        
        <Route path="/encode/base64"
          element={<Base64EncoderDecoder toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />
        
        <Route path="/encode/url"
          element={<UrlEncoderDecoder toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />

        <Route path="/encode/xml"
          element={<XMLDecoderEncoder toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />

        <Route path="/raffle/coinflip"
          element={<CoinFlip toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />

        <Route path="/raffle/random-draw"
          element={<RandomDraw toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />

      </Routes>
    </div>
  );
};

export default App;
