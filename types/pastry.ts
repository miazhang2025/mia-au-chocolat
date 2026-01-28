export interface Pastry {
  id: string;
  name: string;
  description: string;
  recipe: string;
  image: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  modelType: 'cube' | 'cylinder' | 'sphere'; // Placeholder types
}

export interface CameraState {
  position: [number, number, number];
  fov: number;
  near: number;
  far: number;
}
