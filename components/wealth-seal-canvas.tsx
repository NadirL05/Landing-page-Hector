"use client";

// Rendu 3D du "sceau" de clôture — une petite pile de pièces (3), pas un
// bureau ou un tas de pièces qui lirait "démo SaaS/crypto dashboard".
// Primitives uniquement (CylinderGeometry), aucun asset GLB externe.
// Matériau volontairement mat/brossé — écho du token --color-gold qui,
// dans app/globals.css, est réservé à l'ornement (filet, numérotation),
// jamais un remplissage plein et brillant. Rendu statique (frameloop
// "demand") : la retenue du bulletin patrimonial vaut mieux qu'une
// rotation animée en continu, et un seul frame rendu = coût runtime
// quasi nul une fois monté.

import { Canvas } from "@react-three/fiber";

// Brun/or mat — dérivé du token --color-gold (oklch(64% 0.12 82)),
// assombri et désaturé pour un rendu "laiton vieilli", pas "or brillant".
const COIN_COLOR = "#9c7a3f";
const COIN_EDGE_COLOR = "#8a6a35";

function Coin({ y, rotationOffset }: { y: number; rotationOffset: number }) {
  return (
    <group position={[0, y, 0]} rotation={[0, rotationOffset, 0]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.62, 0.62, 0.1, 32]} />
        <meshStandardMaterial color={COIN_COLOR} roughness={0.55} metalness={0.4} />
      </mesh>
      {/* Filet de tranche — légère variation de teinte, pas un highlight spéculaire */}
      <mesh>
        <cylinderGeometry args={[0.63, 0.63, 0.03, 32]} />
        <meshStandardMaterial color={COIN_EDGE_COLOR} roughness={0.65} metalness={0.3} />
      </mesh>
    </group>
  );
}

function CoinStack() {
  return (
    <group rotation={[0, 0.5, 0]}>
      <Coin y={-0.13} rotationOffset={0.08} />
      <Coin y={0} rotationOffset={-0.05} />
      <Coin y={0.13} rotationOffset={0.15} />
    </group>
  );
}

export default function WealthSealCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop="demand"
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [1.6, 1.3, 2.4], fov: 32 }}
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      {/* Lumière de bureau d'étude — un rai de lumière directionnelle
          douce, pas un setup de studio produit à trois points. */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} color="#fff4e0" />
      <directionalLight position={[-2, 1, -1]} intensity={0.2} color="#c9d6e8" />
      <CoinStack />
    </Canvas>
  );
}
