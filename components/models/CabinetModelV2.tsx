'use client';

import { useGLTF, useTexture } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function CabinetModelV2() {
  const gltf = useGLTF('/models/cabinetv2.gltf');
  
  // Load DefaultMaterial textures
  const [baseColorMap, normalMap, ormMap] = useTexture([
    '/textures/DefaultMaterial_baseColor.png',
    '/textures/DefaultMaterial_normal.png',
    '/textures/DefaultMaterial_occlusionRoughnessMetallic.png',
  ]);

  useEffect(() => {
    // Apply textures to all meshes in the cabinet model
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Create material with the textures
        child.material = new THREE.MeshStandardMaterial({
          map: baseColorMap,
          normalMap: normalMap,
          aoMap: ormMap,
          roughnessMap: ormMap,
          metalnessMap: ormMap,
          roughness: 1,
          metalness: 1,
        });
        
        // Enable shadow casting and receiving
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [gltf, baseColorMap, normalMap, ormMap]);

  return <primitive object={gltf.scene} />;
}

// Preload the model
useGLTF.preload('/models/cabinetv2.gltf');
