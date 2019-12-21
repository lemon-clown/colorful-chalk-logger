import fs from 'fs-extra'
import moment from 'moment'
import { inspect } from 'util'
import chalk, { Chalk } from 'chalk'
import { Color, colorToChalk } from './color'
import { DEBUG, VERBOSE, INFO, WARN, ERROR, FATAL, Level } from './level'


export interface Options {
  placeholderRegex?: RegExp
  level?: Level
  date?: boolean
  inline?: boolean
  colorful?: boolean
  encoding?: string
  filepath?: string
  write?: (text: string) => void
  dateChalk?: Chalk | Color
  nameChalk?: Chalk | Color
}


export class Logger {
  private static get defaultLevel() { return INFO }
  private static get defaultDateChalk() { return chalk.gray.bind(chalk) }
  private static get defaultNameChalk() { return chalk.gray.bind(chalk) }

  private readonly write = (text: string) => { process.stdout.write(text) }
  public name: string
  public readonly level = Logger.defaultLevel
  public readonly dateChalk = Logger.defaultDateChalk
  public readonly nameChalk = Logger.defaultNameChalk
  private readonly placeholderRegex: RegExp = /(?<!\\)\{\}/g
  public readonly flags = {
    date: false,
    inline: false,
    colorful: true,
  }

  public constructor(name: string, options?: Options) {
    this.name = name
    if (!options) return

    const {
      level,
      date,
      inline,
      colorful,
      write,
      filepath,
      encoding = 'utf-8',
      dateChalk,
      nameChalk,
      placeholderRegex
    } = options

    if (level) this.level = level
    if (date != null) this.flags.date = date
    if (inline != null) this.flags.inline = inline
    if (colorful != null) this.flags.colorful = colorful
    if (placeholderRegex != null) {
      let flags: string = this.placeholderRegex.flags
      if (!flags.includes('g')) flags += 'g'
      this.placeholderRegex = new RegExp(placeholderRegex.source, `${ flags }`)
    }

    if (write != null) this.write = write
    else if (filepath != null) {
      this.write = (text: string) => fs.appendFileSync(filepath!, text, encoding)
    }

    if (dateChalk) {
      if (typeof dateChalk === 'function') this.dateChalk = dateChalk as any
      else this.dateChalk = colorToChalk(dateChalk, true)
    }
    if (nameChalk) {
      if (typeof nameChalk === 'function') this.nameChalk = nameChalk as any
      else this.nameChalk = colorToChalk(nameChalk, true)
    }
  }

  // format a log record.
  public format(level: Level, header: string, message: string): string {
    if (this.flags.colorful) {
      message = level.contentChalk.fg(message)
      if (level.contentChalk.bg != null) message = level.contentChalk.bg(message)
    }
    return `${ header }: ${ message }`
  }

  // format a log record's header.
  public formatHeader(level: Level, date: Date): string {
    let { desc } = level
    let { name, dateChalk, nameChalk } = this
    let chalkedName = name
    if (this.flags.colorful) {
      desc = level.headerChalk.fg(desc)
      if (level.headerChalk.bg != null) desc = level.headerChalk.bg(desc)
      chalkedName = nameChalk(name as any)
    }
    const header = name.length > 0 ? `${ desc } ${ chalkedName }` : desc
    if (!this.flags.date) return `[${ header }]`

    let dateString = moment(date).format('YYYY-MM-DD HH:mm:ss')
    if (this.flags.colorful) dateString = dateChalk(dateString as any)
    return `${ dateString } [${ header }]`
  }

  // format a log record part message according its type.
  public formatSingleMessage(message: any): string {
    let text: string
    let { inline } = this.flags
    switch (typeof message) {
      case 'boolean':
      case 'number':
      case 'string':
        text = '' + message
        break
      case 'function':
        text = message.toString()
        break
      default:
        try {
          if (inline) text = inspect(message, false, null)
          else text = JSON.stringify(message, null, 2)
        } catch (error) {
          text = inspect(message, false, null)
        }
    }
    if (inline) text = text.replace(/\n\s*/g, ' ')
    return text
  }

  public debug(messageFormat: string, ...messages: any[]) { this.log(DEBUG, messageFormat, ...messages) }
  public verbose(messageFormat: string, ...messages: any[]) { this.log(VERBOSE, messageFormat, ...messages) }
  public info(messageFormat: string, ...messages: any[]) { this.log(INFO, messageFormat, ...messages) }
  public warn(messageFormat: string, ...messages: any[]) { this.log(WARN, messageFormat, ...messages) }
  public error(messageFormat: string, ...messages: any[]) { this.log(ERROR, messageFormat, ...messages) }
  public fatal(messageFormat: string, ...messages: any[]) { this.log(FATAL, messageFormat, ...messages) }

  // write a log record.
  private log(level: Level, messageFormat: string, ...messages: any[]) {
    if (!level || level.rank < this.level.rank) return
    let header = this.formatHeader(level, new Date())
    let newline = false
    let items: string[] = messages
      .map(msg => {
        if (msg == null) msg = '' + msg
        let text = this.formatSingleMessage(msg)
        if (text.endsWith('\n')) {
          text = '\n' + text
          newline = true
        }
        return text
      })

    let idx: number = 0
    let message: string = messageFormat.replace(this.placeholderRegex, m => items[idx++] || m)
    if (idx < items.length) message += ' ' + items.slice(idx).join(' ')
    if (!newline && !message.endsWith('\n')) message += '\n'
    this.write(this.format(level, header, message))
  }
}
