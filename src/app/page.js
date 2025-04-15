"use client";

import { useCallback, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Script from "next/script";

// Importa a cena AR apenas no client
const ARScene = dynamic(() => import("../components/ARScene"), { ssr: false });

export default function ARPage() {
  const [markerVisible, setMarkerVisible] = useState(false);

  const handleMarkerVisibility = useCallback((visible) => {
    setMarkerVisible(visible);
  }, []);

  return (
    <>
      <Head>
        <title>Experiência AR Customizada</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
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

      {/* A cena já cobre toda a tela */}
      <ARScene onMarkerVisible={handleMarkerVisibility} />
    </>
  );
}
