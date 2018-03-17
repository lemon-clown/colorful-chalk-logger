import { ColorfulChalk } from './colors'


export class Level {
  private static currentRank = 0    // rank increaser
  private static readonly levels = new Map<string, Level>()

  public static getLevel(levelName: string) {
    return Level.levels.get(levelName)
  }


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

    Level.levels.set(this.name, this)
  }
}


export const DEBUG = new Level(
  'debug',
  'debug',
  new ColorfulChalk('#BCBC36'),
  new ColorfulChalk('#FCA416'),
)
export const VERBOSE = new Level(
  'verbose',
  'verbose',
  new ColorfulChalk('cyan'),
  new ColorfulChalk('cyan'),
)
export const INFO = new Level(
  'info',
  'info ',
  new ColorfulChalk('green'),
  new ColorfulChalk('green'),
)
export const WARN = new Level(
  'warn',
  'warn ',
  new ColorfulChalk('magenta'),
  new ColorfulChalk('magenta'),
)
export const ERROR = new Level(
  'error',
  'error',
  new ColorfulChalk('black', 'red'),
  new ColorfulChalk('red'),
)
export const FATAL = new Level(
  'fatal',
  'fatal',
  new ColorfulChalk('black', 'redBright'),
  new ColorfulChalk('redBright'),
)
