import React, { useCallback, useEffect } from 'react'
import { Canvas } from 'react-three-fiber'
import { useSpring } from 'react-spring/three'
import { toRad } from '../../lib/helperFunctions'
import { Camera } from '../../components/Camera'
import { WireframeTerrain } from '../../components/WireframeTerrain'

export const Terrain = () => {
  const [props, set] = useSpring(() => ({
    terrainRotation: [0.2, 0.53, 0.22],
    terrainPosition: [3, 1, 0],
    camRotation: [0, toRad(-180), 0],
    config: { mass: 10, tension: 500, friction: 300 },
  }))

  const onMouseMove = useCallback(
    ({ clientX, clientY }) => {
      const offsetX = clientX / 5000
      const offsetY = clientY / 5000

      set({
        terrainRotation: [0.2 + offsetY, 0.53 + offsetX, 0.22],
        terrainPosition: [0, 0, 0],
      })
    },
    [set]
  )

  useEffect(() => {
    set({ camRotation: [0, 0, 0] })
  }, [set])

  return (
    <Canvas onMouseMove={onMouseMove}>
      <Camera position={[0, 0, 10]} rotation={props.camRotation} />
      <WireframeTerrain
        rotation={props.terrainRotation}
        position={props.terrainPosition}
      />
    </Canvas>
  )
}
