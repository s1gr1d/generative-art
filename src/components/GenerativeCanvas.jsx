import React, { useMemo, useRef } from 'react'
import { toRad } from '../lib/helperFunctions'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import palettes from 'nice-color-palettes'
import { Random } from 'random-js'


const randomizeMesh = () => {
  const random = new Random()
  const palette = palettes[random.integer(0, palettes.length - 1)]

  console.log('Palette: ', palette)
  return {
    color: palette[random.integer(0, palette.length - 1)],
    position: [random.real(-8, 8), random.real(-5, 5), random.real(-10, -4)],
  }
}

const count = (curr) => {
  let direction = 1
  curr += direction
  return curr + (1 % 100) === 0 ? -1 : 1
}

const Sphere = ({ name, position, materialColor, noise }) => {
  const mesh = useRef()

  useFrame(({ clock }) => {
    const halfElapsed = clock.elapsedTime

    // mesh.current.position.x = mesh.current.position.x
    // mesh.current.position.y = mesh.current.position.y
    mesh.current.position.z += noise.noise2D(halfElapsed, halfElapsed)
  })

  console.log('mesh', mesh)
  return (
    <mesh name={name} position={position} ref={mesh}>
      <sphereBufferGeometry
        attach={'geometry'}
        rotation={[0, 0, toRad(180)]}
        position={[0, -1, 0]}
        scale={[1.5, 1.5, 1.5]}
      />
      <meshBasicMaterial attach={'material'} color={materialColor} />
    </mesh>
  )
}

const InsideCanvas = () => {
  const { viewport } = useThree()
  const number = 10 + 1

  const simplex = useSimplex(1)

  const randomValues = useMemo(
    () =>
      Array(number)
        .fill(null)
        .reduce((prev) =>
          prev ? [...prev].concat([randomizeMesh()]) : [randomizeMesh()]
        ),
    [number]
  )

  console.log('viewport', viewport)
  console.log('rand', randomValues)

  return (
    <>
      {randomValues.map((rand, idx) => (
        <Sphere
          name={`sphere-${idx}`}
          position={rand.position}
          materialColor={rand.color}
          noise={simplex}
        />
      ))}
    </>
  )
}

export const GenerativeCanvas = ({ className }) => {
  return (
    <Canvas className={className}>
      <InsideCanvas />
    </Canvas>
  )
}
