/**
 * Creator es el core del proyecto
 *
 * Responsable de:
 * - Tomar la respuesta de promptUser
 * - Coordinar llamadas: instalador, estructura, tailwind, linters, etc.
 * - Ejecutar el flujo principal de la CLI
 *
 * Orquestador del STACKFORGE
 */

import { UserAnswers } from '../types';
import { initializeProject, installDeps } from './installer';
import { setupTailwind } from './tailwind';
import { createFolderStructure } from './folderStructure';
import { setupLinting } from './eslintPrettier';
import { setupAliases } from './alias';
import { generateReadme } from './generateReadme';

import { logger } from '../utils/logger';


export async function runCreator(config: UserAnswers) {
  console.clear();
  logger.title('INICIANDO GENERACIÓN DEL PROYECTO');


  await initializeProject(config);

  const pathDestino = config.projectName.toLowerCase();
  process.chdir(pathDestino);

  if (config.useTailwind) {
    await setupTailwind(config);
  }

  if (config.createFolders) {
    await createFolderStructure(config);
  }

  await setupLinting();
  await setupAliases(config);

  if (config.installDeps) {
    await installDeps(config);
  }

  await generateReadme(config);

  
}
