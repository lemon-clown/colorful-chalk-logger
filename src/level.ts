import { ColorfulChalk } from './colors'


export class Level {
  private static currentRank = 0    // rank increaser
  readonly rank: number             // level's rank
  readonly name: string             // level's name
  readonly desc: string             // level's description

  public headerChalk: ColorfulChalk
  public contentChalk: ColorfulChalk

  constructor(name: string,
              desc: string,
              headerChalk: ColorfulChalk,
              contentChalk: ColorfulChalk) {
    this.rank = ++Level.currentRank
    this.name = name
    this.desc = desc
    this.headerChalk = headerChalk
    this.contentChalk = contentChalk
  }
}


export const DEBUG = new Level(
  'debug',
  'debug',
  new ColorfulChalk('#BCBC36', 'black'),
  new ColorfulChalk('#FCA416', 'black'),
)
export const VERBOSE = new Level(
  'verbose',
  'verbose',
  new ColorfulChalk('cyan', 'black'),
  new ColorfulChalk('cyan', 'black'),
)
export const INFO = new Level(
  'info',
  'info ',
  new ColorfulChalk('green', 'black'),
  new ColorfulChalk('green', 'black'),
)
export const WARN = new Level(
  'warn',
  'warn ',
  new ColorfulChalk('magenta', 'black'),
  new ColorfulChalk('magenta', 'black'),
)
export const ERROR = new Level(
  'error',
  'error',
  new ColorfulChalk('black', 'red'),
  new ColorfulChalk('red', 'black'),
)
export const FATAL = new Level(
  'fatal',
  'fatal',
  new ColorfulChalk('black', 'redBright'),
  new ColorfulChalk('redBright', 'black'),
)
