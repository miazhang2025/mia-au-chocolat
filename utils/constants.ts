// Camera Configuration
export const CAMERA_CONFIG = {
  INITIAL_POSITION: [0, -0.1, 6] as [number, number, number],
  INITIAL_FOV: 55,
  NEAR_PLANE: 0.1,
  FAR_PLANE: 1000,
  APERTURE: 1.0,
  FOCUS_POINT: [0, 0, 0] as [number, number, number],
  BOKEH_SCALE: 100.0,
  
  // Mouse parallax settings
  PARALLAX_STRENGTH: 0.2,
  MAX_PARALLAX_X: 0.3,
  MAX_PARALLAX_Y: 0.2,
  
  // Scroll zoom settings (now wheel-based)
  MIN_Z: 4,
  MAX_Z: 6,
  ZOOM_SPEED: 0.005,

  // Pan/orbit settings (horizontal arc)
  ROTATION_SPEED: 0.003,
  MIN_AZIMUTH: -Math.PI / 6, // -30 degrees
  MAX_AZIMUTH: Math.PI / 6,  // +30 degrees

  // Intro animation
  INTRO_START_POSITION: [3, 5, 14] as [number, number, number],
  INTRO_DURATION: 2.5, // seconds
} as const;

// Scene Configuration
export const SCENE_CONFIG = {
  BACKGROUND_COLOR: '#d0fff8',
  AMBIENT_LIGHT_INTENSITY: 0.5,
  DIRECTIONAL_LIGHT_INTENSITY: 2,
  POINT_LIGHT_INTENSITY: 0.8,
  FOG_COLOR: '#3c08aca1',
  FOG_NEAR: 1,
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
