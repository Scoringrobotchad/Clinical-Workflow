
"use client"

import React, { useEffect, useRef } from 'react';

export default function TubesCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<any>(null);

  const randomColors = (count: number) => {
    return new Array(count)
      .fill(0)
      .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
  };

  useEffect(() => {
    const initTimer = setTimeout(() => {
      // @ts-ignore
      import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js')
        .then(module => {
          const TubesCursorInit = module.default;
          if (canvasRef.current) {
            const app = TubesCursorInit(canvasRef.current, {
              tubes: {
                colors: ["#0d9488", "#0f766e", "#115e59"],
                lights: {
                  intensity: 150,
                  colors: ["#2dd4bf", "#5eead4", "#99f6e4", "#ccfbf1"]
                }
              }
            });
            appRef.current = app;
          }
        })
        .catch(err => console.error("Failed to load TubesCursor module:", err));
    }, 100);

    return () => {
      clearTimeout(initTimer);
      if (appRef.current && typeof appRef.current.dispose === 'function') {
        appRef.current.dispose();
      }
    };
  }, []);

  const handleClick = () => {
    if (appRef.current) {
      const newTubeColors = randomColors(3);
      const newLightColors = randomColors(4);
      appRef.current.tubes.setColors(newTubeColors);
      appRef.current.tubes.setLightsColors(newLightColors);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 z-0 bg-slate-50 overflow-hidden cursor-crosshair opacity-40 pointer-events-none"
    >
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />
    </div>
  );
}
