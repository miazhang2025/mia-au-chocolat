// Camera Configuration
export const CAMERA_CONFIG = {
  INITIAL_POSITION: [0, 0, 2] as [number, number, number],
  INITIAL_FOV: 60,
  NEAR_PLANE: 0.1,
  FAR_PLANE: 1000,
  
  // Mouse parallax settings
  PARALLAX_STRENGTH: 0.5,
  MAX_PARALLAX_X: 0.3,
  MAX_PARALLAX_Y: 0.2,
  
  // Scroll zoom settings
  MIN_Z: 3,
  MAX_Z: 5,
  ZOOM_SPEED: 0.002,
} as const;

// Scene Configuration
export const SCENE_CONFIG = {
  BACKGROUND_COLOR: '#1a1a1a',
  AMBIENT_LIGHT_INTENSITY: 0.5,
  DIRECTIONAL_LIGHT_INTENSITY: 2,
  POINT_LIGHT_INTENSITY: 0.8,
  FOG_COLOR: '#e6decea1',
  FOG_NEAR: 3,
  FOG_FAR: 10,
} as const;

// Interaction Configuration
export const INTERACTION_CONFIG = {
  HOVER_OUTLINE_THICKNESS: 0.05,
  HOVER_OUTLINE_COLOR: '#ffd700',
  CLICK_SCALE_MULTIPLIER: 1.1,
} as const;

// UI Configuration
export const UI_CONFIG = {
  NAVBAR_HEIGHT: '100px',
  MENU_WIDTH: '300px',
  MENU_ANIMATION_DURATION: 1,
  CARD_MAX_WIDTH: '600px',
} as const;
