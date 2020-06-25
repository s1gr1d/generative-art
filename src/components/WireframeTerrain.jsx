import React, { useCallback } from 'react'
import { useUpdate } from 'react-three-fiber'
import PropTypes from 'prop-types'
import { animated } from 'react-spring/three'
import { useSimplex } from '../hooks/useSimplex'

const generateTerrain = (simplex, size, height, levels, scale) => {
  // recursion for the levels
  const noise = (level, x, z) =>
    simplex.noise2D(scale * level * x, scale * level * z) / level +
    (level > 1 ? noise(level / 2, x, z) : 0)

  return Array(size ** 2)
    .fill(null)
    .map((_curr, idx) => {
      const x = (idx % size) / size - 0.5
      const z = Math.floor(idx / size) / size - 0.5
      const y = noise(2 ** levels, x, z) * height

      return {
        x: x * scale,
        y: y,
        z: z * scale,
      }
    })
}

export const WireframeTerrain = ({
  size = 20,
  height = 0.2,
  levels = 12,
  scale = 10,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
}) => {
  const seed = 1

  const simplex = useSimplex(seed)

  const geometryRef = useUpdate(
    useCallback(
      (geometry) => {
        geometry.vertices = generateTerrain(
          simplex,
          size,
          height,
          levels,
          scale
        )
        geometry.elementsNeedUpdate = true
      },
      [size, height, levels, scale, seed]
    ),
    []
  )

  return (
    <animated.mesh
      name={'wireframeTerrain'}
      rotation={rotation}
      position={position}
    >
      <planeGeometry
        attach={'geometry'}
        args={[1, 1, size - 1, size - 1]}
        ref={geometryRef}
      />
      <meshBasicMaterial attach={'material'} color={'white'} wireframe />
    </animated.mesh>
  )
}

WireframeTerrain.propTypes = {
  size: PropTypes.number,
  height: PropTypes.number,
  levels: PropTypes.number,
  scale: PropTypes.number,
  position: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.object,
  ]),
  rotation: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.object,
  ]),
}
