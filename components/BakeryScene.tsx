'use client';

import { Suspense } from 'react';
import { Pastry } from '@/types/pastry';
import PastryModel from './models/PastryModel';
import CabinetModel from './models/CabinetModel';
import CabinetModelV2 from './models/CabinetModelV2';
import Lighting from './Lighting';

interface BakerySceneProps {
  pastries: Pastry[];
  onPastryClick: (pastry: Pastry) => void;
}

export default function BakeryScene({ pastries, onPastryClick }: BakerySceneProps) {
  return (
    <>
      <Lighting />
      
      {/* Cabinet Background Asset */}
      <Suspense fallback={null}>
        <group position={[0, 0, -3]} scale={1} rotation={[0, 3 * Math.PI / 2, 0]}>
          <CabinetModel />
        </group>
      </Suspense>
      
      {/* Cabinet V2 Background Asset */}
      <Suspense fallback={null}>
        <group position={[3, 0, -3]} scale={1} rotation={[0, 3 * Math.PI / 2, 0]}>
          <CabinetModelV2 />
        </group>
      </Suspense>
      
      {/* Bakery Counter - Placeholder */}
      <mesh position={[0, -3, -1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 10]} />
        <meshStandardMaterial color="#8b6f47" roughness={0.8} />
      </mesh>

      {/* Back Wall - Placeholder */}
      <mesh position={[0, 0, -2]}>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial color="#f5e6d3" roughness={0.9} />
      </mesh>

      {/* Display Case Frame - Placeholder */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[6, 0.1, 1]} />
        <meshStandardMaterial color="#555555" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Pastries */}
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
