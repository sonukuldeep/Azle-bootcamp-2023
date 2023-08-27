import React, { useRef } from 'react';

function Canvas() {
  const canvasRef = useRef(null);
  return (
    <div className="canvas-container">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default Canvas;
