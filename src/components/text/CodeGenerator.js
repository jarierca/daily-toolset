import React, { useState } from "react";
import QRCode from "qrcode.react";
import { useBarcode } from "next-barcode";
import { useDispatch } from "react-redux";
import { showInfoMessage } from "../../redux/Actions";
import AlertComponent from "../util/alert/AlertComponent";

const CodeGenerator = ({ toggleDarkMode, isDarkMode }) => {
  const [text, setText] = useState("Happy Hacking!!");

  const handleTextChange = (event) => {
      setText(event.target.value);
  };

  const { inputRef } = useBarcode({
    value: text || " ",
    options: {
      background: "#ffffff",
    },
  });

  const downloadCode = (id) => {
    const qrCodeURL = document.getElementById(id)
      .toDataURL("image/png").replace("image/png", "image/octet-stream");
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = id + ".png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };

  return (
    <div className="container mt-5">
      <div className="form-group">
        <div className="form-header-group">
          <div><h2 className="mb-4">QR & Barcode Generator</h2></div>
          <div className="btn-row mb-4">
            <button className="btn-icon btn-outline-secondary mx-3" onClick={() => downloadCode("myQrCode")} title="Donwload a QR Image">
              QR
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"/>
              </svg>
            </button>
            <button className="btn-icon btn-outline-secondary" onClick={() => downloadCode("myBarCode")} title="Donwload a Barcode Image">
              Barcode
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="btn-row mb-4">
          <input placeholder="Enter text:" type="text" className="inpt-txt" id="codeText" value={text} onChange={handleTextChange} />
        </div>
        
        <div className="form-group mb-4">
          <QRCode id="myQrCode" size={200} value={text} />
        </div>

        <div className="form-group">
          <canvas id="myBarCode" ref={inputRef} />
        </div>
      </div>

      <AlertComponent />
    </div>
  );
};

export default CodeGenerator;

