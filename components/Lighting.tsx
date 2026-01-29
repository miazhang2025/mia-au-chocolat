'use client';

import { SCENE_CONFIG } from '@/utils/constants';

export default function Lighting() {
  return (
    <>
      {/* Fog for atmospheric depth */}
      <fog attach="fog" args={[SCENE_CONFIG.FOG_COLOR, SCENE_CONFIG.FOG_NEAR, SCENE_CONFIG.FOG_FAR]} />
      
      {/* Ambient light for overall scene illumination - warm tone */}
      <ambientLight intensity={SCENE_CONFIG.AMBIENT_LIGHT_INTENSITY} color="#ffe4c4" />
      
      {/* Main directional light (warm sunlight effect) */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={SCENE_CONFIG.DIRECTIONAL_LIGHT_INTENSITY}
        color="#ffebd2"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />
      
      {/* Fill light from the side - warm golden tone */}
      <directionalLight
        position={[-3, 2, 4]}
        intensity={0.5}
        color="#ccedfb"
      />
      
      {/* Point light to highlight the counter - warmer */}
      <pointLight
        position={[0, 2, 2]}
        intensity={SCENE_CONFIG.POINT_LIGHT_INTENSITY}
        color="#ffedd1"
      />
      
      {/* Accent light for depth - warm accent instead of blue */}
      <pointLight
        position={[0, 5, -2]}
        intensity={0.5}
        color="#f7f5ab"
      />
    </>
  );
}
