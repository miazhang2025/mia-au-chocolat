'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { Effect } from 'postprocessing';
import { WebGLRenderTarget, NearestFilter, RGBAFormat, Uniform } from 'three';
import * as THREE from 'three';
import EdgeDetectionShader from './EdgeDetectionEffect';

// Custom Edge Detection Effect using postprocessing library
class EdgeDetectionEffect extends Effect {
  constructor({
    edgeStrength = 1.5,
    edgeThreshold = 0.08,
    wiggleAmount = 0.8,
    wiggleFrequency = 25.0
  } = {}) {
    super('EdgeDetectionEffect', EdgeDetectionShader, {
      uniforms: new Map([
        ['tNormal', new Uniform(null)],
        ['resolution', new Uniform(new THREE.Vector2(1, 1))],
        ['edgeStrength', new Uniform(edgeStrength)],
        ['edgeThreshold', new Uniform(edgeThreshold)],
        ['time', new Uniform(0)],
        ['wiggleAmount', new Uniform(wiggleAmount)],
        ['wiggleFrequency', new Uniform(wiggleFrequency)]
      ] as any)
    });
  }

  update(renderer: any, inputBuffer: any, deltaTime: number) {
    // @ts-ignore
    this.uniforms.get('time').value += deltaTime;
  }
}

export default function Effects() {
  const { size } = useThree();
  
  // Create edge effect
  const edgeEffect = useMemo(() => {
    const effect = new EdgeDetectionEffect({
      edgeStrength: 3.5,
      edgeThreshold: 0.0,
      wiggleAmount: 0.8,
      wiggleFrequency: 35.0
    });
    
    // @ts-ignore
    effect.uniforms.get('resolution').value.set(size.width, size.height);
    
    return effect;
  }, [size.width, size.height]);

  // Update resolution on resize
  useEffect(() => {
    // @ts-ignore
    edgeEffect.uniforms.get('resolution').value.set(size.width, size.height);
  }, [size.width, size.height, edgeEffect]);

  return (
    <EffectComposer>
      <primitive object={edgeEffect} dispose={null} />
    </EffectComposer>
  );
}
