'use client';

import { useEffect, useState } from 'react';
import { CAMERA_CONFIG } from '@/utils/constants';

export const useScrollZoom = () => {
  const [zoom, setZoom] = useState(CAMERA_CONFIG.INITIAL_POSITION[2]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      
      setZoom((prevZoom) => {
        const newZoom = prevZoom + event.deltaY * CAMERA_CONFIG.ZOOM_SPEED;
        return Math.max(
          CAMERA_CONFIG.MIN_Z,
          Math.min(CAMERA_CONFIG.MAX_Z, newZoom)
        );
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return zoom;
};
