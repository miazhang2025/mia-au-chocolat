// Shader fragment for postprocessing Effect
const EdgeDetectionShader = `
  uniform sampler2D tNormal;
  uniform vec2 resolution;
  uniform float edgeStrength;
  uniform float edgeThreshold;
  uniform float time;
  uniform float wiggleAmount;
  uniform float wiggleFrequency;
  
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  
  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 texel = vec2(1.0) / resolution;
    
    vec4 c0 = inputColor;
    vec4 c1 = texture2D(inputBuffer, uv + vec2(texel.x, 0.0));
    vec4 c2 = texture2D(inputBuffer, uv + vec2(0.0, texel.y));
    vec4 c3 = texture2D(inputBuffer, uv + vec2(-texel.x, 0.0));
    vec4 c4 = texture2D(inputBuffer, uv + vec2(0.0, -texel.y));
    
    float edge = 0.0;
    edge += length(c1.rgb - c3.rgb);
    edge += length(c2.rgb - c4.rgb);
    edge += length(c1.rgb - c0.rgb);
    edge += length(c2.rgb - c0.rgb);
    edge += length(c3.rgb - c0.rgb);
    edge += length(c4.rgb - c0.rgb);
    
    edge = edge * edgeStrength;
    
    float wiggle = smoothNoise(uv * wiggleFrequency + time * 0.2);
    edge = edge * (0.7 + wiggle * wiggleAmount * 0.3);
    
    edge = clamp(edge, 0.0, 1.0);
    
    vec3 finalColor = mix(inputColor.rgb, vec3(0.0), edge);
    
    outputColor = vec4(finalColor, inputColor.a);
  }
`;

export default EdgeDetectionShader;
