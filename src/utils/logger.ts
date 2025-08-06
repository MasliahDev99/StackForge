import chalk from 'chalk';

export const logger = {
  info: (msg: string) =>
    console.log(`${chalk.blue('ℹ INFO')}    → ${msg}`),

  success: (msg: string) =>
    console.log(`${chalk.green('✔ SUCCESS')} → ${msg}`),

  warn: (msg: string) =>
    console.warn(`${chalk.yellow('⚠ WARN')}    → ${msg}`),

  error: (msg: string) =>
    console.error(`${chalk.red('✖ ERROR')}   → ${msg}`),

  title: (msg: string) =>
    console.log(`\n${chalk.magenta.bold('=== ' + msg.toUpperCase() + ' ===')}`),
};