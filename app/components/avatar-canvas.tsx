"use client";

import { Canvas } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect } from "react";

function AkireModel() {
  const { scene, animations } = useGLTF("/akire-idle.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    const idleName = Object.keys(actions).find((name) => name.toLowerCase().includes("idle")) ?? Object.keys(actions)[0];
    const idleAction = idleName ? actions[idleName] : undefined;
    if (!idleAction) return;
    idleAction.reset().fadeIn(0.3).play();
    return () => { idleAction.fadeOut(0.2); };
  }, [actions]);

  return <primitive object={scene} position={[0, -1.35, 0]} rotation={[0, 0.05, 0]} scale={2.15} dispose={null} />;
}

export default function AvatarCanvas() {
  return (
    <Canvas
      aria-label="Akire 3D avatar"
      camera={{ position: [0, 0.75, 4.4], fov: 30, near: 0.1, far: 20 }}
      dpr={1}
      frameloop="always"
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      onCreated={({ camera }) => camera.lookAt(0, 1.25, 0)}
      fallback={<span className="font-mono text-[9px] uppercase tracking-[.18em] text-[#7d83ff]/70">Akire</span>}
    >
      <ambientLight intensity={1.7} color="#ceccff" />
      <directionalLight position={[2, 3, 4]} intensity={2.4} color="#ffffff" />
      <pointLight position={[-2, 0.5, 2]} intensity={1.2} color="#7d83ff" />
      <AkireModel />
    </Canvas>
  );
}
