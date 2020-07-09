import { Canvas, useFrame, useThree } from 'react-three-fiber'
import React, { useMemo, useRef } from 'react'
import { OrbitControls, OrthographicCamera } from 'drei'
import { BoxBufferGeometry } from 'three'
import { fragmentShader, vertexShader } from './shader'
import * as THREE from 'three'

const Circles = () => {
  const { gl, invalidate, aspect, clock } = useThree()

  const args = useMemo(() => {
    return {
      uniforms: {
        time: { value: clock.elapsedTime },
        aspect: { value: aspect },
        color: { value: new THREE.Color('#42ecf5') },
      },
      vertexShader,
      fragmentShader,
    }
  }, [gl.capabilities, invalidate])

  const material = useRef()
  const cam = useRef()
  const group = useRef()

  gl.setClearColor('black', 1.0)
  //'hsl(0, 0%, 95%)'

  useFrame(({ clock }) => {
    const halfElapsed = clock.elapsedTime
    material.current.uniforms.time.value = clock.elapsedTime
    group.current.rotation.y = Math.sin(halfElapsed * Math.PI * 0.5) * 2
  })

  return (
    <>
      <OrthographicCamera ref={cam} zoom={10} />
      <OrbitControls />
      <group name={'cubes'} ref={group} rotation={[0.3, 0.4, 0]}>
        <directionalLight args={['white', 1]} position={[0, 0, 4]} />
        <ambientLight args={['hsl(0, 8%, 40%)', 1.0]} />
        <mesh>
          <sphereBufferGeometry args={[1, 32, 16]} attach={'geometry'} />
          <shaderMaterial ref={material} attach={'material'} args={[args]} />
        </mesh>
      </group>
    </>
  )
}

export const DottedCircles = ({ className }) => {
  return (
    <Canvas
      gl={{ antialias: true }}
      className={className}
      camera={{
        position: [0, 0, 10],
        fov: 35,
      }}
    >
      <Circles />
    </Canvas>
  )
}
