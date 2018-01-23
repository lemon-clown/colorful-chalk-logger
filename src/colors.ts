import chalk, { Chalk } from 'chalk'


export type Color = string | [number, number, number]


export class ColorfulChalk {
  readonly fg: Chalk
  readonly bg: Chalk

  constructor(fg: Color, bg: Color) {
    this.fg = colorToChalk(fg, true)
    this.bg = colorToChalk(bg, false)
  }
}


let colorKeywords = new Set([
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
])

let brightColorKeywords = new Set([
  'redBright',
  'greenBright',
  'yellowBright',
  'blueBright',
  'magentaBright',
  'cyanBright',
  'whiteBright',
])


function colorToChalk(color: Color, fg: boolean) {
  if( typeof color === 'string' ) {
    if( colorKeywords.has(color) || brightColorKeywords.has(color) ) {
      if( !fg ) color = 'bg' + color[0].toUpperCase() + color.slice(1)
      return chalk[color].bind(chalk)
    }
    try {
      return fg? chalk.keyword(color): chalk.bgKeyword(color)
    } catch( error ) {
      return fg? chalk.hex(color): chalk.bgHex(color)
    }
  }
  return fg
    ? chalk.rgb(color[0], color[1], color[2])
    : chalk.bgRgb(color[0], color[1], color[2])
}
