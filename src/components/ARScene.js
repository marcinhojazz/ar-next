// components/ARScene.js
"use client";

import { useEffect } from "react";

export default function ARScene({ onMarkerVisible }) {
  useEffect(() => {
    const marker = document.querySelector("a-marker");
    if (marker) {
      marker.addEventListener("markerFound", () => {
        console.log("Marcador encontrado");
        onMarkerVisible(true);
      });
      marker.addEventListener("markerLost", () => {
        console.log("Marcador perdido");
        onMarkerVisible(false);
      });
    }
  }, [onMarkerVisible]);

  return (
    <div className="absolute inset-0">
      <a-scene
        embedded
        vr-mode-ui="enabled: false;"
        renderer="logarithmicDepthBuffer: true;"
        arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: true;"
      >
        <a-marker type="pattern" url="/pattern-jacaredigital.patt">
          {/* Objeto 3D preso ao marcador */}
          <a-box
            position="0 0.5 0"
            rotation="0 45 0"
            color="orange"
            animation="property: rotation; to: 0 405 0; loop: true; dur: 3000"
          ></a-box>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
}
