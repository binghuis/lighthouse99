import { useRef, useEffect } from "react";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context || !canvas) {
      return;
    }
    canvas.width = 200;
    canvas.height = 200;

    context.fillStyle = "transparent";
    context.fillRect(50, 50, 100, 100);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;
