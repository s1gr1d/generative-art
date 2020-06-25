import { Random } from 'random-js'
import palettes from 'nice-color-palettes'

const RANDOM = new Random()

export const randomColorPalettes = () =>
  palettes[RANDOM.integer(0, palettes.length - 1)]

export const randomColorFromPalette = (palette) => {
  if (palette) {
    return palette[RANDOM.integer(0, palette.length - 1)]
  } else {
    const palette = randomColorPalettes()
    return palette[RANDOM.integer(0, palette.length - 1)]
  }
}
