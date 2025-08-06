
/**
 *  Creator es el core del proyecto
 *  
 *  Responsable de:
 *  
 *  - Toma la respuesta de promptUser
 *  - Coordinador de llamadas: instalador, estructura, tailwind, linters, etc.
 *  - Ejecuta el flujo principal de CLI
 * 
 *  Orquestador del STACKFORGE
 * 
 */


import { UserAnswers } from '../types';
import { installDependencies, installDeps } from './installer';
import { setupTailwind } from './tailwind';
import { createFolderStructure } from './folderStructure';
import { setupLinting } from './eslintPrettier';
import { setupAliases } from './alias';
import { logger } from '../utils/logger';

export async function runCreator(config: UserAnswers) {
    logger.title('INICIANDO GENERACIÓN DEL PROYECTO');

    // instalamos el proyecto con la configuracion proporcionada
    await installDependencies(config); 

    // configuramos tailwind si se selecciono 
    if (config.useTailwind) {
        await setupTailwind(config);
      }
      
      // configuramos carpetas iniciales si se selecciono
      if (config.createFolders) {
        createFolderStructure(config);
      }
      
      // configuramos alias y formato
      await setupLinting();
      await setupAliases(config);
      
      // se instalan dependencias necesarias proporcionadas por el usuario + auditoria de seguridad
      if (config.installDeps) {
        await installDeps(config)
      }
    
      logger.success('✅ Proyecto creado exitosamente.');
}
    

