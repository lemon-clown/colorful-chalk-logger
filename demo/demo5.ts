import chalk from 'chalk'
import commander from 'commander'
import { ColorfulChalkLogger, ERROR } from '../src'


let logger = new ColorfulChalkLogger('demo', {
  level: ERROR,     // the default value is INFO
  date: false,      // the default value is false.
  colorful: true,   // the default value is true.
  dateChalk: 'green',
  nameChalk: chalk.cyan.bind(chalk),
}, process.argv)


commander
  .version('v1.0.0')
  .arguments('[orz]')

// register logger option to commander
logger.registerToCommander(commander)
// or ColorfulChalkLogger.registerToCommander(commander)

commander
  .option('-e, --encoding <encoding>', 'specified <filepath>\'s encoding')
  .parse(process.argv)


logger.debug('A', 'B', 'C')
logger.verbose('A', 'B', 'C')
logger.info('a', 'b', 'c')
logger.warn('X', 'Y', 'Z', { a: 1, b: 2})
logger.error('x', 'y', 'z', { c: { a: 'hello' }, b: { d: 'world' } })
logger.fatal('1', '2', '3')
