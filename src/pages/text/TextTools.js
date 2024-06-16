// src/pages/TextTools.js
import React from "react";

import TextComparator from "../../components/text/TextComparator";
import CharacterCounter from "../../components/text/CharacterCounter";
import CodeGenerator from "../../components/text/CodeGenerator";
import FindReplace from "../../components/text/FindReplace";
import TextConverter from "../../components/text/TextConverter";
import EmojiList from "../../components/text/EmojiList";
import LoremIpsumText from "../../components/text/LoremIpsumText";

import AlertComponent from "../../components/util/alert/AlertComponent";

const TextTools = () => {
  return (
    <div className="container">
      <h2>Text Tools</h2>

      <TextComparator />

      <div className="separator mt-5"></div>

      <CharacterCounter />

      <div className="separator mt-5"></div>

      <CodeGenerator />

      <div className="separator mt-5"></div>

      <FindReplace />
      
      <div className="separator mt-5"></div>

      <TextConverter />

      <div className="separator mt-5"></div>

      <EmojiList />

      <div className="separator mt-5"></div>

      <LoremIpsumText />

      <AlertComponent />
    </div>
  );
};

export default TextTools;
