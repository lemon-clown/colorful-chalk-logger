import * as util from 'util'


import {
  DEBUG,
  VERBOSE,
  INFO,
  WARN,
  ERROR,
  FATAL,
  Level,
} from './level'
import chalk from 'chalk'


export interface Options {
  level?: Level
  date?: boolean
  colorful?: boolean
}


export class Logger {
  private static get defaultLevel() { return WARN }
  private readonly write = (text: string)=> process.stdout.write(text)

  readonly name: string
  readonly level = Logger.defaultLevel
  private flags = {
    date: false,
    colorful: true,
  }


  constructor(name: string, options?: Options) {
    this.name = name
    if( !options ) return

    let {
      level,
      date,
      colorful,
    } = options

    if( level ) this.level = level
    if( date != null ) this.flags.date = date
    if( colorful != null ) this.flags.colorful = colorful
  }


  // format a log record.
  public format(level: Level, header: string, message: string): string {
    if( this.flags.colorful ) {
      message = level.contentChalk.fg(message)
      message = level.contentChalk.bg(message)
    }
    return `${header}: ${message}\n`
  }

  // format a log record's header.
  public formatHeader(level: Level, date: Date): string {
    let { desc } = level
    let { name } = this
    if( this.flags.colorful ) {
      desc = level.headerChalk.fg(desc)
      desc = level.headerChalk.bg(desc)
      name = chalk.gray(name)
    }
    let header = `${desc} ${name}`
    if( !this.flags.date) return `[${header}]`

    let dateString = date.toLocaleString()
    if( this.flags.colorful ) dateString = chalk.gray(dateString)
    return `${dateString} [${header}]`
  }

  // format a log record part message according its type.
  public formatSingleMessage(message: any): string {
    let text: string
    switch( typeof message ) {
      case 'boolean':
      case 'number':
      case 'string':
        text = '' + message
        break
      default:
        try {
          text = JSON.stringify(message, null, 2)
        } catch( error ) {
          text = util.inspect(message, false, null)
        }
        if( text.indexOf('\n') > -1 ) text = '\n' + text
    }
    return text
  }


  // write a log record.
  private log(level: Level, ...messages: any[]) {
    if( !level || level.rank < this.level.rank ) return
    let header = this.formatHeader(level, new Date())
    let separator = ' '
    messages = messages.map(message=> {
      let text = this.formatSingleMessage(message)
      if( separator !== '\n' && text.indexOf('\n') ) separator = '\n'
      return text
    })
    let message = messages.join(separator)
    this.write(this.format(level, header, message))
  }


  public debug(...messages: any[])   { this.log(DEBUG, ...messages) }
  public verbose(...messages: any[]) { this.log(VERBOSE, ...messages) }
  public info(...messages: any[])    { this.log(INFO, ...messages) }
  public warn(...messages: any[])    { this.log(WARN, ...messages) }
  public error(...messages: any[])   { this.log(ERROR, ...messages) }
  public fatal(...messages: any[])   { this.log(FATAL, ...messages) }
}

