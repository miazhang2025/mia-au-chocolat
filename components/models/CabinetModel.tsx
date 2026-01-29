'use client';

import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

export default function CabinetModel() {
  const gltf = useGLTF('/models/cabinet.glb');

  // Clone the scene so we can use multiple instances
  const scene = useMemo(() => {
    const clonedScene = gltf.scene.clone(true);
    
    // Apply plain brown material to all meshes
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Create simple brown material
        child.material = new THREE.MeshStandardMaterial({
          color: '#8b6f47',
          roughness: 0.8,
          metalness: 0,
        });
        
        // Enable shadow casting and receiving
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    
    return clonedScene;
  }, [gltf.scene]);

  return <primitive object={scene} />;
}

// Preload the model
useGLTF.preload('/models/cabinet.glb');
