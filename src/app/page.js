"use client";

import { useRef, useState, useCallback } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Script from "next/script";

// importa a cena AR apenas no client
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
      </Head>

      {/* Scripts externos controlados */}
      <Script
        src="https://aframe.io/releases/1.3.0/aframe.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"
        strategy="beforeInteractive"
      />

      <div className="w-screen h-screen relative overflow-hidden">
        {/* Cena AR carregada apenas no client */}
        <ARScene onMarkerVisible={handleMarkerVisibility} />

        {/* Só mostra o canvas 3D quando o marcador estiver visível */}
        {markerVisible && (
          <div className="absolute inset-0 pointer-events-none z-10">
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
