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
  const [isDragging, setIsDragging] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const dragStart = useRef(new THREE.Vector3());
  const objectStart = useRef(new THREE.Vector3());
  const targetPosition = useRef(new THREE.Vector3());
  const originalPosition = useRef<THREE.Vector3>(new THREE.Vector3(...pastry.position));
  const hasMoved = useRef(false);
  const { gl } = useThree();
  const { scene } = useGLTF(pastry.modelPath!);

  // Clone scene and apply toon material immediately, store material references
  const { modelScene, materials } = useMemo(() => {
    const clonedScene = scene.clone();
    const mats: THREE.MeshToonMaterial[] = [];
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        const material = new THREE.MeshToonMaterial({
          color: '#d4a574',
        });
        child.material = material;
        mats.push(material);
      }
    });
    return { modelScene: clonedScene, materials: mats };
  }, [scene]);

  // Update material color on hover (using cached material references)
  useEffect(() => {
    const color = hovered ? '#ffcc80' : '#d4a574';
    materials.forEach(material => material.color.set(color));
  }, [materials, hovered]);

  useFrame((state) => {
    if (meshRef.current) {
      if (isReturning) {
        meshRef.current.position.lerp(originalPosition.current, 0.15);
        
        if (meshRef.current.position.distanceTo(originalPosition.current) < 0.01) {
          meshRef.current.position.copy(originalPosition.current);
          setIsReturning(false);
        }
      } else if (isDragging) {
        meshRef.current.position.lerp(targetPosition.current, 0.2);
      } else {
        meshRef.current.position.y =
          originalPosition.current.y + Math.sin(state.clock.elapsedTime + pastry.position[0]) * 0.05;
      }
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    hasMoved.current = false;
    
    if (meshRef.current && e.point) {
      dragStart.current.copy(e.point);
      objectStart.current.copy(meshRef.current.position);
      targetPosition.current.copy(meshRef.current.position);
      gl.domElement.style.cursor = 'grabbing';
    }
  };

  const handlePointerMove = (e: any) => {
    if (isDragging && e.point) {
      e.stopPropagation();
      const delta = new THREE.Vector3().subVectors(e.point, dragStart.current);
      
      if (delta.length() > 0.1) {
        hasMoved.current = true;
      }
      
      targetPosition.current.copy(objectStart.current).add(delta);
    }
  };

  const handlePointerUp = (e: any) => {
    e.stopPropagation();
    
    if (isDragging) {
      setIsDragging(false);
      
      if (hasMoved.current) {
        setIsReturning(true);
      } else {
        const mouseEvent = new MouseEvent('click', {
          clientX: e.clientX || (e.nativeEvent && e.nativeEvent.clientX),
          clientY: e.clientY || (e.nativeEvent && e.nativeEvent.clientY),
        });
        onClick(mouseEvent);
      }
      
      gl.domElement.style.cursor = hovered ? 'grab' : 'default';
    }
  };

  return (
    <group
      ref={meshRef}
      position={pastry.position}
      rotation={pastry.rotation || [0, 0, 0]}
      scale={pastry.scale || 1}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOver={() => {
        setHovered(true);
        gl.domElement.style.cursor = isDragging ? 'grabbing' : 'grab';
      }}
      onPointerOut={() => {
        setHovered(false);
        if (!isDragging) {
          gl.domElement.style.cursor = 'default';
        }
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
  const [isDragging, setIsDragging] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const dragStart = useRef(new THREE.Vector3());
  const objectStart = useRef(new THREE.Vector3());
  const targetPosition = useRef(new THREE.Vector3());
  const originalPosition = useRef<THREE.Vector3>(new THREE.Vector3(...pastry.position));
  const hasMoved = useRef(false);
  const { gl } = useThree();

  // Smooth interpolation for all animations
  useFrame((state) => {
    if (meshRef.current) {
      if (isReturning) {
        // Smoothly return to original position with spring-like effect
        meshRef.current.position.lerp(originalPosition.current, 0.15);
        
        // Stop returning when close enough
        if (meshRef.current.position.distanceTo(originalPosition.current) < 0.01) {
          meshRef.current.position.copy(originalPosition.current);
          setIsReturning(false);
        }
      } else if (isDragging) {
        // Smooth interpolation while dragging
        meshRef.current.position.lerp(targetPosition.current, 0.2);
      } else {
        // Gentle floating animation
        meshRef.current.position.y =
          originalPosition.current.y + Math.sin(state.clock.elapsedTime + pastry.position[0]) * 0.05;
      }
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    hasMoved.current = false;
    
    if (meshRef.current && e.point) {
      dragStart.current.copy(e.point);
      objectStart.current.copy(meshRef.current.position);
      targetPosition.current.copy(meshRef.current.position);
      gl.domElement.style.cursor = 'grabbing';
    }
  };

  const handlePointerMove = (e: any) => {
    if (isDragging && e.point) {
      e.stopPropagation();
      const delta = new THREE.Vector3().subVectors(e.point, dragStart.current);
      
      // Track if user actually dragged (moved more than a small threshold)
      if (delta.length() > 0.1) {
        hasMoved.current = true;
      }
      
      targetPosition.current.copy(objectStart.current).add(delta);
    }
  };

  const handlePointerUp = (e: any) => {
    e.stopPropagation();
    
    if (isDragging) {
      setIsDragging(false);
      
      // Only return if actually dragged, otherwise trigger onClick
      if (hasMoved.current) {
        setIsReturning(true);
      } else {
        // Create a synthetic mouse event with the screen coordinates
        const mouseEvent = new MouseEvent('click', {
          clientX: e.clientX || (e.nativeEvent && e.nativeEvent.clientX),
          clientY: e.clientY || (e.nativeEvent && e.nativeEvent.clientY),
        });
        onClick(mouseEvent);
      }
      
      gl.domElement.style.cursor = hovered ? 'grab' : 'default';
    }
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
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOver={() => {
        setHovered(true);
        gl.domElement.style.cursor = isDragging ? 'grabbing' : 'grab';
      }}
      onPointerOut={() => {
        setHovered(false);
        if (!isDragging) {
          gl.domElement.style.cursor = 'default';
        }
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
