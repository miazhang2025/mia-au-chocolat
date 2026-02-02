'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAMERA_CONFIG } from '@/utils/constants';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useScrollZoom = () => {
  const [zoom, setZoom] = useState(CAMERA_CONFIG.INITIAL_POSITION[2]);
  const zoomRef = useRef({ value: CAMERA_CONFIG.INITIAL_POSITION[2] });

  useEffect(() => {
    // Create a scroll-based animation for zoom
    const ctx = gsap.context(() => {
      gsap.to(zoomRef.current, {
        value: CAMERA_CONFIG.MIN_Z, // Zoom in to MIN_Z as we scroll down
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // Smooth scrubbing effect
          onUpdate: (self) => {
            // Interpolate between MAX_Z (start) and MIN_Z (end)
            const newZoom = gsap.utils.interpolate(
              CAMERA_CONFIG.MAX_Z,
              CAMERA_CONFIG.MIN_Z,
              self.progress
            );
            zoomRef.current.value = newZoom;
            setZoom(newZoom);
          }
        }
      });
    });

    return () => {
      ctx.revert(); // Clean up GSAP context
    };
  }, []);

  return zoom;
};
