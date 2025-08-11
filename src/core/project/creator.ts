/**
 * Creator es el core del proyecto  SIN GIT
 *
 * Responsable de:
 * - Tomar la respuesta de promptUser.
 * - Coordinar llamadas: instalador, estructura, tailwind, linters, etc.
 * - Ejecutar el flujo principal de la CLI
 *
 * Orquestador del STACKFORGE
 */

import { UserAnswers } from '../../types';
import { initializeProject, installDeps } from '../install/installer';
import { setupTailwind } from '../install/tailwind';
import { createFolderStructure } from '../project/folderStructure';
import { setupLinting } from '../install/eslintPrettier';
import { setupAliases } from '../alias';
import { generateReadme } from '../project/generateReadme';


import { logger } from '../../utils/logger';




export async function runCreator(config: UserAnswers) {

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
