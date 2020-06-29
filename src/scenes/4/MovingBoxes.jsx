import React, { useMemo, useRef } from 'react'
import { BoxBufferGeometry, MeshBasicMaterial } from 'three'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { Random } from 'random-js'
import { OrbitControls, OrthographicCamera } from 'drei'
// import palettes from 'nice-color-palettes'
// import { randomColorPalettes } from '../../lib/randomFunction'
import { fragmentShader, vertexShader } from './shader'

const Cubes = ({ amount = 1 }) => {
  const { gl, invalidate, aspect, clock } = useThree()

  const cube = useMemo(() => new BoxBufferGeometry(), [])

  const args = useMemo(() => {
    return {
      uniforms: {
        time: { value: clock.elapsedTime },
        aspect: { value: aspect },
      },
      vertexShader,
      fragmentShader,
    }
  }, [gl.capabilities, invalidate])

  // const colorPalette = randomColorPalettes()

  const rdm = new Random()
  const rdmScale = () => rdm.real(-0.5, 0.5)
  const rdmPosition = () => rdm.real(-1, 1)

  const material = useRef()

  useFrame(({ clock }) => {
    material.current.uniforms.time.value = clock.elapsedTime
  })

  return Array(amount)
    .fill(null)
    .map((_curr, idx) => (
      <mesh
        key={`cube-${idx * Math.random()}`}
        name={`cube-${idx}`}
        geometry={cube}
        position={[rdmPosition(), rdmPosition(), rdmPosition()]}
        scale={[rdmScale(), rdmScale(), rdmScale()]}
      >
        {/* <meshStandardMaterial
          attach={'material'}
          color={randomColorFromPalette(colorPalette)}
        /> */}
        <shaderMaterial ref={material} attach={'material'} args={[args]} />
      </mesh>
    ))
}

const CubeArt = () => {
  const { gl } = useThree()

  const cam = useRef()
  const group = useRef()

  gl.setClearColor('black', 1.0)
  //'hsl(0, 0%, 95%)'

  useFrame(({ clock }) => {
    const halfElapsed = clock.elapsedTime

    group.current.rotation.y = Math.sin(halfElapsed * Math.PI * 0.5) * 2
  })

  return (
    <>
      <OrthographicCamera ref={cam} zoom={10} />
      <OrbitControls />
      <group name={'cubes'} ref={group} rotation={[0.3, 0.4, 0]}>
        <directionalLight args={['white', 1]} position={[0, 0, 4]} />
        <ambientLight args={['hsl(0, 8%, 40%)', 1.0]} />
        <Cubes amount={30} />
      </group>
    </>
  )
}

export const MovingBoxes = ({ className }) => {
  return (
    <Canvas
      gl={{ antialias: true }}
      className={className}
      camera={{
        position: [0, 0, 10],
        fov: 35,
      }}
    >
      <CubeArt />
    </Canvas>
  )
}
