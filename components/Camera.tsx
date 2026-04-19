'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useScrollZoom } from '@/hooks/useScrollZoom';
import { CAMERA_CONFIG } from '@/utils/constants';
import * as THREE from 'three';

// Smooth ease-out cubic
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function Camera() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const mousePosition = useMousePosition();
  const zoomRef = useScrollZoom();
  const { set, gl } = useThree();

  // Intro animation state
  const introStartTime = useRef(-1);
  const introProgress = useRef(0); // 0 = start, 1 = done
  const introStart = useRef(new THREE.Vector3(...CAMERA_CONFIG.INTRO_START_POSITION));
  const introEnd = useRef(new THREE.Vector3(...CAMERA_CONFIG.INITIAL_POSITION));

  // Orbit state
  const thetaRef = useRef(0);
  const targetThetaRef = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartTheta = useRef(0);

  useEffect(() => {
    if (cameraRef.current) {
      // Place camera at intro start position immediately
      cameraRef.current.position.copy(introStart.current);
      cameraRef.current.lookAt(0, 0, 0);
      set({ camera: cameraRef.current });
    }
  }, [set]);

  // Pointer event handlers for click-drag orbit (suppressed during intro)
  const handlePointerDown = useCallback((e: PointerEvent) => {
    if (introProgress.current < 1) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartTheta.current = targetThetaRef.current;
    gl.domElement.style.cursor = 'grabbing';
  }, [gl]);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - dragStartX.current;
    const newTheta = dragStartTheta.current - deltaX * CAMERA_CONFIG.ROTATION_SPEED;
    targetThetaRef.current = Math.max(
      CAMERA_CONFIG.MIN_AZIMUTH,
      Math.min(CAMERA_CONFIG.MAX_AZIMUTH, newTheta)
    );
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    gl.domElement.style.cursor = 'default';
  }, [gl]);

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [gl, handlePointerDown, handlePointerMove, handlePointerUp]);

  useFrame((state) => {
    if (!cameraRef.current) return;

    const elapsed = state.clock.getElapsedTime();

    // --- Intro animation ---
    if (introProgress.current < 1) {
      if (introStartTime.current < 0) {
        introStartTime.current = elapsed;
      }
      const t = Math.min((elapsed - introStartTime.current) / CAMERA_CONFIG.INTRO_DURATION, 1);
      const eased = easeOutCubic(t);
      introProgress.current = t;

      // Interpolate from start to end position
      cameraRef.current.position.lerpVectors(introStart.current, introEnd.current, eased);
      cameraRef.current.lookAt(0, 0, 0);
      return; // skip normal controls during intro
    }

    // --- Normal camera controls (after intro) ---
    // Smooth the orbit angle
    thetaRef.current += (targetThetaRef.current - thetaRef.current) * 0.2;

    // Compute base position from orbit angle
    const zoom = zoomRef.current;
    const radius = zoom;
    const baseX = radius * Math.sin(thetaRef.current);
    const baseZ = radius * Math.cos(thetaRef.current);
    // Lower Y as we zoom in: map zoom [MIN_Z..MAX_Z] to Y offset [−0.5..0]
    const zoomRange = CAMERA_CONFIG.MAX_Z - CAMERA_CONFIG.MIN_Z;
    const zoomNorm = (zoom - CAMERA_CONFIG.MIN_Z) / zoomRange; // 0 = zoomed in, 1 = zoomed out
    const baseY = CAMERA_CONFIG.INITIAL_POSITION[1] + (1 - zoomNorm) * 1;

    // Apply mouse parallax offset
    const parallaxX = Math.max(
      -CAMERA_CONFIG.MAX_PARALLAX_X,
      Math.min(CAMERA_CONFIG.MAX_PARALLAX_X, mousePosition.x * CAMERA_CONFIG.PARALLAX_STRENGTH)
    );
    const parallaxY = Math.max(
      -CAMERA_CONFIG.MAX_PARALLAX_Y,
      Math.min(CAMERA_CONFIG.MAX_PARALLAX_Y, mousePosition.y * CAMERA_CONFIG.PARALLAX_STRENGTH)
    );

    // Smooth camera movement toward target
    const targetX = baseX + parallaxX;
    const targetY = baseY + parallaxY;
    const targetZ = baseZ;

    cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.1;
    cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.1;
    cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.1;

    // Always look at center
    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={CAMERA_CONFIG.INTRO_START_POSITION}
      fov={CAMERA_CONFIG.INITIAL_FOV}
      near={CAMERA_CONFIG.NEAR_PLANE}
      far={CAMERA_CONFIG.FAR_PLANE}
    />
  );
}
