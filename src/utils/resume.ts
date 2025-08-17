// src/utils/resume.ts

import chalk from 'chalk';
import { UserAnswers } from '../types/UserAnswer';
import { logger } from './logger';

export function showResume(config: UserAnswers): void {
 // console.clear()
  console.log();
  logger.title('🧾 StackForge resume:');
  console.log(chalk.gray('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
  if(config.useGit && config.gitConfig?.userName) {
    console.log(chalk.cyan(`🤖 Usuario de github 👉 ${config.gitConfig.userName}`))
    console.log(chalk.cyan(`📝 Repositorio  👉 ${config.repoInfo?.name}`))
    console.log(chalk.cyan(`🔗 Url 👉 ${config.repoInfo?.url}`))
    console.log(chalk.cyan(`🪾 Rama principal 👉 ${config.repoInfo?.defaultBranch}`))
  }
  console.log(chalk.cyan(`📁 Proyecto: ${config.projectName}`));
  if(config.bundler === "Vite") console.log(chalk.cyan(`📦 Package: ${config.packageName}`));
  console.log(chalk.cyan(`🛠️ Bundler: ${config.bundler}`));
  console.log(chalk.cyan(`📝 Lenguaje: ${config.language}`));
  console.log(chalk.cyan(`🎨 Tailwind: ${config.useTailwind ? `Sí (v${config.tailwindVersion})` : 'No'}`));
  console.log(chalk.cyan(`📂 Carpetas creadas: ${config.createFolders ? 'Sí' : 'No'}`));
  if(config.createFolders) console.log(chalk.cyan(`📁 Estructura de carpetas: ${config.folderStructure}`))
  console.log(chalk.cyan(`📚 Dependencias: ${config.installDeps ? config.depsList || 'Ninguna extra' : 'No se instalaron'}`));
  console.log(chalk.gray('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
}