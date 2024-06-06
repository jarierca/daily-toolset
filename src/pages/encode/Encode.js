// src/pages/encode/Encode.js
import React from "react";

import Base64EncoderDecoder from "../../components/encode/Base64EncoderDecoder";
import UrlEncoderDecoder from "../../components/encode/UrlEncoderDecoder";
import XMLDecoderEncoder from "../../components/encode/XMLDecoderEncoder";
import AlertComponent from "../../components/util/alert/AlertComponent";

const Encode = () => {
  return (
    <div className="container-fluid">
      <h2>Encode Tools</h2>

      <Base64EncoderDecoder />
      <UrlEncoderDecoder />
      <XMLDecoderEncoder />

      <AlertComponent />
    </div>
  );
};

export default Encode;
