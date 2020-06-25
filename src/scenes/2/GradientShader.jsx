import React, { useMemo } from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import { fragmentShader, vertexShader } from './shader'

const ShaderStuff = () => {
  const { gl, invalidate, aspect, clock } = useThree()

  const args = useMemo(() => {
    return {
      uniforms: {
        time: { type: 'f', value: clock.elapsedTime },
        aspect: { type: 'f', value: aspect },
      },
      vertexShader,
      fragmentShader,
    }
  }, [gl.capabilities, invalidate])

  return (
    <mesh>
      <planeBufferGeometry attach={'geometry'} args={[10, 5]} />
      <shaderMaterial attach={'material'} args={[args]} />
    </mesh>
  )
}
export const GradientShader = ({ className }) => {
  return (
    <Canvas
      gl={{ antialias: true }}
      className={className}
      camera={{
        position: [0, 0, 10],
        fov: 35,
      }}
    >
      <ShaderStuff />
    </Canvas>
  )
}
