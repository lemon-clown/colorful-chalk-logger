export class Level {
  private static currentRank = 0    // rank increaser
  readonly rank: number             // level's rank
  readonly name: string             // level's name
  readonly desc: string             // level's description

  constructor(name: string,
              desc: string) {
    this.rank = ++Level.currentRank
    this.name = name
    this.desc = desc
  }
}


export const DEBUG    = new Level('debug',    'debug')
export const VERBOSE  = new Level('verbose',  'verbose')
export const INFO     = new Level('info',     'info ')
export const WARN     = new Level('warn',     'warn ')
export const ERROR    = new Level('error',    'error')
export const FATAL    = new Level('fatal',    'fatal')
