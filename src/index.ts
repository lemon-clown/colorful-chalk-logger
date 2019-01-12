import program from 'commander'
import { Level } from './level'
import { Logger, Options } from './logger'
export { Level, DEBUG, INFO, VERBOSE, WARN, ERROR, FATAL } from './level'


let registered: boolean = false


export class ColorfulChalkLogger extends Logger {
  constructor(name: string, options?: Options, args?: string[]) {
    super(name, ColorfulChalkLogger.generateOptions(options, args))
  }

  /**
   * parse command line args
   * @param options
   * @param args
   */
  private static generateOptions(options?: Options, args?: string[]): Options {
    if (options == null) options = {} as Options
    if (args == null) return options

    const levelRegex: RegExp = /^--log-level\s*[=\s]\s*(\w+)$/
    const flagRegex: RegExp = /^--log-flag\s*[=\s]\s*(no-)?(date|inline|colorful)$/
    const outputRegex: RegExp = /^--log-output\s*[=\s]\s*((['"])[\s\S]+\2|\S+)$/

    // register into commander
    if (!registered) {
      registered = true
      program
        .option('--log-level <level>', 'index logger\'s level.')
        .option('--log-flag <option>', 'index logger\' option. (date,colorful)')
    }

    args.forEach(arg => {
      if (levelRegex.test(arg)) {
        let [, levelString] = levelRegex.exec(arg) as string[]
        let newLevel = Level.valueOf(levelString)
        if (newLevel == null) return
        if (options!.level == null || newLevel.rank < options!.level!.rank)
          options!.level = newLevel
      }
      if (flagRegex.test(arg)) {
        let [, negative, flag] = flagRegex.exec(arg) as string[]
        options![flag] = !negative
      }
    })

    return options
  }
}
