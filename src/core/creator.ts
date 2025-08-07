
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
import { initializeProject, installDeps } from './installer';
import { setupTailwind } from './tailwind';
import { createFolderStructure } from './folderStructure';
import { setupLinting } from './eslintPrettier';
import { setupAliases } from './alias';
import { logger } from '../utils/logger';
import { generateReadme } from './generateReadme';

import { initProgressBar, advanceStep, stopProgressBar } from  '../utils/progressBar'

//import path from 'path';

export async function runCreator(config: UserAnswers) {
    logger.title('INICIANDO GENERACIÓN DEL PROYECTO');


    const steps = [
      'Inicializando proyecto',
      'Entrando a la carpeta',
      'Configurando Tailwind',
      'Creando estructura',
      'Configurando Linter',
      'Configurando Alias',
      'Instalando dependencias',
      'Generando README',
    ];
    
    initProgressBar(steps);

    // instalamos el proyecto con la configuracion proporcionada
    await initializeProject(config); 
    advanceStep('Inicializando proyecto')
    // nos movemos a la carpeta del proyecto con manejo de errores
    try {
      const pathDestino = config.projectName.toLowerCase();
      // const projectPath = path.join(process.cwd(),pathDestino)
      process.chdir(pathDestino);
      advanceStep('Entrando a la carpeta')
      
      // logger.info(`📂 Entrando a la carpeta => ${projectPath}`);
    } catch (err) {
      // logger.error(`❌ No se pudo entrar al directorio '${config.projectName}': ${(err as Error).message}`);
      process.exit(1);
    }

    // configuramos tailwind si se selecciono 
    if (config.useTailwind) {
        await setupTailwind(config);
        advanceStep('Configurando Tailwind')
      }
      
      // configuramos carpetas iniciales si se selecciono
      if (config.createFolders) {
        await createFolderStructure(config);
        advanceStep('Creando Estructura')
      }
      
      // configuramos alias y formato
      await setupLinting();
      advanceStep('Configurando Linter')
      await setupAliases(config);
      advanceStep('Configurando Alias')
      
      // se instalan dependencias necesarias proporcionadas por el usuario + auditoria de seguridad
      if (config.installDeps) {
        await installDeps(config)
        advanceStep('Instalando Dependencias y Ejecutando auditoría')
      }


      generateReadme(config)
      advanceStep('Generando README')
    
      logger.success('✅ Proyecto creado exitosamente.');
      stopProgressBar()
}
    

