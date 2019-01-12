import chalk, { Chalk } from 'chalk'


export type Color = string | [ number, number, number ]


export class ColorfulChalk {
  readonly fg: Chalk
  readonly bg: Chalk | null

  constructor(fg: Color, bg?: Color) {
    this.fg = colorToChalk(fg, true)
    if (bg == null) this.bg = null
    else this.bg = colorToChalk(bg, false)
  }
}


const colorKeywords = new Set([
  'black', 'red', 'green', 'yellow', 'blue',
  'magenta', 'cyan', 'white', 'gray',
])

const brightColorKeywords = new Set([
  'redBright', 'greenBright', 'yellowBright', 'blueBright',
  'magentaBright', 'cyanBright', 'whiteBright',
])


export function colorToChalk(color: Color, fg: boolean) {
  if (typeof color === 'string') {
    if (colorKeywords.has(color) || brightColorKeywords.has(color)) {
      if (!fg) color = 'bg' + color[0].toUpperCase() + color.slice(1)
      return chalk[color].bind(chalk)
    }
    try {
      return fg? chalk.keyword(color): chalk.bgKeyword(color)
    } catch (error) {
      return fg? chalk.hex(color): chalk.bgHex(color)
    }
  }
  return fg
    ? chalk.rgb(color[0], color[1], color[2])
    : chalk.bgRgb(color[0], color[1], color[2])
}

