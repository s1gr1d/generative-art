import glsl from 'glslify'

export const fragmentShader = glsl`
  uniform float time;
  uniform float aspect;
  varying vec2 vUv;
  
  void main () {

    vec3 color = 0.5 + 0.5 * cos(time + vUv.xyx + vec3(0.0, 2.0, 4.0));

    gl_FragColor = vec4(color, 1.0);
  }
`

export const vertexShader = glsl`
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `
