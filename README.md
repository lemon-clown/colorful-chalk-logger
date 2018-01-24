`colorful-chalk-logger` is a colorful logger tool based on [chalk](https://github.com/chalk/chalk)(so you can use a lot of colors) and [commander](https://github.com/tj/commander.js)(so you can use command line parameters to customized the logger's behavior).

# Install
you can use `colorful-chalk-logger` either in `typescript` or `javascript`.
```shell
yarn add colorful-chalk-logger
// or
npm install --save colorful-chalk-logger
```


# cli-options
* `--log-level <debug|verbose|info|warn|error|fatal>`: index global logger level.
* `--log-flag <[no-](date|inline|colorful)>`: the prefix `no-` represent negation.
  > - `date`: whether to print date.
  > - `inline`: each log record output in one line.
  > - `colorful`: whether to print with colors.


# Example
```typescript
// demo/demo1.ts
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
```
![demo1.1.png](https://raw.githubusercontent.com/LittleClown/colorful-chalk-logger/master/screenshots/demo1.1.png)

## Custom output format:
```typescript
// demo/demo2.ts
import { ColorfulChalkLogger, ERROR } from '../index'
import { Level } from '../src/level'
import chalk from 'chalk'


let logger = new ColorfulChalkLogger('demo', {
  level: ERROR,   // the default value is DEBUG
  date: false,    // the default value is false.
  colorful: true, // the default value is true.
})


logger.formatHeader = function (level: Level, date: Date): string {
  let { desc } = level
  let { name } = this
  if( this.flags.colorful ) {
    desc = level.headerChalk.fg(desc)
    desc = level.headerChalk.bg(desc)
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
![demo2.1.png](https://raw.githubusercontent.com/LittleClown/colorful-chalk-logger/master/screenshots/demo2.1.png)

```typescript
// demo/demo3.ts
import { ColorfulChalkLogger, ERROR } from '../index'
import { Level } from '../src/level'
import chalk from 'chalk'


let logger = new ColorfulChalkLogger('demo', {
  level: ERROR,     // the default value is DEBUG
  date: false,      // the default value is false.
  colorful: true,   // the default value is true.
  dateChalk: 'green',
  nameChalk: chalk.cyan.bind(chalk),
})


logger.debug('A', 'B', 'C')
logger.verbose('A', 'B', 'C')
logger.info('a', 'b', 'c')
logger.warn('X', 'Y', 'Z', { a: 1, b: 2})
logger.error('x', 'y', 'z', { c: { a: 'hello' }, b: { d: 'world' } })
logger.fatal('1', '2', '3')
```
![demo3.1.png](https://raw.githubusercontent.com/LittleClown/colorful-chalk-logger/master/screenshots/demo3.1.png)
