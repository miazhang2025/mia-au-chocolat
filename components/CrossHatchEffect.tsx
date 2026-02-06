// Shader fragment for cross-hatching effect based on brightness levels
const CrossHatchShader = `
  uniform sampler2D tLines;
  uniform vec2 resolution;
  uniform float time;
  
  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    // Calculate brightness/luminance of the current pixel
    float brightness = dot(inputColor.rgb, vec3(0.299, 0.587, 0.114));
    
    // Sample the lines texture (R=vertical, G=horizontal, B=diagonal)
    // Use a larger scale factor to make pattern size more consistent across objects
    vec2 lineUV = uv * resolution / 150.0; // Increased from 256.0 for larger pattern scale
    vec3 lines = texture2D(tLines, lineUV).rgb;
    
    // Invert lines so black lines create shadows
    //lines = 1.0 - lines;
    
    // Quantize brightness into 4 discrete levels (0, 1, 2, 3)
    float level = floor(brightness * 4.0);
    level = clamp(level, 0.0, 3.0);
    
    // Apply shadow patterns based on quantized level
    float shadow = 0.0;
    
    // Level 0 (darkest): all three patterns
    shadow += step(level, 0.01) * (lines.r + lines.g + lines.b);
    
    // Level 1: horizontal + vertical
    shadow += step(0.01, level) * step(level, 0.5) * (lines.r + lines.g) / 2.0;
    
    // Level 2: horizontal only
    shadow += step(0.5, level) * step(level, 1.0) * lines.r / 3.0;
    
    // Level 3 (brightest): no shadow
    // (nothing to add)
    
    
    // Apply shadow to the color with increased intensity for visibility
    vec3 finalColor = inputColor.rgb * (1.0-shadow*0.35);
    
    outputColor = vec4(finalColor, inputColor.a);
  }
`

export default CrossHatchShader;
