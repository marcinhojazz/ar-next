"use client";

import { useRef, useState, useCallback } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Script from "next/script";

const ARScene = dynamic(() => import("../components/ARScene"), { ssr: false });

function RotatingCube() {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function ARPage() {
  const [markerVisible, setMarkerVisible] = useState(false);

  const handleMarkerVisibility = useCallback((visible) => {
    setMarkerVisible(visible);
  }, []);

  return (
    <>
      <Head>
        <title>Experiência AR Customizada</title>
        {/* Prioriza layout responsivo mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>

      {/* Scripts externos do AR.js e A-Frame */}
      <Script
        src="https://aframe.io/releases/1.3.0/aframe.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"
        strategy="beforeInteractive"
      />

      <div className="relative" style={{ width: "100vw", height: "100dvh" }}>
        {/* Cena AR carregada apenas no client */}
        <ARScene onMarkerVisible={handleMarkerVisibility} />

        {/* Renderização do modelo 3D com R3F (caso ainda use Canvas sobreposto) */}
        {markerVisible && (
          <div
            className="absolute top-0 left-0 w-full h-full z-10"
            style={{ touchAction: "none" }}
          >
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[0, 10, 5]} intensity={1} />
              <RotatingCube />
              <OrbitControls enableZoom={false} />
            </Canvas>
          </div>
        )}
      </div>
    </>
  );
}
