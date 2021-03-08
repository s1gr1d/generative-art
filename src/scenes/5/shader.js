import { simplex4d } from '../../lib/noiseFunc/simplex4d'
import { simplex3D, simplex4D } from 'glsl-noise-template-string'

export const fragmentShader = ` 
  ${simplex3D}

  uniform float time;
  uniform float aspect;
  uniform vec3 color;
  varying vec2 vUv;
  
  void main () {
    vec2 center = vec2(0.5, 0.5);
    vec3 tempColor = vec3(vUv.x);
    
    vec2 coords = vUv;
    
    // stretch the x coordinate by 2
    coords.x *= 2.0;
    
    // multiply UV by 8
    vec2 pos = mod(coords * 8.0, 1.0);
  
    
    float d = distance(pos, center);
    
    // circle size
    // float mask = d > 0.25 ? 1.0 : 0.0;
    // float mask = step(0.23 + sin(time + vUv.x  * 2.0) * 0.25, d);
    
    vec2 noiseInput = coords * 10.0;
    float offset = simplex3D(vec3(noiseInput, time));
    float mask = step(0.23 + offset, d);
    
    vec3 fragColor = mix(color, vec3(1.0), mask);

    gl_FragColor = vec4(vec3(fragColor), 1.0);
  }
`

export const vertexShader = `
    ${simplex4D} 
   
    varying vec2 vUv;
    
    uniform float time;
    
 
    void main() {
      vUv = uv;
      
      float posX = position.x;
      vec3 pos = position.xyz;
      //pos += simplex4D(vec4(position, time));
           
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `
