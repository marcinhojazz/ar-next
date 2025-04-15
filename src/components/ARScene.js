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
    <div
      className="fixed inset-0"
      style={{
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
        touchAction: "none",
        zIndex: 0,
      }}
    >
      <a-scene
        embedded
        vr-mode-ui="enabled: false"
        renderer="logarithmicDepthBuffer: true"
        arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false"
      >
        <a-marker type="pattern" url="/pattern-jacaredigital.patt">
          {/* Dummy entity para acionar eventos */}
          <a-entity position="0 0 0" />
        </a-marker>

        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
}
