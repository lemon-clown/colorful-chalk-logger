`colorful-chalk-logger` is a colorful logger tool based on [chalk](https://github.com/chalk/chalk)(so you can use a lot of colors) and [commander](https://github.com/tj/commander.js)(so you can use command line parameters to customized the logger's behavior).


[![npm version](https://img.shields.io/npm/v/colorful-chalk-logger.svg)](https://www.npmjs.com/package/colorful-chalk-logger)


# Install
you can use `colorful-chalk-logger` either in `typescript` or `javascript`.
```shell
yarn add colorful-chalk-logger
// or
npm install --save colorful-chalk-logger
```


# cli-options
* `--log-level <debug|verbose|info|warn|error|fatal>`: specify global logger level.
* `--log-flag <[no-](date|inline|colorful)>`: the prefix `no-` represent negation.
  > - `date`: whether to print date. default value is false
  > - `inline`: each log record output in one line. default value is false.
  > - `colorful`: whether to print with colors. default value is true.
* `--log-output <filepath>`: specify the output path (default behavior is output directory to stdout).
  > - suggest: set `colorful = false` and `inline = true` if you want to output logs into a file.
* `--log-encoding <encoding>`: specify the log file's encoding.


# Example
```typescript
// demo/demo1.ts
import { ColorfulChalkLogger, ERROR } from 'colorful-chalk-logger'


const logger = new ColorfulChalkLogger('demo', {
  level: ERROR,   // the default value is INFO
  date: false,    // the default value is false.
  colorful: true, // the default value is true.
}, process.argv)


logger.debug('A', 'B', 'C')
logger.verbose('A', 'B', 'C')
logger.info('a', 'b', 'c')
logger.warn('X', 'Y', 'Z', { a: 1, b: 2})
logger.error('x', 'y', 'z', { c: { a: 'hello' }, b: { d: 'world' } })
logger.fatal('1', '2', '3')
```
![demo1.1.png](https://raw.githubusercontent.com/lemon-clown/colorful-chalk-logger/master/screenshots/demo1.1.png)

## Custom output format:
```typescript
// demo/demo2.ts
import chalk from 'chalk'
import { ColorfulChalkLogger, ERROR, Level } from 'colorful-chalk-logger'


let logger = new ColorfulChalkLogger('demo', {
  level: ERROR,   // the default value is INFO
  date: false,    // the default value is false.
  colorful: true, // the default value is true.
}, process.argv)


logger.formatHeader = function (level: Level, date: Date): string {
  let { desc } = level
  let { name } = this
  if( this.flags.colorful ) {
    desc = level.headerChalk.fg(desc)
    if (level.headerChalk.bg != null) desc = level.headerChalk.bg(desc)
    name = chalk.gray(name)
  }
  let header = `${desc} ${name}`
  if( !this.flags.date) return `[${header}]`

  let dateString = date.toLocaleTimeString()
  if( this.flags.colorful ) dateString = chalk.gray(dateString)
  return `<${dateString} ${header}>`
}


logger.debug('A', 'B', 'C')
logger.verbose('A', 'B', 'C')
logger.info('a', 'b', 'c')
logger.warn('X', 'Y', 'Z', { a: 1, b: 2})
logger.error('x', 'y', 'z', { c: { a: 'hello' }, b: { d: 'world' } })
logger.fatal('1', '2', '3')
```
![demo2.1.png](https://raw.githubusercontent.com/lemon-clown/colorful-chalk-logger/master/screenshots/demo2.1.png)

```typescript
// demo/demo3.ts
import chalk from 'chalk'
import { ColorfulChalkLogger, ERROR } from 'colorful-chalk-logger'


let logger = new ColorfulChalkLogger('demo', {
  level: ERROR,     // the default value is INFO
  date: false,      // the default value is false.
  colorful: true,   // the default value is true.
  dateChalk: 'green',
  nameChalk: chalk.cyan.bind(chalk),
}, process.argv)


logger.debug('A', 'B', 'C')
logger.verbose('A', 'B', 'C')
logger.info('a', 'b', 'c')
logger.warn('X', 'Y', 'Z', { a: 1, b: 2})
logger.error('x', 'y', 'z', { c: { a: 'hello' }, b: { d: 'world' } })
logger.fatal('1', '2', '3')
```
![demo3.1.png](https://raw.githubusercontent.com/lemon-clown/colorful-chalk-logger/master/screenshots/demo3.1.png)

## output to file
```typescript
// demo/demo4.ts
import path from 'path'
import chalk from 'chalk'
import { ColorfulChalkLogger, DEBUG } from 'colorful-chalk-logger'


let logger = new ColorfulChalkLogger('demo', {
  level: DEBUG,       // the default value is DEBUG
  date: true,         // the default value is false.
  inline: true,
  colorful: false,    // the default value is true.
  dateChalk: 'green',
  nameChalk: chalk.cyan.bind(chalk),
  filepath: path.resolve(__dirname, 'orz.log'),
  encoding: 'utf-8',
}, process.argv)


logger.debug('A', 'B', 'C')
logger.verbose('A', 'B', 'C')
logger.info('a', 'b', 'c')
logger.warn('X', 'Y', 'Z', { a: 1, b: 2})
logger.error('x', 'y', 'z', { c: { a: 'hello' }, b: { d: 'world' } })
logger.fatal('1', '2', '3')
```
![demo4.1.png](https://raw.githubusercontent.com/lemon-clown/colorful-chalk-logger/master/screenshots/demo4.1.png)


## register to commander
```typescript
// demo/demo5.ts
import chalk from 'chalk'
import commander from 'Commander'
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
```
![demo5.1.png](https://raw.githubusercontent.com/lemon-clown/colorful-chalk-logger/master/screenshots/demo5.1.png)


## string format
```typescript
// demo/demo6.ts
import { ColorfulChalkLogger, DEBUG } from '../src'


let logger = new ColorfulChalkLogger('demo', {
  level: DEBUG,
  date: true,
  colorful: true,
  inline: true,
}, process.argv)


logger.verbose('user({})', { username: 'lemon-clown', avatar: 'https://avatars0.githubusercontent.com/u/42513619?s=400&u=d878f4532bb5749979e18f3696b8985b90e9f78b&v=4' })
logger.error('bad argument ({}). error({})', { username: 123 }, new Error('username is invalid'))


let logger2 = new ColorfulChalkLogger('demo', {
  level: DEBUG,
  date: true,
  colorful: true,
  inline: true,
  placeholderRegex: /(?<!\\)\<\>/g  // change placeholder of string format
}, process.argv)

logger2.verbose('user(<>)', { username: 'lemon-clown', avatar: 'https://avatars0.githubusercontent.com/u/42513619?s=400&u=d878f4532bb5749979e18f3696b8985b90e9f78b&v=4' })
logger2.error('bad argument (<>). error({})', { username: 123 }, new Error('username is invalid'))
```
![demo6.1.png](https://raw.githubusercontent.com/lemon-clown/colorful-chalk-logger/master/screenshots/demo6.1.png)


