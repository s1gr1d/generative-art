import { simplex4d } from '../../lib/noiseFunc/simplex4d'

export const fragmentShader = `
  uniform float time;
  uniform float aspect;
  varying vec2 vUv;
  
  void main () {
    vec3 color = vec3(vUv.x);

    gl_FragColor = vec4(color, 1.0);
  }
`

export const vertexShader =
  `${simplex4d}` +
  `
   
    varying vec2 vUv;
    
    uniform float time;
    
 
    float noise(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }
   

    void main() {
      vUv = uv;
      
      float posX = position.x;
      vec3 pos = position.xyz;
      pos += snoise4(vec4(position.xyz, time));
           
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `
