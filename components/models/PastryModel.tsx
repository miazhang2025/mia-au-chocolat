'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Outlines, useGLTF } from '@react-three/drei';
import { Pastry } from '@/types/pastry';
import { INTERACTION_CONFIG } from '@/utils/constants';
import * as THREE from 'three';

interface PastryModelProps {
  pastry: Pastry;
  onClick: (event?: MouseEvent) => void;
}

// Separate component for GLTF models
function GLTFPastryModel({ pastry, onClick }: PastryModelProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const originalPosition = useRef<THREE.Vector3>(new THREE.Vector3(...pastry.position));
  const { gl } = useThree();
  const { scene } = useGLTF(pastry.modelPath!);

  // Clone scene and apply toon material using the model's original textures
  const { modelScene, materials } = useMemo(() => {
    const clonedScene = scene.clone();
    const mats: THREE.MeshToonMaterial[] = [];
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        const originalMat = child.material;
        const map = originalMat?.map || null;
        const material = new THREE.MeshToonMaterial({
          map: map,
          color: map ? '#ffffff' : '#d4a574',
          emissive: '#ffcc80',
          emissiveIntensity: 0,
        });
        child.material = material;
        mats.push(material);
      }
    });
    return { modelScene: clonedScene, materials: mats };
  }, [scene]);

  // Update emissive on hover
  useEffect(() => {
    materials.forEach(material => {
      material.emissiveIntensity = hovered ? 0.3 : 0;
    });
  }, [materials, hovered]);

  // Gentle floating animation only
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        originalPosition.current.y + Math.sin(state.clock.elapsedTime + pastry.position[0]) * 0.05;
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    const mouseEvent = new MouseEvent('click', {
      clientX: e.clientX || (e.nativeEvent && e.nativeEvent.clientX),
      clientY: e.clientY || (e.nativeEvent && e.nativeEvent.clientY),
    });
    onClick(mouseEvent);
  };

  return (
    <group
      ref={meshRef}
      position={pastry.position}
      rotation={pastry.rotation || [0, 0, 0]}
      scale={pastry.scale || 1}
      onClick={handleClick}
      onPointerOver={() => {
        setHovered(true);
        gl.domElement.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        gl.domElement.style.cursor = 'default';
      }}
    >
      <primitive object={modelScene} />
      {hovered && (
        <Outlines
          thickness={INTERACTION_CONFIG.HOVER_OUTLINE_THICKNESS}
          color={INTERACTION_CONFIG.HOVER_OUTLINE_COLOR}
        />
      )}
    </group>
  );
}

export default function PastryModel({ pastry, onClick }: PastryModelProps) {
  // If it's a GLTF model, use the separate component
  if (pastry.modelType === 'gltf' && pastry.modelPath) {
    return <GLTFPastryModel pastry={pastry} onClick={onClick} />;
  }

  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const originalPosition = useRef<THREE.Vector3>(new THREE.Vector3(...pastry.position));
  const { gl } = useThree();

  // Gentle floating animation only
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        originalPosition.current.y + Math.sin(state.clock.elapsedTime + pastry.position[0]) * 0.05;
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    const mouseEvent = new MouseEvent('click', {
      clientX: e.clientX || (e.nativeEvent && e.nativeEvent.clientX),
      clientY: e.clientY || (e.nativeEvent && e.nativeEvent.clientY),
    });
    onClick(mouseEvent);
  };

  const renderGeometry = () => {
    switch (pastry.modelType) {
      case 'cube':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'cylinder':
        return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />;
      case 'sphere':
        return <sphereGeometry args={[0.5, 32, 32]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={pastry.position}
      rotation={pastry.rotation || [0, 0, 0]}
      scale={pastry.scale || 1}
      onClick={handleClick}
      onPointerOver={() => {
        setHovered(true);
        gl.domElement.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        gl.domElement.style.cursor = 'default';
      }}
    >
      {renderGeometry()}
      <meshToonMaterial
        color={hovered ? '#ffcc80' : '#d4a574'}
      />
      {hovered && (
        <Outlines
          thickness={INTERACTION_CONFIG.HOVER_OUTLINE_THICKNESS}
          color={INTERACTION_CONFIG.HOVER_OUTLINE_COLOR}
        />
      )}
    </mesh>
  );
}
