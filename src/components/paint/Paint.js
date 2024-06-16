import React, { useState, useRef, useEffect } from 'react';
import './Paint.css';

const Paint = () => {
  const canvasRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(4);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const startPaint = (event) => {
      const bounds = canvas.getBoundingClientRect();
      const offsetX = event.clientX - bounds.left;
      const offsetY = event.clientY - bounds.top;
      context.beginPath();
      context.moveTo(offsetX, offsetY);
      setIsPainting(true);
    };

    const finishPaint = () => {
      context.closePath();
      setIsPainting(false);
    };

    const paint = (event) => {
      if (isPainting) {
        const bounds = canvas.getBoundingClientRect();
        const offsetX = event.clientX - bounds.left;
        const offsetY = event.clientY - bounds.top;
        context.lineTo(offsetX, offsetY);
        context.strokeStyle = currentColor;
        context.lineWidth = brushSize;
        context.stroke();
      }
    };

    canvas.addEventListener('mousedown', startPaint);
    canvas.addEventListener('mouseup', finishPaint);
    canvas.addEventListener('mousemove', paint);

    return () => {
      canvas.removeEventListener('mousedown', startPaint);
      canvas.removeEventListener('mouseup', finishPaint);
      canvas.removeEventListener('mousemove', paint);
    };
  }, [isPainting, currentColor, brushSize]);

  const handleChangeColor = (event) => {
    setCurrentColor(event.target.value);
  };

  const handleChangeBrushSize = (event) => {
    setBrushSize(event.target.value);
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSaveImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'painting.png';
    link.click();
  };

  return (
    <div className="paint-container">
      <div className="controls">
        <input type="color" value={currentColor} onChange={handleChangeColor} />
        <input type="range" min="1" max="10" value={brushSize} onChange={handleChangeBrushSize} />
        <span>Brush Size: {brushSize}</span>
        <button className="btn btn-outline-secondary mx-3" onClick={handleClearCanvas}>Clear Canvas</button>
        <button className="btn btn-outline-secondary mx-3" onClick={handleSaveImage}>Save Image</button>
      </div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight -135}
        className="paint-canvas"
      />
    </div>
  );
};

export default Paint;

