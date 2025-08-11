import { UserAnswers } from '../../types';
import { initializeProject, installDeps } from '../install/installer';
import { setupTailwind } from '../install/tailwind';
import { createFolderStructure } from '../project/folderStructure';
import { setupLinting } from '../install/eslintPrettier';
import { setupAliases } from '../alias';
import { generateReadme } from '../project/generateReadme';
import { logger } from '../../utils/logger';
import { GitService } from '../git/service/gitService';

import path from 'path';
import fs from 'fs';

export async function sfCreateApp(config: UserAnswers) {
    logger.title('INICIANDO GENERACIÓN DEL PROYECTO - ⚡️ StackForge Create App ⚡️');
    const originalCwd = process.cwd();

    try {
        // 1. Definir path absoluto del proyecto
        const pathDestino = path.resolve(originalCwd, config.projectName.toLowerCase());

        // 2. Crear proyecto React (Vite u otro)
        logger.info('Inicializando proyecto React...');
        await initializeProject(config);
        logger.success('Proyecto React inicializado.');

        // 3. Confirmar que la carpeta existe (por si acaso)
        if (!fs.existsSync(pathDestino)) {
            logger.error(`Carpeta destino no existe: ${pathDestino}`);
            throw new Error('La carpeta del proyecto no se creó correctamente.');
        }
        logger.success('La ruta existe: ' + pathDestino);

        // 4. Cambiar al directorio del proyecto para operaciones locales
        process.chdir(pathDestino);


        // 5. Instalar Tailwind si corresponde
        if (config.useTailwind) {
            logger.info(`Instalando TailwindCSS versión ${config.tailwindVersion}...`);
            await setupTailwind(config);
            logger.success('TailwindCSS instalado correctamente.');
        }

        // 6. Instalar dependencias adicionales si las hay
        if (config.installDeps && config.depsList) {
            logger.info('Instalando dependencias adicionales...');
            await installDeps(config);
            logger.success('Dependencias adicionales instaladas.');
        }

        // 7. Configurar ESLint + Prettier
        logger.info('Configurando ESLint y Prettier...');
        await setupLinting();
        logger.success('ESLint y Prettier configurados.');

        // 8. Configurar aliases de importación
        logger.info('Configurando aliases de importación...');
        await setupAliases(config);
        logger.success('Aliases configurados.');

        // 9. Crear estructura de carpetas personalizada si aplica
        if (config.createFolders && config.folderStructure) {
            logger.info('Creando estructura de carpetas personalizada...');
            await createFolderStructure(config);
            logger.success('Estructura de carpetas creada.');
        }

        // 10. Generar README
        logger.info('Generando archivo README...');
        await generateReadme(config);
        logger.success('README generado.');



        // 11. Si usa Git y tiene configuración
        if (config.useGit && config.gitConfig && config.repoCreation) {
            const gitService = new GitService(config.gitConfig.token);

            // 5.1 Crear repositorio remoto en GitHub
            logger.info('Creando repositorio remoto en GitHub...');
            const repoInfo = await gitService.createRepository(config);

            config.repoInfo = repoInfo // guardamos los datos del repositorio creado 


            logger.success(`Repositorio creado: ${repoInfo.url}`);

            // 5.2 Inicializar git localmente y vincular remoto
            logger.info('Inicializando repositorio git local...');
            await gitService.initRepository(pathDestino);

            logger.info('Agregando remote origin...');
            await gitService.removeRemoteIfExists('origin', pathDestino, true); // método para evitar error si ya existe
            await gitService.addRemote(repoInfo.url, pathDestino, true);
            logger.success(`Repositorio vinculado a ${repoInfo.url} exitosamente.`);

            logger.info(`Realizando primer commit y push inicial en '${repoInfo.url}' en la rama '${repoInfo.defaultBranch}'... `);
            await gitService.gitPush(pathDestino, repoInfo.defaultBranch, 'primer commit', true)
            logger.success('Primer commit subido al repositorio remoto.');
        }



        logger.title('PROYECTO CREADO EXITOSAMENTE 🎉');
    } catch (error: any) {
        logger.error(`Error durante la creación del proyecto: ${error.message || error}`);
        throw error;
    } finally {
        // Volver al directorio original para no afectar otras ejecuciones
        process.chdir(originalCwd);
    }
}