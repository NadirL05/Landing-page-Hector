"use client";

// Accent 3D discret du sceau de clôture — remplace le simple filet or
// (.gold-rule) par une petite pile de pièces quand le rendu 3D est
// disponible, et retombe silencieusement sur le filet sinon (WebGL
// indisponible, reduced-motion strict côté device bas de gamme, ou
// avant que le composant n'entre dans le viewport). Le filet reste
// toujours présent dans le DOM au même endroit — pas de saut de mise
// en page (CLS) entre les deux états.

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

const WealthSealCanvas = dynamic(() => import("@/components/wealth-seal-canvas"), {
  ssr: false,
  loading: () => null,
});

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// No runtime changes to subscribe to — WebGL support is fixed for the
// life of the page — so subscribe is a no-op. useSyncExternalStore still
// buys us the correct SSR/hydration behavior: server and first client
// paint both use getServerSnapshot (false, i.e. the static fallback),
// then React reconciles with the real client value right after
// hydration with no mismatch warning.
function subscribeNoop() {
  return () => {};
}

function useHasWebGL(): boolean {
  return useSyncExternalStore(subscribeNoop, hasWebGL, () => false);
}

export function WealthSeal({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const canRender3d = useHasWebGL();

  useEffect(() => {
    const node = containerRef.current;
    if (!node || !canRender3d) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [canRender3d]);

  const show3d = canRender3d && isVisible;

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      {/* Footprint fixe (64×64) dans les deux états pour ne jamais
          provoquer de saut de mise en page au moment où le canvas 3D
          remplace le filet — même quand le composant entre tardivement
          dans le viewport. */}
      <div className="mx-auto flex h-16 w-16 items-center justify-center">
        {show3d ? <WealthSealCanvas /> : <span className="gold-rule" />}
      </div>
    </div>
  );
}
