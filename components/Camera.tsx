'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useScrollZoom } from '@/hooks/useScrollZoom';
import { CAMERA_CONFIG } from '@/utils/constants';
import * as THREE from 'three';

export default function Camera() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const mousePosition = useMousePosition();
  const zoom = useScrollZoom();
  const { set } = useThree();

  useEffect(() => {
    if (cameraRef.current) {
      set({ camera: cameraRef.current });
    }
  }, [set]);

  useFrame(() => {
    if (cameraRef.current) {
      // Apply mouse parallax offset
      const targetX = mousePosition.x * CAMERA_CONFIG.PARALLAX_STRENGTH;
      const targetY = mousePosition.y * CAMERA_CONFIG.PARALLAX_STRENGTH;

      // Clamp the parallax movement
      const clampedX = Math.max(
        -CAMERA_CONFIG.MAX_PARALLAX_X,
        Math.min(CAMERA_CONFIG.MAX_PARALLAX_X, targetX)
      );
      const clampedY = Math.max(
        -CAMERA_CONFIG.MAX_PARALLAX_Y,
        Math.min(CAMERA_CONFIG.MAX_PARALLAX_Y, targetY)
      );

      // Smooth camera movement
      cameraRef.current.position.x += (clampedX - cameraRef.current.position.x) * 0.05;
      cameraRef.current.position.y += (clampedY - cameraRef.current.position.y) * 0.05;
      cameraRef.current.position.z += (zoom - cameraRef.current.position.z) * 0.05;

      // Always look at center
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={CAMERA_CONFIG.INITIAL_POSITION}
      fov={CAMERA_CONFIG.INITIAL_FOV}
      near={CAMERA_CONFIG.NEAR_PLANE}
      far={CAMERA_CONFIG.FAR_PLANE}
    />
  );
}
