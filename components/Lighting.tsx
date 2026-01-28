'use client';

import { SCENE_CONFIG } from '@/utils/constants';

export default function Lighting() {
  return (
    <>
      {/* Ambient light for overall scene illumination */}
      <ambientLight intensity={SCENE_CONFIG.AMBIENT_LIGHT_INTENSITY} />
      
      {/* Main directional light (sunlight effect) */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={SCENE_CONFIG.DIRECTIONAL_LIGHT_INTENSITY}
        castShadow
      />
      
      {/* Fill light from the side */}
      <directionalLight
        position={[-3, 2, 4]}
        intensity={0.3}
      />
      
      {/* Point light to highlight the counter */}
      <pointLight
        position={[0, 2, 2]}
        intensity={SCENE_CONFIG.POINT_LIGHT_INTENSITY}
        color="#fff5e6"
      />
      
      {/* Accent light for depth */}
      <pointLight
        position={[0, -1, -2]}
        intensity={0.2}
        color="#4a90e2"
      />
    </>
  );
}
