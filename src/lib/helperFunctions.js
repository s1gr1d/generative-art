import { MathUtils } from 'three'

export const objectValuesToArray = (obj) =>
  Object.values(obj).reduce((array, value) => [...array, value], [])

export const toRad = (degrees) => MathUtils.degToRad(degrees)
