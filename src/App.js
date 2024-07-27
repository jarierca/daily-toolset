// src/App.js
import React, { useState, useEffect, useCallback } from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import TextTools from "./pages/text/TextTools";
import Validator from "./pages/validator/Validator";
import Formatter from "./pages/formatter/Formatter";
import Security from "./pages/security/Security";
import Encode from "./pages/encode/Encode";
import Raffle from "./pages/raffle/Raffle";
import Identity from "./pages/Identity";
import Keyboard from "./pages/keyboard/Keyboard";
import Tasks from "./pages/tasks/Tasks";

// Components
import TextComparator from "./components/text/TextComparator";
import CharacterCounter from "./components/text/CharacterCounter";
import TextConverter from "./components/text/TextConverter";
import FindReplace from './components/text/FindReplace';
import CodeGenerator from "./components/text/CodeGenerator";
import EmojiList from "./components/text/EmojiList";
import LoremIpsumText from "./components/text/LoremIpsumText";

import JsonValidator from "./components/validator/JsonValidator";
import XmlValidator from "./components/validator/XmlValidator";
import HtmlValidator from "./components/validator/HtmlValidator";

import JsonFormatter from "./components/formatter/JsonFormatter";
import XmlFormatter from "./components/formatter/XmlFormatter";
import HtmlFormatter from "./components/formatter/HtmlFormatter";
import SqlFormatter from "./components/formatter/SqlFormatter";

import PasswordGenerator from "./components/security/PasswordGenerator";

import CoinFlip from "./components/raffle/CoinFlip";
import RandomDraw from "./components/raffle/RandomDraw";

import Base64EncoderDecoder from "./components/encode/Base64EncoderDecoder";
import UrlEncoderDecoder from "./components/encode/UrlEncoderDecoder";
import XMLDecoderEncoder from "./components/encode/XMLDecoderEncoder";

import Paint from "./components/paint/Paint";

import ToDoList from "./components/tasks/toDoList/ToDoList";
import Notes from "./components/tasks/notes/Notes";
import Calendar from "./components/tasks/calendar/Calendar";

import Header from "./components/util/header/Header";
import Footer from "./components/util/footer/Footer";

import NotFoundPage from "./pages/notFoundPage/NotFoundPage"; 

import "./App.css";

const App = () => {
  const defaultTheme = 'light';
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || defaultTheme;
    setTheme(initialTheme);
    document.body.className = initialTheme;
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  }, [theme]);

  return (
    <>
      <Header toggleTheme={toggleTheme} theme={theme} />

      <main className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/text" element={<TextTools />} />
          <Route path="/text/comparator" element={<TextComparator />} />
          <Route path="/text/character-counter" element={<CharacterCounter />} />
          <Route path="/text/converter" element={<TextConverter />} />
          <Route path="/text/find-and-replace" element={<FindReplace />} />
          <Route path="/text/code-generator" element={<CodeGenerator />} />
          <Route path="/text/emoji" element={<EmojiList />} />
          <Route path="/text/lorem-ipsum" element={<LoremIpsumText />} />

          <Route path="/validator" element={<Validator />} />
          <Route path="/validator/json" element={<JsonValidator />} />
          <Route path="/validator/xml" element={<XmlValidator />} />
          <Route path="/validator/html" element={<HtmlValidator />} />

          <Route path="/formatter" element={<Formatter />} />
          <Route path="/formatter/json" element={<JsonFormatter />} />
          <Route path="/formatter/xml" element={<XmlFormatter />} />
          <Route path="/formatter/html" element={<HtmlFormatter />} />
          <Route path="/formatter/sql" element={<SqlFormatter />} />

          <Route path="/security" element={<Security />} />
          <Route path="/security/password-generator" element={<PasswordGenerator />} />

          <Route path="/encode" element={<Encode />} />
          <Route path="/encode/base64" element={<Base64EncoderDecoder />} />
          <Route path="/encode/url" element={<UrlEncoderDecoder />} />
          <Route path="/encode/xml" element={<XMLDecoderEncoder />} />

          <Route path="/raffle" element={<Raffle />} />
          <Route path="/raffle/coinflip" element={<CoinFlip />} />
          <Route path="/raffle/random-draw" element={<RandomDraw />} />

          <Route path="/indentity" element={<Identity />} />

          <Route path="/kbd" element={<Keyboard />} />
          <Route path="/kbd/test" element={<Keyboard />} />
          <Route path="/kbd/type" element={<Keyboard />} />

          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/toDoList" element={<ToDoList />} />
          <Route path="/tasks/notes" element={<Notes />} />
          <Route path="/tasks/calendar" element={<Calendar />} />
          <Route path="/paint" element={<Paint />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer toggleTheme={toggleTheme} theme={theme} />
    </>
  );
};

export default App;
