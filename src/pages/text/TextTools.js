// src/pages/TextTools.js
import React from "react";

import TextComparator from "../../components/text/TextComparator";
import CharacterCounter from "../../components/text/CharacterCounter";
import CodeGenerator from "../../components/text/CodeGenerator";
import FindReplace from "../../components/text/FindReplace";
import TextConverter from "../../components/text/TextConverter";
import AlertComponent from "../../components/util/alert/AlertComponent";

const TextTools = () => {
  return (
    <div className="container-fluid">
      <h2>Text Tools</h2>

      <TextComparator />
      <CharacterCounter />
      <CodeGenerator />
      <FindReplace />
      <TextConverter />

      <AlertComponent />
    </div>
  );
};

export default TextTools;
