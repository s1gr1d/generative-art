import React, { useRef, useEffect } from 'react'
import { useThree, useFrame } from 'react-three-fiber'
import { animated } from 'react-spring/three'

export const Camera = (props) => {
  const ref = useRef()
  const { setDefaultCamera } = useThree()
  // Make the camera known to the system
  useEffect(() => void setDefaultCamera(ref.current), [setDefaultCamera])
  // Update it every frame
  useFrame(() => ref.current.updateMatrixWorld())
  return <animated.perspectiveCamera ref={ref} {...props} />
}
