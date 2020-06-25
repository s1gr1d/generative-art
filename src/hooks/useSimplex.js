import { useMemo } from 'react'
import SimplexNoise from 'simplex-noise'

export const useSimplex = (seed) => {
  return useMemo(() => {
    return new SimplexNoise(seed)
  }, [seed])
}
