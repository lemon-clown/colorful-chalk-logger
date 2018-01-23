import { ColorfulChalkLogger, ERROR } from '../index'

let logger = new ColorfulChalkLogger('demo', {
  level: ERROR,   // the default value is DEBUG
  date: false,    // the default value is false.
  colorful: true, // the default value is true.
})


logger.debug('A', 'B', 'C')
logger.verbose('A', 'B', 'C')
logger.info('a', 'b', 'c')
logger.warn('X', 'Y', 'Z', { a: 1, b: 2})
logger.error('x', 'y', 'z', { c: { a: 'hello' }, b: { d: 'world' } })
logger.fatal('1', '2', '3')
