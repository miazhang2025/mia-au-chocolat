'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Pastry } from '@/types/pastry';
import Camera from './Camera';
import BakeryScene from './BakeryScene';
import Effects from './Effects';
import { SCENE_CONFIG } from '@/utils/constants';

interface SceneProps {
  pastries: Pastry[];
  onPastryClick: (pastry: Pastry, event?: MouseEvent) => void;
}

export default function Scene({ pastries, onPastryClick }: SceneProps) {
  return (
    <div className="fixed inset-0 w-full h-full">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: false }}
        style={{ background: SCENE_CONFIG.BACKGROUND_COLOR }}
      >
        <Camera />
        <Suspense fallback={null}>
          <BakeryScene pastries={pastries} onPastryClick={onPastryClick} />
          <Effects />
        </Suspense>
      </Canvas>
    </div>
  );
}
