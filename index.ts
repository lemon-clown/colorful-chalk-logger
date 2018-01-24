import * as program from 'commander'
import { Level } from './src/level'
import { Logger, Options } from './src/logger'

export {
  DEBUG,
  VERBOSE,
  INFO,
  WARN,
  ERROR,
  FATAL,
} from './src/level'


program
  .option('--log-level <level>', 'index output level.')
  .option('--log-flag <flag>', 'index option flag', collect, [])
  .allowUnknownOption()
  .parse(process.argv)


let defaultOptions = (()=> {
  let options: Options = {}
  if( program.logLevel ) {
    let level = Level.getLevel(program.logLevel)
    if( level ) options.level = level
  }

  if( program.logFlag ) {
    const negate_pattern = /^(no-)?(\S+)$/
    const valid_flag = /^date|colorful|inline$/
    let flags = program.logFlag
    for(let f of flags) {
      let matched = negate_pattern.exec(f)
      if( matched ) {
        let [, negative, flag ] = matched
        if( valid_flag.test(flag) ) options[flag] = !negative
      }
    }
  }

  return options
})()


export class ColorfulChalkLogger extends Logger {
  constructor(name: string, options?: Options) {
    if( defaultOptions ) {
      options = options
        ? Object.assign(options, defaultOptions)
        : Object.assign({}, defaultOptions)
    }
    super(name, options)
  }
}


/**
 * collect the parameters specified by the same option.
 * for example:
 *    the command line parameter: --fruit apple --fruit banana
 *    will be collected as: [ 'apple', 'banana' ]
 * @param {string} arg
 * @param {string[]} args
 * @return {string[]}
 */
function collect(arg: string, args: string[]): string[] {
  args.push(arg)
  return args
}
