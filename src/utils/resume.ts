// src/utils/resume.ts

import chalk from 'chalk';
import { UserAnswers } from '../types';

export function showResume(config: UserAnswers): void {
 // console.clear()
  console.log();
  console.log(chalk.magentaBright.bold('🧾 StackForge resume:'));
  console.log(chalk.gray('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
  console.log(chalk.cyan(`📁 Proyecto: ${config.projectName}`));
  console.log(chalk.cyan(`📦 Package: ${config.packageName}`));
  console.log(chalk.cyan(`🛠️ Bundler: ${config.bundler}`));
  console.log(chalk.cyan(`📝 Lenguaje: ${config.language}`));
  console.log(chalk.cyan(`🎨 Tailwind: ${config.useTailwind ? `Sí (v${config.tailwindVersion})` : 'No'}`));
  console.log(chalk.cyan(`📂 Carpetas creadas: ${config.createFolders ? 'Sí' : 'No'}`));
  if(config.createFolders) console.log(chalk.cyan(`📁 Estructura de carpetas: ${config.folderStructure}`))
  console.log(chalk.cyan(`📚 Dependencias: ${config.installDeps ? config.depsList || 'Ninguna extra' : 'No se instalaron'}`));
  console.log(chalk.gray('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
}