'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { Effect } from 'postprocessing';
import { WebGLRenderTarget, NearestFilter, RGBAFormat, Uniform } from 'three';
import * as THREE from 'three';
import EdgeDetectionShader from './EdgeDetectionEffect';
import CrossHatchShader from './CrossHatchEffect';

// Custom Edge Detection Effect using postprocessing library
class EdgeDetectionEffect extends Effect {
  constructor({
    edgeStrength = 0.1,
    edgeThreshold = 0,
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

// Custom Cross-Hatch Effect for brightness-based shadows
class CrossHatchEffect extends Effect {
  constructor(linesTexture: THREE.Texture) {
    super('CrossHatchEffect', CrossHatchShader, {
      uniforms: new Map([
        ['tLines', new Uniform(linesTexture)],
        ['resolution', new Uniform(new THREE.Vector2(1, 1))],
        ['time', new Uniform(0)]
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
  
  // Load lines texture
  const linesTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const texture = loader.load('/lines.png', (loadedTexture) => {
      console.log('Lines texture loaded successfully:', loadedTexture);
    }, undefined, (error) => {
      console.error('Error loading lines texture:', error);
    });
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    return texture;
  }, []);
  
  // Create cross-hatch effect
  const crossHatchEffect = useMemo(() => {
    const effect = new CrossHatchEffect(linesTexture);
    
    // @ts-ignore
    effect.uniforms.get('resolution').value.set(size.width, size.height);
    
    console.log('CrossHatch effect created with resolution:', size.width, size.height);
    
    return effect;
  }, [linesTexture, size.width, size.height]);
  
  // Create edge effect
  const edgeEffect = useMemo(() => {
    const effect = new EdgeDetectionEffect({
      edgeStrength: 0.5,
      edgeThreshold: 2,
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
    crossHatchEffect.uniforms.get('resolution').value.set(size.width, size.height);
    // @ts-ignore
    edgeEffect.uniforms.get('resolution').value.set(size.width, size.height);
  }, [size.width, size.height, crossHatchEffect, edgeEffect]);

  return (
    <EffectComposer>
      <primitive object={crossHatchEffect} dispose={null} />
      <primitive object={edgeEffect} dispose={null} />
    </EffectComposer>
  );
}
