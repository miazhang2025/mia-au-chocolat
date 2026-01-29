'use client';

import { Suspense, useEffect, useState } from 'react';
import { ObjectLoader } from 'three';
import { Pastry } from '@/types/pastry';
import PastryModel from './models/PastryModel';

interface BakerySceneProps {
  pastries: Pastry[];
  onPastryClick: (pastry: Pastry) => void;
}

function EditorScene() {
  const [scene, setScene] = useState<any>(null);

  useEffect(() => {
    fetch('/project.json')
      .then(res => res.json())
      .then(data => {
        const loader = new ObjectLoader();
        // Parse the scene from the editor export format
        const loadedScene = loader.parse(data.scene);
        setScene(loadedScene);
      })
      .catch(err => console.error('Error loading scene:', err));
  }, []);

  if (!scene) return null;
  return (
    <group position={[0, -2, 2]} rotation={[0,3* Math.PI / 2, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export default function BakeryScene({ pastries, onPastryClick }: BakerySceneProps) {
  return (
    <>
      {/* Load scene from Three.js editor */}
      <Suspense fallback={null}>
        <EditorScene />
      </Suspense>

      {/* Pastries - keeping interactive functionality */}
      {pastries.map((pastry) => (
        <PastryModel
          key={pastry.id}
          pastry={pastry}
          onClick={() => onPastryClick(pastry)}
        />
      ))}
    </>
  );
}
