'use client';

import { useEffect, useRef, useCallback } from 'react';
import { CAMERA_CONFIG } from '@/utils/constants';

export const useScrollZoom = () => {
  const zoomRef = useRef(CAMERA_CONFIG.INITIAL_POSITION[2]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * CAMERA_CONFIG.ZOOM_SPEED;
    zoomRef.current = Math.max(
      CAMERA_CONFIG.MIN_Z,
      Math.min(CAMERA_CONFIG.MAX_Z, zoomRef.current + delta)
    );
  }, []);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  return zoomRef;
};
