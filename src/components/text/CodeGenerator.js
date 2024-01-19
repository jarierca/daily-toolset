import React, { useState } from "react";
import QRCode from "qrcode.react";
import { useBarcode } from "next-barcode";

const CodeGenerator = ({ toggleDarkMode, isDarkMode }) => {
  const [text, setText] = useState("Happy Hacking!!");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const { inputRef } = useBarcode({
    value: text,
    options: {
      background: "#ffffff",
    },
  });

  const downloadCode = (id) => {
    const qrCodeURL = document
      .getElementById(id)
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = id + ".png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Generador Código QR y Barras</h2>

      <div className="mb-3">
        <input
          placeholder="Introduce el texto:"
          type="text"
          className="form-control"
          id="codeText"
          value={text}
          onChange={handleTextChange}
        />
      </div>

      <div className="mb-4">
        <h4>Código QR</h4>
        <QRCode id="myQrCode" size={200} value={text} />
        <br />
        <button
          className="btn btn-outline-secondary my-4"
          onClick={() => downloadCode("myQrCode")}
        >
          Download Code
        </button>
      </div>

      <div className="overflow-auto">
        <h4>Código de Barras</h4>
        <canvas id="myBarCode" ref={inputRef} />
        <br />
        <button
          className="btn btn-outline-secondary my-4"
          onClick={() => downloadCode("myBarCode")}
        >
          Download Code
        </button>
      </div>
    </div>
  );
};

export default CodeGenerator;
